import Link from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {HtmlHTMLAttributes} from "react"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link url.
   */
  href: string
}

const ActionLink = ({children, className, ...props}: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative flex w-fit flex-row items-center no-underline hocus:underline",
        className?.replace("link--action", "")
      )}
    >
      {children}
      <ArrowRightIcon width={20} className="ml-2 inline-block shrink-0" />
    </Link>
  )
}
export default ActionLink
