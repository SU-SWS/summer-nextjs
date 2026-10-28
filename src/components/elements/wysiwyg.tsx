import {Table, Thead, Tbody, Tr, Th, Td} from "@components/elements/tables"
import Link from "@components/elements/link"
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps, DOMNode} from "html-react-parser"
import Oembed from "@components/elements/ombed"
import React, {ComponentProps, HtmlHTMLAttributes, ImgHTMLAttributes} from "react"
import {H2, H3, H4, H5, H6} from "@components/elements/headers"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/graphql"
import Mathjax from "@components/tools/mathjax"
import Script from "next/script"
import {ApplyNowLink} from "./apply-now-link"
import {getIdFromText} from "@lib/utils/text-tools"
import "../../styles/form.css"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * HTML string.
   */
  html?: Maybe<string>
  /**
   * Disable the default class styles that are used.
   */
  disableDefaultStyles?: boolean
}

const Wysiwyg = ({html, className, disableDefaultStyles, ...props}: Props) => {
  if (!html) return
  // Remove comments and empty lines.
  html = html.replaceAll(/<!--[\s\S]*?-->/g, "").replaceAll(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, "")

  const addMathJax = html.match(/\$\$.*\$\$/) || html.match(/\\\[.*\\]/) || html.match(/\\\(.*\\\)/)
  return (
    <div
      className={cn(
        {
          "wysiwyg w-full md:max-w-[440px] lg:max-w-[536px] xl:max-w-[653px] 2xl:max-w-[725px]": !disableDefaultStyles,
        },
        className
      )}
      {...props}
    >
      {addMathJax && <Mathjax />}
      {formatHtml(html)}
    </div>
  )
}

/**
 * Text of a node and all of its descendants. Used for heading anchor ids.
 */
const textContent = (node: Element): string =>
  node.children
    .map(child => {
      if (child instanceof Element) return textContent(child)
      return "data" in child && child.type !== "comment" ? child.data : ""
    })
    .join("")

const options: HTMLReactParserOptions = {
  replace: domNode => {
    if (domNode instanceof Element) {
      const nodeProps = attributesToProps(domNode.attribs)
      nodeProps.className = fixClasses(nodeProps.className)
      const NodeName = domNode.name as React.ElementType
      const children: DOMNode[] = domNode.children as DOMNode[]

      switch (domNode.name) {
        case "a":
          delete nodeProps["data-entity-substitution"]
          delete nodeProps["data-entity-type"]
          nodeProps.href = nodeProps.href || "#"

          if (nodeProps.className && nodeProps.className.includes("apply-now-link")) {
            return (
              <ApplyNowLink className={nodeProps.className} href={nodeProps.href as string}>
                {domToReact(children, options)}
              </ApplyNowLink>
            )
          }

          return (
            <Link href={nodeProps.href as string} prefetch={false} {...nodeProps}>
              {domToReact(children, options)}
            </Link>
          )

        case "div":
          if (nodeProps.className && nodeProps.className.includes("left-bar")) {
            nodeProps.className = cn(nodeProps.className, "border-l-3 border-archway-dark/50 rs-pt-7 rs-px-1 rs-pb-5")
          }
          if (nodeProps.className?.includes("tight-spacing")) {
            nodeProps.className = cn(nodeProps.className, "*:mt-0! *:mb-15!")
          }
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "table":
          return <Table {...nodeProps}>{domToReact(children, options)}</Table>

        case "article":
          delete nodeProps.role
          if (nodeProps.className?.includes("media-entity-wrapper")) {
            return cleanMediaMarkup(domNode)
          }
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "figure":
          return cleanMediaMarkup(domNode)

        case "p":
          nodeProps.className = cn(nodeProps.className, {
            "type-0": !nodeProps?.className?.includes("type-"),
          })
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "script":
          return <Script {...nodeProps} strategy="lazyOnload"></Script>

        case "h2":
          // Give editor headings an anchor target for the anchor nav.
          if (!nodeProps.id) {
            const id = getIdFromText(textContent(domNode))
            if (id) nodeProps.id = id
          }
          return <H2 {...nodeProps}>{domToReact(children, options)}</H2>
        case "h3":
          return <H3 {...nodeProps}>{domToReact(children, options)}</H3>
        case "h4":
          return <H4 {...nodeProps}>{domToReact(children, options)}</H4>
        case "h5":
          return <H5 {...nodeProps}>{domToReact(children, options)}</H5>
        case "h6":
          return <H6 {...nodeProps}>{domToReact(children, options)}</H6>
        case "thead":
          return <Thead {...nodeProps}>{domToReact(children, options)}</Thead>
        case "tbody":
          return <Tbody {...nodeProps}>{domToReact(children, options)}</Tbody>
        case "th":
          return <Th {...nodeProps}>{domToReact(children, options)}</Th>
        case "td":
          return <Td {...nodeProps}>{domToReact(children, options)}</Td>
        case "tr":
          return <Tr {...nodeProps}>{domToReact(children, options)}</Tr>
        case "ol":
          nodeProps.className = cn(nodeProps.className, {
            "list-lower-alpha": nodeProps?.type === "a",
            "list-upper-alpha": nodeProps?.type === "A",
            "list-lower-roman": nodeProps?.type === "i",
            "list-upper-roman": nodeProps?.type === "I",
          })
          return <ol {...nodeProps}>{domToReact(children, options)}</ol>
        case "b":
        case "cite":
        case "dt":
        case "pre":
        case "code":
        case "dl":
        case "dd":
        case "i":
        case "aside":
        case "iframe":
          // Embed codes often use `width="100%"`, but the attributes only accept pixel integers. Percentages move to
          // inline styles instead.
          for (const dimension of ["width", "height"]) {
            const value = nodeProps[dimension]
            if (typeof value === "string" && value.endsWith("%")) {
              nodeProps.style = {...(nodeProps.style as Record<string, string>), [dimension]: value}
              delete nodeProps[dimension]
            }
          }
          // Obsolete, preflight already removes iframe borders.
          delete nodeProps.frameBorder
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "abbr":
        case "span":
        case "blockquote":
        case "ul":
        case "li":
        case "strong":
        case "em":
        case "s":
        case "sub":
        case "sup":
        case "caption":
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        // Void element tags like <br>, <hr>, <source>, etc.
        // @see https://developer.mozilla.org/en-US/docs/Glossary/Void_element
        default:
          return <NodeName {...nodeProps} />
      }
    }
  },
}

const fixClasses = (classes?: string | boolean): string => {
  if (!classes) return ""
  // Pad the classes so that we can easily replace a whole class instead of parts of them.
  classes = ` ${classes} `

  classes = classes
    .replaceAll(" su-", " ")
    .replaceAll(" text-align-center ", " text-center [&_a]:mx-auto ")
    .replace(" text-align-right ", " text-right ")
    .replaceAll(" align-center ", " mx-auto ")
    .replaceAll(" align-left ", " float-left mr-25 mb-25 ")
    .replaceAll(" align-right ", " float-right ml-25 mb-25 ")
    .replaceAll(" visually-hidden ", " sr-only ")
    .replaceAll(" font-splash ", " splash-text ")
    .replaceAll(" callout-text ", " font-bold type-3 ")
    .replaceAll(" related-text ", " shadow-lg border border-black-20 p-40 ")
    .replaceAll(
      " drop-cap ",
      " type-2 first-letter:font-bold first-letter:type-5 first-letter:float-left first-letter:mt-5 first-letter:mb-2.5 first-letter:mr-10 first-letter:leading-[0.9] "
    )
    .replaceAll(" intro-text ", " type-3 ")
    .replace(/ tablesaw.*? /g, " ")
    .replace(/ +/g, " ")
    .trim()

  classes = classes
    .split(" ")
    .filter(className => className.trim().length >= 1)
    .join(" ")

  return cn(classes.trim())
}

const cleanMediaMarkup = (node: Element) => {
  const nodeProps = attributesToProps(node.attribs)
  nodeProps.className = fixClasses(nodeProps.className)

  const getImage = (node: Element): ComponentProps<"img"> | undefined => {
    let img
    if (node.name === "img") {
      const attribs = node.attribs
      attribs.width = attribs.width || attribs["data-width"]
      attribs.height = attribs.height || attribs["data-height"]
      return attribs
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          img = getImage(child)
          if (img) return img
        }
      }
    }
  }
  const getFigCaption = (node: Element): DOMNode[] | undefined => {
    let caption
    if (node.name === "figcaption") {
      return node.children as DOMNode[]
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          caption = getFigCaption(child)
          if (caption) return caption
        }
      }
    }
  }

  const getOembedUrl = (node: Element): string | undefined => {
    const src = node.attribs?.src || node.attribs["data-src"]
    if (src?.includes("/media/oembed")) {
      return decodeURIComponent(src)
        .replace(/^.*url=(.*)?&.*$/, "$1")
        .replace(/&.*$/, "")
    }
    if (node.children.length > 0) {
      let child
      for (child of node.children) {
        if (child instanceof Element) {
          const url: string | undefined = getOembedUrl(child)
          if (url) return url
        }
      }
    }
  }

  // Special handling of Oembeds
  const oembedUrl = getOembedUrl(node)
  if (oembedUrl) {
    return <Oembed url={oembedUrl} />
  }

  const image = getImage(node)
  if (image) {
    let {src} = image
    const {alt, width, height} = image
    if (typeof src !== "string" || !src) return

    if (src?.startsWith("/")) {
      src = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + src
    }
    const figCaption = getFigCaption(node)

    if (figCaption) {
      nodeProps.className = cn("table", nodeProps.className)
      if (nodeProps.className?.includes("mx-auto")) nodeProps.className += " w-full"
      delete nodeProps.role
      return (
        <figure {...nodeProps}>
          <WysiwygImage src={src} alt={alt} height={height} width={width} />
          <figcaption className="table-caption caption-bottom text-center">
            {domToReact(figCaption, options)}
          </figcaption>
        </figure>
      )
    }
    // Only the wrapper's classes carry over; its other attributes describe the media embed, not the image.
    return <WysiwygImage src={src} alt={alt} height={height} width={width} className={nodeProps.className} />
  }
  const NodeName: React.ElementType = node.name as React.ElementType
  return <NodeName {...nodeProps}>{domToReact(node.children as DOMNode[], options)}</NodeName>
}

/**
 * Plain `<img>` rather than `next/image` on purpose.
 *
 * Editors embed an image *style* derivative, so the file has already been resized by Drupal for
 * the context it appears in. Those urls carry a per-image `?itok=` hash, and Drupal returns 403
 * for a derivative requested without a valid token until the file exists on disk, so the token has
 * to survive to the browser intact. Sending it through the optimizer instead would mean either
 * loosening `images.remotePatterns` to accept any query string or dropping the token, and the
 * remaining win over an already-sized derivative is only the format conversion.
 */
const WysiwygImage = ({
  src,
  alt,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}) => (
  // eslint-disable-next-line @next/next/no-img-element -- see above
  <img
    src={src.trim()}
    alt={alt?.trim() || ""}
    loading="lazy"
    decoding="async"
    {...props}
    className={cn(fixClasses(className), "mb-25 h-auto max-w-full")}
  />
)

const formatHtml = (html: string) => parse(html || "", options)

export default Wysiwyg
