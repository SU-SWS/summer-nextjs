import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"
import {LayoutConfig} from "@lib/drupal/drupal-jsonapi.d"
import {getRowClasses} from "@components/paragraphs/rows/get-row-classes"
import cn from "@lib/utils/className"

type Props = {
  items: ParagraphUnion[]
  config?: LayoutConfig
  headingIds?: HeadingIds
}

const ThreeColumn = ({items, config, headingIds}: Props) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const mainItems = items.filter(
    item => !["left", "right"].includes(getParagraphBehaviors(item).layout_paragraphs?.region || "main")
  )
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "right")

  // Only display the dividers once the columns are side by side.
  const dividerClasses = cn({
    "relative after:absolute after:top-0 after:-right-25 after:h-full after:w-1 after:bg-black after:content-none @9xl/rows:after:content-['']":
      config?.vertical_dividers,
  })

  const draftProps: Record<string, string> = {"data-columns": "3"}

  return (
    <div className={getRowClasses(config)}>
      <div className="centered grid gap-25 @9xl:grid-cols-3 @9xl:gap-50" {...draftProps}>
        <OneColumn items={leftItems} headingIds={headingIds} className={dividerClasses} />
        <OneColumn items={mainItems} headingIds={headingIds} className={dividerClasses} />
        <OneColumn items={rightItems} headingIds={headingIds} />
      </div>
    </div>
  )
}
export default ThreeColumn
