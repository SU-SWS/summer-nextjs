import Wysiwyg from "@components/elements/wysiwyg"
import Button from "@components/elements/button"
import Image from "next/image"
import {H2} from "@components/elements/headers"
import {ElementType, HTMLAttributes, HtmlHTMLAttributes} from "react"
import {MediaStanfordGalleryImage, ParagraphStanfordGallery} from "@lib/gql/__generated__/drupal.d"
import Link from "@components/elements/link"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordGallery
}

const GalleryParagraph = ({paragraph, ...props}: Props) => {
  const GalleryWrapper: ElementType = paragraph.suGalleryHeadline ? "article" : "div"

  return (
    <GalleryWrapper
      {...props}
      className={twMerge(
        "centered mb-20 flex flex-col gap-10 @container lg:max-w-[920px] xl:max-w-[980px]",
        props.className
      )}
      aria-labelledby={paragraph.suGalleryHeadline ? paragraph.id : undefined}
    >
      {paragraph.suGalleryHeadline && (
        <H2 id={paragraph.id} className="text-center">
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

        <ul className="list-unstyled gutters -mt-[150px] mb-32 grid grid-cols-1-2 *:w-full *:overflow-hidden md:-mt-[250px] lg:-mt-[300px] xl:max-w-900">
          {paragraph.suGalleryImages?.[0] && (
            <>
              <GalleryImage
                galleryId={paragraph.id}
                image={paragraph.suGalleryImages[1]}
                linkClasses="rounded-l-full"
              />
              <GalleryImage
                galleryId={paragraph.id}
                image={paragraph.suGalleryImages[0]}
                linkClasses="aspect-1 rounded-full"
              />
            </>
          )}

          {paragraph.suGalleryImages?.[2] && (
            <>
              <GalleryImage
                galleryId={paragraph.id}
                image={paragraph.suGalleryImages[3]}
                linkClasses="aspect-1 rounded-bl-full"
              />
              <GalleryImage
                galleryId={paragraph.id}
                image={paragraph.suGalleryImages[2]}
                linkClasses="rounded-b-full"
              />
            </>
          )}

          {paragraph.suGalleryImages?.[4] && (
            <>
              <GalleryImage
                galleryId={paragraph.id}
                image={paragraph.suGalleryImages[5]}
                linkClasses="aspect-1 w-full rounded-bl-full"
              />
              <GalleryImage galleryId={paragraph.id} image={paragraph.suGalleryImages[4]} linkClasses="rounded-b-full">
                {paragraph.suGalleryImages.length > 6 && (
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-around rounded-b-full bg-black-true bg-opacity-55">
                    <div className="type-5 font-roboto text-white" aria-hidden>
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
          href={`/gallery/${galleryId}:${image.id}`}
          className={twMerge(
            "relative block h-full w-full overflow-hidden border-5 border-white transition-colors hover:border-cardinal-red focus-visible:border-cardinal-red hocus:outline-none",
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
