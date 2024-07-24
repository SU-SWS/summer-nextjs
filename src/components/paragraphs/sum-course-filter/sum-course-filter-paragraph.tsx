import {HtmlHTMLAttributes} from "react"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import CourseFilteringForm from "@components/paragraphs/sum-course-filter/course-filtering-form"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {}

const SumCourseFilterParagraph = async ({...props}: Props) => {
  const [appId, indexName, apiKey] = await getAlgoliaCredential()
  if (!appId || !indexName || !apiKey) return
  return (
    <div {...props} className={twMerge("centered", props.className)}>
      <CourseFilteringForm appId={appId} searchIndex={indexName} searchApiKey={apiKey} />
    </div>
  )
}
export default SumCourseFilterParagraph
