"use client"

import { ShareIcon } from "@heroicons/react/24/outline"
import useOutsideClick from "@lib/hooks/useOutsideClick"
import React, { useId } from "react"
import { twMerge } from "tailwind-merge"
import { useCopyToClipboard, useBoolean } from "usehooks-ts"

const shareCourses = () => {
  const elementId = useId();
  const [_copiedText, copy] = useCopyToClipboard();
  const {value: expandedShare, setFalse: closeExpandedShare, toggle: toggleExpandedShare} = useBoolean(false)
  const outsideClickProps = useOutsideClick(closeExpandedShare)
  const copyUrl = "https://summer.stanford.edu"
  const smsCopy = `sms:&body=I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
  const emailCopy = `mailto:?body=I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl} &subject=Someone wants you to see their list of favorite courses from Stanford Summer Session`

  return (
    <div 
      className="relative flex"
      {...outsideClickProps}
    >
      <button aria-expanded={expandedShare} onClick={toggleExpandedShare} aria-controls={elementId}>
        <ShareIcon width={25} className="text-poppy" />
        <span className="sr-only">Share</span>
      </button>
      <ul 
        id={elementId}
        className={twMerge("list-unstyled absolute z-10 top-full right-0 w-full min-w-[350px] bg-fog-light border border-white rounded-[25px] px-12 py-4 mt-3 after:content-[\"\"] after:absolute after:w-0 after:h-0 after:border-8 after:border-fog-light after:-top-3 after:left-1/2 after:rotate-45 after:outline after:outline-t-3 after:outline-l-3 after:outline-white", expandedShare ? "block" : "hidden")}
      >
        <li className="m-0 py-0 relative">
          <a href={emailCopy} className="ml-5 lg:ml-0 lg:pl-5 w-full relative inline-block font-normal text-black hocus:text-black no-underline py-5 border-b-[4px] hocus:border-spirited-light">Share via email</a>
        </li>
        <li className="m-0 py-0 relative"><a href={smsCopy} className="ml-5 lg:ml-0 lg:pl-5 w-full relative inline-block font-normal text-black hocus:text-black no-underline py-5 border-b-[4px] hocus:border-spirited-light">Share via text</a></li>
        <li className="m-0 py-0 relative"><a onClick={() => copy(copyUrl)} className="ml-5 lg:ml-0 lg:pl-5 w-full relative inline-block font-normal text-black hocus:text-black no-underline py-5 border-b-[4px] hocus:border-spirited-light">Copy share link</a></li>
      </ul>
    </div>
  )
}

export default shareCourses;
