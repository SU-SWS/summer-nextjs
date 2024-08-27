import Link from "@components/elements/link"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {HtmlHTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"

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
      className={twMerge(
        "relative flex flex-row items-center no-underline hocus:underline",
        className?.replace("link--action", "")
      )}
    >
      {children}
      <ArrowRightIcon width={20} className="ml-2 inline-block" />
    </Link>
  )
}
export default ActionLink
