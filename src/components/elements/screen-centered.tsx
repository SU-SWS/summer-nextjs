"use client"

import {HTMLAttributes, useCallback, useEffect, useRef, useState} from "react"
import {useEventListener} from "usehooks-ts"

const ScreenCentered = ({children}: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null)
  const [translate, setTranslate] = useState(0)
  const calculateTranslation = useCallback(() => setTranslate(ref.current?.getBoundingClientRect().x || 0), [])
  useEventListener("resize", calculateTranslation)
  useEffect(() => calculateTranslation(), [calculateTranslation])

  return (
    <div ref={ref} className="relative left-1/2 w-screen -translate-x-1/2">
      <div style={{transform: `translate(-${translate}px)`}}>{children}</div>
    </div>
  )
}
export default ScreenCentered
