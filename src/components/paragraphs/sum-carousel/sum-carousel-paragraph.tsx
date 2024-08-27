import {
  Link,
  Maybe,
  ParagraphSumCarousel,
  ParagraphSumCarouselSumCarouselSlidesUnion,
} from "@lib/gql/__generated__/drupal.d"
import {HTMLAttributes} from "react"
import Wysiwyg from "@components/elements/wysiwyg"
import {H2} from "@components/elements/headers"
import Paragraph from "@components/paragraphs/paragraph"
import Slideshow from "@components/elements/slideshow"
import ActionLink from "@components/elements/action-link"
import ArcBanner from "@components/patterns/arc-banner"
import {getParagraphBehaviors} from "../get-paragraph-behaviors"
import clsx from "clsx"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumCarousel
}

const SumCarouselParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const isArcBanner = behaviors.sum_carousel?.sum_carousel_arc
  const headingSize = behaviors.sum_carousel?.sum_carousel_text_size ? "type-3" : "type-4"

  return (
    <div {...props}>
      {isArcBanner && (
        <ArcBanner isBorder>
          <CarouselTop
            header={paragraph.sumCarouselHeader}
            superHeader={paragraph.sumCarouselSuperheader}
            headingSize={headingSize}
            description={paragraph.sumCarouselDescription?.processed}
            link={paragraph.sumCarouselLink}
            className="md:rs-mt-7"
          />
        </ArcBanner>
      )}

      {!isArcBanner && (
        <CarouselTop
          header={paragraph.sumCarouselHeader}
          superHeader={paragraph.sumCarouselSuperheader}
          headingSize={headingSize}
          description={paragraph.sumCarouselDescription?.processed}
          link={paragraph.sumCarouselLink}
        />
      )}

      {paragraph.sumCarouselSlides && (
        <div className="relative left-1/2 mt-0 w-screen -translate-x-1/2">
          <Slideshow className="mx-auto w-[calc(100%-50px)] xl:w-[calc(100%-150px)]">
            {paragraph.sumCarouselSlides.map((slide, slideIndex) => {
              return (
                <CarouselSlide
                  key={slide.id}
                  slide={slide}
                  slideNumber={slideIndex + 1}
                  totalSlides={paragraph.sumCarouselSlides?.length || 0}
                  slideHeader={paragraph.sumCarouselHeader ? "h3" : "h2"}
                />
              )
            })}
          </Slideshow>
        </div>
      )}
    </div>
  )
}

const CarouselSlide = ({
  slide,
  slideNumber,
  totalSlides,
  slideHeader,
}: {
  slide: ParagraphSumCarouselSumCarouselSlidesUnion
  slideNumber: number
  totalSlides: number
  slideHeader?: "h2" | "h3"
}) => {
  let labelId = undefined
  if (slide.__typename === "ParagraphStanfordCard") {
    const slideBehaviors = getParagraphBehaviors(slide)
    slideBehaviors.su_card_styles = {
      ...slideBehaviors.su_card_styles,
      heading: slideHeader || "h2",
    }
    slide.behaviors = JSON.stringify(slideBehaviors)

    if (slide.suCardHeader) labelId = slide.id
  }

  if (slide.__typename === "ParagraphSumSlideTeaser") labelId = slide.sumSlideTeaserEntity.id

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-labelledby={labelId}
      aria-label={labelId ? undefined : `${slideNumber} of ${totalSlides}`}
    >
      <Paragraph paragraph={slide} />
    </div>
  )
}

type TopProps = {
  className?: Maybe<string>
  header?: Maybe<string>
  superHeader?: Maybe<string>
  headingSize?: Maybe<string>
  description?: Maybe<string>
  link?: Maybe<Link>
}

const CarouselTop = ({header, superHeader, headingSize, description, link, className}: TopProps) => {
  return (
    <div className={twMerge("mb-20 text-center", className)}>
      <div className="flex flex-col">
        {header && <H2 className={clsx("mb-8 font-light", headingSize)}>{header}</H2>}
        {superHeader && <div className="order-first mb-8">{superHeader}</div>}
      </div>

      <Wysiwyg
        html={description}
        className="mx-auto w-full max-w-full sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px]"
      />

      {link?.url && (
        <ActionLink className="rs-mt-3 mx-auto no-underline hocus:underline" href={link.url}>
          {link.title}
        </ActionLink>
      )}
    </div>
  )
}

export default SumCarouselParagraph
