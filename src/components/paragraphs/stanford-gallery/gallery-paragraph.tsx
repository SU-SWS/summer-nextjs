import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import {ElementType, HTMLAttributes, HtmlHTMLAttributes} from "react"
import {MediaStanfordGalleryImage, ParagraphStanfordGallery} from "@lib/gql/__generated__/graphql"
import Link from "@components/elements/link"
import cn from "@lib/utils/className"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const GalleryParagraph = ({paragraph, ...props}: Props) => {
  const GalleryWrapper: ElementType = paragraph.suGalleryHeadline ? "article" : "div"
  const id = getIdFromText(paragraph.suGalleryHeadline)

  return (
    <GalleryWrapper
      {...props}
      className={cn(
        "@container centered mb-50 flex flex-col gap-25 lg:max-w-[920px] xl:max-w-[980px]",
        props.className
      )}
      aria-labelledby={paragraph.suGalleryHeadline ? id : undefined}
    >
      {paragraph.suGalleryHeadline && (
        <H2 id={id} className="text-center">
          {paragraph.suGalleryHeadline}
        </H2>
      )}

      <Wysiwyg html={paragraph.suGalleryDescription?.processed} />

      {paragraph.suGalleryButton && (
        <div>
          <Button centered href={paragraph.suGalleryButton.url}>
            {paragraph.suGalleryButton.title}
          </Button>
        </div>
      )}

      <div className="relative left-1/2 mt-[150px] w-screen -translate-x-1/2 md:mt-[250px] lg:mt-[300px]">
        <Image className="object-cover" src="/images/temp-bg.jpg" alt="/" fill sizes="100vw" />

        <ul className="list-unstyled -mt-[150px] gutters mb-80 grid grid-cols-1-2 *:w-full *:overflow-hidden md:-mt-[250px] lg:-mt-[300px] xl:max-w-900">
          {paragraph.suGalleryImages?.[0] && (
            <>
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[1]}
                linkClasses="rounded-l-full"
              />
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[0]}
                linkClasses="aspect-square rounded-full"
              />
            </>
          )}

          {paragraph.suGalleryImages?.[2] && (
            <>
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[3]}
                linkClasses="aspect-square rounded-bl-full"
              />
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[2]}
                linkClasses="rounded-b-full"
              />
            </>
          )}

          {paragraph.suGalleryImages?.[4] && (
            <>
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[5]}
                linkClasses="aspect-square w-full rounded-bl-full"
              />
              <GalleryImage
                galleryId={paragraph.uuid}
                image={paragraph.suGalleryImages[4]}
                linkClasses="rounded-b-full"
              >
                {paragraph.suGalleryImages.length > 6 && (
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-around rounded-b-full bg-black-true/55">
                    <div className="font-roboto type-5 text-white" aria-hidden>
                      + {paragraph.suGalleryImages.length - 6}
                    </div>
                    <div className="sr-only">{`${paragraph.suGalleryImages.length - 6} More images available`}</div>
                  </div>
                )}
              </GalleryImage>
            </>
          )}
        </ul>
      </div>
    </GalleryWrapper>
  )
}

const GalleryImage = ({
  galleryId,
  image,
  linkClasses,
  children,
  ...props
}: {
  galleryId: string
  image?: MediaStanfordGalleryImage
  linkClasses?: string
} & HTMLAttributes<HTMLElement>) => {
  if (!image?.suGalleryImage?.url) return <div />
  return (
    <li {...props}>
      <figure className="h-full w-full">
        <Link
          href={`/gallery/${galleryId}/${image.uuid}`}
          className={cn(
            "relative block h-full w-full overflow-hidden border-5 border-white transition-colors hover:border-cardinal-red focus-visible:border-cardinal-red hocus:outline-hidden",
            linkClasses
          )}
        >
          <Image
            className="object-cover"
            src={image.suGalleryImage.url}
            alt={image.suGalleryImage.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {children}
        </Link>
        {image.suGalleryCaption && <figcaption className="sr-only">{image.suGalleryCaption}</figcaption>}
      </figure>
    </li>
  )
}

export default GalleryParagraph
