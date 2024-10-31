import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import Script from "next/script"
import {GoogleAnalytics, GoogleTagManager} from "@next/third-parties/google"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"

const UserAnalytics = async () => {
  if (isPreviewMode()) return

  const googleAnalytics = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["suGoogleAnalytics"]
  >("StanfordBasicSiteSetting", "suGoogleAnalytics")

  if (!googleAnalytics && !process.env.NEXT_PUBLIC_GTM) return
  return (
    <>
      <Script async src="//siteimproveanalytics.com/js/siteanalyze_80352.js" />
      {googleAnalytics && <GoogleAnalytics gaId={googleAnalytics} />}
      {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
    </>
  )
}
export default UserAnalytics
