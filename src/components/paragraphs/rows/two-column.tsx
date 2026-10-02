import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import cn from "@lib/utils/className"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"

export type TwoColumnConfig = Record<string, string>
type Props = {
  items: ParagraphUnion[]
  config?: TwoColumnConfig
  headingIds?: HeadingIds
}
const TwoColumn = ({items, config, headingIds}: Props) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region !== "left")

  let gridCols = "md:grid-cols-2"
  if (config?.column_widths === "33-67") {
    gridCols = "@6xl:grid-cols-1-2"
  } else if (config?.column_widths === "67-33") {
    gridCols = "@6xl:grid-cols-2-1"
  }

  const draftProps: Record<string, string> = {"data-columns": "2"}

  return (
    <div className={cn("gutters grid gap-10 @6xl:gap-20", gridCols)} {...draftProps}>
      <OneColumn items={leftItems} headingIds={headingIds} />
      <OneColumn items={rightItems} headingIds={headingIds} />
    </div>
  )
}
export default TwoColumn
