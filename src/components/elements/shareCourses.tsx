/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import {ShareIcon} from "@heroicons/react/24/outline"
import useAccordion from "@lib/hooks/useAccordion"
import React, {useId, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {useCopyToClipboard} from "usehooks-ts"

type Props = {
  courseName: string
  courseUrl: string
  courseNum: string
}

const shareCourses = ({courseName, courseUrl, courseNum}: Props) => {
  const shareRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const [_copiedText, copy] = useCopyToClipboard()
  const {buttonProps, panelProps, expanded} = useAccordion({buttonId: `${id}-button`})

  const copyUrl = courseUrl
  const smsCopy = `sms:&body=Check out this course from Stanford Summer Session: ${courseName} ${copyUrl}`
  const emailCopy = `mailto:?body=Check out this course from Stanford Summer Session: ${courseName} ${copyUrl} &subject=Someone shared a Stanford Summer Session course with you`

  const linkStyles = "block font-normal text-black hocus:text-black no-underline py-5 px-6 border-b-2 border-transparent hocus:border-spirited-light"

  return (
    <div
      className="relative flex"
      ref={shareRef}
      aria-labelledby={`${id}-button`}
    >
      <button {...buttonProps}>
        <ShareIcon
          width={25}
          className="text-poppy"
        />
        <span className="sr-only">Share</span>
      </button>
      <div
        {...panelProps}
        id={id}
        className={twMerge("absolute right-0 top-full z-10 -mr-[30px] mt-5 w-fit rounded-[25px] border border-white bg-white px-12 py-4", expanded ? "block" : "hidden")}
      >
        <div className="absolute -top-3 left-3/4 z-0 h-10 w-10 rotate-45 bg-white" />
        <ul className="list-unstyled children:border-b children:border-spirited-light last:children:border-transparent">
          <li className="relative m-0 text-nowrap py-0">
            <a
              href={emailCopy}
              className={linkStyles}
              data-course-shared={courseNum}
            >
              Share via email
            </a>
          </li>
          <li className="relative m-0 text-nowrap py-0">
            <a
              href={smsCopy}
              className={linkStyles}
              data-course-shared={courseNum}
            >
              Share via text
            </a>
          </li>
          <li className="relative m-0 text-nowrap py-0">
            <button
              onClick={() => copy(copyUrl)}
              className={linkStyles}
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

export default shareCourses
