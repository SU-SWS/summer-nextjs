import {ParagraphSumCarousel} from "@lib/gql/__generated__/drupal.d";
import {HTMLAttributes} from "react";
import Wysiwyg from "@components/elements/wysiwyg";
import {H2} from "@components/elements/headers";
import Link from "@components/elements/link";
import Paragraph from "@components/paragraphs/paragraph";
import Slideshow from "@components/elements/slideshow";

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumCarousel
}

const SumCarouselParagraph = ({paragraph, ...props}: Props) => {

  return (
    <div {...props}>
      <div className="text-center mb-20">
        <div className="flex flex-col">
          {paragraph.sumCarouselHeader &&
            <H2 className="font-light text-m4">{paragraph.sumCarouselHeader}</H2>
          }
          {paragraph.sumCarouselSuperheader &&
            <div className="order-first">{paragraph.sumCarouselSuperheader}</div>
          }
        </div>

        <Wysiwyg html={paragraph.sumCarouselDescription?.processed} className="w-fit mx-auto"/>

        {paragraph.sumCarouselLink?.url &&
          <Link href={paragraph.sumCarouselLink.url}>
            {paragraph.sumCarouselLink.title}
          </Link>
        }
      </div>

      {paragraph.sumCarouselSlides &&
        <div className="relative w-screen left-1/2 -translate-x-1/2">
          <Slideshow className="w-[calc(100%-50px)] xl:w-[calc(100%-150px)] mx-auto">
            {paragraph.sumCarouselSlides.map(slide =>
              <Paragraph key={slide.id} paragraph={slide}/>
            )}
          </Slideshow>
        </div>
      }
    </div>
  )
}

export default SumCarouselParagraph
