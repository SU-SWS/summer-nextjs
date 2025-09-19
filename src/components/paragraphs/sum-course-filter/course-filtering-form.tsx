"use client"

import {liteClient} from "algoliasearch/lite"
import {
  useSearchBox,
  useRefinementList,
  useClearRefinements,
  useInfiniteHits,
  usePagination,
  Configure,
} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import {H2, H3} from "@components/elements/headers"
import {useEffect, useId, useLayoutEffect, useMemo, useRef} from "react"
import Button from "@components/elements/button"
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import useAccordion from "@lib/hooks/useAccordion"
import {clsx} from "clsx"
import SummerCourse from "@components/algolia/results/summer-course/summer-course"
import FavoritesList from "@components/elements/favorites-list"
import {AlgoliaHit} from "@components/algolia/results/default"
import {Hit as HitType} from "instantsearch.js"
import {
  type RefinementListConnectorParams,
  RefinementListItem,
} from "instantsearch.js/es/connectors/refinement-list/connectRefinementList"
import {ApplyNowLink} from "@components/elements/apply-now-link"
import {useBoolean} from "usehooks-ts"
import {IndexUiState} from "instantsearch.js/es/types/ui-state"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const CourseFilteringForm = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])
  const queryKeys = new Map<string, string>([
    ["sum_course_interest", "interests"],
    ["sum_course_format", "format"],
    ["sum_course_availability", "availability"],
    ["sum_course_population", "population"],
    ["sum_course_units", "units"],
  ])
  const reverseQueryKeys = new Map<string, string>()
  for (const [key, value] of queryKeys.entries()) {
    reverseQueryKeys.set(value, key)
  }

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: false}}
      ignoreMultipleHooksWarning={true}
      routing={{
        router: {cleanUrlOnDispose: false},
        stateMapping: {
          stateToRoute(uiState): Record<string, string> {
            const indexUiState = uiState[searchIndex]
            const refinements: Record<string, string> = {}

            if (indexUiState?.refinementList) {
              Object.keys(indexUiState.refinementList).map(refinementKey => {
                const queryKey = queryKeys.get(refinementKey)

                if (queryKey && indexUiState.refinementList?.[refinementKey]) {
                  refinements[queryKey] = indexUiState.refinementList[refinementKey].join(",")
                }
              })
            }

            if (indexUiState.query) refinements.q = indexUiState.query
            return refinements
          },
          routeToState(routeState: Record<string, string>) {
            const refinementList: IndexUiState["refinementList"] = {}
            Object.keys(routeState).map(key => {
              const refinementKey = reverseQueryKeys.get(key)
              if (refinementKey && routeState[key]) {
                refinementList[refinementKey] = routeState[key].split(",")
              }
            })
            return {
              [searchIndex]: {query: routeState.q, refinementList},
            }
          },
        },
      }}
    >
      <Configure filters="type:'Summer Courses'" />
      <SearchForm />
    </InstantSearchNext>
  )
}
export default CourseFilteringForm

const transformUnitItems = (items: RefinementListItem[]) => {
  return items
    .filter(item => parseInt(item.label) > 0)
    .map(item => ({
      ...item,
      label: item.label + (parseInt(item.label) > 1 ? " units" : " unit"),
    }))
}

const SearchForm = () => {
  const id = useId()

  const inputRef = useRef<HTMLInputElement>(null)
  const {query, refine} = useSearchBox({})
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query || ""
    }
  }, [query])

  return (
    <div id="search-form" className="grid grid-cols-12 sm:gap-12">
      <div className="col-span-12 flex flex-col lg:col-span-4 xl:col-span-3">
        <form className="flex flex-col" role="search" aria-label="Search Courses" onSubmit={e => e.preventDefault()}>
          <H2 className="sr-only">Search and filter course results</H2>
          <div className="mb-10">
            <label className="text-18 font-semibold" htmlFor={`${id}-search-input`}>
              Search courses<span className="sr-only">&nbsp;by keywords</span>
            </label>
            <div className="relative mt-4">
              <input
                id={`${id}-search-input`}
                className="type-0 w-full flex-grow border-3 border-fog px-8 py-5"
                ref={inputRef}
                autoComplete="on"
                spellCheck={false}
                maxLength={60}
                type="text"
                placeholder="Search by keyword"
                defaultValue={query}
              />
              <button
                type="submit"
                className="group absolute right-0 top-0 mr-[1rem] flex h-full items-center"
                onClick={() => refine(inputRef.current?.value || "")}
              >
                <span className="sr-only">Submit Search</span>
                <MagnifyingGlassIcon
                  width={40}
                  className="group-hocus:outline-3 block rounded-full border-2 border-white bg-digital-red p-3 text-white group-hocus:outline group-hocus:outline-digital-red"
                />
              </button>
            </div>
          </div>

          <RefinementInput attribute="sum_course_interest" label="Filter by Interest Area" accordionExpanded={true} />

          <RefinementInput attribute="sum_course_format" label="Filter by format" />

          <RefinementInput attribute="sum_course_availability" label="Filter by availability" />

          <RefinementInput attribute="sum_course_population" label="Filter by population" />

          <RefinementInput
            attribute="sum_course_units"
            label="Filter by units"
            useRefinementProps={{transformItems: transformUnitItems}}
          />

          <CustomCurrentRefinements />
        </form>

        <div className="rs-mb-2 order-first">
          <FavoritesList />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <HitList />
      </div>
      <div className="rs-mt-8 col-span-12 lg:col-span-8 lg:col-start-5 xl:col-span-6 xl:col-start-6">
        <ApplyNowLink href="/apply-now">
          Ready to dive in? Kick off your application today – let&apos;s make things happen!
        </ApplyNowLink>
      </div>
    </div>
  )
}

const CustomCurrentRefinements = () => {
  const {refine} = useSearchBox({})
  const {refine: clearRefinements} = useClearRefinements({})

  return (
    <Button
      className="my-16"
      centered
      buttonElem
      secondary
      onClick={() => {
        clearRefinements()
        refine("")
      }}
    >
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

  const startExpanded = accordionExpanded || !!refinementOptions.filter(item => item.isRefined).length
  const {buttonProps, panelProps, expanded} = useAccordion({initiallyVisible: startExpanded})
  if (refinementOptions.length === 0) return null

  return (
    <fieldset className="rs-mb-1">
      <legend className="w-full border-t border-black">
        <H3 className="my-5 pb-0 text-18">
          <button {...buttonProps} className="flex w-full items-center justify-between hocus:underline">
            {label}
            <ChevronDownIcon width={20} className={clsx({"rotate-180": expanded})} />
          </button>
        </H3>
      </legend>
      <div {...panelProps}>
        {refinementOptions.map(refinementOption => (
          <label key={refinementOption.value} className="group mb-5 flex cursor-pointer items-center gap-5 last:mb-0">
            <input
              className="peer block h-[2.4rem] w-[2.4rem] cursor-pointer border-2 border-black-70 outline-none transition-all checked:border-lagunita-light checked:text-lagunita hocus:border-lagunita hocus:bg-[#99D7E1] hocus:text-lagunita-dark hocus:ring-4 hocus:ring-[#99D7E1]"
              type="checkbox"
              checked={refinementOption.isRefined}
              onChange={() => refineOption(refinementOption.value)}
            />
            <span className="peer-focus:underline group-hocus:underline">{refinementOption.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const HitList = () => {
  const {items: hits, currentPageHits, showMore, isLastPage} = useInfiniteHits<AlgoliaHit>()
  const {nbHits} = usePagination({padding: 2})

  if (hits.length === 0) {
    return <p>No results for your search. Please try another search.</p>
  }

  return (
    <div>
      <H2 className="rs-ml-1 big-paragraph font-normal" aria-live="polite" aria-atomic>
        {nbHits} {nbHits > 1 ? "results" : "result"}
      </H2>

      <ul className="list-unstyled">
        {hits.map((hit, position) => (
          <HitItem
            key={hit.objectID}
            focusOnItem={hit.objectID === currentPageHits[0].objectID && position > 0}
            hit={hit}
          />
        ))}
      </ul>

      {!isLastPage && (
        <Button big centered onClick={showMore}>
          Load more<span className="sr-only">results</span>
          <ChevronDownIcon className="ml-5 inline-block" width={30} />
        </Button>
      )}
    </div>
  )
}

const HitItem = ({focusOnItem, hit}: {focusOnItem?: boolean; hit: HitType<AlgoliaHit>}) => {
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
    <li tabIndex={focus ? 0 : undefined} ref={focus ? ref : undefined} onBlur={disableFocus}>
      <SummerCourse hit={hit} />
    </li>
  )
}
