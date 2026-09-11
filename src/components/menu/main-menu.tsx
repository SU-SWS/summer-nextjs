import {MenuAvailable, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import {getConfigPage, getMenu} from "@lib/gql/gql-queries"
import MainMenuClient from "@components/menu/main-menu.client"
import {Suspense} from "react"

const MainMenu = async () => {
  // The menu doesn't depend on the site settings, so don't make either wait on the other.
  const [menuItems, siteSettings] = await Promise.all([
    getMenu(MenuAvailable.Main, 3),
    getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting"),
  ])
  const primaryButton = siteSettings?.sumSiteHeaderPrim
  const secondaryButton = siteSettings?.sumSiteHeaderSec

  return (
    <Suspense>
      <MainMenuClient menuItems={menuItems} sumSiteHeaderPrim={primaryButton} sumSiteHeaderSec={secondaryButton} />
    </Suspense>
  )
}

export default MainMenu
