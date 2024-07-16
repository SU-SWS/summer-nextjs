import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTopBanner} from "@lib/gql/__generated__/drupal.d"
import {H1} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {twMerge} from "tailwind-merge"
import HeroBanner from "@components/patterns/hero-banner"

import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import {clsx} from "clsx"
import ActionLink from "@components/elements/action-link"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTopBanner
  pageTitle: string
}

const SumTopBannerParagraph = ({paragraph, pageTitle, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const bgColor = behaviors.sum_banner_behaviors?.sum_banner_overlay_bkg

  return (
    <div {...props} className={twMerge("mb-32", props.className)}>
      <HeroBanner
        cardClassName={clsx(
          "mb-0 border border-white border-b-0 border-x-0 border-b-4 lg:border-x-4 lg:border-y-0 bg-poppy-light",
          {
            "bg-olive-light": bgColor === "olive",
            "bg-spirited-light": bgColor === "spirited",
            "bg-spirited-dark text-white": bgColor === "spirited_dark",
          }
        )}
        imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
        imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
        overlayPosition={behaviors?.sum_top_banner_behaviors?.sum_top_banner_alignment || "right"}
        eagerLoadImage
      >
        <div className={twMerge("flex flex-col lg:min-h-[400px]", clsx({"lg:pb-96": !!paragraph.sumTopBannerCards}))}>
          {pageTitle && (
            <div className="order-2">
              <H1 className="rs-mb-3 type-5 font-normal lg:type-4">{pageTitle}</H1>
            </div>
          )}

          {paragraph.sumTopBannerSuperhead && (
            <div className="rs-mb-1 order-1 text-09em font-normal uppercase">{paragraph.sumTopBannerSuperhead}</div>
          )}

          <Wysiwyg html={paragraph.sumTopBannerDescrip?.processed} className="big-paragraph order-3" />

          {paragraph.sumTopBannerLink?.url && (
            <div className="rs-pt-2 order-4">
              <ActionLink
                className="btn block w-fit rounded-full bg-digital-red px-12 py-6 text-5xl font-normal text-white no-underline transition hocus:text-white hocus:underline"
                href={paragraph.sumTopBannerLink.url}
              >
                {paragraph.sumTopBannerLink.title}
              </ActionLink>
            </div>
          )}
        </div>
      </HeroBanner>

      {paragraph.sumTopBannerCards && (
        <div className="centered relative z-10 flex flex-col gap-32 children:w-2/3 lg:-mt-96 children:lg:w-full xl:flex-row">
          {paragraph.sumTopBannerCards.map(card => {
            const behaviors = getParagraphBehaviors(card)

            return (
              <CardParagraph
                key={card.id}
                paragraph={card}
                className={behaviors.su_card_styles?.sum_card_bg_color_variant ? "lg:mt-96" : ""}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
export default SumTopBannerParagraph
