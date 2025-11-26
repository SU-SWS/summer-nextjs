import {ParagraphSumAccordion} from "@lib/gql/__generated__/drupal.d"
import Accordion from "@components/elements/accordion"
import Wysiwyg from "@components/elements/wysiwyg"
import {H2} from "@components/elements/headers"
import {HTMLAttributes} from "react"
import {twMerge} from "tailwind-merge"
import {getIdAttribute} from "@lib/utils/text-tools"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumAccordion
}

const SumAccordionParagraph = ({paragraph, ...props}: Props) => {
  const Element = paragraph.sumAccordionsHeading ? "article" : "div"
  const id = paragraph.sumAccordionsHeading ? getIdAttribute(paragraph.sumAccordionsHeading) : undefined

  return (
    <Element
      {...props}
      className={twMerge("centered", props.className)}
      aria-labelledby={paragraph.sumAccordionsHeading ? id : undefined}
    >
      {paragraph.sumAccordionsHeading && (
        <H2 id={id} className="text-center">
          {paragraph.sumAccordionsHeading}
        </H2>
      )}

      {paragraph.sumAccordionsDesc && <Wysiwyg html={paragraph.sumAccordionsDesc.processed} className="mb-20" />}

      {paragraph.sumAccordionsAccords.map(accordion => (
        <Accordion
          key={accordion.uuid}
          headingLevel={paragraph.sumAccordionsHeading ? "h3" : "h2"}
          button={accordion.suAccordionTitle}
        >
          <Wysiwyg html={accordion.suAccordionBody.processed} />
        </Accordion>
      ))}
    </Element>
  )
}

export default SumAccordionParagraph
