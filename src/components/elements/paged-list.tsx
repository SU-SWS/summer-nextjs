"use client"

import {useLayoutEffect, useRef, HtmlHTMLAttributes, useEffect, JSX, useState, useCallback} from "react"
import {useBoolean, useCounter} from "usehooks-ts"
import {useRouter, useSearchParams} from "next/navigation"
import usePagination from "@lib/hooks/usePagination"
import useFocusOnRender from "@lib/hooks/useFocusOnRender"
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid"
import {ArrowPathIcon} from "@heroicons/react/16/solid"
import {twMerge} from "tailwind-merge"
import useServerAction from "@lib/hooks/useServerAction"
import {clsx} from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Attributes for the <ul> container.
   */
  ulProps?: HtmlHTMLAttributes<HTMLUListElement>
  /**
   * Attributes for each <li> element.
   */
  liProps?: HtmlHTMLAttributes<HTMLLIElement>
  /**
   * URL parameter used to save the users page position.
   */
  pageKey?: string | false
  /**
   * Number of sibling pager buttons.
   */
  pagerSiblingCount?: number
  /**
   * Total number of pages to build the pager.
   */
  totalPages: number
  /**
   * Server action to load a page.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
}

const PagedList = ({
  children,
  ulProps,
  liProps,
  pageKey = "page",
  totalPages,
  pagerSiblingCount = 2,
  loadPage,
  ...props
}: Props) => {
  const ref = useRef(false)
  const [items, setItems] = useState<JSX.Element[]>(Array.isArray(children) ? children : [children])
  const [runAction, isRunning] = useServerAction<[number], JSX.Element>(loadPage)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Use the GET param for page, but make sure that it is between 1 and the last page. If it's a string or a number
  // outside the range, fix the value, so it works as expected.
  const {count: currentPage, setCount: setPage} = useCounter(1)
  const {value: focusOnElement, setTrue: enableFocusElement, setFalse: disableFocusElement} = useBoolean(false)

  const focusItemRef = useRef<HTMLLIElement>(null)

  const goToPage = useCallback(
    (page: number, doNotFocusOnResults?: boolean) => {
      runAction(page - 1)
        .then(response => {
          if (response) {
            // Set the rendering to the response from the server. If the response has a suspense boundary, it will have a
            // fallback prop. Then we only want to render the list of children within the suspense.
            setItems(response.props.fallback ? response.props.children.props.children : response.props.children)

            // When loading a page during the initial page load, we don't want to focus on anything. But when a user changes
            // pages, we want to focus on the first element.
            if (!doNotFocusOnResults) enableFocusElement()
            setPage(page)
          }
        })
        .catch(() => console.warn("An error occurred fetching more results."))
    },
    [enableFocusElement, setPage, runAction]
  )

  const setFocusOnItem = useFocusOnRender(focusItemRef, false)

  useLayoutEffect(() => {
    if (focusOnElement) setFocusOnItem()
  }, [focusOnElement, setFocusOnItem])

  useEffect(() => {
    if (!pageKey || !loadPage) return

    // Use search params to retain any other parameters.
    const params = new URLSearchParams(searchParams.toString())
    params.delete(pageKey)
    if (currentPage > 1) params.set(pageKey, `${currentPage}`)

    router.replace(`?${params.toString()}${window.location.hash || ""}`, {scroll: false})
  }, [loadPage, router, currentPage, pageKey, searchParams])

  useEffect(() => {
    const initialPage = Math.min(totalPages, Math.max(1, parseInt((pageKey && searchParams.get(pageKey)) || "1")))
    if (initialPage > 1 && !ref.current) goToPage(initialPage, true)
    ref.current = true
  }, [totalPages, searchParams, pageKey, currentPage, goToPage])

  const paginationButtons = usePagination(totalPages * items.length, currentPage, items.length, pagerSiblingCount)

  return (
    <div {...props} className={twMerge("relative", props.className)}>
      {isRunning && (
        <div className="absolute left-0 top-0 z-10 h-full w-full rounded-2xl bg-black-20 bg-opacity-30">
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <ArrowPathIcon className="animate-spin" width={50} />
          </div>
        </div>
      )}
      <ul {...ulProps}>
        {items.map((item, i) => (
          <li
            key={`pager-${currentPage}-${i}`}
            ref={i === 0 ? focusItemRef : null}
            tabIndex={i === 0 && focusOnElement ? 0 : undefined}
            onBlur={disableFocusElement}
            {...liProps}
          >
            {item}
          </li>
        ))}
      </ul>

      {loadPage && paginationButtons.length > 1 && (
        <nav aria-label="Pager" className="rs-mt-4 mx-auto w-fit">
          <ul className="list-unstyled flex items-center gap-5">
            {paginationButtons.map((pageNum, i) => (
              <PaginationButton
                key={`page-button-${pageNum}--${i}`}
                page={pageNum}
                currentPage={currentPage}
                total={totalPages}
                onPageClick={goToPage}
                pagerSiblingCount={pagerSiblingCount}
                disabled={isRunning}
              />
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

const PaginationButton = ({
  page,
  currentPage,
  total,
  onPageClick,
  disabled,
}: {
  page: number | string
  currentPage: number
  total: number
  onPageClick: (_page: number) => void
  pagerSiblingCount: number
  disabled: boolean
}) => {
  if (page === 0) {
    return (
      <li className="mt-auto h-full">
        <span className="sr-only">More pages available</span>
        <span aria-hidden>...</span>
      </li>
    )
  }

  const handleClick = () => {
    if (page === "leftArrow") return onPageClick(1)
    if (page === "rightArrow") return onPageClick(total)
    onPageClick(page as number)
  }

  const isCurrent = page === currentPage
  return (
    <li className="m-0 flex items-center">
      <button
        className="group type-3 font-medium hocus:underline"
        onClick={handleClick}
        aria-current={isCurrent ? "page" : undefined}
        disabled={disabled}
      >
        <span className="sr-only">
          {page === "leftArrow" && "Go to first page"}
          {page === "rightArrow" && "Go to last page"}
          {page !== "leftArrow" && page !== "rightArrow" && `Go to page ${page}`}
        </span>
        <span
          aria-hidden
          className={twMerge(
            "block h-fit border-b-2 px-4",
            clsx({
              "border-stone-dark text-stone-dark": isCurrent,
              "border-transparent text-cardinal-red": !isCurrent,
            })
          )}
        >
          {page === "leftArrow" && <ArrowLongLeftIcon width={30} />}
          {page === "rightArrow" && <ArrowLongRightIcon width={30} />}
          {page !== "leftArrow" && page !== "rightArrow" && page}
        </span>
      </button>
    </li>
  )
}

export default PagedList
