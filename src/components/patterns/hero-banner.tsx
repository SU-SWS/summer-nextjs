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
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
  /**
   * Position of the text over the image.
   */
  overlayPosition?: Maybe<"left" | "right">
  /**
   * Additional card overlap classes
   */
  cardClassName?: Maybe<string>
}

const HeroBanner = ({
  imageUrl,
  imageAlt,
  eagerLoadImage,
  isSection,
  overlayPosition,
  children,
  cardClassName,
  ...props
}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={cn(
        "@container relative left-1/2 rs-mb-5 flex w-screen -translate-x-1/2 flex-col lg:block lg:min-h-[400px]",
        props.className
      )}
    >
      <div className="relative order-2 aspect-video w-full bg-cool-grey lg:absolute lg:h-full">
        {imageUrl && (
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        )}
      </div>

      {children && (
        <div
          className={cn(
            "relative order-1 flex w-full flex-col bg-white rs-py-8 rs-px-5 lg:z-10 lg:w-[calc(50%_-_5rem)]",
            {
              "lg:mr-50 lg:ml-auto": overlayPosition === "right",
              "lg:mr-auto lg:ml-50": overlayPosition !== "right",
            },
            cardClassName
          )}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  )
}
export default HeroBanner
