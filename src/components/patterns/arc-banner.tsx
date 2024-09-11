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
      className={twMerge("relative z-0 h-full max-h-fit overflow-hidden @container md:min-h-[400px]", props.className)}
    >
      <div className="@6xl:aspect-auto absolute z-10 aspect-[16/9] w-full bg-white @6xl:absolute @6xl:h-full">
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
      </div>
      <div
        className={twMerge(
          "clip-arc absolute z-20 mt-10 hidden h-full max-h-[700px] w-full border-black bg-white md:mt-28 4xl:block",
          clsx({
            "before:clip-arc overflow-hidden bg-black-true before:absolute before:left-0 before:top-[2px] before:z-[1] before:h-[calc(100%-2px)] before:w-full before:bg-white before:content-['']":
              isBorder,
          })
        )}
      />
      <div className="block h-1/2 4xl:hidden">
        <div
          className={clsx(
            "rs-mt-8 absolute left-[-10%] z-20 box-border aspect-[2/1] h-fit min-h-[400px] w-[120%] rounded-t-full border-t border-archway-light bg-white",
            {"border-t-2": isBorder}
          )}
        />
      </div>
      {children && (
        <div
          className={clsx("relative z-50 mt-[150px] h-full rounded-t-full md:mt-[250px] xl:mt-[350px] 2xl:mt-[400px]", {
            "3xl:bg-transparent bg-white": !isBorder,
            "bg-transparent": isBorder,
          })}
        >
          {children}
        </div>
      )}
    </BannerWrapper>
  )
}
export default ArcBanner
