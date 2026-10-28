"use client"

import {liteClient} from "algoliasearch/lite"
import {useHits, useSearchBox, usePagination, InstantSearch} from "react-instantsearch"
import {history} from "instantsearch.js/es/lib/routers"
import {HTMLAttributes, useLayoutEffect, useMemo, useRef} from "react"
import Button from "@components/elements/button"
import {Hit as HitType} from "instantsearch.js"
import {IndexUiState, UiState} from "instantsearch.js/es/types/ui-state"
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import DefaultResult, {AlgoliaHit} from "@components/algolia/results/default"
import {H2} from "@components/elements/headers"
import {useBoolean} from "usehooks-ts"
import AlgoliaPager from "@components/algolia/algolia-pager"
import type {SendEventForHits} from "instantsearch.js/es/lib/utils"
import useRevealKey from "@lib/hooks/useRevealKey"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
  initialUiState?: IndexUiState
}

type RouteState = Record<string, string | string[] | undefined>

const AlgoliaSiteSearch = (props: Props) => {
  // Remount with a fresh InstantSearch instance and router each time the cached route is revealed again.
  const revealKey = useRevealKey()
  return <SiteSearch key={revealKey} {...props} />
}

const SiteSearch = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])

  const routing = useMemo(
    () => ({
      router: history<RouteState>({cleanUrlOnDispose: false}),
      stateMapping: {
        stateToRoute(uiState: UiState): RouteState {
          const indexUiState = uiState[searchIndex] ?? {}
          return indexUiState.query ? {q: indexUiState.query} : {}
        },
        routeToState(routeState: RouteState) {
          return {
            [searchIndex]: {query: typeof routeState.q === "string" ? routeState.q : undefined},
          }
        },
      },
    }),
    [searchIndex]
  )

  return (
    // Plain InstantSearch, rather than InstantSearchNext, so that searching only happens in the browser.
    <InstantSearch
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
      // Click and conversion events only count on production, so previews and local builds don't skew the stats.
      insights={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
      routing={routing}
    >
      <SearchForm />
    </InstantSearch>
  )
}

const SearchForm = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {query, refine} = useSearchBox({})

  return (
    <div>
      <form role="search" aria-labelledby="page-title" onSubmit={e => e.preventDefault()}>
        <div className="mx-auto mb-50 flex max-w-6xl items-center gap-12.5">
          <label className="sr-only" htmlFor="search-input">
            Keywords Search
          </label>
          <input
            id="search-input"
            className="grow border-0 border-b border-black-30 px-20 py-12.5 type-3"
            ref={inputRef}
            autoComplete="on"
            spellCheck={false}
            maxLength={60}
            type="text"
            placeholder="Search"
            defaultValue={query}
          />

          <Button className="rounded-full p-7.5" type="submit" onClick={() => refine(inputRef.current?.value || "")}>
            <span className="sr-only">Submit Search</span>
            <MagnifyingGlassIcon width={30} className="block text-white" />
          </Button>

          <Button
            secondary
            className="my-40"
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
  const {items: hits, results, sendEvent} = useHits<AlgoliaHit>({})
  const {currentRefinement: currentPage, nbHits} = usePagination({padding: 2})
  // Placeholder results are provided until the first search response arrives.
  const hasSearched = !!results && !results.__isArtificial

  return (
    <div>
      <H2 className="rs-ml-1 big-paragraph! font-normal" aria-live="polite" aria-atomic>
        {hasSearched && hits.length === 0 && "No results for your search. Please try another search."}
        {hits.length > 0 && `${nbHits} ${nbHits > 1 ? "Results" : "Result"}`}
      </H2>

      {hits.length > 0 && (
        <ul className="list-unstyled">
          {hits.map((hit, position) => (
            <HitItem
              key={hit.objectID}
              focusOnItem={position === 0 && currentPage > 0}
              className="border-b border-gray-300 last:border-0"
              hit={hit}
              sendEvent={sendEvent}
            />
          ))}
        </ul>
      )}
      <AlgoliaPager />
    </div>
  )
}

const HitItem = ({
  focusOnItem,
  hit,
  sendEvent,
  ...props
}: HTMLAttributes<HTMLLIElement> & {focusOnItem?: boolean; hit: HitType<AlgoliaHit>; sendEvent: SendEventForHits}) => {
  const ref = useRef<HTMLLIElement>(null)
  const {value: focus, setFalse: disableFocus} = useBoolean(focusOnItem)

  useLayoutEffect(() => {
    if (focus) {
      const reduceMotion = !!window.matchMedia("(prefers-reduced-motion: reduce)")?.matches
      ref.current?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "end",
        inline: "nearest",
      })
      ref.current?.focus({preventScroll: true})
    }
  }, [focus])

  return (
    <li
      {...props}
      onClick={() => sendEvent("click", hit, "Hit Clicked")}
      onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
      tabIndex={focus ? 0 : undefined}
      ref={focus ? ref : undefined}
      onBlur={disableFocus}
    >
      <DefaultResult hit={hit} />
    </li>
  )
}

export default AlgoliaSiteSearch
