import React, {HtmlHTMLAttributes, ElementType} from "react"
import {ParagraphStanfordBanner} from "@lib/gql/__generated__/drupal.d"
import {H2, H3, H4} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {twMerge} from "tailwind-merge"
import clsx from "clsx"
import ActionLink from "@components/elements/action-link"
import Link from "next/link"
import {ArrowRightIcon} from "@heroicons/react/24/outline"
import Image from "next/image"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordBanner
  eagerLoadImage?: boolean
}

const BannerParagraph = ({paragraph, eagerLoadImage, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const hasCard =
    paragraph.suBannerHeader || paragraph.suBannerButton || paragraph.suBannerBody || paragraph.suBannerSupHeader

  const headerTagChoice = (behaviors.hero_pattern?.heading || "h2").split(".", 2)
  const bgColor = behaviors.sum_banner_behaviors?.sum_banner_overlay_bkg
  const semiCircleButton = behaviors.sum_banner_behaviors?.sum_banner_button
  const headerTag = headerTagChoice[0]
  const headerClasses = headerTagChoice[1]?.replace(".", " ").replace("su-font-splash", "type-3 font-bold")
  const overlayPosition = behaviors.hero_pattern?.overlay_position
  const isSection = !!paragraph.suBannerHeader
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      aria-labelledby={paragraph.suBannerHeader ? paragraph.id : undefined}
      className="relative left-1/2 !mt-0 flex w-screen -translate-x-1/2 flex-col @container md:min-h-[400px] lg:block"
    >
      {hasCard && (
        <div
          className={twMerge(
            "rs-px-5 rs-pb-8 rs-pt-10 relative mb-0 flex h-full min-h-[400px] w-full flex-col border-b-4 border-white bg-poppy-light lg:z-10 lg:w-[calc(50%_-_5rem)] lg:border-4 lg:border-y-0",
            clsx({
              "lg:ml-auto lg:mr-20": overlayPosition === "right",
              "lg:ml-20 lg:mr-auto": overlayPosition !== "right",
              "bg-olive-light": bgColor === "olive",
              "bg-spirited-light": bgColor === "spirited",
              "bg-spirited-dark text-white": bgColor === "spirited_dark",
            })
          )}
        >
          {paragraph.suBannerHeader && (
            <div id={paragraph.id} className={behaviors.hero_pattern?.hide_heading ? "sr-only" : undefined}>
              {headerTag === "h2" && <H2 className={twMerge(headerClasses, "rs-mb-3")}>{paragraph.suBannerHeader}</H2>}
              {headerTag === "h3" && <H3 className={twMerge(headerClasses, "rs-mb-3")}>{paragraph.suBannerHeader}</H3>}
              {headerTag === "h4" && <H4 className={twMerge(headerClasses, "rs-mb-3")}>{paragraph.suBannerHeader}</H4>}
              {headerTag === "div" && (
                <div className={twMerge(headerClasses, "rs-mb-3")}>{paragraph.suBannerHeader}</div>
              )}
            </div>
          )}

          {paragraph.suBannerSupHeader && (
            <div className="rs-mb-1 order-first text-09em font-normal uppercase">{paragraph.suBannerSupHeader}</div>
          )}

          <Wysiwyg html={paragraph.suBannerBody?.processed} className="big-paragraph" />

          {paragraph.suBannerButton?.url && !semiCircleButton && (
            <div className="rs-pt-2">
              <ActionLink
                className="btn flex w-fit items-center rounded-full border-2 border-transparent bg-digital-red px-8 py-4 font-normal text-white transition hocus:border-white hocus:text-white"
                href={paragraph.suBannerButton.url}
              >
                {paragraph.suBannerButton.title}
              </ActionLink>
            </div>
          )}
        </div>
      )}
      <div className="lg:aspect-auto relative aspect-[16/9] w-full bg-cool-grey lg:absolute lg:top-0 lg:h-full">
        {paragraph.suBannerImage?.mediaImage && (
          <Image
            className="object-cover"
            src={paragraph.suBannerImage?.mediaImage.url}
            alt={paragraph.suBannerImage?.mediaImage.alt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        )}
        <div className="rs-pr-1 absolute top-0 z-50 flex w-screen justify-end lg:bottom-0 lg:left-0 lg:top-auto lg:justify-center lg:p-0">
          {paragraph.suBannerButton?.url && semiCircleButton && (
            <Link
              className="group flex aspect-[2/1] h-fit w-[210px] items-start justify-center rounded-bl-full rounded-br-full border-4 border-b-4 border-t-0 border-white bg-spirited-dark text-white hocus:text-white md:w-[250px] lg:items-end lg:rounded-b-none lg:rounded-tl-full lg:rounded-tr-full lg:border-b-0 lg:border-t-4 2xl:w-[300px]"
              href={paragraph.suBannerButton.url}
            >
              <span className="sr-only">{paragraph.suBannerButton.title}</span>
              <ArrowRightIcon
                width={60}
                className="mt-10 inline-block w-[45px] border-b-2 border-transparent group-hocus:border-white lg:mb-10 lg:mt-0 2xl:mb-16 2xl:w-[60px]"
              />
            </Link>
          )}
        </div>
      </div>
    </BannerWrapper>
  )
}
export default BannerParagraph
