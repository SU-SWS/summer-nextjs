import {ParagraphStanfordAccordion} from "@lib/gql/__generated__/drupal.d";
import Accordion from "@components/elements/accordion";
import Wysiwyg from "@components/elements/wysiwyg";

type Props = {
  paragraph: ParagraphStanfordAccordion
}

const SumAccordionParagraph = ({paragraph, ...props}: Props) => {

  return (
    <Accordion
      {...props}
      headingLevel="h3"
      button={paragraph.suAccordionTitle}>
      <Wysiwyg html={paragraph.suAccordionBody.processed} />
    </Accordion>
  )
}

export default SumAccordionParagraph
