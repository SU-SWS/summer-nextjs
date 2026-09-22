import SiteChrome from "@components/global/site-chrome"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {ReactNode} from "react"

type Props = {
  children: ReactNode
  params: Promise<{slug?: string[]}>
}

/**
 * Chrome for every node url.
 *
 * The lookup resolves from the same cache entry the page itself populates, so awaiting it here
 * costs no extra request to Drupal.
 */
const Layout = async ({children, params}: Props) => (
  <SiteChrome minimal={await hasMinimalChrome((await params).slug)}>{children}</SiteChrome>
)

export default Layout
