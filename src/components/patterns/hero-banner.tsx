import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import cn from "@lib/utils/className"
import {Maybe} from "@lib/gql/__generated__/drupal.d"

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
        "rs-mb-5 relative left-1/2 flex w-screen -translate-x-1/2 flex-col @container lg:block lg:min-h-[400px]",
        props.className
      )}
    >
      <div className="lg:aspect-auto relative order-2 aspect-[16/9] w-full bg-cool-grey lg:absolute lg:h-full">
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
            "rs-px-5 rs-py-8 relative order-1 flex w-full flex-col bg-white lg:z-10 lg:w-[calc(50%_-_5rem)]",
            {
              "lg:ml-auto lg:mr-20": overlayPosition === "right",
              "lg:ml-20 lg:mr-auto": overlayPosition !== "right",
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
