import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordCard} from "@lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import ActionLink from "@components/elements/action-link"
import Button from "@components/elements/button"
import {twMerge} from "tailwind-merge"
import ImageCard from "@components/patterns/image-card"
import PillCard from "@components/patterns/pill-card"
import clsx from "clsx"
import {getIdAttribute} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordCard
  linkTabIndex?: number
}

const adjustHeadingType = (heading: "h2" | "h3" | "h4" | "div", size?: "larger" | "smaller"): number | undefined => {
  const headingTypes: Record<string, number> = {
    h2: 4,
    h3: 3,
    h4: 2,
  }
  if (!headingTypes[heading] || !size) return
  return size === "larger" ? headingTypes[heading] + 1 : headingTypes[heading] - 1
}

const CardParagraph = ({paragraph, linkTabIndex, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)

  const image = paragraph.suCardMedia?.__typename === "MediaImage" ? paragraph.suCardMedia.mediaImage : undefined
  const videoUrl =
    paragraph.suCardMedia?.__typename === "MediaVideo" ? paragraph.suCardMedia.mediaOembedVideo : undefined

  const headerTagChoice = (behaviors.su_card_styles?.heading || "h2").split(".", 2)
  const headerSize = behaviors.su_card_styles?.sum_card_heading_size
  const headerTag = headerTagChoice[0] as "h2" | "h3" | "h4" | "div"
  const headerType = adjustHeadingType(headerTag, headerSize)
  const headerClasses = twMerge(
    headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-3 mb-12") || "mb-12",
    clsx({
      "type-4": headerType === 4,
      "type-3": headerType === 3,
      "type-2": headerType === 2,
      "type-1": headerType === 1,
      "type-0": headerType === 0,
    })
  )
  const cardVariant = behaviors.su_card_styles?.sum_card_variant
  const hasBgColor = behaviors.su_card_styles?.sum_card_bg_color_variant
  const cardBgColor = cardVariant === "pill" ? behaviors.su_card_styles?.sum_card_pill_bg_color_variant : undefined

  const Element = cardVariant === "pill" ? PillCard : ImageCard
  const id = paragraph.suCardHeader ? getIdAttribute(paragraph.suCardHeader) : undefined
  const headerProps = {id, className: clsx(headerClasses, {"sr-only": behaviors.su_card_styles?.hide_heading})}

  return (
    <Element
      {...props}
      aria-labelledby={paragraph.suCardHeader ? id : undefined}
      imageUrl={image?.url}
      imageAlt={image?.alt}
      videoUrl={videoUrl}
      isArticle={!!paragraph.suCardHeader && headerTag !== "div"}
      bgColor={cardBgColor}
      hasBgColor={cardVariant !== "pill" ? hasBgColor : undefined}
      className={twMerge(
        "break-words sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px] xl:max-w-[980px]",
        props.className
      )}
    >
      {paragraph.suCardHeader && (
        <>
          {headerTag === "h2" && <H2 {...headerProps}>{paragraph.suCardHeader}</H2>}
          {headerTag === "h3" && <H3 {...headerProps}>{paragraph.suCardHeader}</H3>}
          {headerTag === "h4" && <H4 {...headerProps}>{paragraph.suCardHeader}</H4>}
          {headerTag === "div" && <div {...headerProps}>{paragraph.suCardHeader}</div>}
        </>
      )}

      {paragraph.suCardSuperHeader && (
        <div className="order-first mb-5 text-20 font-normal uppercase">{paragraph.suCardSuperHeader}</div>
      )}

      <Wysiwyg html={paragraph.suCardBody?.processed} className="*:big-paragraph" />

      {paragraph.suCardLink?.url && (
        <div className="rs-mt-2">
          {behaviors.su_card_styles?.link_style === "action" && (
            <ActionLink
              href={paragraph.suCardLink.url}
              className={clsx("font-roboto text-18 font-medium no-underline hocus:underline", {
                "text-archway-dark": cardVariant === "pill",
              })}
              tabIndex={linkTabIndex}
            >
              {paragraph.suCardLink.title}
            </ActionLink>
          )}

          {behaviors.su_card_styles?.link_style != "action" && (
            <Button href={paragraph.suCardLink.url} tabIndex={linkTabIndex}>
              {paragraph.suCardLink.title}
            </Button>
          )}
        </div>
      )}
    </Element>
  )
}

export default CardParagraph
