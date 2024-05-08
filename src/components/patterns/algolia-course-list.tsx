"use client";

import algoliasearch from "algoliasearch/lite";
import {useHits,usePagination, Configure} from "react-instantsearch";
import {InstantSearchNext} from "react-instantsearch-nextjs";
import {useMemo} from "react";
import {Hit as HitType} from "instantsearch.js";
import SummerCourse from "@components/algolia-results/summer-course/summer-course";

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
  itemUuids: string[]
}

const AlgoliaCourseList = ({appId, searchIndex, searchApiKey, itemUuids}: Props) => {
  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])
  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
    >
      <Configure
        filters={itemUuids.map(uuid => `objectID:'${uuid}'`).join(" OR ")}
        attributesToHighlight={["html"]}
        attributesToSnippet={["html"]}
      />
      <HitList/>
    </InstantSearchNext>
  )
}

const HitList = () => {
  const { hits } = useHits<HitType>({});
  const {currentRefinement: currentPage, pages, nbPages, refine: goToPage} = usePagination({padding: 2})

  if (hits.length === 0) {
    return (
      <p>No favorites at this time.</p>
    )
  }

  return (
    <div>
      <ul className="list-unstyled">
        {hits.map(hit =>
          <li key={hit.objectID}>
            <SummerCourse hit={hit} />
          </li>
        )}
      </ul>

      {pages.length > 1 &&
        <nav aria-label="Search results pager">
          <ul className="list-unstyled flex justify-between">
            {pages[0] > 0 &&
              <li>
                <button onClick={() => goToPage(0)}>
                  First
                </button>
              </li>
            }

            {pages.map(pageNum =>
              <li key={`page-${pageNum}`} aria-current={currentPage === pageNum}>
                <button onClick={() => goToPage(pageNum)}>
                  {pageNum + 1}
                </button>
              </li>
            )}

            {pages[pages.length - 1] !== nbPages &&
              <li>
                <button onClick={() => goToPage(nbPages - 1)}>
                  Last
                </button>
              </li>
            }
          </ul>
        </nav>
      }
    </div>
  )
}

export default AlgoliaCourseList;
