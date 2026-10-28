"use client"

import {liteClient} from "algoliasearch/lite"
import {
  useSearchBox,
  useRefinementList,
  useClearRefinements,
  useInfiniteHits,
  Configure,
  InstantSearch,
} from "react-instantsearch"
import {history} from "instantsearch.js/es/lib/routers"
import {H2, H3} from "@components/elements/headers"
import {useEffect, useId, useLayoutEffect, useMemo, useRef} from "react"
import Button from "@components/elements/button"
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import useAccordion from "@lib/hooks/useAccordion"
import SummerCourse from "@components/algolia/results/summer-course/summer-course"
import FavoritesList from "@components/elements/favorites-list"
import {AlgoliaHit} from "@components/algolia/results/default"
import {Hit as HitType} from "instantsearch.js"
import {
  type RefinementListConnectorParams,
  RefinementListItem,
} from "instantsearch.js/es/connectors/refinement-list/connectRefinementList"
import {ApplyNowLink} from "@components/elements/apply-now-link"
import type {SearchResults} from "algoliasearch-helper"
import {useBoolean, useIsClient} from "usehooks-ts"
import {IndexUiState, UiState} from "instantsearch.js/es/types/ui-state"
import type {SendEventForHits} from "instantsearch.js/es/lib/utils"
import useRevealKey from "@lib/hooks/useRevealKey"
import cn from "@lib/utils/className"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const queryKeys = new Map<string, string>([
  ["sum_course_interest", "interests"],
  ["sum_course_format", "format"],
  ["sum_course_availability", "availability"],
  ["sum_course_population", "population"],
  ["sum_course_units", "units"],
  ["sum_course_weekday", "weekday"],
])
const reverseQueryKeys = new Map<string, string>()
for (const [key, value] of queryKeys.entries()) {
  reverseQueryKeys.set(value, key)
}

type RouteState = Record<string, string | string[] | undefined>

const CourseFilteringForm = (props: Props) => {
  // Remount with a fresh InstantSearch instance and router each time the cached route is revealed again.
  const revealKey = useRevealKey()
  // Searching only happens in the browser, and the history router can't be created without `window`. Rendering
  // nothing on the server keeps the router from throwing there and bailing the page out to client rendering.
  const isClient = useIsClient()
  if (!isClient) return null
  return <CourseFilteringSearch key={revealKey} {...props} />
}

const CourseFilteringSearch = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])

  const routing = useMemo(
    () => ({
      router: history<RouteState>({cleanUrlOnDispose: false}),
      stateMapping: {
        stateToRoute(uiState: UiState): RouteState {
          const indexUiState = uiState[searchIndex] ?? {}
          const route: RouteState = {}

          if (indexUiState.query) {
            route.q = indexUiState.query
          }

          for (const [attribute, values] of Object.entries(indexUiState.refinementList ?? {})) {
            const param = queryKeys.get(attribute)
            if (param && values.length) {
              route[param] = values
            }
          }

          return route
        },
        routeToState(routeState: RouteState) {
          const {q, ...refinementParams} = routeState
          const refinementList: IndexUiState["refinementList"] = {}

          for (const [param, value] of Object.entries(refinementParams)) {
            const attribute = reverseQueryKeys.get(param)
            // The url is user input, so a parameter can arrive as a string, an array, or something else entirely. A
            // plain string is the older comma separated format, e.g. `?units=2,3`, kept so existing links still work.
            const values = (typeof value === "string" ? value.split(",") : [value].flat()).filter(
              (item): item is string => typeof item === "string" && !!item
            )
            if (attribute && values.length) {
              refinementList[attribute] = values
            }
          }

          return {
            [searchIndex]: {
              query: typeof q === "string" ? q : undefined,
              refinementList,
            },
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
      future={{preserveSharedStateOnUnmount: false}}
      // Click and conversion events only count on production, so previews and local builds don't skew the stats.
      insights={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
      routing={routing}
    >
      <Configure filters="type:'Summer Courses'" />
      <SearchForm />
    </InstantSearch>
  )
}
export default CourseFilteringForm

const transformUnitItems = (items: RefinementListItem[]) => {
  return items
    .filter(item => parseInt(item.label) > 0)
    .map(item => ({
      ...item,
      label: `${item.label} ${parseInt(item.label) > 1 ? "units" : "unit"}`,
    }))
}

const sortByUnits = (a: SearchResults.FacetValue, b: SearchResults.FacetValue) =>
  (parseInt(a.name) || 0) - (parseInt(b.name) || 0)

const unitRefinementProps = {
  transformItems: transformUnitItems,
  sortBy: sortByUnits,
}

const transformWeekdayItem = (items: RefinementListItem[]) => {
  return items.map(item => ({
    ...item,
    label: item.label.charAt(0).toUpperCase() + item.label.slice(1),
  }))
}

const weekdays = new Map([
  ["sunday", 0],
  ["monday", 1],
  ["tuesday", 2],
  ["wednesday", 3],
  ["thursday", 4],
  ["friday", 5],
  ["saturday", 6],
])

const sortByWeekday = (a: SearchResults.FacetValue, b: SearchResults.FacetValue) =>
  (weekdays.get(a.name) ?? 0) - (weekdays.get(b.name) ?? 0)

const weekdayRefinementProps = {
  transformItems: transformWeekdayItem,
  sortBy: sortByWeekday,
}

const SearchForm = () => {
  return (
    <div id="search-form" className="grid grid-cols-12 sm:gap-30">
      <div className="col-span-12 flex flex-col lg:col-span-4 xl:col-span-3">
        <form className="flex flex-col" role="search" aria-label="Search Courses" onSubmit={e => e.preventDefault()}>
          <H2 className="sr-only">Search and filter course results</H2>
          <SearchBox />

          <RefinementInput attribute="sum_course_interest" label="Filter by Interest Area" accordionExpanded={true} />

          <RefinementInput attribute="sum_course_format" label="Filter by format" />

          <RefinementInput attribute="sum_course_availability" label="Filter by availability" />

          <RefinementInput attribute="sum_course_population" label="Filter by population" />

          <RefinementInput
            attribute="sum_course_weekday"
            label="Filter by weekday"
            useRefinementProps={weekdayRefinementProps}
          />

          <RefinementInput
            attribute="sum_course_units"
            label="Filter by units"
            useRefinementProps={unitRefinementProps}
          />

          <CustomCurrentRefinements />
        </form>

        <div className="order-first rs-mb-2">
          <FavoritesList />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <HitList />
      </div>
      <div className="col-span-12 rs-mt-8 lg:col-span-8 lg:col-start-5 xl:col-span-6 xl:col-start-6">
        <ApplyNowLink href="/apply-now">
          Ready to dive in? Kick off your application today – let&apos;s make things happen!
        </ApplyNowLink>
      </div>
    </div>
  )
}

const SearchBox = () => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const {query, refine} = useSearchBox({})

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query || ""
    }
  }, [query])

  // The form wraps the filters as well, so listen for its submit event rather than rendering it here.
  useEffect(() => {
    const form = inputRef.current?.form
    if (!form) return
    const onSubmit = () => refine(inputRef.current?.value || "")
    form.addEventListener("submit", onSubmit)
    return () => form.removeEventListener("submit", onSubmit)
  }, [refine])

  return (
    <div className="mb-25">
      <label className="text-18 font-semibold" htmlFor={`${id}-search-input`}>
        Search courses<span className="sr-only">&nbsp;by keywords</span>
      </label>
      <div className="relative mt-10">
        <input
          id={`${id}-search-input`}
          className="w-full grow border-3 border-fog px-20 py-12.5 type-0"
          ref={inputRef}
          autoComplete="on"
          spellCheck={false}
          maxLength={60}
          type="text"
          placeholder="Search by keyword"
          defaultValue={query}
        />
        <button type="submit" className="group absolute top-0 right-0 mr-[1rem] flex h-full items-center">
          <span className="sr-only">Submit Search</span>
          <MagnifyingGlassIcon
            width={40}
            className="block rounded-full border-2 border-white bg-digital-red p-7.5 text-white group-hocus:outline-digital-red group-hocus:outline-solid"
          />
        </button>
      </div>
    </div>
  )
}

const CustomCurrentRefinements = () => {
  // Include the query so the search keywords are cleared along with the filters.
  const {refine: clearRefinements} = useClearRefinements({excludedAttributes: []})

  return (
    <Button className="my-40" centered buttonElem secondary onClick={clearRefinements}>
      Clear all
    </Button>
  )
}

const RefinementInput = ({
  attribute,
  label,
  accordionExpanded = false,
  useRefinementProps,
}: {
  attribute: string
  label: string
  accordionExpanded?: boolean
  useRefinementProps?: Omit<RefinementListConnectorParams, "attribute">
}) => {
  const {items: refinementOptions, refine: refineOption} = useRefinementList({
    attribute,
    limit: 100,
    sortBy: ["name:asc"],
    ...useRefinementProps,
  })

  const hasRefinedOption = refinementOptions.some(item => item.isRefined)
  const {buttonProps, panelProps, expanded, expandAccordion} = useAccordion({
    initiallyVisible: accordionExpanded || hasRefinedOption,
  })

  // Facets from the url can arrive after the first render, so open the panel once one of its options is applied.
  useEffect(() => {
    if (hasRefinedOption) expandAccordion()
  }, [hasRefinedOption, expandAccordion])
  if (refinementOptions.length === 0) return null

  return (
    <fieldset className="rs-mb-1">
      <legend className="w-full border-t border-black">
        <H3 className="my-12.5 pb-0 text-18">
          <button {...buttonProps} className="flex w-full items-center justify-between hocus:underline">
            {label}
            <ChevronDownIcon width={20} className={cn({"rotate-180": expanded})} />
          </button>
        </H3>
      </legend>
      <div {...panelProps}>
        {refinementOptions.map(refinementOption => (
          <label
            key={refinementOption.value}
            className="group mb-12.5 flex cursor-pointer items-center gap-12.5 last:mb-0"
          >
            <input
              className="peer block h-[2.4rem] w-[2.4rem] cursor-pointer border-2 border-black-70 outline-hidden transition-all checked:border-lagunita-light checked:text-lagunita hocus:border-lagunita hocus:bg-[#99D7E1] hocus:text-lagunita-dark hocus:ring-4 hocus:ring-[#99D7E1]"
              type="checkbox"
              checked={refinementOption.isRefined}
              onChange={() => refineOption(refinementOption.value)}
            />
            <span className="group-hocus:underline peer-focus:underline">{refinementOption.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const HitList = () => {
  const {items: hits, results, currentPageHits, showMore, isLastPage, sendEvent} = useInfiniteHits<AlgoliaHit>()
  const nbHits = results?.nbHits ?? 0
  // Placeholder results are provided until the first search response arrives.
  const hasSearched = !!results && !results.__isArtificial

  return (
    <div>
      <H2 className="rs-ml-1 big-paragraph! font-normal" aria-live="polite" aria-atomic>
        {hasSearched && hits.length === 0 && "No results for your search. Please try another search."}
        {hits.length > 0 && `${nbHits} ${nbHits > 1 ? "results" : "result"}`}
      </H2>

      {hits.length > 0 && (
        <ul className="list-unstyled">
          {hits.map((hit, position) => (
            <HitItem
              key={hit.objectID}
              focusOnItem={hit.objectID === currentPageHits[0]?.objectID && position > 0}
              hit={hit}
              sendEvent={sendEvent}
            />
          ))}
        </ul>
      )}

      {!isLastPage && (
        <Button big centered onClick={showMore}>
          Load more<span className="sr-only">results</span>
          <ChevronDownIcon className="ml-12.5 inline-block" width={30} />
        </Button>
      )}
    </div>
  )
}

const HitItem = ({
  focusOnItem,
  hit,
  sendEvent,
}: {
  focusOnItem?: boolean
  hit: HitType<AlgoliaHit>
  sendEvent: SendEventForHits
}) => {
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
    <li
      tabIndex={focus ? 0 : undefined}
      ref={focus ? ref : undefined}
      onClick={() => sendEvent("click", hit, "Hit Clicked")}
      onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
      onBlur={disableFocus}
    >
      <SummerCourse hit={hit} />
    </li>
  )
}
