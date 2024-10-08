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
import SumVideoParagraph from "@components/paragraphs/sum-video/video-paragraph"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTopBanner
  pageTitle: string
}

const SumTopBannerParagraph = ({paragraph, pageTitle, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const bgColor = behaviors.sum_top_banner_behavior?.sum_top_banner_overlay_bkg

  return (
    <div {...props} className={twMerge("mb-32", props.className)}>
      <HeroBanner
        cardClassName={clsx(
          "mb-0 border border-white border-b-0 border-x-0 border-b-4 lg:border-x-4 lg:border-y-0 bg-poppy-light",
          {
            "bg-olive-light": bgColor === "olive",
            "bg-spirited-light": bgColor === "spirited",
            "bg-spirited-dark text-white": bgColor === "spirited_dark",
            "lg:pb-96": !!paragraph.sumTopBannerCards,
          }
        )}
        imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
        imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
        overlayPosition={behaviors?.sum_top_banner_behavior?.sum_top_banner_alignment || "right"}
        eagerLoadImage
      >
        <div className={twMerge("flex flex-col lg:min-h-[400px]")}>
          {pageTitle && (
            <div className="order-2">
              <H1 className="rs-mb-3 type-5 font-normal">{pageTitle}</H1>
            </div>
          )}

          {paragraph.sumTopBannerSuperhead && (
            <div className="rs-mb-1 order-1 text-09em font-normal uppercase">{paragraph.sumTopBannerSuperhead}</div>
          )}

          <Wysiwyg html={paragraph.sumTopBannerDescrip?.processed} className="big-paragraph order-3" />

          {paragraph.sumTopBannerLink?.url && (
            <div className="rs-pt-2 order-4">
              <ActionLink
                className="btn rs-mt-5 rounded-full border-2 border-transparent bg-digital-red px-8 py-4 font-normal text-white transition hocus:border-white hocus:text-white"
                href={paragraph.sumTopBannerLink.url}
              >
                {paragraph.sumTopBannerLink.title}
              </ActionLink>
            </div>
          )}
        </div>
      </HeroBanner>

      {paragraph.sumTopBannerCards && (
        <div className="centered relative z-10 grid gap-10 children:w-full lg:-mt-96 lg:grid-cols-3 lg:gap-20">
          {paragraph.sumTopBannerCards.map(card => {
            const behaviors = getParagraphBehaviors(card)

            if (card.__typename === "ParagraphSumVideo") return <SumVideoParagraph key={card.id} paragraph={card} />
            if (card.__typename === "ParagraphStanfordCard")
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
