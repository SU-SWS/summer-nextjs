import Paragraph from "@components/paragraphs/paragraph"
import {ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {HeadingIds} from "@components/paragraphs/get-heading-ids"
import {LayoutConfig} from "@lib/drupal/drupal-jsonapi.d"
import {getRowClasses} from "@components/paragraphs/rows/get-row-classes"
import cn from "@lib/utils/className"

type Props = {
  items: ParagraphUnion[]
  headingIds?: HeadingIds
  /**
   * Layout configuration, when the column is a row of its own rather than a region of a multi column row.
   */
  config?: LayoutConfig
  className?: string
}

const OneColumn = ({items, headingIds, config, className}: Props) => {
  const draftProps: Record<string, string> = {"data-columns": "1"}

  return (
    <div
      className={cn(
        "@container [&>:not([hidden])~:not([hidden])]:mt-40 [&>:not([hidden])~:not([hidden])]:mb-0",
        config ? getRowClasses(config, className) : className
      )}
      {...draftProps}
    >
      {items.map(item => (
        <Paragraph paragraph={item} headingIds={headingIds} key={item.uuid} />
      ))}
    </div>
  )
}
export default OneColumn
