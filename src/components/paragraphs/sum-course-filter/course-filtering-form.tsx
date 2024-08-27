"use client"

import {liteClient} from "algoliasearch/lite"
import {
  useSearchBox,
  useRefinementList,
  useClearRefinements,
  useCurrentRefinements,
  useInfiniteHits,
  usePagination,
} from "react-instantsearch"
import {InstantSearchNext} from "react-instantsearch-nextjs"
import {H2, H3} from "@components/elements/headers"
import {useEffect, useId, useLayoutEffect, useMemo, useRef} from "react"
import Button from "@components/elements/button"
import {useRouter, useSearchParams} from "next/navigation"
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid"
import {IndexUiState} from "instantsearch.js/es/types/ui-state"
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

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const CourseFilteringForm = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchParams = useSearchParams()
  const firstRender = useRef(true)

  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])
  const initialUiState: IndexUiState = {
    refinementList: {},
  }

  if (firstRender.current) {
    if (searchParams.get("availability") && initialUiState.refinementList)
      initialUiState.refinementList.sum_course_availability = searchParams.get("availability")?.split(",") as string[]
    if (searchParams.get("format") && initialUiState.refinementList)
      initialUiState.refinementList.sum_course_format = searchParams.get("format")?.split(",") as string[]
    if (searchParams.get("interests") && initialUiState.refinementList)
      initialUiState.refinementList.sum_course_interest = searchParams.get("interests")?.split(",") as string[]
    if (searchParams.get("population") && initialUiState.refinementList)
      initialUiState.refinementList.sum_course_population = searchParams.get("population")?.split(",") as string[]
    if (searchParams.get("units") && initialUiState.refinementList)
      initialUiState.refinementList.sum_course_units = searchParams.get("units")?.split(",") as string[]
    if (searchParams.get("q")) initialUiState.query = searchParams.get("q") as string
  }

  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      initialUiState={{[searchIndex]: initialUiState}}
      future={{preserveSharedStateOnUnmount: true}}
    >
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
    if (inputRef.current && !query) {
      inputRef.current.value = ""
    }
  }, [query, inputRef])

  return (
    <div className="grid grid-cols-12 sm:gap-12">
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
                className="type-0 w-full flex-grow border-3 border-fog-light px-8 py-5"
                ref={inputRef}
                autoComplete="on"
                spellCheck={false}
                maxLength={60}
                type="textfield"
                placeholder="Search by keyword"
                defaultValue={query}
              />
              <button
                type="submit"
                className="hocus:outline-3 absolute right-5 top-4 rounded-full border-2 border-white hocus:outline hocus:outline-digital-red"
                onClick={() => refine(inputRef.current?.value || "")}
              >
                <span className="sr-only">Submit Search</span>
                <MagnifyingGlassIcon width={40} className="block rounded-full bg-digital-red p-3 text-white" />
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const {query, refine} = useSearchBox({})

  const {items: currentRefinements} = useCurrentRefinements()
  const {refine: clearRefinements} = useClearRefinements({})

  useEffect(() => {
    const queryKeys = new Map<string, string>([
      ["sum_course_interest", "interests"],
      ["sum_course_format", "format"],
      ["sum_course_availability", "availability"],
      ["sum_course_population", "population"],
      ["sum_course_units", "units"],
      ["query", "q"],
    ])

    const params = new URLSearchParams(searchParams.toString())
    ;[...queryKeys.values()].map(key => params.delete(key))

    // Keyword search.
    if (query) params.set("q", query)

    currentRefinements.map(refinements => {
      const key = queryKeys.get(refinements.attribute)
      const filteredChoices = refinements.refinements.map(item => item.value)
      if (key) params.set(key, filteredChoices.join(","))
    })

    router.replace(`?${params.toString()}`, {scroll: false})
  }, [router, searchParams, currentRefinements, query])

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
          <label key={refinementOption.value} className="mb-5 flex items-center gap-5 last:mb-0">
            <input
              className="block h-[2.4rem] w-[2.4rem] cursor-pointer rounded-full border-2 border-black-50 outline-none transition-all checked:border-lagunita-light checked:bg-[length:0px_0px] checked:text-lagunita checked:ring-4 checked:ring-inset checked:ring-white hocus:border-lagunita hocus:bg-[#99D7E1] hocus:bg-transparent hocus:outline-none hocus:ring-0 hocus:ring-offset-0 checked:hocus:border-lagunita checked:hocus:bg-lagunita-dark checked:hocus:text-lagunita-dark checked:hocus:ring-4 checked:hocus:ring-inset checked:hocus:ring-[#99D7E1] hocus-visible:outline-none group-hocus:border-lagunita group-hocus:bg-transparent checked:group-hocus:bg-lagunita-dark group-hocus:checked:bg-[#99D7E1] checked:group-hocus:text-lagunita-dark"
              type="checkbox"
              checked={refinementOption.isRefined}
              onChange={() => refineOption(refinementOption.value)}
            />
            {refinementOption.label}
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
