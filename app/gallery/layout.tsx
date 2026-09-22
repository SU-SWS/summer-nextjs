import SiteChrome from "@components/global/site-chrome"
import {ReactNode} from "react"

/**
 * Chrome for the standalone gallery pages. The intercepted modal at `app/@modal/(.)gallery`
 * renders in the modal slot instead and deliberately has no chrome.
 */
const Layout = ({children}: {children: ReactNode}) => <SiteChrome>{children}</SiteChrome>

export default Layout
