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
  /**
   * Eagerly load the banner image.
   */
  eagerLoadImage?: Maybe<boolean>
}

const ArchBanner = ({imageUrl, imageAlt, eagerLoadImage, isSection, children, ...props}: Props) => {
  const BannerWrapper: ElementType = isSection ? "section" : "div";

  return (
    <BannerWrapper
      {...props}
      className={twMerge("@container md:min-h-[400px] z-0 relative mb-[-10%] lg:mb-[-20%] 2xl:mb-[-30%]", props.className)}
    >
      <div className="aspect-[16/9] @6xl:aspect-auto absolute @6xl:absolute w-full @6xl:h-full bg-cool-grey">
        {imageUrl &&
          <Image
            className="object-cover"
            src={imageUrl}
            alt={imageAlt || ""}
            loading={eagerLoadImage ? "eager" : "lazy"}
            fill
            sizes="100vw"
          />
        }
      </div>

      {children &&
        <div className="w-[120%] left-[-10%] aspect-[2/1] box-border relative flex flex-col items-center rounded-t-full bg-white border-t border-archway-light pt-[20%] rs-mt-8">
          {children}
        </div>
      }
    </BannerWrapper>
  )
}
export default ArchBanner