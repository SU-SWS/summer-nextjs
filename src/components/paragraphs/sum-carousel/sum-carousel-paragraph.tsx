import {
  Link,
  Maybe,
  ParagraphSumCarousel,
  ParagraphSumCarouselSumCarouselSlidesUnion,
} from "@lib/gql/__generated__/drupal.d"
import {HTMLAttributes} from "react"
import Wysiwyg from "@components/elements/wysiwyg"
import {H2} from "@components/elements/headers"
import Slideshow from "@components/elements/slideshow"
import ActionLink from "@components/elements/action-link"
import ArcBanner from "@components/patterns/arc-banner"
import {getParagraphBehaviors} from "../get-paragraph-behaviors"
import clsx from "clsx"
import {twMerge} from "tailwind-merge"
import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import SumSlideTeaserParagraph from "@components/paragraphs/sum-slide-teaser/sum-slide-teaser-paragraph"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumCarousel
}

const SumCarouselParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const isArcBanner = behaviors.sum_carousel?.sum_carousel_arc
  const headingSize = behaviors.sum_carousel?.sum_carousel_text_size ? "type-3" : "type-4"
  const Element = paragraph.sumCarouselHeader ? "article" : "div"

  return (
    <Element {...props} aria-labelledby={paragraph.sumCarouselHeader ? paragraph.id : undefined}>
      {isArcBanner && (
        <ArcBanner isBorder>
          <CarouselTop
            header={paragraph.sumCarouselHeader}
            superHeader={paragraph.sumCarouselSuperheader}
            headingSize={headingSize}
            description={paragraph.sumCarouselDescription?.processed}
            link={paragraph.sumCarouselLink}
            className="md:rs-mt-7"
            headerId={paragraph.id}
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
          headerId={paragraph.id}
        />
      )}

      {paragraph.sumCarouselSlides && (
        <div className="relative left-1/2 mb-32 mt-0 w-screen -translate-x-1/2 overflow-x-hidden">
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
    </Element>
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
  const slideCopy = {...slide}

  let labelId = undefined
  if (slideCopy.__typename === "ParagraphStanfordCard") {
    const slideBehaviors = getParagraphBehaviors(slideCopy)
    slideBehaviors.su_card_styles = {
      ...slideBehaviors.su_card_styles,
      heading: slideHeader || "h2",
    }
    slideCopy.behaviors = JSON.stringify(slideBehaviors)

    if (slideCopy.suCardHeader) labelId = slideCopy.id
  }

  if (slideCopy.__typename === "ParagraphSumSlideTeaser") labelId = slideCopy.sumSlideTeaserEntity.id

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-labelledby={labelId}
      aria-label={labelId ? undefined : `${slideNumber} of ${totalSlides}`}
    >
      {slideCopy.__typename === "ParagraphStanfordCard" && <CardParagraph paragraph={slideCopy} linkTabIndex={-1} />}
      {slideCopy.__typename === "ParagraphSumSlideTeaser" && <SumSlideTeaserParagraph paragraph={slideCopy} />}
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
  headerId?: string
}

const CarouselTop = ({header, superHeader, headingSize, description, link, className, headerId}: TopProps) => {
  return (
    <div className={twMerge("centered mb-20 text-center", className)}>
      <div className="flex flex-col">
        {header && (
          <H2 id={headerId} className={clsx("mb-8 font-light", headingSize)}>
            {header}
          </H2>
        )}
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
