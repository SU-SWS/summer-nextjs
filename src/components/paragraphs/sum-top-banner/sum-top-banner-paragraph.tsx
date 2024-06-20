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
  const bgColor = behaviors.sum_banner_behaviors?.sum_banner_overlay_bkg || "olive"

  return (
    <div
      {...props}
      className={twMerge("mb-32", props.className)}
    >
      <HeroBanner
        cardColorClasses={clsx("mb-0 border border-white border-b-0 border-x-0 border-b-4 lg:border-x-4 lg:border-y-0 bg-poppy-light",
          {
          "bg-olive-light": bgColor === "olive",
          "bg-spirited-light": bgColor === "spirited",
          "bg-spirited-dark": bgColor === "spirited_dark",
          }
        )}
        imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
        imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
        overlayPosition={behaviors.hero_pattern?.overlay_position}
        eagerLoadImage
      >
        <div className={twMerge("flex flex-col lg:min-h-[400px]", clsx({ "lg:pb-96": !!paragraph.sumTopBannerCards }))}>
          {pageTitle && (
            <div className="order-2">
              <H1 className="type-5 lg:type-4 rs-mb-3 font-normal">{pageTitle}</H1>
            </div>
          )}

          {paragraph.sumTopBannerSuperhead && <div className="order-1 text-09em font-normal uppercase rs-mb-1">{paragraph.sumTopBannerSuperhead}</div>}

          <Wysiwyg
            html={paragraph.sumTopBannerDescrip?.processed}
            className="order-3 text-m0"
          />

          {paragraph.sumTopBannerLink?.url && (
            <div className="order-4 rs-pt-2">
            <ActionLink
                className="block w-fit btn bg-digital-red font-normal text-5xl text-white hocus:text-white py-6 px-12 no-underline hocus:underline transition rounded-full"
                href={paragraph.sumTopBannerLink.url}
              >
                {paragraph.sumTopBannerLink.title}
              </ActionLink> 
            </div>
          )}
        </div>
      </HeroBanner>

      {paragraph.sumTopBannerCards && (
        <div className="centered relative z-10 lg:-mt-96 flex flex-col gap-32 xl:flex-row children:w-2/3 children:lg:w-full">
          {paragraph.sumTopBannerCards.map(card => (
            <CardParagraph
              key={card.id}
              paragraph={card}
              // @TODO If transparnt card type, add mt-96
              // className={}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default SumTopBannerParagraph
