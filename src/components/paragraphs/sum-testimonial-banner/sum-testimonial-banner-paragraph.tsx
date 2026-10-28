import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTestimonial} from "@lib/gql/__generated__/graphql"

import cn from "@lib/utils/className"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import YoutubeVideoPill from "@components/elements/youtube-video-pill"
import ActionLink from "@components/elements/action-link"
import {getIdFromText} from "@lib/utils/text-tools"

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
      studentType = "Graduate Student"
      break
    case "sum_gap_year":
      studentType = "Gap Year"
      break
    case "sum_current_stanford_students":
      studentType = "Current Stanford Students"
      break
  }

  const id = getIdFromText(paragraph.sumTestimonialHeading)

  return (
    <article
      {...props}
      className={cn(
        "@container relative left-1/2 mt-0! grid w-screen -translate-x-1/2 border-t-4 border-t-white lg:grid-cols-3",
        props.className
      )}
      aria-labelledby={id}
    >
      <div
        className={cn("relative h-[257px] w-full border-white lg:col-span-1 lg:h-full", {
          "order-last border-t-2 lg:border-t-0 lg:border-l-2": leftText,
          "border-b-2 lg:border-r-2 lg:border-b-0": !leftText,
        })}
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
            className={cn("absolute flex h-fit w-full justify-center lg:h-full lg:w-fit lg:items-center", {
              "top-[-75px] left-0 sm:top-[-100px] lg:top-0": leftText,
              "right-0 bottom-[75px] sm:bottom-[100px] lg:bottom-0": !leftText,
            })}
          >
            <div className="absolute aspect-square w-[150px] overflow-hidden rounded-full border-4 border-white sm:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px]">
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
            className={cn("absolute flex h-fit w-full justify-center lg:h-full lg:w-fit lg:items-center", {
              "right-0 bottom-[30px] sm:bottom-[50px] lg:top-0 lg:bottom-0 lg:-left-[125px] xl:-left-[150px] 2xl:-left-[200px]":
                leftText,
              "top-[30px] right-0 sm:top-[50px] lg:top-0 lg:-right-[125px] lg:bottom-0 xl:-right-[150px] 2xl:-right-[200px]":
                !leftText,
            })}
          >
            <YoutubeVideoPill
              videoUrl={paragraph.sumTestimonialHsVideo.mediaOembedVideo}
              className="aspect-[9/16] h-fit w-[250px] rounded-full border-4 border-white sm:w-[400px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px]"
            />
          </div>
        )}
      </div>

      <div
        className={cn("border-white bg-poppy-light lg:col-span-2", {
          "border-b-2 lg:border-r-2 lg:border-b-0": leftText,
          "border-t-2 lg:border-t-0 lg:border-l-2": !leftText,
          "rs-pt-10 pb-[150px] md:pb-[200px]": leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
          "pt-[150px] rs-pb-9 md:pt-[200px]": !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
          "rs-pt-9 pb-[250px] sm:pb-[650px] md:pb-[520px] lg:rs-pb-10 lg:pb-[250px]":
            leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
          "pt-[250px] rs-pb-10 sm:pt-[650px] md:pt-[520px] lg:rs-pt-10 lg:pt-[250px]":
            !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
          "bg-olive": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "olive",
          "bg-spirited text-black-true":
            behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited",
          "bg-white": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "white",
          "bg-spirited-dark text-white":
            behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited_dark",
        })}
      >
        <div
          className={cn("centered sm:max-w-[440px] lg:max-w-full", {
            "lg:mr-0 lg:pr-[200px] lg:pl-80 xl:pr-[250px] xl:pl-100 4xl:ml-auto 4xl:w-2/3": leftText,
            "lg:ml-0 lg:pr-80 lg:pl-[200px] xl:pr-100 xl:pl-[250px]": !leftText,
          })}
        >
          <H2
            id={id}
            className={cn(
              "rs-mb-3 font-light",
              behaviors.sum_testimonial_banner?.sum_testimonial_banner_heading === "type_4" ? "type-4" : "type-5"
            )}
          >
            {paragraph.sumTestimonialHeading}
          </H2>

          <Wysiwyg className="rs-mb-3" html={paragraph.sumTestimonialDescrip.processed} />

          {paragraph.sumTestimonialName && <div>{paragraph.sumTestimonialName}</div>}

          {(paragraph.sumTestimonialUniv || studentType) && (
            <div>{`${paragraph.sumTestimonialUniv || ""} ${studentType || ""}`.trim()}</div>
          )}
          {paragraph.sumTestimonialAffi && <div>{paragraph.sumTestimonialAffi}</div>}

          {paragraph.sumTestimonialButton?.url && (
            <ActionLink
              className="btn rs-mt-5 rounded-full border-2 border-transparent bg-digital-red px-20 py-10 font-normal text-white transition hocus:border-white hocus:text-white"
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
