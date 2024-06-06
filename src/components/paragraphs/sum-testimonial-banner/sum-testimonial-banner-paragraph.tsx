import React, {HtmlHTMLAttributes} from "react"
import {ParagraphSumTestimonial} from "@lib/gql/__generated__/drupal.d"

import {twMerge} from "tailwind-merge"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {clsx} from "clsx"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import YoutubeVideoPill from "@components/elements/youtube-video-pill"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumTestimonial
}

const SumTestimonialBannerParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const leftText = !!behaviors.sum_testimonial_banner?.sum_testimonial_banner_align

  return (
    <article
      {...props}
      className={twMerge("relative left-1/2 grid w-screen -translate-x-1/2 auto-rows-fr @container xl:grid-cols-2", props.className)}
      aria-labelledby={paragraph.id}
    >
      <div
        className={twMerge(
          "relative h-full w-full border-white",
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
          sizes="50vw"
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
              "absolute h-[600px] w-[300px]",
              clsx({
                "-top-[300px] right-[calc(50%-150px)] xl:-left-[150px] xl:top-[calc(50%-300px)]": leftText,
                "-bottom-[300px] right-[calc(50%-150px)] xl:-right-[150px] xl:bottom-[calc(50%-300px)]": !leftText,
              })
            )}
          />
        )}
      </div>

      <div
        className={twMerge(
          "border-white bg-poppy-light",
          clsx({
            "border-b-2 xl:border-b-0 xl:border-r-2": leftText,
            "border-t-2 xl:border-l-2 xl:border-t-0": !leftText,
            "pb-[200px] pt-32 xl:py-32": leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
            "pb-32 pt-[200px] xl:py-32": !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaImage",
            "pb-[300px] pt-32 xl:py-32": leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
            "pb-32 pt-[300px] xl:py-32": !leftText && paragraph.sumTestimonialHsVideo.__typename === "MediaVideo",
            "bg-olive": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "olive",
            "bg-spirited": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited",
            "bg-white": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "white",
            "bg-spirited-dark": behaviors.sum_testimonial_banner?.sum_testimonial_banner_overlay_bkg === "spirited_dark",
          })
        )}
      >
        <div
          className={twMerge(
            "centered xl:max-w-7xl",
            clsx({
              "xl:mr-0 xl:pl-32 xl:pr-[200px]": leftText,
              "xl:ml-0 xl:pl-[200px] xl:pr-32": !leftText,
            })
          )}
        >
          <H2
            id={paragraph.id}
            className={twMerge(
              "font-light",
              clsx({
                "text-m4": behaviors.sum_testimonial_banner?.sum_testimonial_banner_heading === "type_4",
              })
            )}
          >
            {paragraph.sumTestimonialHeading}
          </H2>

          <Wysiwyg html={paragraph.sumTestimonialDescrip.processed} />

          {paragraph.sumTestimonialName && <div>{paragraph.sumTestimonialName}</div>}

          {(paragraph.sumTestimonialUniv || paragraph.sumTestimonialType) && <div>{`${paragraph.sumTestimonialUniv || ""} ${paragraph.sumTestimonialType || ""}`.trim()}</div>}
          {paragraph.sumTestimonialAffi && <div>{paragraph.sumTestimonialAffi}</div>}

          {paragraph.sumTestimonialButton?.url && <Button href={paragraph.sumTestimonialButton.url}>{paragraph.sumTestimonialButton.title}</Button>}
        </div>
      </div>
    </article>
  )
}
export default SumTestimonialBannerParagraph