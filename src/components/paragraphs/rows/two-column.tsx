import OneColumn from "@components/paragraphs/rows/one-column"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import cn from "@lib/utils/className"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"
import {LayoutConfig} from "@lib/drupal/drupal-jsonapi.d"
import {getRowClasses} from "@components/paragraphs/rows/get-row-classes"

type Props = {
  items: ParagraphUnion[]
  config?: LayoutConfig
  headingIds?: HeadingIds
}
const TwoColumn = ({items, config, headingIds}: Props) => {
  const leftItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region === "left")
  const rightItems = items.filter(item => getParagraphBehaviors(item).layout_paragraphs?.region !== "left")
  const unevenColumns = config?.column_widths === "33-67" || config?.column_widths === "67-33"

  const draftProps: Record<string, string> = {"data-columns": "2"}

  return (
    <div className={getRowClasses(config, cn({gutters: !config?.bg_color, "px-40": !!config?.bg_color}))}>
      <div
        className={cn("grid gap-25 @6xl:gap-50", {
          "md:grid-cols-2": !unevenColumns,
          "@6xl:grid-cols-1-2": config?.column_widths === "33-67",
          "@6xl:grid-cols-2-1": config?.column_widths === "67-33",
        })}
        {...draftProps}
      >
        <OneColumn
          items={leftItems}
          headingIds={headingIds}
          className={cn({
            // Only display the divider once the columns are side by side.
            "relative after:absolute after:top-0 after:-right-13 after:h-full after:w-1 after:bg-black after:content-none @6xl/rows:after:-right-25":
              config?.vertical_dividers,
            "md:after:content-['']": config?.vertical_dividers && !unevenColumns,
            "@6xl/rows:after:content-['']": config?.vertical_dividers && unevenColumns,
          })}
        />
        <OneColumn items={rightItems} headingIds={headingIds} />
      </div>
    </div>
  )
}
export default TwoColumn
