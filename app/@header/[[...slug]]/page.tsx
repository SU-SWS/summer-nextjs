import PageHeader from "@components/global/page-header"
import {hasMinimalChrome} from "@lib/drupal/chrome"
import {PageProps} from "@lib/drupal/utils"

/**
 * Header slot for every route.
 *
 * The header lives in a parallel route so that it can read the node behind the current url: the
 * root layout has no dynamic segment of its own and therefore never sees the path.
 */
const HeaderSlot = async (props: PageProps) => (
  <PageHeader minimal={await hasMinimalChrome((await props.params).slug)} />
)

export default HeaderSlot
