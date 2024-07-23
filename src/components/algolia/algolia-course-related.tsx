import {unstable_cache as nextCache} from "next/cache"
import {CourseHit} from "@components/algolia/results/summer-course/summer-course"
import ImageCard from "@components/patterns/image-card"
import {H2, H3} from "@components/elements/headers"
import ActionLink from "@components/elements/action-link"
import type {RecommendResults} from "algoliasearch-helper"

const getRelatedContent = nextCache(
  async (objectID: string): Promise<CourseHit[]> => {
    const appID = process.env.ALGOLIA_ID
    const indexName = process.env.ALGOLIA_INDEX
    const apiKey = process.env.ALGOLIA_KEY
    if (!appID || !indexName || !apiKey) return []

    const options: RequestInit = {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Algolia-Application-Id": appID,
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

    const recommendations: {results: RecommendResults<CourseHit>["_rawResults"]} = await fetch(
      `https://${appID}-dsn.algolia.net/1/indexes/*/recommendations`,
      options
    ).then(res => res.json())

    const hits = recommendations?.results?.[0].hits || []
    hits.map(hit => {
      delete hit._highlightResult
      delete hit._snippetResult
    })
    return hits
  },
  ["related-courses"],
  {revalidate: 2592000, tags: ["related-courses"]}
)

const RelatedCourses = async ({objectId}: {objectId: string}) => {
  const recommendations = await getRelatedContent(objectId)
  if (recommendations.length === 0) return
  return (
    <section
      aria-labelledby={`${objectId}-related`}
      className="flex flex-col items-center justify-between gap-10 md:flex-row"
    >
      <ImageCard hasBgColor className="w-full p-0 text-center md:w-1/3 md:text-left lg:pt-0">
        <H2 id={`${objectId}-related`} className="rs-mb-0 type-0 font-roboto font-normal uppercase">
          Related Courses
        </H2>
        <p className="rs-mb-0 type-2 font-normal">Explore more courses</p>
      </ImageCard>

      <ul className="list-unstyled grid grid-cols-1 gap-10 md:grid-cols-2">
        {recommendations.map(rec => (
          <RelatedCourseItem key={rec.objectID} item={rec} />
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
        <H3 className="rs-mb-0 order-2">
          <ActionLink
            aria-labelledby={item.objectID}
            className="font-roboto font-normal"
            href={item.url.replace(url.origin, "")}
          >
            {item.title}
          </ActionLink>
        </H3>
        <div className="rs-mb-0 order-1 font-normal">{item.sum_course_catalog_number}</div>
      </div>
    </ImageCard>
  )
}

export default RelatedCourses
