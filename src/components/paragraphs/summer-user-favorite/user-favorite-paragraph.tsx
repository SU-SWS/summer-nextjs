import { HtmlHTMLAttributes} from "react";
import {getConfigPage} from "@lib/gql/gql-queries";
import {
  StanfordBasicSiteSetting,
  ParagraphSumUserFavorite
} from "@lib/gql/__generated__/drupal.d";
import AlgoliaCourseList from "@components/patterns/algolia-course-list";
import useFavorites from "@lib/hooks/useFavorites";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumUserFavorite
}

const UserFavoriteParagraph = async ({ paragraph, ...props }: Props) => {
  const { favs } = useFavorites();
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")

  if (!siteSettingsConfig?.suSiteAlgoliaId || !siteSettingsConfig.suSiteAlgoliaSearch || !siteSettingsConfig.suSiteAlgoliaIndex) {
    return;
  }

  return (
    <div>
      <div>
        {/* Favorites List */}
      </div>
      <AlgoliaCourseList
        appId={siteSettingsConfig.suSiteAlgoliaId}
        searchIndex={siteSettingsConfig.suSiteAlgoliaIndex}
        searchApiKey={siteSettingsConfig.suSiteAlgoliaSearch}
        itemUuids={favs}
        // itemUuids={["eb0fe1c4-e98d-4fda-8962-4faa627340e0", "e66bd9be-a47b-4df7-804f-b173839e12aa", "e2979287-eef5-46a6-bb1e-e15e4c0e8280"]}
      />
    </div>
  )
}

export default UserFavoriteParagraph;