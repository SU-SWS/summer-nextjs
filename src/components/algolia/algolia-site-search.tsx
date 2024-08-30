"use client"

import {liteClient} from "algoliasearch/lite"
import {useHits, useSearchBox, usePagination} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import {HTMLAttributes, useEffect, useLayoutEffect, useMemo, useRef} from "react"
import Button from "@components/elements/button"
import {useRouter, useSearchParams} from "next/navigation"
import {Hit as HitType} from "instantsearch.js"
import {IndexUiState} from "instantsearch.js/es/types/ui-state"
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import DefaultResult, {AlgoliaHit} from "@components/algolia/results/default"
import {H2} from "@components/elements/headers"
import {useBoolean} from "usehooks-ts"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
  initialUiState?: IndexUiState
}

const AlgoliaSiteSearch = ({appId, searchIndex, searchApiKey, initialUiState = {}}: Props) => {
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])

  return (
    <div>
      <InstantSearchNext
        indexName={searchIndex}
        searchClient={searchClient}
        initialUiState={{[searchIndex]: initialUiState}}
        future={{preserveSharedStateOnUnmount: true}}
      >
        <SearchForm />
      </InstantSearchNext>
    </div>
  )
}

const SearchForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)
  const {query, refine} = useSearchBox({})

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")

    // Keyword search.
    if (query) params.set("q", query)
    router.replace(`?${params.toString()}`, {scroll: false})
  }, [router, searchParams, query])

  return (
    <div>
      <form role="search" aria-labelledby="page-title" onSubmit={e => e.preventDefault()}>
        <div className="mx-auto mb-20 flex max-w-6xl items-center gap-5">
          <label className="sr-only" htmlFor="search-input">
            Keywords Search
          </label>
          <input
            id="search-input"
            className="type-3 flex-grow border-0 border-b border-black-30"
            ref={inputRef}
            autoComplete="on"
            spellCheck={false}
            maxLength={60}
            type="textfield"
            placeholder="Search"
            defaultValue={query}
          />

          <button type="submit" className="group" onClick={() => refine(inputRef.current?.value || "")}>
            <span className="sr-only">Submit Search</span>
            <MagnifyingGlassIcon
              width={40}
              className="group-hocus:outline-3 block rounded-full border-2 border-white bg-cardinal-red p-3 text-white group-hocus:outline group-hocus:outline-cardinal-red"
            />
          </button>

          <Button
            className="my-16"
            centered
            buttonElem
            onClick={() => {
              refine("")
              if (inputRef.current) inputRef.current.value = ""
            }}
          >
            Reset
          </Button>
        </div>
      </form>
      <HitList />
    </div>
  )
}

const HitList = () => {
  const {items: hits} = useHits<AlgoliaHit>({})
  const {currentRefinement: currentPage, pages, nbPages, nbHits, refine: goToPage} = usePagination({padding: 2})

  if (hits.length === 0) {
    return <p>No results for your search. Please try another search.</p>
  }

  return (
    <div>
      <H2 className="rs-ml-1 big-paragraph font-normal" aria-live="polite" aria-atomic>
        {nbHits} {nbHits > 1 ? "Results" : "Result"}
      </H2>

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
      <DefaultResult hit={hit} />
    </li>
  )
}

export default AlgoliaSiteSearch
