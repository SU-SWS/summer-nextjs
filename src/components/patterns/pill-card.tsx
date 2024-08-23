import {twMerge} from "tailwind-merge"
import Image from "next/image"
import Oembed from "@components/elements/ombed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@lib/gql/__generated__/drupal"
import clsx from "clsx"

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
   * Color variants
   */
  bgColor?: Maybe<boolean | string>
}

const PillCard = ({imageUrl, imageAlt, videoUrl, isArticle, children, bgColor, ...props}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div"

  return (
    <CardWrapper
      {...props}
      className={twMerge(
        "centered w-full rounded-full border-4 border-white bg-poppy-light outline outline-4 outline-poppy-light @container",
        props.className,
        clsx({
          "bg-poppy-light bg-opacity-80 outline-poppy-light/[80%]": bgColor === "semitransparent_poppy",
          "bg-olive-light outline-olive-light": bgColor === "olive",
          "bg-olive-light bg-opacity-80 outline-olive-light/[80%]": bgColor === "semitransparent_olive",
          "bg-spirited-light outline-spirited-light": bgColor === "spirited",
          "bg-spirited-light bg-opacity-80 outline-spirited-light/[80%]": bgColor === "semitransparent_spirited",
          "bg-transparent": bgColor === "transparent",
        })
      )}
    >
      {imageUrl && (
        <div className="relative aspect-1 w-full">
          <Image
            className="rounded-full object-cover object-center"
            src={imageUrl}
            alt={imageAlt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      )}

      {videoUrl && <Oembed url={videoUrl} />}

      <div
        className={twMerge(
          "flex flex-col px-10 pb-[125px] pt-20 @3xl:pb-[175px] @4xl:pb-[225px] @5xl:pb-[250px] @7xl:pb-[300px] lg:px-14",
          clsx({
            "pt-[125px] @3xl:pt-[175px] @4xl:pt-[225px] @5xl:pt-[250px] @7xl:pt-[300px]": !imageUrl,
          })
        )}
      >
        {children}
      </div>
    </CardWrapper>
  )
}

export const PillCardSkeleton = () => {
  return (
    <div className="centered w-full rounded-full border border-black-10 pb-20 shadow-lg lg:max-w-[920px] xl:max-w-[980px]">
      <div className="aspect-[16/9] w-full bg-black-10"></div>
    </div>
  )
}

export default PillCard
