import algoliasearch from "algoliasearch/lite"
import {RelatedProducts} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import ImageCard from "@components/patterns/image-card"
import {H2, H3} from "@components/elements/headers"
import ActionLink from "@components/elements/action-link"
import {CourseHit} from "./results/summer-course/summer-course"
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal"
import {getConfigPage} from "@lib/gql/gql-queries"

type Props = {
  objectID: string
}

const RelatedCourseItem = ({item}: {item: CourseHit}) => {
  return (
    <ImageCard imageUrl={item.photo} imageAlt="" id={item.objectID}>
      <div className="flex flex-col">
        <H3 className="rs-mb-0 order-2">
          <ActionLink aria-labelledby={item.objectID} className="font-roboto font-normal" href={item.url}>
            {item.title}
          </ActionLink>
        </H3>
        <div className="rs-mb-0 order-1 font-normal">{item.sum_course_catalog_number}</div>
      </div>
    </ImageCard>
  )
}

const RelatedCourses = async ({objectID}: Props) => {
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  const appId = siteSettingsConfig?.suSiteAlgoliaId
  const searchIndex = siteSettingsConfig?.suSiteAlgoliaIndex
  const searchApiKey = siteSettingsConfig?.suSiteAlgoliaSearch

  if (!appId || !searchApiKey || !searchIndex) return

  const searchClient = algoliasearch(appId, searchApiKey)

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
    >
      <RelatedProducts
        objectIDs={[objectID]}
        itemComponent={RelatedCourseItem}
        limit={2}
        classNames={{
          root: "flex flex-col md:flex-row justify-between gap-10 items-center",
          list: "list-unstyled grid gap-10 grid-cols-1 md:grid-cols-2",
        }}
        queryParameters={{
          filters: "type:'Summer Courses'",
        }}
        headerComponent={() => (
          <ImageCard hasBgColor className="w-full p-0 text-center md:w-1/3 md:text-left lg:pt-0">
            <div className="flex flex-col">
              <H2 className="rs-mb-0 type-0 font-roboto font-normal uppercase">Related Courses</H2>
              <p className="rs-mb-0 type-2 font-normal">Explore more courses</p>
            </div>
          </ImageCard>
        )}
        emptyComponent={() => (
          <ImageCard hasBgColor className="w-full p-0 lg:pt-0">
            <div className="flex flex-col">
              <H2 className="rs-mb-0 type-0 font-roboto font-normal uppercase">Related Courses</H2>
              <p className="rs-mb-0 type-2 font-normal">
                We couldn&apos;t find any related courses at the moment. Please explore other courses or check back
                later for updates.
              </p>
            </div>
          </ImageCard>
        )}
      />
    </InstantSearchNext>
  )
}

export default RelatedCourses
