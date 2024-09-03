"use client"

import {usePagination} from "react-instantsearch"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"

const AlgoliaPager = () => {
  const {currentRefinement: currentPage, pages, nbPages, refine: goToPage} = usePagination({padding: 2})
  if (pages.length === 0) return null
  return (
    <nav aria-label="Search results pager">
      <ul className="list-unstyled mx-auto flex w-fit justify-around gap-10">
        {pages[0] > 0 && <PagerItem onClick={() => goToPage(0)}>First</PagerItem>}

        {pages.map(pageNum => (
          <PagerItem onClick={() => goToPage(pageNum)} key={`page-${pageNum}`} isCurrent={currentPage === pageNum}>
            {pageNum + 1}
          </PagerItem>
        ))}

        {pages[pages.length - 1] !== nbPages && <PagerItem onClick={() => goToPage(nbPages - 1)}>Last</PagerItem>}
      </ul>
    </nav>
  )
}

const PagerItem = ({
  isCurrent,
  children,
  onClick,
  ...props
}: HTMLAttributes<HTMLLIElement> & {isCurrent?: boolean; onClick: () => void}) => {
  return (
    <li
      {...props}
      aria-current={isCurrent}
      className={twMerge(
        "border-b-4 border-transparent",
        props.className,
        clsx({
          "border-[#F26845]": isCurrent,
        })
      )}
    >
      <button onClick={onClick} className="px-5 hocus:underline">
        {children}
      </button>
    </li>
  )
}

export default AlgoliaPager
