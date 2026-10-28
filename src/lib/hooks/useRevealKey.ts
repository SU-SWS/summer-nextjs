"use client"

import {useLayoutEffect, useRef, useState} from "react"

/**
 * A key that changes each time the component is revealed again after being hidden.
 *
 * With Cache Components, Next.js keeps a visited route mounted inside a hidden React <Activity> and reveals it on
 * back/forward or a link back to the page. Hiding the route disposes an InstantSearch instance and its router, and
 * restarting that disposed instance leaves the search unable to run. Keying InstantSearch, and everything that builds
 * its client and routing, with this value mounts a fresh instance that reads the current URL and starts clean.
 *
 * Effects re-run when a hidden tree is revealed, but refs persist, so the ref tells a reveal apart from the first
 * mount.
 *
 * @return
 *   Key to pass to the component that should remount on reveal.
 */
const useRevealKey = (): number => {
  const [revealKey, setRevealKey] = useState(0)
  const hasActivatedRef = useRef(false)

  useLayoutEffect(() => {
    if (hasActivatedRef.current) setRevealKey(key => key + 1)
    hasActivatedRef.current = true
  }, [])

  return revealKey
}
export default useRevealKey
