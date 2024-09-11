"use client"

import {ShareIcon} from "@heroicons/react/24/outline"
import useAccordion from "@lib/hooks/useAccordion"
import React, {useCallback, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {useCopyToClipboard, useEventListener} from "usehooks-ts"
import useOutsideClick from "@lib/hooks/useOutsideClick"

type Props = {
  courseName: string
  courseUrl: string
  courseNum: string
}

const ShareCourses = ({courseName, courseUrl, courseNum}: Props) => {
  const [_copiedText, copy] = useCopyToClipboard()
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

  useEventListener("keydown", handleEscape, ref)

  const copyUrl = courseUrl
  const smsCopy = `sms:&body=Check out this course from Stanford Summer Session: ${courseName} ${copyUrl}`
  const emailCopy = `mailto:?body=Check out this course from Stanford Summer Session: ${courseName} ${copyUrl} &subject=Someone shared a Stanford Summer Session course with you`

  return (
    <div ref={ref} className="relative flex">
      <button
        {...buttonProps}
        ref={buttonRef}
        className={twMerge(
          "hocus:outline-3 rounded-full border-2 border-transparent pr-2 hocus:outline hocus:outline-poppy-dark",
          buttonProps.className
        )}
      >
        <ShareIcon width={25} className="text-poppy-dark" />
        <span className="sr-only">{`Share "${courseName}"`}</span>
      </button>
      <div
        {...panelProps}
        className={twMerge(
          "absolute right-0 top-full z-10 -mr-[30px] mt-5 w-fit rounded-[25px] border border-white bg-white px-12 py-4",
          expanded ? "block" : "hidden",
          panelProps.className
        )}
      >
        <div className="absolute -top-3 left-3/4 z-0 h-10 w-10 rotate-45 bg-white" />
        <ul className="list-unstyled bg-white">
          <li className="relative m-0 text-nowrap border-b border-spirited-light py-0 hocus:border-transparent">
            <a
              href={emailCopy}
              className="block border-b-[4px] border-transparent px-6 py-5 font-normal text-black no-underline hocus:border-spirited-light hocus:text-black"
              data-course-shared={courseNum}
            >
              Share via email
            </a>
          </li>
          <li className="relative m-0 text-nowrap border-b border-spirited-light py-0 hocus:border-transparent">
            <a
              href={smsCopy}
              className="block border-b-[4px] border-transparent px-6 py-5 font-normal text-black no-underline hocus:border-spirited-light hocus:text-black"
              data-course-shared={courseNum}
            >
              Share via text
            </a>
          </li>
          <li className="relative m-0 text-nowrap py-0">
            <button
              onClick={() => copy(copyUrl)}
              className="block border-b-0 border-b-[4px] border-transparent px-6 py-5 font-normal text-black no-underline hocus:border-spirited-light hocus:text-black"
              data-course-shared={courseNum}
            >
              Copy share link
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ShareCourses
