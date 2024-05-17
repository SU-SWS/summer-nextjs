import {twMerge} from "tailwind-merge";
import Image from "next/image";
import Oembed from "@components/elements/ombed";
import {ElementType, HTMLAttributes} from "react";
import {Maybe} from "@lib/gql/__generated__/drupal";
import clsx from "clsx";

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
  bgColor?: Maybe<string>
}

const PillCard = ({imageUrl, imageAlt, videoUrl, isArticle, children, bgColor,...props}: Props) => {
  const CardWrapper: ElementType = isArticle ? "article" : "div";

  return (
    <CardWrapper
      {...props}
      className={twMerge("centered lg:max-w-[980px] w-full outline outline-4 border-4 border-white rounded-full bg-poppy-light outline-poppy-light", props.className, clsx({
        "bg-poppy-light bg-opacity-80 outline-poppy-light-[80%]" : bgColor === "semitransparent_poppy",
        "bg-olive-light outline-olive-light" : bgColor === "olive",
        "bg-olive-light bg-opacity-80 outline-olive-light-[80%]" : bgColor === "semitransparent_olive",
        "bg-spirited-light outline-spirited-light" : bgColor === "spirited",
        "bg-spirited-light bg-opacity-80 outline-spirited-light-[80%]": bgColor === "semitransparent_spirited",
      }))}
    >
      {imageUrl &&
        <div className="relative aspect-1 w-full">
          <Image
            className="object-cover object-center rounded-full"
            src={imageUrl}
            alt={imageAlt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
          />
        </div>
      }

      {videoUrl &&
        <Oembed url={videoUrl}/>
      }

      <div className="pt-20 px-10 lg:px-14 pb-[165px] sm:pb-[245px] md:pb-[200px] flex flex-col">
        {children}
      </div>
    </CardWrapper>
  )
}

export const PillCardSkeleton = () => {
  return (
    <div className="centered lg:max-w-[980px] w-full shadow-lg border border-black-10 pb-20 rounded-full">
      <div className="aspect-[16/9] w-full bg-black-10">
      </div>
    </div>
  )
}

export default PillCard;