import {Link, Maybe, ParagraphSumCarousel} from "@lib/gql/__generated__/drupal.d"
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
            {paragraph.sumCarouselSlides.map(slide => {
              if (slide.__typename === "ParagraphStanfordCard") {
                const cardBehaviors = getParagraphBehaviors(slide)
                cardBehaviors.su_card_styles = {
                  ...(cardBehaviors.su_card_styles || {}),
                  heading: "h3",
                  sum_card_bg_color_variant: false,
                }
                slide.behaviors = JSON.stringify(cardBehaviors)
              }
              return <Paragraph key={slide.id} paragraph={slide} />
            })}
          </Slideshow>
        </div>
      )}
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
        <ActionLink className="rs-mt-3" href={link.url}>
          {link.title}
        </ActionLink>
      )}
    </div>
  )
}

export default SumCarouselParagraph
