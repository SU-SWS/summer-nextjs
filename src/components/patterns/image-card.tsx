import Image from "next/image"
import Oembed from "@components/elements/ombed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@lib/gql/__generated__/drupal.d"
import clsx from "clsx"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLElement | HTMLDivElement> & {
  /**
   * Absolute image url path.
   */
  imageUrl?: Maybe<string>
  /**
   * Image alt string.
   */
  imageAlt?: Maybe<string>
  /**
   * Absolute url for the video, typically an oembed url.
   */
  videoUrl?: Maybe<string>
  /**
   * If the wrapper should be an article or a div, use an article if an appropriate heading is within the card.
   */
  isArticle?: Maybe<boolean>
  /**
   * If checked, the card content should have a background color
   */
  hasBgColor?: Maybe<boolean>
}

const ImageCard = ({imageUrl, imageAlt, videoUrl, isArticle, children, hasBgColor, ...props}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div"

  return (
    <CardWrapper
      {...props}
      className={twMerge(
        "rs-mb-5 centered w-full rounded-[25px] lg:mb-0 lg:max-w-[920px] lg:border-4 lg:border-white xl:max-w-[980px]",
        clsx({"bg-transparent": hasBgColor, "bg-fog-light": !hasBgColor}, props.className)
      )}
    >
      {imageUrl && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            className="rounded-t-[25px] object-cover object-center"
            src={imageUrl}
            alt={imageAlt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      )}

      {videoUrl && <Oembed url={videoUrl} />}

      <div className={clsx("flex flex-col", {"px-10 pb-20 pt-10 lg:px-20": !hasBgColor || (hasBgColor && imageUrl)})}>
        {children}
      </div>
    </CardWrapper>
  )
}

export const ImageCardSkeleton = () => {
  return (
    <div className="centered w-full border border-black-10 pb-20 shadow-lg lg:max-w-[920px] xl:max-w-[980px]">
      <div className="aspect-[16/9] w-full bg-black-10"></div>
    </div>
  )
}

export default ImageCard
