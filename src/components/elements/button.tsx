import Link from "@components/elements/link";
import { twMerge } from "tailwind-merge";
import { HtmlHTMLAttributes, MouseEventHandler } from "react";
import { Maybe } from "@lib/gql/__generated__/drupal.d";
import { clsx } from "clsx";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

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
  prefetch?: boolean
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
  const standardClasses = clsx({
    "flex items-center w-fit mx-auto": centered,
    "inline-block text-center w-fit": !centered,
    "btn btn--big transition text-5xl text-white hocus:text-white bg-digital-red border-2 border-white hocus:outline hocus:outline-3 hocus:outline-digital-red no-underline hocus:underline py-6 px-12 font-normal rounded-full m-4":
      big && !secondary,
    "btn btn--secondary transition text-digital-red hocus:text-white hocus:bg-digital-red border-2 border-digital-red hocus:border-white no-underline hocus:underline hocus:outline hocus:outline-3 hocus:outline-digital-red py-4 px-16 font-normal rounded-full":
      !big && secondary,
    "btn  btn--big btn--secondary transition text-5xl text-digital-red hocus:text-white hocus:bg-digital-red border-2 border-digital-red hocus:border-white no-underline hocus:underline hocus:outline hocus:outline-3 hocus:outline-digital-red py-6 px-20 font-normal rounded-full":
      big && secondary,
    "btn bg-digital-red font-normal text-white border-2 border-white hocus:text-white hocus:outline hocus:outline-3 hocus:outline-digital-red py-4 px-8 no-underline hocus:underline transition rounded-full m-4":
      !big && !secondary,
  })

  if (!href || buttonElem) {
    return (
      <button
        className={twMerge(standardClasses, className)}
        type="button"
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={twMerge(standardClasses, className)}
      {...props}
    >
      {children}
      <ArrowRightIcon width={20} className="ml-2 inline-block" />
    </Link>
  )
}

export default Button
