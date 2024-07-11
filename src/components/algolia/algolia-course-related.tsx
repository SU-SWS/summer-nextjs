"use client"

import { useMemo } from "react"
import algoliasearch from "algoliasearch/lite"
import {RelatedProducts} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"

type Props = {
  objectID: string
  appId: string
  searchIndex: string
  searchApiKey: string
}

const RelatedCourseItem = ({item}) => (
  <div className="course-card">
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <a href={item.url}>Learn more</a>
  </div>
)

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
      />
    </InstantSearchNext>
  )
}

export default RelatedCourses
