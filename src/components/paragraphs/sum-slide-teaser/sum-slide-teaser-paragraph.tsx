import {ParagraphSumSlideTeaser} from "@lib/gql/__generated__/drupal.d"
import {HTMLAttributes} from "react"
import NodeCard from "@components/nodes/cards/node-card"

type Props = HTMLAttributes<HTMLElement> & {
  paragraph: ParagraphSumSlideTeaser
}

const SumSlideTeaserParagraph = ({paragraph, ...props}: Props) => {
  return (
    <div {...props}>
      <NodeCard node={paragraph.sumSlideTeaserEntity} />
    </div>
  )
}

export default SumSlideTeaserParagraph
