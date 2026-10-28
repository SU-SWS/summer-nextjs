import Link from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"
import {LinkProps} from "next/dist/client/link"

type Props = HtmlHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link url.
   */
  href: string
  /**
   * Next.js prefetch functionality. Disabled by default.
   */
  prefetch?: LinkProps["prefetch"]
}

const ActionLink = ({children, className, prefetch = false, ...props}: Props) => {
  return (
    <Link
      {...props}
      prefetch={prefetch}
      className={cn(
        "relative flex w-fit flex-row items-center no-underline hocus:underline",
        className?.replace("link--action", "")
      )}
    >
      {children}
      <ArrowRightIcon width={20} className="ml-5 inline-block shrink-0" />
    </Link>
  )
}
export default ActionLink
