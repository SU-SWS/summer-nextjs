"use client"

import Button from "@components/elements/button"
import {ChevronUpIcon} from "@heroicons/react/20/solid"
import {useBoolean, useDebounceCallback, useEventListener} from "usehooks-ts"
import {useCallback} from "react"
import {twMerge} from "tailwind-merge"
import {clsx} from "clsx"

const BackToTop = () => {
  const {value, setFalse, setTrue} = useBoolean(false)

  const onScroll = useCallback(() => {
    if (window.scrollY > 1500) setTrue()
    if (window.scrollY <= 1500) setFalse()
  }, [setTrue, setFalse])

  useEventListener("scroll", useDebounceCallback(onScroll, 200))

  return (
    <Button
      buttonElem
      className={twMerge(
        "tw-hidden invisible fixed bottom-10 right-10 z-50 opacity-0 transition-all duration-300 xl:block",
        clsx({"visible opacity-100": value})
      )}
      onClick={() => {
        const mainContent = document.getElementById("main-content")
        mainContent?.setAttribute("tabindex", "-1")
        mainContent?.focus({preventScroll: true})
        scrollTo({
          left: 0,
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")?.matches ? "instant" : "smooth",
        })
      }}
    >
      <span className="flex items-center gap-2">
        <ChevronUpIcon width={30} />
        Return to Top
      </span>
    </Button>
  )
}
export default BackToTop
