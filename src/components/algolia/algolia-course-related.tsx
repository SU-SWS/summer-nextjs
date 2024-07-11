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
}

type RelatedCourseItemProps = {
  sum_course_catalog_number?: string
  sum_course_class_number?: string
  title?: string
  photo?: string
  url?: string
}

const RelatedCourseItem = ({item}: {item: RelatedCourseItemProps}) => {
  return (
    <ImageCard
      imageUrl={item.photo}
      imageAlt=""
    >
      <div className="flex flex-col">
        <H3 className="rs-mb-0 order-2 max-w-[900px] font-roboto font-normal">{item.title}</H3>
        <div className="rs-mb-0 order-1 font-normal">{item.sum_course_catalog_number}</div>
        {item.url && (
          <ActionLink
            className="order-3 font-roboto text-18 font-medium no-underline hocus:underline"
            href={item.url}
          >
            Learn more
          </ActionLink>
        )}
      </div>
    </ImageCard>
  )
}

const RelatedCourses = ({objectID, appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])

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
          <ImageCard
            hasBgColor
            className="w-full p-0 md:w-1/3 lg:pt-0"
          >
            <div className="flex flex-col">
              <H3 className="rs-mb-0 order-2 max-w-[900px] font-roboto font-normal">Explore more courses</H3>
              <div className="rs-mb-0 order-1 font-normal uppercase">Related Courses</div>
            </div>
          </ImageCard>
        )}
      />
    </InstantSearchNext>
  )
}

export default RelatedCourses
