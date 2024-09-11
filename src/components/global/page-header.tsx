import MainMenu from "@components/menu/main-menu"
import Lockup from "@components/elements/lockup/lockup"
import {getConfigPageField} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import Button from "@components/elements/button"
import GlobalMessage from "@components/config-pages/global-message"

const PageHeader = async () => {
  const primaryButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["sumSiteHeaderPrim"]
  >("StanfordBasicSiteSetting", "sumSiteHeaderPrim")

  const secondaryButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["sumSiteHeaderSec"]
  >("StanfordBasicSiteSetting", "sumSiteHeaderSec")

  return (
    <header className="shadow-lg">
      <div className="bg-cardinal-red">
        <div className="centered py-3">
          <a
            className="font-stanford text-20 font-regular leading-none text-white no-underline hocus:text-white hocus:underline"
            href="https://www.stanford.edu"
          >
            Stanford University
          </a>
        </div>
      </div>
      <div className="border-4 border-white">
        <GlobalMessage />
        <div className="relative bg-fog-light">
          <div className="w-full border-b-2 lg:border-b-0">
            <div className="min-h-50 rs-py-2 centered pr-24 lg:pr-0">
              <div className="flex w-full justify-between">
                <Lockup />
                <div className="hidden lg:block">
                  {primaryButton?.url && (
                    <Button href={primaryButton.url} secondary>
                      {primaryButton.title}
                    </Button>
                  )}
                  {secondaryButton?.url && <Button href={secondaryButton.url}>{secondaryButton.title}</Button>}
                </div>
              </div>
            </div>
          </div>
          <MainMenu />
        </div>
      </div>
    </header>
  )
}
export default PageHeader
