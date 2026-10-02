import OneColumn from "@components/paragraphs/rows/one-column"
import TwoColumn, {TwoColumnConfig} from "@components/paragraphs/rows/two-column"
import ThreeColumn from "@components/paragraphs/rows/three-column"
import {Maybe, ParagraphStanfordLayout, ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {LayoutParagraphBehaviors} from "@lib/drupal/drupal-jsonapi.d"
import {HTMLAttributes} from "react"
import cn from "@lib/utils/className"
import {getHeadingIds, HeadingIds} from "@components/paragraphs/get-heading-ids"

type Layout = Record<
  string,
  {
    item: ParagraphStanfordLayout
    layout: LayoutParagraphBehaviors["layout"]
    config?: Record<string, unknown>
    children: ParagraphUnion[]
  }
>

type Props = HTMLAttributes<HTMLDivElement> & {
  components?: Maybe<ParagraphUnion[]>
  /**
   * Unique heading ids, when the page displays other paragraphs outside of the rows.
   */
  headingIds?: HeadingIds
}

const Rows = async ({components, headingIds, className, ...props}: Props) => {
  if (!components) return
  const uniqueHeadingIds = headingIds || getHeadingIds(components)
  const layouts: Layout = {}

  // Set the layouts first.
  components.map(item => {
    if (item.__typename === "ParagraphStanfordLayout") {
      const behaviors = getParagraphBehaviors(item)

      layouts[item.uuid] = {
        item,
        layout: behaviors.layout_paragraphs?.layout || "layout_paragraphs_1_column",
        config: behaviors.layout_paragraphs?.config,
        children: [],
      }
    }
  })

  // Add the components to each of the layouts.
  components.map(item => {
    const behaviors = getParagraphBehaviors(item)
    const parentUUID = behaviors?.layout_paragraphs?.parent_uuid
    if (parentUUID && layouts[parentUUID]) {
      layouts[parentUUID].children.push(item)
    }
  })

  return (
    <div className={cn("space-y-32 @container", className)} {...props}>
      {Object.keys(layouts).map(layoutId => (
        <Row
          key={layoutId}
          layout={layouts[layoutId].layout}
          layoutSettings={layouts[layoutId].config}
          items={layouts[layoutId].children}
          headingIds={uniqueHeadingIds}
        />
      ))}
    </div>
  )
}

const Row = ({
  layout,
  layoutSettings,
  items,
  headingIds,
}: {
  layout: LayoutParagraphBehaviors["layout"]
  layoutSettings?: Record<string, unknown>
  items: ParagraphUnion[]
  headingIds: HeadingIds
}) => {
  if (layout === "layout_paragraphs_2_column")
    return <TwoColumn config={layoutSettings as TwoColumnConfig} items={items} headingIds={headingIds} />
  if (layout === "layout_paragraphs_3_column") return <ThreeColumn items={items} headingIds={headingIds} />

  // Fall back to one column if the layout is unknown.
  return <OneColumn items={items} headingIds={headingIds} />
}

export default Rows
