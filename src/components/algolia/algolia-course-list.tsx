"use client"

import {liteClient} from "algoliasearch/lite"
import {useHits, usePagination, Configure} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import {HTMLAttributes, useLayoutEffect, useMemo, useRef} from "react"
import {Hit as HitType} from "instantsearch.js"
import SummerCourse from "@components/algolia/results/summer-course/summer-course"
import useFavorites from "@lib/hooks/useFavorites"
import {useSearchParams} from "next/navigation"
import {AlgoliaHit} from "@components/algolia/results/default"
import {useBoolean} from "usehooks-ts"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const AlgoliaCourseList = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])
  const {favs} = useFavorites()
  const searchParams = useSearchParams()

  const itemUuids = searchParams.get("favs")?.split(",") || favs.map(item => item.uuid)
  const filters = itemUuids.map(uuid => `objectID:'${uuid}'`).join(" OR ") || "type:'Summer Courses'"

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
    >
      <Configure filters={filters} attributesToHighlight={["html"]} attributesToSnippet={["html"]} />
      <HitList />
    </InstantSearchNext>
  )
}

const HitList = () => {
  const {items: hits} = useHits<AlgoliaHit>({})
  const {currentRefinement: currentPage, pages, nbPages, refine: goToPage} = usePagination({padding: 2})

  if (hits.length === 0) {
    return <p>No favorites at this time.</p>
  }

  return (
    <div>
      <ul className="list-unstyled">
        {hits.map((hit, position) => (
          <HitItem
            key={hit.objectID}
            focusOnItem={position === 0 && currentPage > 0}
            className="border-b border-gray-300 last:border-0"
            hit={hit}
          />
        ))}
      </ul>

      {pages.length > 1 && (
        <nav aria-label="Search results pager">
          <ul className="list-unstyled flex justify-between">
            {pages[0] > 0 && (
              <li>
                <button onClick={() => goToPage(0)}>First</button>
              </li>
            )}

            {pages.map(pageNum => (
              <li key={`page-${pageNum}`} aria-current={currentPage === pageNum}>
                <button onClick={() => goToPage(pageNum)}>{pageNum + 1}</button>
              </li>
            ))}

            {pages[pages.length - 1] !== nbPages && (
              <li>
                <button onClick={() => goToPage(nbPages - 1)}>Last</button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  )
}

const HitItem = ({
  focusOnItem,
  hit,
  ...props
}: HTMLAttributes<HTMLLIElement> & {focusOnItem?: boolean; hit: HitType<AlgoliaHit>}) => {
  const ref = useRef<HTMLLIElement>(null)
  const {value: focus, setFalse: disableFocus} = useBoolean(focusOnItem)

  useLayoutEffect(() => {
    if (focus) {
      const reduceMotion = !!window.matchMedia("(prefers-reduced-motion: reduce)")?.matches
      ref.current?.scrollIntoView({behavior: reduceMotion ? "instant" : "smooth", block: "end", inline: "nearest"})
      ref.current?.focus({preventScroll: true})
    }
  }, [focus])

  return (
    <li {...props} tabIndex={focus ? 0 : undefined} ref={focus ? ref : undefined} onBlur={disableFocus}>
      <SummerCourse hit={hit} />
    </li>
  )
}

export default AlgoliaCourseList
