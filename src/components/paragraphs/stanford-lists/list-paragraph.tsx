import Wysiwyg from "@components/elements/wysiwyg"
import View from "@components/views/view"
import {H2} from "@components/elements/headers"
import {ElementType, HtmlHTMLAttributes} from "react"
import {ParagraphStanfordList} from "@lib/gql/__generated__/graphql"
import {getParagraphBehaviors} from "@components/paragraphs/get-paragraph-behaviors"
import cn from "@lib/utils/className"
import Button from "@components/elements/button"
import {getViewPagedItems, loadViewPage, VIEW_PAGE_SIZE} from "@lib/gql/gql-view-queries"
import {signViewConfig} from "@lib/utils/view-config"
import {getIdFromText} from "@lib/utils/text-tools"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordList
}

const ListParagraph = async ({paragraph, ...props}: Props) => {
  const behaviors = getParagraphBehaviors(paragraph)
  const viewId = paragraph.suListView?.view || ""
  const displayId = paragraph.suListView?.display || ""
  const limit = paragraph.suListView?.pageSize || VIEW_PAGE_SIZE

  // Taken before awaiting the view, so ids are handed out in the order the paragraphs are displayed.
  const id = getIdFromText(paragraph.suListHeadline)

  const pagedItems =
    viewId && displayId
      ? await getViewPagedItems(viewId, displayId, limit, paragraph.suListView?.contextualFilter)
      : {items: [], totalItems: 0}

  const {totalItems} = pagedItems
  const viewItems = (limit || 3) < VIEW_PAGE_SIZE ? pagedItems.items.slice(0, limit) : pagedItems.items

  const addLoadMore = (limit || 3) >= VIEW_PAGE_SIZE && totalItems > viewItems.length

  if (behaviors.list_paragraph?.hide_empty && viewItems.length === 0) return null

  // Signed so the public "load more" action can't be called with arbitrary views or filters.
  const signedConfig =
    addLoadMore && viewId && displayId
      ? signViewConfig({
          viewId,
          displayId,
          contextualFilter: paragraph.suListView?.contextualFilter || [],
          hasHeadline: !!paragraph.suListHeadline,
          pageSize: VIEW_PAGE_SIZE,
        })
      : undefined

  const ListWrapper: ElementType =
    paragraph.suListHeadline && behaviors.list_paragraph?.heading_behavior !== "remove" ? "section" : "div"

  return (
    <ListWrapper
      {...props}
      className={cn("centered mb-50 flex flex-col gap-25 lg:max-w-[920px] xl:max-w-[980px]", props.className)}
      aria-labelledby={ListWrapper === "section" ? id : undefined}
    >
      {ListWrapper === "section" && (
        <H2 id={id} className={cn("text-center", {"sr-only": behaviors.list_paragraph?.heading_behavior === "hide"})}>
          {paragraph.suListHeadline}
        </H2>
      )}

      <Wysiwyg html={paragraph.suListDescription?.processed} />

      {viewId && displayId && viewItems && (
        <View
          viewId={viewId}
          displayId={displayId}
          items={viewItems}
          headingLevel={paragraph.suListHeadline ? "h3" : "h2"}
          loadPage={signedConfig ? loadViewPage.bind(null, signedConfig) : undefined}
          totalItems={totalItems}
        />
      )}

      {viewItems.length === 0 && behaviors.list_paragraph?.empty_message && (
        <p>{behaviors.list_paragraph.empty_message}</p>
      )}

      {paragraph.suListButton?.url && (
        <Button centered href={paragraph.suListButton.url}>
          {paragraph.suListButton.title}
        </Button>
      )}
    </ListWrapper>
  )
}

export default ListParagraph
