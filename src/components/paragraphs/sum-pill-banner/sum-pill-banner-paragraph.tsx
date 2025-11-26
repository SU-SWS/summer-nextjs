import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordCard, ParagraphSumPillBanner} from "@lib/gql/__generated__/drupal.d"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import Image from "next/image"
import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {clsx} from "clsx"
import ActionLink from "@components/elements/action-link"
import {getIdAttribute} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumPillBanner
}

const SumPillBannerParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const Element = paragraph.sumPillBannerHeadline ? "article" : "div"
  const id = paragraph.sumPillBannerHeadline ? getIdAttribute(paragraph.sumPillBannerHeadline) : undefined

  return (
    <Element
      {...props}
      className={twMerge("relative left-1/2 !mt-0 w-screen -translate-x-1/2", props.className)}
      aria-labelledby={paragraph.sumPillBannerHeadline ? id : undefined}
    >
      {paragraph.sumPillBannerBkgd && (
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <div className="relative h-full w-full">
            <Image
              className="object-cover"
              src={paragraph.sumPillBannerBkgd.mediaImage.url}
              alt={paragraph.sumPillBannerBkgd.mediaImage.alt || ""}
              fill
              sizes="(max-width: 1500px) 1500px, 100vw"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-20">
        <div
          className={twMerge(
            "rs-pt-10 w-full bg-poppy-light pb-96 text-center lg:last:*:rs-mb-5",
            clsx({
              "bg-olive": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "olive",
              "bg-spirited text-black-true":
                behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited",
              "bg-white": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "white",
              "bg-spirited-dark": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
              "text-black-true": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited",
              "text-white": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
            })
          )}
        >
          <div className="gutters">
            <div className="flex flex-col">
              {paragraph.sumPillBannerHeadline && (
                <H2 id={id} className="mb-8 font-light">
                  {paragraph.sumPillBannerHeadline}
                </H2>
              )}

              {paragraph.sumPillBannerSuphead && (
                <div className="order-first mb-8">{paragraph.sumPillBannerSuphead}</div>
              )}
            </div>

            <Wysiwyg
              html={paragraph.sumPillBannerDescrip?.processed}
              className="mx-auto w-full max-w-full sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px]"
            />

            {paragraph.sumPillBannerLink?.url && (
              <ActionLink
                href={paragraph.sumPillBannerLink.url}
                className={twMerge(
                  "rs-mt-3 mx-auto text-black-true hocus:text-black-true",
                  clsx({
                    "text-white hocus:text-white":
                      behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
                  })
                )}
              >
                {paragraph.sumPillBannerLink.title}
              </ActionLink>
            )}
          </div>
        </div>

        {paragraph.sumPillBannerCards && (
          <div className="rs-mb-8 centered -mt-96 flex w-full flex-col gap-20 lg:flex-row">
            {paragraph.sumPillBannerCards.map(card => (
              <PillBannerCard key={card.uuid} card={card} headingLevel={Element === "div" ? "h2" : "h3"} />
            ))}
          </div>
        )}
      </div>
    </Element>
  )
}

const PillBannerCard = ({card, headingLevel}: {card: ParagraphStanfordCard; headingLevel: "h2" | "h3"}) => {
  const cardCopy = {...card}
  const cardBehaviors = getParagraphBehaviors(cardCopy)
  cardBehaviors.su_card_styles = {
    ...(cardBehaviors.su_card_styles || {}),
    heading: headingLevel,
    sum_card_variant: "pill",
    sum_card_bg_color_variant: false,
  }
  cardCopy.behaviors = JSON.stringify(cardBehaviors)
  return <CardParagraph paragraph={cardCopy} />
}

export default SumPillBannerParagraph
