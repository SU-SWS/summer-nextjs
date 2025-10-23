import Paragraph from "@components/paragraphs/paragraph"
import {ParagraphUnion} from "@lib/gql/__generated__/drupal.d"

const OneColumn = ({items}: {items: ParagraphUnion[]}) => {
  const draftProps: Record<string, string> = {"data-columns": "1"}
  return (
    <div className="space-y-16 @container" {...draftProps}>
      {items.map(item => (
        <Paragraph paragraph={item} key={item.id} />
      ))}
    </div>
  )
}
export default OneColumn
