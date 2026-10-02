import Paragraph from "@components/paragraphs/paragraph"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"

const OneColumn = ({items, headingIds}: {items: ParagraphUnion[]; headingIds?: HeadingIds}) => {
  const draftProps: Record<string, string> = {"data-columns": "1"}

  return (
    <div className="space-y-16 @container" {...draftProps}>
      {items.map(item => (
        <Paragraph paragraph={item} headingIds={headingIds} key={item.uuid} />
      ))}
    </div>
  )
}
export default OneColumn
