import { HtmlHTMLAttributes } from "react";
import {getConfigPage} from "@lib/gql/gql-queries";
import {
  StanfordBasicSiteSetting,
  ParagraphSumUserFavorite
} from "@lib/gql/__generated__/drupal.d";
import AlgoliaCourseList from "@components/patterns/algolia-course-list";
import FavoritesList from "@components/elements/favorites-list";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumUserFavorite
}

const UserFavoriteParagraph = async ({ paragraph, ...props }: Props) => {
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")

  if (!siteSettingsConfig?.suSiteAlgoliaId || !siteSettingsConfig.suSiteAlgoliaSearch || !siteSettingsConfig.suSiteAlgoliaIndex) {
    return;
  }

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-3">
        <FavoritesList isDisplayOnly />
      </div>
      <div className="col-span-9">
        <AlgoliaCourseList
          appId={siteSettingsConfig.suSiteAlgoliaId}
          searchIndex={siteSettingsConfig.suSiteAlgoliaIndex}
          searchApiKey={siteSettingsConfig.suSiteAlgoliaSearch}
        />
      </div>
    </div>
  )
}

export default UserFavoriteParagraph;