import {HtmlHTMLAttributes} from "react";
import {getConfigPage} from "@lib/gql/gql-queries";
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal";
import CourseFilteringForm from "@components/paragraphs/sum-course-filter/course-filtering-form";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {}

const SumCourseFilterParagraph = async ({...props}: Props) => {
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")

  if (!siteSettingsConfig?.suSiteAlgoliaId || !siteSettingsConfig.suSiteAlgoliaSearch || !siteSettingsConfig.suSiteAlgoliaIndex) {
    return;
  }
  return (
    <div {...props}>
      <CourseFilteringForm
        appId={siteSettingsConfig.suSiteAlgoliaId}
        searchIndex={siteSettingsConfig.suSiteAlgoliaIndex}
        searchApiKey={siteSettingsConfig.suSiteAlgoliaSearch}
      />
    </div>
  )
}
export default SumCourseFilterParagraph