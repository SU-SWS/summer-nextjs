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
        "relative left-1/2 !mt-0 grid w-screen -translate-x-1/2 @container lg:grid-cols-3",
        props.className
      )}
      aria-labelledby={paragraph.id}
    >
      <div
        className={twMerge(
          "relative h-[257px] w-full border-white lg:col-span-1 lg:h-full",
          clsx({
            "order-last border-t-2 lg:border-l-2 lg:border-t-0": leftText,
            "border-b-2 lg:border-b-0 lg:border-r-2": !leftText,
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
              "absolute flex h-fit w-full justify-center lg:h-full lg:w-fit lg:items-center",
              clsx({
                "left-0 top-[-100px] lg:top-0": leftText,
                "bottom-[100px] right-0 lg:bottom-0": !leftText,
              })
            )}
          >
            <div className="absolute aspect-1 w-[150px] overflow-hidden rounded-full border-4 border-white sm:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px]">
              <Image
                className="object-cover"
                src={paragraph.sumTestimonialHsVideo.mediaImage.url}
                alt={paragraph.sumTestimonialHsVideo.mediaImage.alt || ""}
                fill
                sizes="400px"
              />
            </div>
          </div>
        )}

        {paragraph.sumTestimonialHsVideo.__typename === "MediaVideo" && (
          <div
            className={twMerge(
              "absolute flex h-fit w-full justify-center lg:h-full lg:w-fit lg:items-center",
              clsx({
                "bottom-[30px] right-0 sm:bottom-[50px] lg:-left-[125px] lg:bottom-0 lg:top-0": leftText,
                "right-0 top-[30px] sm:top-[50px] lg:-right-[125px] lg:bottom-0 lg:top-0": !leftText,
              })
            )}
          >
            <YoutubeVideoPill
              videoUrl={paragraph.sumTestimonialHsVideo.mediaOembedVideo}
              className="aspect-[9/16] h-fit w-[250px] rounded-full border-4 border-white sm:w-[400px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px]"
            />
          </div>
        )}
      </div>

      <div
        className={twMerge(
          "border-white bg-poppy-light lg:col-span-2",
          clsx({
            "border-b-2 lg:border-b-0 lg:border-r-2": leftText,
            "border-t-2 lg:border-l-2 lg:border-t-0": !leftText,
            "rs-pt-10 pb-[150px] lg:rs-pb-9 md:pb-[200px]":
              leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
            "rs-pb-9 pt-[150px] lg:rs-pt-10 md:pt-[200px]":
              !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
            "rs-pt-9 pb-[250px] lg:rs-pb-10 sm:pb-[650px] md:pb-[520px] lg:pb-[250px]":
              leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
            "rs-pb-10 pt-[250px] lg:rs-pt-10 sm:pt-[650px] md:pt-[520px] lg:pt-[250px]":
              !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
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
            "centered sm:max-w-[440px] lg:max-w-full",
            clsx({
              "2xl:rs-pl-10 lg:mr-0 lg:pl-32 lg:pr-[200px] xl:pl-40 xl:pr-[250px] 4xl:ml-auto 4xl:w-2/3": leftText,
              "2xl:rs-pr-10 lg:ml-0 lg:pl-[200px] lg:pr-32 xl:pl-[250px] xl:pr-40": !leftText,
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
              className="btn rs-mt-5 rounded-full border-2 border-transparent bg-digital-red px-8 py-4 font-normal text-white transition hocus:border-white hocus:text-white"
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
