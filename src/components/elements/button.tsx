import Link from "@components/elements/link"
import cn from "@lib/utils/className"
import {HtmlHTMLAttributes, MouseEventHandler} from "react"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import {ArrowRightIcon} from "@heroicons/react/20/solid"
import {LinkProps} from "next/dist/client/link"

type Props = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> & {
  /**
   * Link URL.
   */
  href?: Maybe<string>
  /**
   * If the element should be a <button>, default is <a>.
   */
  buttonElem?: boolean
  /**
   * Display a larger button.
   */
  big?: boolean
  /**
   * Display a secondary styled button.
   */
  secondary?: boolean
  /**
   * Center the button in the container.
   */
  centered?: boolean
  /**
   * Click handler, mostly when using a button element.
   */
  onClick?: MouseEventHandler
  /**
   * Next.js prefetch functionality.
   */
  prefetch?: LinkProps["prefetch"]
  /**
   * Type of button: submit, reset, or button.
   */
  type?: HTMLButtonElement["type"]
  /**
   * Disabled button element.
   */
  disabled?: boolean
}

export const Button = ({
  href,
  buttonElem = false,
  big = false,
  secondary = false,
  centered = false,
  children,
  className,
  ...props
}: Props) => {
  const standardClasses = cn("flex w-fit items-center", {
    "mx-auto": centered,
    "m-4 text-center": !centered,
    "btn btn--big hocus:outline-3 rounded-full border-2 border-white bg-digital-red px-12 py-6 text-5xl font-normal text-white no-underline transition hocus:text-white hocus:underline hocus:outline hocus:outline-digital-red [&_*]:text-white":
      big && !secondary,
    "btn btn--secondary hocus:outline-3 rounded-full border-2 border-digital-red px-16 py-4 font-normal text-digital-red no-underline transition hocus:border-white hocus:bg-digital-red hocus:text-white hocus:underline hocus:outline hocus:outline-digital-red hocus:[&_*]:text-white":
      !big && secondary,
    "btn btn--big btn--secondary hocus:outline-3 rounded-full border-2 border-digital-red px-20 py-6 text-5xl font-normal text-digital-red no-underline transition hocus:border-white hocus:bg-digital-red hocus:text-white hocus:underline hocus:outline hocus:outline-digital-red":
      big && secondary,
    "btn hocus:outline-3 rounded-full border-2 border-white bg-digital-red px-8 py-4 font-normal text-white no-underline transition hocus:text-white hocus:underline hocus:outline hocus:outline-digital-red [&_*]:text-white":
      !big && !secondary,
  })

  if (!href || buttonElem) {
    return (
      <button className={cn(standardClasses, className)} type="button" {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link href={href} className={cn(standardClasses, className?.replace("button", ""))} {...props}>
      {children}
      <ArrowRightIcon width={20} className="ml-2 inline-block" />
    </Link>
  )
}

export default Button
