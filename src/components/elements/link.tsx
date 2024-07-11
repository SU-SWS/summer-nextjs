import {HtmlHTMLAttributes} from "react"
import Link from "next/link"
import {EnvelopeIcon} from "@heroicons/react/24/outline"
import ActionLink from "@components/elements/action-link"
import Button from "@components/elements/button"
import {LinkProps} from "next/dist/client/link"

type Props = HtmlHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> &
  LinkProps & {
    /**
     * Link URL.
     */
    href: string
  }

const DrupalLink = ({href, children, ...props}: Props) => {
  // Make sure all links have a href.
  href = href || "#"
  const drupalBase: string = (process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "").replace(/\/$/, "")

  if (!href.indexOf("/files/")) {
    href = href.replace(drupalBase, "").replace("<front>", "/")
  }

  if (props.className?.includes("link--action")) {
    return (
      <ActionLink href={href} {...props}>
        {children}
      </ActionLink>
    )
  }

  if (props.className?.includes("button")) {
    return (
      <Button
        href={href}
        big={props.className.includes("--big")}
        secondary={props.className.includes("--secondary")}
        {...props}
      >
        {children}
      </Button>
    )
  }

  return (
    <Link href={href} className={props.className} {...props}>
      {children}
      {href.startsWith("mailto") && <EnvelopeIcon width={20} className="ml-4 inline-block" />}
    </Link>
  )
}

export default DrupalLink as typeof Link
