import {ParagraphSumCarousel} from "@lib/gql/__generated__/drupal.d"
import {ElementType, HTMLAttributes} from "react"
import Wysiwyg from "@components/elements/wysiwyg"
import {H2} from "@components/elements/headers"
import Link from "@components/elements/link"
import Paragraph from "@components/paragraphs/paragraph"
import Slideshow from "@components/elements/slideshow"
import ActionLink from "@components/elements/action-link"
import ArchBanner from "@components/patterns/arch-banner"
import {getParagraphBehaviors} from "../get-paragraph-behaviors"
import clsx from "clsx"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumCarousel
}

const SumCarouselParagraph = ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const isArchBanner = behaviors.sum_carousel?.sum_carousel_arc
  const headingSize = behaviors.sum_carousel?.sum_carousel_text_size ? "type-3" : "type-4"
  const BannerWrapper: ElementType = isArchBanner ? ArchBanner : "div"

  return (
    <div {...props}>
      <BannerWrapper isBorder={isArchBanner}>
        <div className="mb-20 text-center">
          <div className="flex flex-col">
            {paragraph.sumCarouselHeader && <H2 className={clsx("mb-8 font-light", headingSize)}>{paragraph.sumCarouselHeader}</H2>}
            {paragraph.sumCarouselSuperheader && <div className="order-first mb-8">{paragraph.sumCarouselSuperheader}</div>}
          </div>

          <Wysiwyg
            html={paragraph.sumCarouselDescription?.processed}
            className="mx-auto w-full max-w-full sm:max-w-[392px] md:max-w-[507px] lg:max-w-[576px]"
          />

          {paragraph.sumCarouselLink?.url && (
            <ActionLink
              className="rs-mt-3"
              href={paragraph.sumCarouselLink.url}
            >
              {paragraph.sumCarouselLink.title}
            </ActionLink>
          )}
        </div>
      </BannerWrapper>

      {paragraph.sumCarouselSlides && (
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <Slideshow className="mx-auto w-[calc(100%-50px)] xl:w-[calc(100%-150px)]">
            {paragraph.sumCarouselSlides.map(slide => (
              <Paragraph
                key={slide.id}
                paragraph={slide}
              />
            ))}
          </Slideshow>
        </div>
      )}
    </div>
  )
}

export default SumCarouselParagraph
