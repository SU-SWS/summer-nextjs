import Editori11y from "@components/tools/editorially"
import SiteChrome from "@components/global/site-chrome"
import UnpublishedBanner from "@components/elements/unpublished-banner"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {ReactNode} from "react"

type Props = {
  children: ReactNode
  params: Promise<{slug?: string[]}>
}

/**
 * Chrome for preview urls.
 *
 * Reads the draft revision so an editor sees the header their unsaved flag produces. That lookup
 * is uncached and is awaited here rather than streamed: preview has to reach Drupal on every
 * request anyway, and blocking keeps the route's shell out of the partial prerender resume path
 * that the parallel chrome slots used to break.
 */
const Layout = async ({children, params}: Props) => (
  <SiteChrome minimal={await hasMinimalChrome((await params).slug, true)}>
    <Editori11y />
    <UnpublishedBanner status={false} message="Preview Mode" />

    {children}
  </SiteChrome>
)

export default Layout
