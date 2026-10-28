import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/graphql"

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
      className={cn("@container relative h-full max-h-fit overflow-hidden md:min-h-[400px]", props.className)}
    >
      <div className="absolute -z-50 aspect-video w-full bg-white 4xl:h-full">
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
          className={cn("relative h-full w-full border-black bg-white clip-arc", {
            "overflow-hidden bg-black-true before:absolute before:top-[4px] before:left-0 before:z-[1] before:h-[calc(100%-2px)] before:w-full before:bg-white before:content-[''] before:clip-arc 4xl:before:top-[2px]":
              isBorder,
          })}
        />
      </div>
      {children && (
        <div className="z-30 items-center pt-[150px] md:pt-[250px] xl:pt-[350px] 2xl:pt-[400px]">{children}</div>
      )}
    </BannerWrapper>
  )
}
export default ArcBanner
