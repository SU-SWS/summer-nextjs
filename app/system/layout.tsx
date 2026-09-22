import SiteChrome from "@components/global/site-chrome"
import {ReactNode} from "react"

/** Chrome for the administrative pages behind basic auth. */
const Layout = ({children}: {children: ReactNode}) => <SiteChrome>{children}</SiteChrome>

export default Layout
