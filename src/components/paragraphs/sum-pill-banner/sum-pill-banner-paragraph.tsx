import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumPillBanner} from "@lib/gql/__generated__/drupal.d"
import {H2} from "@components/elements/headers"
import Link from "@components/elements/link"
import Wysiwyg from "@components/elements/wysiwyg"
import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import Image from "next/image"
import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {clsx} from "clsx"
import ActionLink from "@components/elements/action-link"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumPillBanner
}

const SumPillBannerParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const Element = paragraph.sumPillBannerHeadline ? "article" : "div"

  return (
    <Element
      {...props}
      className={twMerge("relative left-1/2 w-screen -translate-x-1/2", props.className)}
      aria-labelledby={paragraph.sumPillBannerHeadline ? paragraph.id : undefined}
    >
      {paragraph.sumPillBannerBkgd && (
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <div className="relative h-full w-full">
            <Image
              className="object-cover"
              src={paragraph.sumPillBannerBkgd.mediaImage.url}
              alt={paragraph.sumPillBannerBkgd.mediaImage.alt || ""}
              fill
              sizes="100vw"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-20">
        <div
          className={twMerge(
            ":lgpb-96 rs-py-10 w-full bg-poppy-light text-center",
            clsx({
              "bg-olive": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "olive",
              "bg-spirited text-black-true": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited",
              "bg-white": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "white",
              "bg-spirited-dark": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
              "text-black-true": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited",
              "text-white": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
            })
          )}
        >
          <div className="flex flex-col">
            {paragraph.sumPillBannerHeadline && (
              <H2
                id={paragraph.id}
                className="mb-8 font-light"
              >
                {paragraph.sumPillBannerHeadline}
              </H2>
            )}

            {paragraph.sumPillBannerSuphead && <div className="order-first mb-8">{paragraph.sumPillBannerSuphead}</div>}
          </div>

          <Wysiwyg
            html={paragraph.sumPillBannerDescrip?.processed}
            className="mx-auto w-full max-w-full sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px]"
          />

          {paragraph.sumPillBannerLink?.url && (
            <div className="rs-mt-3">
              <ActionLink
                href={paragraph.sumPillBannerLink.url}
                className={twMerge(
                  "text-archway-dark no-underline hocus:text-archway-dark hocus:underline",
                  clsx({
                    "text-black-true hocus:text-black-true": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited",
                    "text-white hocus:text-white": behaviors.sum_pill_banner_behaviors?.sum_pill_banner_overlay_bkg === "spirited_dark",
                  })
                )}
              >
                {paragraph.sumPillBannerLink.title}
              </ActionLink>
            </div>
          )}
        </div>

        {paragraph.sumPillBannerCards && (
          <div className="cc rs-mb-8 flex flex-col gap-20 lg:-mt-96 lg:flex-row">
            {paragraph.sumPillBannerCards.map(card => (
              <CardParagraph
                key={card.id}
                paragraph={card}
              />
            ))}
          </div>
        )}
      </div>
    </Element>
  )
}
export default SumPillBannerParagraph
