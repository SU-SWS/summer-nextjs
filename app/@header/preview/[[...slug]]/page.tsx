import PageHeader from "@components/global/page-header"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {PageProps} from "@lib/drupal/utils"
import {Suspense} from "react"

export const instant = false

/**
 * Header slot for preview urls.
 *
 * Reads the draft revision so an editor sees the header their unsaved flag produces. That lookup
 * is deliberately uncached, so it streams inside the Suspense boundary instead of turning the
 * whole preview route dynamic.
 */
const PreviewHeaderSlot = (props: PageProps) => (
  <Suspense fallback={null}>
    <PreviewHeader params={props.params} />
  </Suspense>
)

const PreviewHeader = async ({params}: {params: PageProps["params"]}) => (
  <PageHeader minimal={await hasMinimalChrome((await params).slug, true)} />
)

export default PreviewHeaderSlot
