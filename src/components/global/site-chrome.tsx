import PageHeader from "@components/global/page-header"
import PageFooter from "@components/global/page-footer"
import BackToTop from "@components/elements/back-to-top"
import {ToastMessage} from "@components/elements/toast-message"
import {ReactNode} from "react"

type Props = {
  children: ReactNode
  /**
   * The node's `sumMinimalHeadFoot` flag. Routes that never use the reduced chrome - search, the
   * gallery, the admin pages - omit it.
   */
  minimal?: boolean
}

/**
 * Header, main region, and footer shared by every route.
 *
 * This lives in each segment's layout rather than in the root layout because the reduced chrome
 * depends on the node behind the current url, and the root layout has no dynamic segment to read
 * it from.
 */
const SiteChrome = ({children, minimal}: Props) => (
  <>
    <PageHeader minimal={minimal} />

    <main id="main-content" className="flex-grow">
      {children}

      <ToastMessage />
      <BackToTop />
    </main>

    <PageFooter minimal={minimal} />
  </>
)

export default SiteChrome
