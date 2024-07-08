import {ParagraphSumCarousel} from "@lib/gql/__generated__/drupal.d"
import {HTMLAttributes} from "react"
import Wysiwyg from "@components/elements/wysiwyg"
import {H2} from "@components/elements/headers"
import Link from "@components/elements/link"
import Paragraph from "@components/paragraphs/paragraph"
import Slideshow from "@components/elements/slideshow"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumCarousel
}

const SumCarouselParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div {...props}>
      <div className="mb-20 text-center">
        <div className="flex flex-col">
          {paragraph.sumCarouselHeader && <H2 className="text-m4 font-light">{paragraph.sumCarouselHeader}</H2>}
          {paragraph.sumCarouselSuperheader && <div className="order-first">{paragraph.sumCarouselSuperheader}</div>}
        </div>

        <Wysiwyg
          html={paragraph.sumCarouselDescription?.processed}
          className="mx-auto w-fit"
        />

        {paragraph.sumCarouselLink?.url && <Link href={paragraph.sumCarouselLink.url}>{paragraph.sumCarouselLink.title}</Link>}
      </div>

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
