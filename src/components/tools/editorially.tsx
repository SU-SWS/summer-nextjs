"use client"

import Script from "next/script"
import {useEffect} from "react"

const Editori11y = () => {
  const startEditoria11y = () => {
    // @ts-expect-error Globally defined class from the library.
    if (typeof Ed11y != "undefined") {
      // @ts-expect-error Globally defined class from the library.
      new Ed11y({
        checkRoots: "#main-content",
        ignoreElements: "nav *, .ed11y-ignore",
        allowHide: false,
        allowOK: false,
      })
    }
  }

  useEffect(() => {
    fetch("/api/draft/disable").catch(_e => console.warn("An error occurred when removing the cookie."))
  }, [])

  return (
    <Script src="//cdn.jsdelivr.net/gh/itmaybejj/editoria11y@2/dist/editoria11y.min.js" onReady={startEditoria11y} />
  )
}

export default Editori11y
