import {CourseHit} from "@components/algolia/results/summer-course/summer-course"
import ImageCard from "@components/patterns/image-card"
import {H2, H3} from "@components/elements/headers"
import ActionLink from "@components/elements/action-link"
import {cacheFailure, getAlgoliaCredential} from "@lib/gql/gql-queries"
import {RecommendHit} from "algoliasearch/lite"
import {cacheTag} from "next/cache"

const getRelatedContent = async (objectID: string): Promise<CourseHit[]> => {
  "use cache: remote"
  cacheTag("related-courses", `related-courses:${objectID}`)

  const [appId, indexName, apiKey, useRelatedContent] = await getAlgoliaCredential()

  if (!appId || !indexName || !apiKey || !useRelatedContent) return []

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Algolia-Application-Id": appId,
      "X-Algolia-API-Key": apiKey,
    },
    body: JSON.stringify({
      requests: [
        {
          indexName: indexName,
          model: "related-products",
          maxRecommendations: 2,
          threshold: 0,
          objectID,
          queryParameters: {
            filters: "type:'Summer Courses'",
          },
        },
      ],
    }),
  }

  let recommendations: {results?: RecommendHit[]}
  try {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/*/recommendations`, options)
    if (!response.ok) throw new Error(`Algolia responded ${response.status} ${response.statusText}`)
    recommendations = await response.json()
  } catch (e) {
    // The course page still renders, just without related courses.
    cacheFailure(`Unable to fetch related courses for ${objectID}`, e)
    return []
  }

  const hits = (recommendations.results?.[0]?.hits as CourseHit[]) || []
  hits.map(hit => {
    delete hit._highlightResult
    delete hit._snippetResult
  })
  return hits
}

const RelatedCourses = async ({objectId}: {objectId: string}) => {
  const recommendations = process.env.ALGOLIA_RECOMMENDATIONS === "true" ? await getRelatedContent(objectId) : []
  if (recommendations.length === 0) return
  return (
    <section
      aria-labelledby={`${objectId}-related`}
      className="flex flex-col items-center justify-between gap-25 md:flex-row"
    >
      <ImageCard hasBgColor className="w-full p-0 text-center md:w-1/3 md:text-left lg:pt-0">
        <H2 id={`${objectId}-related`} className="rs-mb-0 font-roboto type-0 font-normal uppercase">
          Related Courses
        </H2>
        <p className="rs-mb-0 type-2 font-normal">Explore more courses</p>
      </ImageCard>

      <ul className="list-unstyled grid grid-cols-1 gap-25 md:grid-cols-2">
        {recommendations.map(rec => (
          <li key={rec.objectID}>
            <RelatedCourseItem item={rec} />
          </li>
        ))}
      </ul>
    </section>
  )
}

const RelatedCourseItem = ({item}: {item: CourseHit}) => {
  const url = new URL(item.url)
  return (
    <ImageCard imageUrl={item.photo} imageAlt="" id={item.objectID}>
      <div className="flex flex-col">
        <H3 className="order-2 rs-mb-0">
          <ActionLink
            aria-labelledby={item.objectID}
            className="font-roboto font-normal"
            href={item.url.replace(url.origin, "")}
          >
            {item.title}
          </ActionLink>
        </H3>
        <div className="order-1 rs-mb-0 font-normal">{item.sum_course_catalog_number}</div>
      </div>
    </ImageCard>
  )
}

export default RelatedCourses
