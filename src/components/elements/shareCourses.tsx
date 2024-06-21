/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import {ShareIcon} from "@heroicons/react/24/outline"
import useOutsideClick from "@lib/hooks/useOutsideClick"
import React, {useId, useRef} from "react"
import {twMerge} from "tailwind-merge"
import {useCopyToClipboard, useBoolean} from "usehooks-ts"

type shareCoursesProps = {
  courseUrl: string
}

const shareCourses = ({courseUrl}: shareCoursesProps) => {
  const shareRef = useRef<HTMLDivElement>(null)
  const elementId = useId()
  const [_copiedText, copy] = useCopyToClipboard()
  const {value: expandedShare, setFalse: closeExpandedShare, toggle: toggleExpandedShare} = useBoolean(false)
  useOutsideClick(shareRef, closeExpandedShare)

  const copyUrl = courseUrl
  const smsCopy = `sms:&body=I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
  const emailCopy = `mailto:?body=I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl} &subject=Someone wants you to see their list of favorite courses from Stanford Summer Session`

  const linkStyles = "block font-normal text-black hocus:text-black no-underline py-5 px-6 border-b-2 border-transparent hocus:border-spirited-light"

  return (
    <div
      className="relative flex"
      ref={shareRef}
    >
      <button
        aria-expanded={expandedShare}
        onClick={toggleExpandedShare}
        aria-controls={elementId}
      >
        <ShareIcon
          width={25}
          className="text-poppy"
        />
        <span className="sr-only">Share</span>
      </button>
      <ul
        id={elementId}
        className={twMerge('list-unstyled absolute right-0 top-full z-10 -mr-[30px] mt-5 w-fit rounded-[25px] border border-white bg-white px-12 py-4 after:absolute after:-top-3 after:left-3/4 after:h-10 after:w-10 after:rotate-45 after:bg-white after:content-[""] children:border-b children:border-spirited-light last:children:border-transparent', expandedShare ? "block" : "hidden")}
      >
        <li className="relative m-0 text-nowrap py-0">
          <a
            href={emailCopy}
            className={linkStyles}
          >
            Share via email
          </a>
        </li>
        <li className="relative m-0 text-nowrap py-0">
          <a
            href={smsCopy}
            className={linkStyles}
          >
            Share via text
          </a>
        </li>
        <li className="relative m-0 text-nowrap py-0">
          <a
            onClick={() => copy(copyUrl)}
            className={linkStyles}
          >
            Copy share link
          </a>
        </li>
      </ul>
    </div>
  )
}

export default shareCourses
