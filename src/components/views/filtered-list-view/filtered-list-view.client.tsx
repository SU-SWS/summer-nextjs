"use client"

import {LoadMoreListProps} from "@components/elements/load-more-list"
import {useLayoutEffect, useRef, JSX, useId, useState, ChangeEvent} from "react"
import {useBoolean, useCounter} from "usehooks-ts"
import useFocusOnRender from "@lib/hooks/useFocusOnRender"
import useServerAction from "@lib/hooks/useServerAction"
import twMerge from "@lib/utils/twMergeConfig"
import {ArrowPathIcon} from "@heroicons/react/20/solid"
import Button from "@components/elements/button"
import InputGroup from "@components/elements/inputs/input-group"
import RadioButton from "@components/elements/inputs/radio-button"

export type Props = LoadMoreListProps & {
  filters: Array<FilterGroup>
  filterKey: string
}

export type FilterGroup = {
  label: string
  options: Array<{label: string; value: string}>
}

const FilteredListViewClient = ({
  buttonText,
  children,
  ulProps,
  liProps,
  totalItems,
  loadPage,
  filters,
  filterKey,
  ...props
}: Props) => {
  const {count: filteredTotalItems, setCount: setFilteredTotalItems} = useCounter(totalItems)
  const id = useId()
  // 1. Initialize with empty strings for each filter group (LINES 40-46)
  const [chosenFilters, setChosenFilters] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    filters.forEach(filter => {
      initial[filter.label] = ""
    })
    return initial
  })

  const {count: page, increment: incrementPage, reset: resetPage} = useCounter(0)
  const [items, setItems] = useState<JSX.Element[]>(children)
  const {value: focusOnElement, setTrue: enableFocusElement, setFalse: disableFocusElement} = useBoolean(false)
  const [runLoadPage, isPending] = useServerAction(loadPage)

  const focusItemRef = useRef<HTMLLIElement>(null)

  const showMoreItems = () => {
    if (loadPage) {
      runLoadPage(page + 1, {[filterKey]: Object.values(chosenFilters).filter(Boolean)})
        .then(results => {
          const resultChildren = results?.props.children
          setItems([...items, ...resultChildren])

          enableFocusElement()
          incrementPage()
        })
        .catch(_e => console.warn("An error happened"))
    }
  }

  const setFocusOnItem = useFocusOnRender(focusItemRef, false)

  useLayoutEffect(() => {
    if (focusOnElement) setFocusOnItem()
  }, [focusOnElement, setFocusOnItem])

  const onInputChange = (filterIndex: string, event: ChangeEvent<HTMLInputElement>) => {
    const newState = {...chosenFilters}
    newState[filterIndex] = event.target.value

    setChosenFilters(newState)
    runLoadPage(0, {[filterKey]: Object.values(newState).filter(Boolean)})
      .then(results => {
        const resultChildren = results?.props.children
        setFilteredTotalItems(results?.props.totalItems)
        setItems([...resultChildren])
        resetPage()
        enableFocusElement()
      })
      .catch(_e => console.warn("An error happened"))
  }

  const handleClearFilters = () => {
    const clearedFilters: Record<string, string> = {}
    filters.forEach(filter => {
      clearedFilters[filter.label] = ""
    })

    setChosenFilters(clearedFilters)

    runLoadPage(0, {[filterKey]: []})
      .then(results => {
        const resultChildren = results?.props.children
        setFilteredTotalItems(results?.props.totalItems)
        setItems([...resultChildren])
        resetPage()
        enableFocusElement()
      })
      .catch(_e => console.warn("An error happened"))
  }

  return (
    <div {...props} className={twMerge("relative", props.className)}>
      {isPending && (
        <div className="absolute left-0 top-0 z-20 h-full w-full bg-black-30 bg-opacity-80">
          <div className="absolute bottom-20 left-1/2 -translate-x-[25px]">
            <ArrowPathIcon className="animate-spin" width={50} />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-24 lg:flex-row">
        <form className="shrink-0 lg:w-1/4">
          <div className="flex flex-row items-end justify-between">
            <h3 className="type-1 mb-4 font-light">Filter by</h3>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mb-4 block cursor-pointer text-3xl font-normal text-digital-blue no-underline hocus:text-black hocus:underline"
            >
              Clear all filters
            </button>
          </div>
          {filters.map((filterGroup, i) => (
            <InputGroup
              key={`filter-${filterGroup.label.toLowerCase().replaceAll(/[^a-z0-9-]/g, "-")}-${i}`}
              label={filterGroup.label}
            >
              <RadioButton
                value=""
                name={`filter-${filterGroup.label.toLowerCase().replaceAll(/[^a-z0-9-]/g, "-")}`}
                onRadioChange={onInputChange.bind(null, filterGroup.label)}
                inputProps={{checked: chosenFilters[filterGroup.label] === ""}}
                className="pb-3"
              >
                - Any -
              </RadioButton>
              {filterGroup.options.map(option => (
                <RadioButton
                  key={option.value}
                  value={option.value}
                  name={`filter-${filterGroup.label.toLowerCase().replaceAll(/[^a-z0-9-]/g, "-")}`}
                  onRadioChange={onInputChange.bind(null, filterGroup.label)}
                  className="pb-2"
                >
                  {option.label}
                </RadioButton>
              ))}
            </InputGroup>
          ))}
        </form>

        <div className="flex-grow @container">
          <ul {...ulProps}>
            {items.map((item, i) => (
              <li
                key={`${id}--${i}`}
                ref={i === children.length * page ? focusItemRef : null}
                tabIndex={i === children.length * page && focusOnElement ? 0 : undefined}
                onBlur={disableFocusElement}
                {...liProps}
              >
                {item}
              </li>
            ))}
          </ul>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            Showing {items.length} of {filteredTotalItems} items.
          </span>

          {items.length < filteredTotalItems && loadPage && (
            <Button buttonElem centered onClick={showMoreItems}>
              {buttonText ? buttonText : "Load More"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilteredListViewClient
