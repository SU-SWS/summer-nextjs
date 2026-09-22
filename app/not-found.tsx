import {H1} from "@components/elements/headers"
import SiteChrome from "@components/global/site-chrome"

/**
 * Renders its own chrome: a 404 replaces the matched segment - and therefore that segment's
 * layout - so the header and footer have to come from here.
 */
const NotFound = () => {
  return (
    <SiteChrome>
      <div className="centered mt-32">
        <title>Page not found | Summer Session</title>
        <H1>Page not found</H1>
        <p>Unable to find the page you were looking for.</p>
      </div>
    </SiteChrome>
  )
}
export default NotFound
