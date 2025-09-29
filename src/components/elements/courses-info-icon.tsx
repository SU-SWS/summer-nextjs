"use client"

import {InformationCircleIcon, XMarkIcon} from "@heroicons/react/24/solid"
import useAccordion from "@lib/hooks/useAccordion"
import React, {RefObject, useCallback, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {useEventListener} from "usehooks-ts"
import useOutsideClick from "@lib/hooks/useOutsideClick"

type Props = {
  courseName: string
}

const CourseInfo = ({courseName}: Props) => {
  const {buttonProps, panelProps, expanded, collapseAccordion} = useAccordion()
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useOutsideClick(ref, collapseAccordion)

  // If the user presses escape on the keyboard, close the submenus.
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !expanded) return

      collapseAccordion()
      buttonRef.current?.focus()
    },
    [expanded, collapseAccordion]
  )

  useEventListener("keydown", handleEscape, ref as RefObject<HTMLDivElement>)

  return (
    <div ref={ref} className="relative flex">
      <button
        {...buttonProps}
        ref={buttonRef}
        className={twMerge(
          "hocus-visible:outline-3 rounded-full border-2 border-transparent pr-2 hocus-visible:outline hocus-visible:outline-digital-red",
          buttonProps.className
        )}
      >
        <InformationCircleIcon width={30} className="text-digital-red" />
        <span className="sr-only">Course requirements</span>
      </button>
      <div
        {...panelProps}
        className={twMerge(
          "absolute right-0 top-full z-10 -mr-[30px] mt-5 w-[400px] rounded-[25px] border border-white bg-white px-12 py-4",
          expanded ? "block" : "tw-hidden",
          panelProps.className
        )}
      >
        <div className="absolute -top-3 left-[85%] z-0 h-10 w-10 rotate-45 bg-white" />
        <div className="mb-2 flex flex-row items-center gap-2">
          <InformationCircleIcon width={25} className="text-archway-dark" />

          <p className="mb-0 text-[17px] font-semibold">Pre-requisites</p>
          <button type="button" onClick={() => collapseAccordion()} className="z-11 align-right ml-auto">
            <XMarkIcon width={24} className="mt-2 group-hocus:text-spirited-dark" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <p className="text-[17px] text-gray-600">
          We expect visiting students to have knowledge that is equivalent to the listed Stanford pre-requisite course.
        </p>
      </div>
    </div>
  )
}

export default CourseInfo
