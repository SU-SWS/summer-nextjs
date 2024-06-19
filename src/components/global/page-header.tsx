import MainMenu from "@components/menu/main-menu"
import GlobalMessage from "@components/config-pages/global-message"
import Lockup from "@components/elements/lockup/lockup"
import {getConfigPage, getMenu} from "@lib/gql/gql-queries"
import {LockupSetting, MenuAvailable, StanfordBasicSiteSetting, StanfordGlobalMessage} from "@lib/gql/__generated__/drupal.d"
import Button from "@components/elements/button"

const PageHeader = async () => {
  const menuItems = await getMenu(MenuAvailable.Main)
  const globalMessageConfig = await getConfigPage<StanfordGlobalMessage>("StanfordGlobalMessage")
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  const lockupSettingsConfig = await getConfigPage<LockupSetting>("LockupSetting")

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
      {globalMessageConfig && <GlobalMessage {...globalMessageConfig} />}
      <div className="relative bg-fog-light">
        <div className="w-full border-b-2 lg:border-b-0">
          <div className="min-h-50 rs-py-2 centered pr-24 lg:pr-0">
            <div className="flex w-full justify-between">
              <Lockup
                {...siteSettingsConfig}
                {...lockupSettingsConfig}
              />
              <div className="hidden lg:block">
                {siteSettingsConfig && siteSettingsConfig.sumSiteHeaderPrim && (
                  <Button
                    href={siteSettingsConfig.sumSiteHeaderPrim.url}
                    secondary
                  >
                    {siteSettingsConfig.sumSiteHeaderPrim.title}
                  </Button>
                )}
                {siteSettingsConfig && siteSettingsConfig.sumSiteHeaderSec && <Button href={siteSettingsConfig.sumSiteHeaderSec.url}>{siteSettingsConfig.sumSiteHeaderSec.title}</Button>}
              </div>
            </div>
          </div>
        </div>
        <MainMenu
          menuItems={menuItems}
          sumSiteHeaderPrim={siteSettingsConfig?.sumSiteHeaderPrim}
          sumSiteHeaderSec={siteSettingsConfig?.sumSiteHeaderSec}
        />
      </div>
    </header>
  )
}
export default PageHeader
