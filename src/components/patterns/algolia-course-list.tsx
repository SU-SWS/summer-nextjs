"use client";

import algoliasearch from "algoliasearch/lite";
import {useHits,usePagination, Configure} from "react-instantsearch";
import {InstantSearchNext} from "react-instantsearch-nextjs";
import {useMemo} from "react";
import {Hit as HitType} from "instantsearch.js";
import SummerCourse from "@components/algolia-results/summer-course/summer-course";
import useFavorites from "@lib/hooks/useFavorites";
import { useSearchParams } from "next/navigation";
import { AlgoliaHit } from "@components/algolia-results/default";

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

type FavoriteItem = {
  uuid: string;
  title: string;
  path?: string; 
  units: number;
}

const AlgoliaCourseList = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])
  const {favs} = useFavorites()
  const searchParams = useSearchParams();

  const itemUuids = searchParams.get("favs")?.split(",") || favs.map(item => item.uuid)

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
            <SummerCourse hit={hit as HitType<AlgoliaHit>} />
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
