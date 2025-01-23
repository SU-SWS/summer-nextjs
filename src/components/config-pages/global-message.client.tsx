"use client"

import twMerge from "@lib/utils/twMergeConfig"
import {HTMLAttributes} from "react"
import {clsx} from "clsx"
import {usePathname} from "next/navigation"

type Props = HTMLAttributes<HTMLElement> & {
  hidePaths?: Array<string>
}

const GlobalMessageClient = ({hidePaths, children, ...props}: Props) => {
  const pathName = usePathname()
  const hideOnPage = hidePaths?.includes(pathName)
  return (
    <article {...props} className={twMerge(props.className, clsx({hidden: hideOnPage}))}>
      {children}
    </article>
  )
}
export default GlobalMessageClient
