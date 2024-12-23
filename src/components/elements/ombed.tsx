"use client"

import {SignalIcon} from "@heroicons/react/20/solid"
import Embed from "react-tiny-oembed"
import {HtmlHTMLAttributes} from "react"
import {useIntersectionObserver} from "usehooks-ts"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Oembed URL.
   */
  url: string
}

const Oembed = ({url, ...props}: Props) => {
  const {isIntersecting, ref} = useIntersectionObserver({freezeOnceVisible: true})
  return (
    <div {...props} ref={ref} className={twMerge("relative aspect-[16/9] w-full", props.className)}>
      {/* @ts-expect-error React 19 types don't match with the library. */}
      {isIntersecting && <Embed url={url} LoadingFallbackElement={<Loading />} />}
    </div>
  )
}

const Loading = () => {
  return (
    <div className="flex h-full w-full items-baseline">
      <SignalIcon className="mx-auto animate-ping self-center" width={30} height={30} />
    </div>
  )
}

export default Oembed
