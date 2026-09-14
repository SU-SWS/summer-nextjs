import PageFooter from "@components/global/page-footer"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {PageProps} from "@lib/drupal/utils"
import {Suspense} from "react"

export const instant = false

/**
 * Footer slot for preview urls. See the preview header slot for why the draft lookup streams.
 */
const PreviewFooterSlot = (props: PageProps) => (
  <Suspense fallback={null}>
    <PreviewFooter params={props.params} />
  </Suspense>
)

const PreviewFooter = async ({params}: {params: PageProps["params"]}) => (
  <PageFooter minimal={await hasMinimalChrome((await params).slug, true)} />
)

export default PreviewFooterSlot
