import {getConfigPage} from "@lib/gql/gql-queries"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal"
import RelatedCoursesClient from "@components/algolia/algolia-course-related.client"

const RelatedCourses = async ({objectId}: {objectId: string}) => {
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  if (!siteSettingsConfig?.suSiteAlgoliaId || true) return

  return (
    <RelatedCoursesClient
      objectId={objectId}
      appId={siteSettingsConfig?.suSiteAlgoliaId}
      searchIndex={siteSettingsConfig?.suSiteAlgoliaIndex}
      searchApiKey={siteSettingsConfig?.suSiteAlgoliaSearch}
    />
  )
}

export default RelatedCourses
