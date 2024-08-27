import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/drupal.d"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"

const ThreeColumn = ({items}: {items: ParagraphUnion[]}) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  const draftProps: Record<string, string> = {}
  if (isPreviewMode()) {
    draftProps["data-columns"] = "3"
  }

  return (
    <div className="centered grid gap-10 lg:grid-cols-3 lg:gap-20" {...draftProps}>
      <OneColumn items={leftItems} />
      <OneColumn items={mainItems} />
      <OneColumn items={rightItems} />
    </div>
  )
}
export default ThreeColumn
