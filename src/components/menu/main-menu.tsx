import {MenuAvailable, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import {getConfigPageField, getMenu} from "@lib/gql/gql-queries"
import MainMenuClient from "@components/menu/main-menu.client"
import {Suspense} from "react"

const MainMenu = async () => {
  const menuItems = await getMenu(MenuAvailable.Main, 3)

  const primaryButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["sumSiteHeaderPrim"]
  >("StanfordBasicSiteSetting", "sumSiteHeaderPrim")

  const secondaryButton = await getConfigPageField<
    StanfordBasicSiteSetting,
    StanfordBasicSiteSetting["sumSiteHeaderSec"]
  >("StanfordBasicSiteSetting", "sumSiteHeaderSec")
  return (
    <Suspense>
      <MainMenuClient menuItems={menuItems} sumSiteHeaderPrim={primaryButton} sumSiteHeaderSec={secondaryButton} />
    </Suspense>
  )
}

export default MainMenu
