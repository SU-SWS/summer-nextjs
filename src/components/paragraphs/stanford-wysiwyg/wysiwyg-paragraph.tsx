import Wysiwyg from "@components/elements/wysiwyg"
import {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordWysiwyg} from "@lib/gql/__generated__/drupal.d"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordWysiwyg
}

const WysiwygParagraph = ({paragraph, ...props}: Props) => {
  return <Wysiwyg {...props} className={cn("centered", props.className)} html={paragraph.suWysiwygText?.processed} />
}
export default WysiwygParagraph
