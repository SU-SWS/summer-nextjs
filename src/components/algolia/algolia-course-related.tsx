"use client"

import {useMemo} from "react"
import algoliasearch from "algoliasearch/lite"
import {RelatedProducts} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import ImageCard from "@components/patterns/image-card"
import {H3} from "@components/elements/headers"
import ActionLink from "@components/elements/action-link"

type Props = {
  objectID: string
  appId: string
  searchIndex: string
  searchApiKey: string
  relatedTopic?: string
}

type RelatedCourseItemProps = {
  sum_course_catalog_number?: string
  sum_course_class_number?: string
  title?: string
  photo?: string
  url?: string
}

const RelatedCourseItem = ({item}: {item: RelatedCourseItemProps}) => (
  <ImageCard
    imageUrl={item.photo}
    imageAlt=""
    className="space-y-16 @container"
  >
    <div className="flex flex-col">
      <H3 className="rs-mb-0 order-2 max-w-[900px] text-center font-roboto font-normal">{item.title}</H3>
      <div className="order-1 font-normal">{item.sum_course_catalog_number}</div>
      {item.url && (
        <ActionLink
          className="order-3"
          href={item.url}
        >
          Learn more
        </ActionLink>
      )}
    </div>
  </ImageCard>
)

const RelatedCourses = ({objectID, appId, searchIndex, searchApiKey, relatedTopic}: Props) => {
  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
    >
      <div className="gutters grid gap-10 @9xl:grid-cols-3 md:gap-20">
        <ImageCard
          hasBgColor
          className="space-y-16 @container"
        >
          <div className="flex flex-col">
            <H3 className="rs-mb-0 order-2 max-w-[900px] text-center font-roboto font-normal">Explore more courses {relatedTopic}</H3>
            <div className="order-1 font-normal uppercase">Related Courses</div>
          </div>
        </ImageCard>
        <RelatedProducts
          objectIDs={[objectID]}
          itemComponent={RelatedCourseItem}
          limit={2}
        />
      </div>
    </InstantSearchNext>
  )
}

export default RelatedCourses
