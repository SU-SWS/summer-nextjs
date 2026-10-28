import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTopBanner} from "@lib/gql/__generated__/graphql"
import {H1} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import cn from "@lib/utils/className"
import HeroBanner from "@components/patterns/hero-banner"

import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import ActionLink from "@components/elements/action-link"
import SumVideoParagraph from "@components/paragraphs/sum-video/video-paragraph"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTopBanner
  pageTitle: string
  isHome?: boolean
}

const SumTopBannerParagraph = ({paragraph, pageTitle, isHome, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const bgColor = behaviors.sum_top_banner_behavior?.sum_top_banner_overlay_bkg

  return (
    <div {...props} className={cn("mb-80", props.className)}>
      <HeroBanner
        cardClassName={cn(
          "mb-0 border border-x-0 border-b-0 border-b-4 border-white bg-poppy-light lg:border-x-4 lg:border-y-0",
          {
            "bg-olive-light": bgColor === "olive",
            "bg-spirited-light": bgColor === "spirited",
            "bg-spirited-dark text-white": bgColor === "spirited_dark",
            "lg:pb-240": !!paragraph.sumTopBannerCards,
          }
        )}
        imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
        imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
        overlayPosition={behaviors?.sum_top_banner_behavior?.sum_top_banner_alignment || "right"}
        eagerLoadImage
      >
        <div className={cn("flex flex-col lg:min-h-[400px]")}>
          <div className={cn("order-2", {"sr-only": isHome})}>
            <H1 className="rs-mb-3 type-5 font-normal">{pageTitle}</H1>
          </div>

          {paragraph.sumTopBannerSuperhead && (
            <div className="order-1 rs-mb-1 text-[.9em] font-normal uppercase">{paragraph.sumTopBannerSuperhead}</div>
          )}

          <Wysiwyg html={paragraph.sumTopBannerDescrip?.processed} className="order-3 big-paragraph" />

          {paragraph.sumTopBannerLink?.url && (
            <div className="order-4 rs-pt-2">
              <ActionLink
                className="btn rs-mt-5 rounded-full border-2 border-transparent bg-digital-red px-20 py-10 font-normal text-white transition hocus:border-white hocus:text-white"
                href={paragraph.sumTopBannerLink.url}
              >
                {paragraph.sumTopBannerLink.title}
              </ActionLink>
            </div>
          )}
        </div>
      </HeroBanner>

      {paragraph.sumTopBannerCards && (
        <div className="relative z-10 centered grid gap-25 *:w-full lg:-mt-240 lg:grid-cols-3 lg:gap-50">
          {paragraph.sumTopBannerCards.map(card => {
            const behaviors = getParagraphBehaviors(card)

            if (card.__typename === "ParagraphSumVideo") return <SumVideoParagraph key={card.uuid} paragraph={card} />
            if (card.__typename === "ParagraphStanfordCard")
              return (
                <CardParagraph
                  key={card.uuid}
                  paragraph={card}

                  className={behaviors.su_card_styles?.sum_card_bg_color_variant ? "lg:mt-240" : ""}
                />
              )
          })}
        </div>
      )}
    </div>
  )
}
export default SumTopBannerParagraph
