import twMerge from "@lib/utils/twMergeConfig"
import {HtmlHTMLAttributes} from "react"

type Props = HtmlHTMLAttributes<HTMLHeadingElement>

const headingLinkClasses =
  "[&_a]:text-digital-blue [&_a]:hocus:text-black [&_a]:no-underline [&_a]:hocus:underline font-roboto [&_a]:font-light"

export const H1 = ({children, className, ...props}: Props) => {
  return (
    <h1 className={twMerge(className, "type-5 font-light")} {...props}>
      {children}
    </h1>
  )
}

export const H2 = ({children, className, ...props}: Props) => {
  return (
    <h2 className={twMerge(headingLinkClasses, "type-4 font-light", className)} {...props}>
      {children}
    </h2>
  )
}

export const H3 = ({children, className, ...props}: Props) => {
  return (
    <h3 className={twMerge(headingLinkClasses, "type-3 font-light", className)} {...props}>
      {children}
    </h3>
  )
}

export const H4 = ({children, className, ...props}: Props) => {
  return (
    <h4 className={twMerge(headingLinkClasses, "type-2 font-light", className)} {...props}>
      {children}
    </h4>
  )
}

export const H5 = ({children, className, ...props}: Props) => {
  return (
    <h5 className={twMerge(headingLinkClasses, "type-1 font-light", className)} {...props}>
      {children}
    </h5>
  )
}

export const H6 = ({children, className, ...props}: Props) => {
  return (
    <h6 className={twMerge(headingLinkClasses, "type-0 font-light", className)} {...props}>
      {children}
    </h6>
  )
}

type HeadingProps = Props & {
  /**
   * Which heading level to display.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const Heading = ({children, level = 1, ...props}: HeadingProps) => {
  switch (level) {
    case 1:
      return <H1 {...props}>{children}</H1>
    case 2:
      return <H2 {...props}>{children}</H2>
    case 3:
      return <H3 {...props}>{children}</H3>
    case 4:
      return <H4 {...props}>{children}</H4>
    case 5:
      return <H5 {...props}>{children}</H5>
    case 6:
      return <H6 {...props}>{children}</H6>
  }
}
export default Heading
