import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"

const ThreeColumn = ({items, headingIds}: {items: ParagraphUnion[]; headingIds?: HeadingIds}) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  const draftProps: Record<string, string> = {"data-columns": "3"}

  return (
    <div className="centered grid gap-10 @9xl:grid-cols-3 @9xl:gap-20" {...draftProps}>
      <OneColumn items={leftItems} headingIds={headingIds} />
      <OneColumn items={mainItems} headingIds={headingIds} />
      <OneColumn items={rightItems} headingIds={headingIds} />
    </div>
  )
}
export default ThreeColumn
