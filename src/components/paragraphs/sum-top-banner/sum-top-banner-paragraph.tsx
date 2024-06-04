import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTopBanner} from "@lib/gql/__generated__/drupal.d"
import {H1} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {twMerge} from "tailwind-merge"
import HeroBanner from "@components/patterns/hero-banner"

import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import {clsx} from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTopBanner
  pageTitle: string
}

const SumTopBannerParagraph = ({paragraph, pageTitle, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)

  return (
    <div
      {...props}
      className={twMerge("mb-32", props.className)}
    >
      <HeroBanner
        className="mb-0"
        imageUrl={paragraph.sumTopBannerImage?.mediaImage.url}
        imageAlt={paragraph.sumTopBannerImage?.mediaImage.alt}
        overlayPosition={behaviors.hero_pattern?.overlay_position}
        eagerLoadImage
      >
        <div className={twMerge("flex flex-col md:min-h-[400px]", clsx({"pb-96": !!paragraph.sumTopBannerCards}))}>
          {pageTitle && (
            <div className="order-2">
              <H1>{pageTitle}</H1>
            </div>
          )}

          {paragraph.sumTopBannerSuperhead && <div className="order-1 text-09em font-semibold">{paragraph.sumTopBannerSuperhead}</div>}

          <Wysiwyg
            html={paragraph.sumTopBannerDescrip?.processed}
            className="order-3 text-m0"
          />

          {paragraph.sumTopBannerLink?.url && (
            <div className="order-4">
              <Button href={paragraph.sumTopBannerLink.url}>{paragraph.sumTopBannerLink.title}</Button>
            </div>
          )}
        </div>
      </HeroBanner>

      {paragraph.sumTopBannerCards && (
        <div className="centered relative z-10 -mt-96 flex flex-col gap-32 xl:flex-row">
          {paragraph.sumTopBannerCards.map(card => (
            <CardParagraph
              key={card.id}
              paragraph={card}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default SumTopBannerParagraph
