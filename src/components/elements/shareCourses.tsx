/* eslint-disable react-hooks/rules-of-hooks */
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

  const linkStyles = "block font-normal text-black hocus:text-black no-underline py-5 px-6 border-b-2 border-transparent hocus:border-spirited-light"

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
        className={twMerge("list-unstyled absolute z-10 top-full right-0 -mr-[30px] w-fit bg-white border border-white rounded-[25px] px-12 py-4 mt-5 after:content-[\"\"] after:absolute after:w-10 after:h-10 after:bg-white after:-top-3 after:left-3/4 after:rotate-45 children:border-b last:children:border-transparent children:border-spirited-light", expandedShare ? "block" : "hidden")}
      >
        <li className="m-0 py-0 text-nowrap"><a href={emailCopy} className={linkStyles}>Share via email</a></li>
        <li className="m-0 py-0 text-nowrap"><a href={smsCopy} className={linkStyles}>Share via text</a></li>
        <li className="m-0 py-0 text-nowrap"><a onClick={() => copy(copyUrl)} className={linkStyles}>Copy share link</a></li>
      </ul>
    </div>
  )
}

export default shareCourses;
