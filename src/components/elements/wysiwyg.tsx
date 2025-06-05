import {Table, Thead, Tbody, Tr, Th, Td} from "@components/elements/tables"
import Link from "@components/elements/link"
import parse, {HTMLReactParserOptions, Element, domToReact, attributesToProps, DOMNode} from "html-react-parser"
import Image from "next/image"
import Oembed from "@components/elements/ombed"
import React, {ComponentProps, HtmlHTMLAttributes} from "react"
import {H2, H3, H4, H5, H6} from "@components/elements/headers"
import {twMerge} from "tailwind-merge"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import Mathjax from "@components/tools/mathjax"
import Script from "next/script"
import {ApplyNowLink} from "./apply-now-link"
import "../../styles/form.css"
import clsx from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * HTML string.
   */
  html?: Maybe<string>
}

const Wysiwyg = ({html, className, ...props}: Props) => {
  if (!html) return
  // Remove comments and empty lines.
  html = html.replaceAll(/<!--[\s\S]*?-->/g, "").replaceAll(/(^(\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm, "")

  const addMathJax = html.match(/\$\$.*\$\$/) || html.match(/\\\[.*\\\]/) || html.match(/\\\(.*\\\)/)
  return (
    <div
      className={twMerge(
        "wysiwyg w-full md:max-w-[440px] lg:max-w-[536px] xl:max-w-[653px] 2xl:max-w-[725px]",
        className
      )}
      {...props}
    >
      {addMathJax && <Mathjax />}
      {formatHtml(html)}
    </div>
  )
}

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
            nodeProps.className = twMerge(
              nodeProps.className,
              "rs-pb-5 rs-pt-7 rs-px-1 border-l-3 border-archway-dark border-opacity-50"
            )
          }
          if (nodeProps.className?.includes("tight-spacing")) {
            nodeProps.className = twMerge(nodeProps.className, "*:!mt-0 *:!mb-6")
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
          nodeProps.className = twMerge(
            nodeProps.className,
            clsx({
              "type-0": !nodeProps?.className?.includes("type-"),
            })
          )
          return <NodeName {...nodeProps}>{domToReact(children, options)}</NodeName>

        case "script":
          return <Script {...nodeProps} strategy="lazyOnload"></Script>

        case "h2":
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
          nodeProps.className = twMerge(
            nodeProps.className,
            clsx({
              "list-lower-alpha": nodeProps?.type === "a",
              "list-upper-alpha": nodeProps?.type === "A",
              "list-lower-roman": nodeProps?.type === "i",
              "list-upper-roman": nodeProps?.type === "I",
            })
          )
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
    .replaceAll(" align-left ", " float-left mr-10 mb-10 ")
    .replaceAll(" align-right ", " float-right ml-10 mb-10 ")
    .replaceAll(" visually-hidden ", " sr-only ")
    .replaceAll(" font-splash ", " splash-text type-5 ")
    .replaceAll(" callout-text ", " font-bold type-3 ")
    .replaceAll(" related-text ", " shadow-lg border border-black-20 p-16 ")
    .replaceAll(
      " drop-cap ",
      " type-2 first-letter:font-bold first-letter:type-5 first-letter:float-left first-letter:mt-2 first-letter:mb-1 first-letter:mr-4 first-letter:leading-[0.9] "
    )
    .replaceAll(" intro-text ", " type-3 ")
    .replace(/ tablesaw.*? /g, " ")
    .replace(/ +/g, " ")
    .trim()

  classes = classes
    .split(" ")
    .filter(className => className.trim().length >= 1)
    .join(" ")

  return twMerge(classes.trim())
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
      nodeProps.className = twMerge("table", nodeProps.className)
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
    return <WysiwygImage src={src} alt={alt} height={height} width={width} {...nodeProps} />
  }
  const NodeName: React.ElementType = node.name as React.ElementType
  return <NodeName {...nodeProps}>{domToReact(node.children as DOMNode[], options)}</NodeName>
}

const WysiwygImage = ({
  src,
  alt,
  height,
  width,
  className,
}: {
  src: string
  alt?: Maybe<string>
  height?: Maybe<string | number>
  width?: Maybe<string | number>
  className?: string
}) => {
  if (width && height) {
    return (
      <Image
        className={twMerge(fixClasses(className), "mb-10")}
        src={src.trim()}
        alt={alt ? alt.trim() : ""}
        height={parseInt(`${height}`)}
        width={parseInt(`${width}`)}
      />
    )
  }
  return (
    <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden">
      <Image
        className="object-cover object-center"
        src={src.trim()}
        alt={alt?.trim() || ""}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, (max-width: 1700px) 33vw, 1500px"
      />
    </div>
  )
}

const formatHtml = (html: string) => parse(html || "", options)

export default Wysiwyg
