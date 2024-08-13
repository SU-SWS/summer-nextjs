import {ArrowRightIcon} from "@heroicons/react/20/solid"
import Link from "next/link"
import React from "react"
import {twMerge} from "tailwind-merge"

interface ApplyNowLinkProps {
  className?: string
  href: string
  children?: React.ReactNode
}

export const ApplyNowLink = ({className, href, children}: ApplyNowLinkProps) => {
  return (
    <>
      <span className="rs-mb-0 block text-24 font-semibold uppercase">Apply Now</span>
      <Link
        className={twMerge(
          "type-4 flex flex-row items-end gap-8 font-roboto font-light no-underline decoration-2 underline-offset-4 transition hocus:underline",
          className
        )}
        href={href}
      >
        {children}
        <ArrowRightIcon width={60} className="ml-2 shrink-0" />
      </Link>
    </>
  )
}
