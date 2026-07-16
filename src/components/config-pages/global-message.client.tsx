"use client"

import cn from "@lib/utils/className"
import {HTMLAttributes} from "react"
import {usePathname} from "next/navigation"

type Props = HTMLAttributes<HTMLElement> & {
  hidePaths?: Array<string>
}

const GlobalMessageClient = ({hidePaths, children, ...props}: Props) => {
  const pathName = usePathname()
  const hideOnPage = hidePaths?.includes(pathName)
  return (
    <article {...props} className={cn(props.className, {hidden: hideOnPage})}>
      {children}
    </article>
  )
}
export default GlobalMessageClient
