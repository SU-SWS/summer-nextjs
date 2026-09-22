import SiteChrome from "@components/global/site-chrome"
import {ReactNode} from "react"

/** Site search always keeps the full chrome; there is no node to read a flag from. */
const Layout = ({children}: {children: ReactNode}) => <SiteChrome>{children}</SiteChrome>

export default Layout
