import React, {HtmlHTMLAttributes} from "react";
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d";
import {H2, H3, H4} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";
import {twMerge} from "tailwind-merge";
import HeroBanner from "@components/patterns/hero-banner";
import clsx from "clsx";
import ActionLink from "@components/elements/action-link";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph);
  const hasCard = paragraph.suBannerHeader || paragraph.suBannerButton || paragraph.suBannerBody || paragraph.suBannerSupHeader

  const headerTagChoice = (behaviors.hero_pattern?.heading || "h2").split(".", 2)
  const bgColor = behaviors.sum_banner_behaviors?.sum_banner_overlay_bkg
  const semiCircleButton = behaviors.sum_banner_behaviors?.sum_banner_button
  const headerTag = headerTagChoice[0]
  const headerClasses = headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "text-m2 font-bold")

  return (
    <HeroBanner
      {...props}
      cardColorClasses={clsx("mb-0 border border-white border-b-0 border-x-0 border-b-4 h-full min-h-[400px] md:border-x-4 md:border-y-0 bg-poppy-light",
      {
      "bg-olive-light": bgColor === "olive",
      "bg-spirited-light": bgColor === "spirited",
      "bg-spirited-dark": bgColor === "spirited_dark",
      }
    )}
      aria-labelledby={paragraph.suBannerHeader ? paragraph.id : undefined}
      imageUrl={paragraph.suBannerImage?.mediaImage.url}
      imageAlt={paragraph.suBannerImage?.mediaImage.alt}
      isSection={!!paragraph.suBannerHeader}
      overlayPosition={behaviors.sum_banner_behaviors?.sum_banner_alignment}
      eagerLoadImage={eagerLoadImage}
    >
      {hasCard &&
        <>
          {paragraph.suBannerHeader &&
            <div id={paragraph.id} className={twMerge("order-2", behaviors.hero_pattern?.hide_heading && "sr-only")}>
              {headerTag === "h2" &&
                <H2 className={twMerge(headerClasses, "font-normal rs-mb-3")}>{paragraph.suBannerHeader}</H2>}
              {headerTag === "h3" &&
                <H3 className={twMerge(headerClasses, "font-normal rs-mb-3")}>{paragraph.suBannerHeader}</H3>}
              {headerTag === "h4" &&
                <H4 className={twMerge(headerClasses, "font-normal rs-mb-3")}>{paragraph.suBannerHeader}</H4>}
              {headerTag === "div" &&
                <div className={twMerge(headerClasses, "font-normal rs-mb-3")}>{paragraph.suBannerHeader}</div>}
            </div>}

          {paragraph.suBannerSupHeader &&
            <div className="order-1 text-09em font-normal uppercase rs-mb-1">
              {paragraph.suBannerSupHeader}
            </div>}

          <Wysiwyg html={paragraph.suBannerBody?.processed} className="order-3 text-m0" />

          {paragraph.suBannerButton?.url && !semiCircleButton &&
          <div className="order-4">
            <ActionLink
                className="block w-fit btn bg-digital-red font-normal text-white hocus:text-white py-4 px-8 no-underline hocus:underline transition rounded-full"
                href={paragraph.suBannerButton.url}
              >
                {paragraph.suBannerButton.title}
              </ActionLink> 
            </div>
          }
          {paragraph.suBannerButton?.url && semiCircleButton &&
            <Link className="absolute bottom-0 right-0 bg-spirited-dark rounded-tl-full rounded-tr-full border-4 border-white border-b-0 font-normal text-white hocus:text-white rs-pb-0 rs-pt-2 rs-px-5 no-underline hocus:underline" href={paragraph.suBannerButton.url}>
              <span className="sr-only">{paragraph.suBannerButton.title}</span>
              <ArrowRightIcon width={60} className="inline-block" />
            </Link>
          }
      </>
      }
    </HeroBanner>
  )
}
export default BannerParagraph