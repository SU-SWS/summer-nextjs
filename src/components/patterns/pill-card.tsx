import cn from "@lib/utils/className"
import Image from "next/image"
import Oembed from "@components/elements/ombed"
import {ElementType, HTMLAttributes} from "react"
import {Maybe} from "@lib/gql/__generated__/graphql"
import YoutubeVideoPill from "@components/elements/youtube-video-pill"

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

  if (videoUrl && videoUrl.includes("youtube")) return <YoutubeVideoPill videoUrl={videoUrl} />

  return (
    <CardWrapper
      {...props}
      className={cn(
        "@container centered w-full rounded-full border-4 border-white bg-poppy-light outline-4 outline-poppy-light outline-solid",
        props.className,
        {
          "bg-poppy-light/80 outline-poppy-light/[80%]": bgColor === "semitransparent_poppy",
          "bg-olive-light outline-olive-light": bgColor === "olive",
          "bg-olive-light/80 outline-olive-light/[80%]": bgColor === "semitransparent_olive",
          "bg-spirited-light outline-spirited-light": bgColor === "spirited",
          "bg-spirited-light/80 outline-spirited-light/[80%]": bgColor === "semitransparent_spirited",
          "bg-transparent": bgColor === "transparent",
        }
      )}
    >
      {imageUrl && (
        <div className="relative aspect-square w-full">
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
        className={cn(
          "flex flex-col pt-50 rs-px-3 pb-[125px] @2xl:pb-[175px] @3xl:pb-[225px] @4xl:pb-[300px] @7xl:rs-px-4 [&_p>a]:text-black-true [&_p>a]:hocus:text-[#001829]",
          {
            "pt-[115px] @sm:pt-[115px] @md:pt-[135px] @lg:pt-[155px] @2xl:pt-[220px] @3xl:pt-[220px] @4xl:pt-[270px] @5xl:pt-[300px] @7xl:pt-[350px]":
              !imageUrl,
          }
        )}
      >
        {children}
      </div>
    </CardWrapper>
  )
}

export const PillCardSkeleton = () => {
  return (
    <div className="centered w-full rounded-full border border-black-10 pb-50 shadow-lg lg:max-w-[920px] xl:max-w-[980px]">
      <div className="aspect-video w-full bg-black-10"></div>
    </div>
  )
}

export default PillCard
