import React, {HtmlHTMLAttributes, ElementType} from "react";
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d";
import {H2, H3, H4} from "@components/elements/headers";
import Wysiwyg from "@components/elements/wysiwyg";
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import ActionLink from "@components/elements/action-link";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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
  const overlayPosition = behaviors.sum_banner_behaviors?.sum_banner_alignment
  const isSection = !!paragraph.suBannerHeader
  const BannerWrapper: ElementType = isSection ? "section" : "div";

  return (
    <BannerWrapper
        {...props}
        aria-labelledby={paragraph.suBannerHeader ? paragraph.id : undefined}
      className="flex flex-col lg:block rs-mb-5 @container md:min-h-[400px] relative left-1/2 w-screen -translate-x-1/2"
    >
      <div className="order-2 lg:aspect-auto relative aspect-[16/9] w-full bg-cool-grey lg:absolute lg:h-full">
          <Image
            className="object-cover"
            src={paragraph.suBannerImage?.mediaImage.url || ""}
            alt={paragraph.suBannerImage?.mediaImage.alt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
        />
        <div className="absolute w-screen z-50 top-0 lg:top-auto lg:bottom-0 flex rs-pr-1 lg:pr-0 lg:pl-32 justify-end lg:justify-center">
          {paragraph.suBannerButton?.url && semiCircleButton &&
            <Link className="group h-fit bg-spirited-dark rounded-bl-full rounded-br-full lg:rounded-b-none lg:rounded-tl-full lg:rounded-tr-full border-white border-4 border-t-0 lg:border-t-4 border-b-4 lg:border-b-0 text-white hocus:text-white rs-pb-2 lg:rs-pb-0 rs-pt-0 lg:rs-pt-2 rs-px-5" href={paragraph.suBannerButton.url}>
              <span className="sr-only">{paragraph.suBannerButton.title}</span>
              <ArrowRightIcon width={60} className="border-b-2 border-transparent group-hocus:border-white inline-block" />
            </Link>
          }
        </div>
      </div>

      <div
        className={twMerge(
          "order-1 rs-py-8 rs-px-5 relative flex w-full flex-col shadow-lg bg-white lg:z-10 lg:w-1/2 mb-0 border-white border-b-4 lg:border-4 lg:border-y-0 h-full min-h-[400px] bg-poppy-light",
          clsx({
            "lg:ml-auto lg:mr-20": overlayPosition === "right",
            "lg:ml-20 lg:mr-auto": overlayPosition !== "right",
            "bg-olive-light": bgColor === "olive",
            "bg-spirited-light": bgColor === "spirited",
            "bg-spirited-dark": bgColor === "spirited_dark",
          }),
        )}
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
            <div className="order-4 rs-pt-2">
              <ActionLink
                  className="block w-fit btn bg-digital-red font-normal text-5xl text-white hocus:text-white py-6 px-12 no-underline hocus:underline transition rounded-full"
                  href={paragraph.suBannerButton.url}
                >
                  {paragraph.suBannerButton.title}
                </ActionLink> 
              </div>
            }
          </>
        }
      </div>
    </BannerWrapper>
  )
}
export default BannerParagraph