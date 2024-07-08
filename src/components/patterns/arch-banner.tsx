import React, {ElementType, HtmlHTMLAttributes} from "react"
import Image from "next/image"
import {twMerge} from "tailwind-merge"
import {Maybe} from "@lib/gql/__generated__/drupal"

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
}

const ArchBanner = ({imageUrl, imageAlt, isSection, children, ...props}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div"

  return (
    <BannerWrapper
      {...props}
      className={twMerge("relative md:min-h-[400px]", props.className)}
    >
      <div className="absolute left-0 top-0 -z-50 h-1/4 w-full md:h-1/2 xl:h-3/4 2xl:h-full">
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
        <div className="clip-arc mt-10 h-full w-full bg-white md:mt-28" />
      </div>

      {children && <div className="items-center pt-72 md:pt-96">{children}</div>}
    </BannerWrapper>
  )
}
export default ArchBanner
