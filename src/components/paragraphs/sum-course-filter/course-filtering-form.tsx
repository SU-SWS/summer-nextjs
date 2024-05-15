"use client";

import algoliasearch from "algoliasearch/lite";
import { useSearchBox, useRefinementList, useClearRefinements, useCurrentRefinements, Configure, useInfiniteHits, usePagination} from "react-instantsearch";
import {InstantSearchNext} from "react-instantsearch-nextjs";
import {H2, H3} from "@components/elements/headers";
import {useEffect, useId, useMemo, useRef} from "react";
import Button from "@components/elements/button";
import {useRouter, useSearchParams} from "next/navigation";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {IndexUiState} from "instantsearch.js/es/types/ui-state";
import useAccordion from "@lib/hooks/useAccordion";
import {RefinementListItem} from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import {clsx} from "clsx";
import SummerCourse from "@components/algolia-results/summer-course/summer-course";
import FavoritesList from "@components/elements/favorites-list";

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const CourseFilteringForm = ({appId, searchIndex, searchApiKey}: Props) => {
  const searchParams = useSearchParams();

  const searchClient = useMemo(() => algoliasearch(appId, searchApiKey), [appId, searchApiKey])
  const initialUiState: IndexUiState = {
    refinementList: {},
  }

  if (searchParams.get("availability") && initialUiState.refinementList) initialUiState.refinementList.sum_course_availability = searchParams.get("availability")?.split(",") as string[]
  if (searchParams.get("format") && initialUiState.refinementList) initialUiState.refinementList.sum_course_format = searchParams.get("format")?.split(",") as string[]
  if (searchParams.get("interests") && initialUiState.refinementList) initialUiState.refinementList.sum_course_interest = searchParams.get("interests")?.split(",") as string[]
  if (searchParams.get("population") && initialUiState.refinementList) initialUiState.refinementList.sum_course_population = searchParams.get("population")?.split(",") as string[]
  if (searchParams.get("units") && initialUiState.refinementList) initialUiState.refinementList.sum_course_units = searchParams.get("units")?.split(",") as string[]
  if (searchParams.get("q")) initialUiState.query = searchParams.get("q") as string

  return (
    <InstantSearchNext
      indexName={searchIndex}
      searchClient={searchClient}
      initialUiState={{[searchIndex]: initialUiState}}
      future={{preserveSharedStateOnUnmount: true}}
    >
      <Configure
        facets={["sum_course_interest", "sum_course_format", "sum_course_availability", "sum_course_population", "sum_course_units"]}
        maxValuesPerFacet={100}
        sortFacetValuesBy={"alpha"}
        filters={"type:'Summer Courses'"}
        attributesToHighlight={["html"]}
        attributesToSnippet={["html"]}
      />
      <SearchForm/>
    </InstantSearchNext>
  )
}
export default CourseFilteringForm;

const SearchForm = () => {
  const id = useId()

  const {items: interestItems, refine: refineInterests} = useRefinementList({attribute: "sum_course_interest"})
  const {items: formatItems, refine: refineFormat} = useRefinementList({attribute: "sum_course_format"})
  const {items: availabilityItems, refine: refineAvail} = useRefinementList({attribute: "sum_course_availability"})
  const {items: populationItems, refine: refinePopulation} = useRefinementList({attribute: "sum_course_population"})
  const {items: unitsItems, refine: refineUnits} = useRefinementList({attribute: "sum_course_units"})

  const {items: currentRefinements} = useCurrentRefinements()

  const router = useRouter()
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const {query, refine} = useSearchBox({});
  const {refine: clearRefinements} = useClearRefinements({});

  useEffect(() => {
    const queryKeys = new Map<string, string>([
      ["sum_course_interest", "interests"],
      ["sum_course_format", "format"],
      ["sum_course_availability", "availability"],
      ["sum_course_population", "population"],
      ["sum_course_units", "units"],
      ["query", "q"]
    ])

    const params = new URLSearchParams(searchParams.toString());
    [...queryKeys.values()].map(key => params.delete(key))

    // Keyword search.
    if (query) params.set("q", query)

    currentRefinements.map(refinements => {
      const key = queryKeys.get(refinements.attribute);
      const filteredChoices = refinements.refinements.map(item => item.value)
      if (key) params.set(key, filteredChoices.join(","))
    })

    router.replace(`?${params.toString()}`, {scroll: false})
  }, [router, searchParams, currentRefinements, query]);

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col">
        <form
          className="flex flex-col"
          role="search"
          aria-label="Search Courses"
          onSubmit={(e) => e.preventDefault()}
        >
          <H2 className="sr-only">Search and filter course results</H2>
          <div className="mb-10">
            <label className="font-semibold text-18" htmlFor={`${id}-search-input`}>
              Search courses<span className="sr-only">&nbsp;by keywords</span>
            </label>
            <div className="relative mt-4">
              <input
                id={`${id}-search-input`}
                className="flex-grow border-3 border-fog-light w-full px-8 py-5 text-m1"
                ref={inputRef}
                autoComplete="on"
                autoCapitalize="off"
                spellCheck={false}
                maxLength={512}
                type="search"
                placeholder="Search by keyword"
                defaultValue={query}
              />
              <button
                type="submit"
                className="absolute top-5 right-5"
                onClick={() => refine(inputRef.current?.value || "")}
              >
                <span className="sr-only">Submit Search</span>
                <MagnifyingGlassIcon width={40} className="bg-digital-red text-white rounded-full p-3 block"/>
              </button>
            </div>
          </div>

          {!!interestItems.length &&
            <RefinementInput
              refinementOptions={interestItems}
              refineOption={refineInterests}
              label="Filter by Interest Area"
              accordionExpanded={true}
            />
          }

          {!!formatItems.length &&
            <RefinementInput
              refinementOptions={formatItems}
              refineOption={refineFormat}
              label="Filter by format"
            />
          }

          {!!availabilityItems.length &&
            <RefinementInput
              refinementOptions={availabilityItems}
              refineOption={refineAvail}
              label="Filter by availability"
            />
          }

          {!!populationItems.length &&
            <RefinementInput
              refinementOptions={populationItems}
              refineOption={refinePopulation}
              label="Filter by population"
            />
          }

          {!!unitsItems.length &&
            <RefinementInput
              refinementOptions={unitsItems.filter(item => !!parseInt(item.value)).sort((a, b) => parseInt(a.value) < parseInt(b.value) ? -1 : 1)}
              refineOption={refineUnits}
              label="Filter by units"
            />
          }


          <Button
            className="my-16"
            centered
            buttonElem
            secondary
            onClick={() => {
              clearRefinements()
              refine("")
              if (inputRef.current) inputRef.current.value = ""
            }}
          >
            Clear all
          </Button>
        </form>

        <div className="order-first rs-mb-2">
          <FavoritesList />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <HitList/>
      </div>
    </div>
  )
}

const RefinementInput = ({
  refinementOptions,
  refineOption,
  label,
  accordionExpanded = false
}: {
  refinementOptions: RefinementListItem[],
  refineOption: (_value: string) => void,
  label: string,
  accordionExpanded?: boolean
}) => {
  const startExpanded = accordionExpanded || !!refinementOptions.filter(item => item.isRefined).length
  const {buttonProps, panelProps, expanded} = useAccordion({initiallyVisible: startExpanded})

  return (
    <fieldset className="rs-mb-1">
      <legend className="border-t border-black w-full">
        <button {...buttonProps} className="flex w-full items-center justify-between group">
          <H3 className="my-5 pb-0 text-18 group-hocus:underline">{label}</H3>
          <ChevronDownIcon width={20} className={clsx({"rotate-180": expanded})}/>
        </button>
      </legend>
      <div {...panelProps}>
        {refinementOptions.map(refinementOption =>
          <label key={refinementOption.value} className="flex items-center gap-5 mb-5 last:mb-0">
            <input
              className="block w-[2.4rem] h-[2.4rem] border-2 rounded-full outline-none cursor-pointer group-hover:border-lagunita border-black-50 focus:border-lagunita checked:text-lagunita checked:border-lagunita-light checked:group-hover:text-lagunita-dark checked:focus:text-lagunita-dark checked:hover:border-lagunita checked:focus:border-lagunita group-hover:bg-transparent focus:bg-transparent focus-visible:outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 checked:group-hover:text-lagunita-dark checked:focus:text-lagunita-dark checked:group-hover:bg-lagunita-dark checked:focus:bg-lagunita-dark transition-all checked:ring-4 checked:ring-inset checked:ring-white checked:bg-[length:0px_0px] checked:focus:ring-4 checked:focus:ring-inset checked:focus:ring-[#99D7E1] group-hover:checked:ring-[#99D7E1]"
              type="checkbox"
              checked={refinementOption.isRefined}
              name="units"
              onChange={() => refineOption(refinementOption.value)}
            />
            {refinementOption.value} {parseInt(refinementOption.value) > 1 ? "units" : "unit"}
          </label>
        )}
      </div>
    </fieldset>
  )
}

const HitList = () => {
  const { hits, showMore, isLastPage } = useInfiniteHits();
  const { nbHits } = usePagination({padding: 2})

  if (hits.length === 0) {
    return (
      <p>No results for your search. Please try another search.</p>
    )
  }

  return (
    <div>
      <H2 className="rs-ml-1 font-normal text-m0" aria-live="polite" aria-atomic>
        {nbHits} {nbHits > 1 ? "results" : "result"}
      </H2>

      <ul className="list-unstyled">
        {hits.map(hit =>
          <li key={hit.objectID}>
            <SummerCourse hit={hit}/>
          </li>
        )}
      </ul>

      <div className="flex flex-col items-center">
      <Button big centered onClick={showMore} disabled={isLastPage}>
        Load more<span className="sr-only">results</span>
        <ChevronDownIcon className="inline-block ml-5" width={30} />
      </Button>
      </div>
    </div>
  )
}
