import {NextRequest, NextResponse} from "next/server"
import {isCacheClearAuthorized, secretsMatch} from "./src/lib/utils/security"

// Draft content must never be indexed or held in a shared cache, and the preview url carries the
// shared secret in its query string, so keep that url out of any outbound Referer header.
const PREVIEW_HEADERS: Record<string, string> = {
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "no-store, max-age=0",
}

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname

  // With Cache Components these pages stream after a static shell, so a redirect or 404 raised while
  // rendering can no longer change the status code. Decide those here, before rendering starts.
  if (pathname.startsWith("/preview")) return handlePreview(request)

  if (await isAuthenticated(request)) return NextResponse.next()

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {"WWW-Authenticate": "Basic"},
  })
}

/**
 * Gate the editor preview routes on the secret shared with Drupal.
 *
 * Drupal links to `/preview?secret=...&slug=/path` (or the old `/api/draft`, which next.config.ts
 * redirects here), which is redirected to `/preview/path?secret=...`. Every preview request must carry
 * the secret. Every response here is a dead end for crawlers and caches, and an unauthorized request is
 * rewritten to the 404 page rather than redirected so it is indistinguishable from a missing page.
 */
const handlePreview = async (request: NextRequest) => {
  const notFound = () => withPreviewHeaders(NextResponse.rewrite(new URL("/404", request.url), {status: 404}))

  // Fail closed. Without a configured secret there is nothing to authorize against, so an empty
  // environment variable must never turn into an open door to unpublished content.
  const expectedSecret = process.env.DRUPAL_PREVIEW_SECRET
  if (!expectedSecret) {
    console.error("DRUPAL_PREVIEW_SECRET is not set. Preview routes are disabled.")
    return notFound()
  }

  const secret = request.nextUrl.searchParams.get("secret")
  if (!secret || !(await secretsMatch(secret, expectedSecret))) return notFound()

  if (request.nextUrl.pathname === "/preview" && request.nextUrl.searchParams.has("slug")) {
    const slug = request.nextUrl.searchParams.get("slug")
    if (!isSafePreviewSlug(slug)) return notFound()

    // The home page previews at /preview itself. Drupal may send its alias or `/`.
    const destination = new URL(slug === "/" || slug === "/home" ? "/preview" : `/preview${slug}`, request.url)
    // Set the parameter rather than interpolating it so the secret is always escaped.
    destination.searchParams.set("secret", secret)
    return withPreviewHeaders(NextResponse.redirect(destination))
  }

  return withPreviewHeaders(NextResponse.next())
}

const withPreviewHeaders = (response: NextResponse) => {
  Object.entries(PREVIEW_HEADERS).forEach(([header, value]) => response.headers.set(header, value))
  return response
}

/**
 * Drupal sends the page to preview as a `slug` query parameter, which is pasted straight into the
 * redirect location. Accept only a plain, relative path: an authority (`//host`), a backslash (which
 * some browsers normalize to `/`), or a `..` segment would all walk the editor off `/preview` — and
 * carry the secret along in the query string. The decoded form is checked too, so a `%2e%2e` or
 * `%5c` cannot smuggle the same characters past these checks.
 */
const isSafePreviewSlug = (slug: string | null): slug is string => {
  if (!slug) return false

  let decoded: string
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // Malformed percent encoding.
    return false
  }

  return [slug, decoded].every(
    value =>
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes("\\") &&
      !value.includes("?") &&
      !value.includes("#") &&
      !value.split("/").includes("..")
  )
}

// Only the cache-clear page is behind Basic Auth; anything else the matcher sends here is refused.
const isAuthenticated = async (req: NextRequest) =>
  req.nextUrl.pathname.startsWith("/system/cache-clear") &&
  (await isCacheClearAuthorized(req.headers.get("authorization")))

// Configure "Matching Paths" below to protect routes with HTTP Basic Auth or the preview secret.
export const config = {
  matcher: ["/system/:path*", "/preview/:path*"],
}
