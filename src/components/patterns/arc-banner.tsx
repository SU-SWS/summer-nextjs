import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import {twMerge} from "tailwind-merge"
import {Maybe} from "@lib/gql/__generated__/drupal"
import clsx from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Is the banner supposed to be a section or a div.
   */
  isSection?: Maybe<boolean>
  /**
   * Is the banner supposed to have a border outline.
   */
  isBorder?: Maybe<boolean | undefined>
}

const ArcBanner = ({imageUrl, imageAlt, isSection, isBorder, children, ...props}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={twMerge("relative md:min-h-[400px]", props.className)}
    >
      <div className="absolute left-0 top-0 -z-50 h-1/4 w-[calc(100vw+4px)] -translate-x-[2px] md:h-1/2 xl:h-3/4 2xl:h-full">
        {imageUrl && (
          <Image
            className="ed11y-ignore object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading="eager"
            fill
            sizes="100vw"
          />
        )}
        <div
          className={twMerge(
            "clip-arc relative mt-10 h-full w-full border-black bg-white md:mt-28",
            clsx({
              "before:clip-arc overflow-hidden bg-black-true before:absolute before:left-[2px] before:top-[2px] before:z-[1] before:h-[calc(100%-2px)] before:w-[calc(100%-4px)] before:bg-white before:content-['']": isBorder,
            })
          )}
        />
      </div>

      {children && <div className="items-center pt-72 md:pt-96">{children}</div>}
    </BannerWrapper>
  )
}
export default ArcBanner
