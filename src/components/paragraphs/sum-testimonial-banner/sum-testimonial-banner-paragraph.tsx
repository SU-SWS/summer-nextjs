import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTestimonial} from "@lib/gql/__generated__/drupal.d"

import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {clsx} from "clsx"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import YoutubeVideoPill from "@components/elements/youtube-video-pill"
import ActionLink from "@components/elements/action-link"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTestimonial
}

const SumTestimonialBannerParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const leftText = !!behaviors.sum_testimonial_banner?.sum_testimonial_banner_align

  let studentType
  switch (paragraph.sumTestimonialType) {
    case "sum_undergraduate_student":
      studentType = "Undergraduate Student"
      break
    case "sum_high_school":
      studentType = "High School"
      break
    case "sum_graduate":
      studentType = "Graduate"
      break
    case "sum_gap_year":
      studentType = "Gap Year"
      break
    case "sum_current_stanford_students":
      studentType = "Current Stanford Students"
      break
  }

  return (
    <article
      {...props}
      className={twMerge(
        "relative left-1/2 !mt-0 grid w-screen -translate-x-1/2 @container xl:grid-cols-3",
        props.className
      )}
      aria-labelledby={paragraph.id}
    >
      <div
        className={twMerge(
          "relative h-[257px] w-full border-white lg:h-full xl:col-span-1",
          clsx({
            "order-last border-t-2 xl:border-l-2 xl:border-t-0": leftText,
            "border-b-2 xl:border-b-0 xl:border-r-2": !leftText,
          })
        )}
      >
        <Image
          className="object-cover"
          src={paragraph.sumTestimonialBkgImg.mediaImage.url}
          alt={paragraph.sumTestimonialBkgImg.mediaImage.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {paragraph.sumTestimonialHsVideo.__typename === "MediaImage" && (
          <div
            className={twMerge(
              "absolute aspect-1 w-[300px] overflow-hidden rounded-full border-4 border-white",
              clsx({
                "-top-[150px] right-[calc(50%-150px)] xl:-left-[150px] xl:top-[calc(50%-150px)]": leftText,
                "-bottom-[150px] right-[calc(50%-150px)] xl:-right-[150px] xl:bottom-[calc(50%-150px)]": !leftText,
              })
            )}
          >
            <Image
              className="object-cover"
              src={paragraph.sumTestimonialHsVideo.mediaImage.url}
              alt={paragraph.sumTestimonialHsVideo.mediaImage.alt || ""}
              fill
              sizes="400px"
            />
          </div>
        )}

        {paragraph.sumTestimonialHsVideo.__typename === "MediaVideo" && (
          <YoutubeVideoPill
            videoUrl={paragraph.sumTestimonialHsVideo.mediaOembedVideo}
            className={twMerge(
              "absolute h-[538px] w-[308px] rounded-full border-4 border-white",
              clsx({
                "-top-[269px] right-[calc(50%-150px)] xl:-left-[150px] xl:top-[calc(50%-269px)]": leftText,
                "-bottom-[269px] right-[calc(50%-150px)] xl:-right-[150px] xl:bottom-[calc(50%-269px)]": !leftText,
              })
            )}
          />
        )}
      </div>

      <div
        className={twMerge(
          "border-white bg-poppy-light xl:col-span-2",
          clsx({
            "border-b-2 xl:border-b-0 xl:border-r-2": leftText,
            "border-t-2 xl:border-l-2 xl:border-t-0": !leftText,
            "rs-pb-9 rs-pt-10": paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
            "rs-pt-10 rs-pb-10": paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
            "bg-olive": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "olive",
            "bg-spirited text-black-true":
              behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited",
            "bg-white": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "white",
            "bg-spirited-dark text-white":
              behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited_dark",
          })
        )}
      >
        <div
          className={twMerge(
            "xl:max-w-10xl centered",
            clsx({
              "xl:rs-pl-10 xl:mr-0 xl:pr-[200px]": leftText,
              "xl:rs-pr-10 xl:ml-0 xl:pl-[200px]": !leftText,
            })
          )}
        >
          <H2
            id={paragraph.id}
            className={twMerge(
              "rs-mb-3 font-light",
              behaviors.sum_testimonial_banner?.sum_testimonial_banner_heading === "type_4" ? "type-4" : "type-5"
            )}
          >
            {paragraph.sumTestimonialHeading}
          </H2>

          <Wysiwyg className="rs-mb-3" html={paragraph.sumTestimonialDescrip.processed} />

          {paragraph.sumTestimonialName && <div className="font-19">{paragraph.sumTestimonialName}</div>}

          {(paragraph.sumTestimonialUniv || studentType) && (
            <div className="font-19">{`${paragraph.sumTestimonialUniv || ""} ${studentType || ""}`.trim()}</div>
          )}
          {paragraph.sumTestimonialAffi && <div className="font-19">{paragraph.sumTestimonialAffi}</div>}

          {paragraph.sumTestimonialButton?.url && (
            <ActionLink
              className="btn rs-mt-5 block w-fit rounded-full bg-digital-red px-12 py-6 text-5xl font-normal text-white no-underline transition hocus:text-white hocus:underline"
              href={paragraph.sumTestimonialButton.url}
            >
              {paragraph.sumTestimonialButton.title}
            </ActionLink>
          )}
        </div>
      </div>
    </article>
  )
}
export default SumTestimonialBannerParagraph
