import NodePage from "@components/nodes/pages/node-page"
import {NodeUnion} from "@lib/gql/__generated__/graphql"
import {getAllNodes, getEntityFromPath} from "@lib/gql/gql-queries"
import {notFound, redirect} from "next/navigation"
import {getPathFromContext, PageProps, Slug} from "@lib/drupal/utils"

// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60
export const instant = false
export const ensureStatic = "navigation"

const Page = async (props: PageProps) => {
  const params = await props.params
  const path = getPathFromContext(params.slug || "")

  // Scanner probes (`/.env`, `/.git/config`, `/wp-login.php`) never match a Drupal alias. Most are answered by the
  // redirects in next.config.ts, but encoded variants can still reach this route. Rejecting them here skips the
  // Drupal query and the cache entry each new junk path would otherwise create. Extensions like `.html` are left
  // alone since migrated sites can keep legacy aliases that use them.
  if (SCANNER_PATH.test(path)) notFound()

  const {redirect: redirectPath, entity} = await getEntityFromPath<NodeUnion>(path)

  if (redirectPath) redirect(redirectPath)
  if (!entity) notFound()

  return <NodePage node={entity} isHome={path === "/"} />
}

// A path segment starting with a dot, or a server-side script, config or backup file extension.
const SCANNER_PATH = /(^|\/)\.|\.(php\d?|phtml|asp|aspx|jsp|cgi|env|ini|sql|bak|old|swp|ya?ml|log|config)$/i

export const generateStaticParams = async (): Promise<Array<Slug>> => {
  const pagesToBuild = parseInt(process.env.BUILD_PAGES || "0")
  if (pagesToBuild === 0) return [{slug: ["home"]}]
  const paths = (await getAllNodes()).map(node => node.path).filter(path => !!path) as Array<string>
  const nodePaths = paths.map(path => ({slug: path.split("/").filter(part => !!part)}))

  // If Drupal couldn't be reached, build the placeholder and let every page render on its first request.
  if (!nodePaths.length) return [{slug: ["home"]}]
  return pagesToBuild < 0 ? nodePaths : nodePaths.slice(0, pagesToBuild)
}

export default Page
