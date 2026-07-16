import {HtmlHTMLAttributes, Suspense} from "react"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import CourseFilteringForm from "@components/paragraphs/sum-course-filter/course-filtering-form"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {}

const SumCourseFilterParagraph = async ({...props}: Props) => {
  const [appId, indexName, apiKey] = await getAlgoliaCredential()
  if (!appId || !indexName || !apiKey) return
  return (
    <div {...props} className={cn("centered", props.className)}>
      <Suspense>
        <CourseFilteringForm appId={appId} searchIndex={indexName} searchApiKey={apiKey} />
      </Suspense>
    </div>
  )
}
export default SumCourseFilterParagraph
