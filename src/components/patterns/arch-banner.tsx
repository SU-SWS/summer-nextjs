import React, {ElementType, HtmlHTMLAttributes} from "react";
import Image from "next/image";
import {twMerge} from "tailwind-merge";
import {Maybe} from "@lib/gql/__generated__/drupal";

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
  isSection?:Maybe<boolean>
}

const ArchBanner = ({imageUrl, imageAlt, isSection, children, ...props}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div";

  return (
    <BannerWrapper
      {...props}
      className={twMerge("md:min-h-[400px] relative", props.className)}
    >
      <div className="w-full h-1/4 md:h-1/2 xl:h-3/4 2xl:h-full absolute top-0 left-0 -z-50">
          {imageUrl &&
            <Image
              className="object-cover"
              src={imageUrl}
              alt={imageAlt || ""}
              loading="eager"
              fill
              sizes="100vw"
            />
          }
          <div className="w-full h-full bg-white clip-arc"/>
      </div>

      {children &&
        <div className="items-center pt-72">
          {children}
        </div>
      }
    </BannerWrapper>
  )
}
export default ArchBanner