import Wysiwyg from "@components/elements/wysiwyg"
import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordWysiwyg} from "@lib/gql/__generated__/drupal.d"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordWysiwyg
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  return <Wysiwyg {...props} html={paragraph.suWysiwygText?.processed} />
}
export default WysiwygParagraph
