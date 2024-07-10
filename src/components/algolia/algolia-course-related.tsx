import {useEffect, useMemo, useState} from "react"
import algoliasearch from "algoliasearch/lite"
import {Configure, RelatedProducts, RelatedItem} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"

type Props = {
  objectID: string
  appId: string
  searchIndex: string
  searchApiKey: string
}

const RelatedCourseItem: React.FC<{item: RelatedItem}> = ({item}) => (
  <div className="course-card">
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <a href={item.url}>Learn more</a>
  </div>
)

const RelatedCourses: React.FC<Props> = ({objectID, appId, searchIndex, searchApiKey}) => {
  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])

  console.log("searchIndex", searchIndex)

  console.log("course id", objectID)

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
    >
      {/* <Configure
        filters={`objectID:${objectID}`}
        attributesToHighlight={["html"]}
        attributesToSnippet={["html"]}
      /> */}
      {/* Related Courses Card here */}
      {/* <RelatedProducts
        objectIDs={[objectID]}
        itemComponent={RelatedCourseItem}
        limit={2}
      /> */}
    </InstantSearchNext>
  )
}

export default RelatedCourses
