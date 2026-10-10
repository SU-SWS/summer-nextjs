import Wysiwyg from "@components/elements/wysiwyg"
import View from "@components/views/view"
import {H2} from "@components/elements/headers"
import {ElementType, HtmlHTMLAttributes, Suspense} from "react"
import {ParagraphStanfordFilteredList} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import {getViewPagedItems, loadViewPage, VIEW_PAGE_SIZE} from "@lib/gql/gql-view-queries"
import {signViewConfig} from "@lib/utils/view-config"
import {getHeadingId, HeadingIds} from "@components/paragraphs/get-heading-ids"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordFilteredList
  headingIds?: HeadingIds
}

const FilteredListParagraph = async ({paragraph, headingIds, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const viewId = paragraph.suFilteredListView?.view || ""
  const displayId = paragraph.suFilteredListView?.display || ""
  const limit = paragraph.suFilteredListView?.pageSize || VIEW_PAGE_SIZE

  const pagedItems =
    viewId && displayId
      ? await getViewPagedItems(viewId, displayId, limit, paragraph.suFilteredListView?.contextualFilter)
      : {items: [], totalItems: 0}

  const {totalItems} = pagedItems
  const viewItems = limit ? pagedItems.items.slice(0, VIEW_PAGE_SIZE) : pagedItems.items

  const addLoadMore =
    viewId.includes("filter") ||
    displayId.includes("") ||
    ((limit || 3) >= VIEW_PAGE_SIZE && totalItems > viewItems.length)

  if (behaviors.list_paragraph?.hide_empty && viewItems.length === 0) return null

  // Signed so the public "load more" action can't be called with arbitrary views or filters.
  const signedConfig =
    addLoadMore && viewId && displayId
      ? signViewConfig({
          viewId,
          displayId,
          contextualFilter: paragraph.suFilteredListView?.contextualFilter || [],
          hasHeadline: !!paragraph.suListHeadline,
          pageSize: VIEW_PAGE_SIZE,
        })
      : undefined

  const ListWrapper: ElementType =
    paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" ? "section" : "div"
  const id = getHeadingId(paragraph.uuid, paragraph.suListHeadline, headingIds)

  return (
    <ListWrapper
      {...props}
      className={cn("centered mb-50 flex flex-col gap-50", props.className)}
      aria-labelledby={ListWrapper === "section" ? id : undefined}
      data-nosnippet
    >
      {paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" && (
        <H2 id={id} className={cn("mb-0", {"sr-only": behaviors.list_paragraph?.heading_behavior === "hide"})}>
          {paragraph.suListHeadline}
        </H2>
      )}

      <Wysiwyg html={paragraph.suListDescription?.processed} />

      {viewId && displayId && viewItems && (
        <Suspense fallback={<div />}>
          <View
            viewId={viewId}
            displayId={displayId}
            items={viewItems}
            headingLevel={paragraph.suListHeadline ? "h3" : "h2"}
            loadPage={signedConfig ? loadViewPage.bind(null, signedConfig) : undefined}
            totalItems={totalItems}
          />
        </Suspense>
      )}

      {viewItems.length === 0 && behaviors.list_paragraph?.empty_message && (
        <p>{behaviors.list_paragraph.empty_message}</p>
      )}
    </ListWrapper>
  )
}

export default FilteredListParagraph
