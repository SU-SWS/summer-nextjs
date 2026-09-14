import PageFooter from "@components/global/page-footer"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {PageProps} from "@lib/drupal/utils"

/**
 * Footer slot for every route. See the header slot for why the chrome is a parallel route.
 */
const FooterSlot = async (props: PageProps) => (
  <PageFooter minimal={await hasMinimalChrome((await props.params).slug)} />
)

export default FooterSlot
