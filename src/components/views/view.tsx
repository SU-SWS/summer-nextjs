import {JSX} from "react"
import SharedTagsCardView from "@components/views/shared-tags/shared-tags-card-view"
import PageListView from "@components/views/stanford-page/page-list-view"
import NewsCardView from "@components/views/stanford-news/news-card-view"
import NewsListView from "@components/views/stanford-news/news-list-view"
import PersonCardView from "@components/views/stanford-person/person-card-view"
import EventsCardView from "@components/views/stanford-events/events-card-view"
import EventsListView from "@components/views/stanford-events/events-list-view"
import PageCardView from "@components/views/stanford-page/page-card-view"
import CourseListView from "@components/views/stanford-courses/course-list-view"
import CourseCardView from "@components/views/stanford-courses/course-card-view"
import PublicationsApaView from "@components/views/stanford-publications/publications-apa-view"
import PublicationsChicagoView from "@components/views/stanford-publications/publications-chicago-view"
import {
  NodeStanfordCourse,
  NodeStanfordEvent,
  NodeStanfordNews,
  NodeStanfordPage,
  NodeStanfordPerson,
  NodeStanfordPublication,
  NodeSumSummerCourse,
  NodeUnion,
} from "@lib/gql/__generated__/drupal.d"
import CoursesLearnerType from "@components/views/sum-courses/courses-learner-type-view"

export type ViewDisplayProps<T extends NodeUnion = NodeUnion> = {
  /**
   * List of node entities.
   */
  items: T[]
  /**
   * If those nodes titles should display as <h2> or <h3>
   */
  headingLevel?: "h2" | "h3"
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action callback to fetch the next "page" contents.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
}

interface Props {
  /**
   * View Machine Name.
   */
  viewId: string
  /**
   * Display machine name.
   */
  displayId: string
  /**
   * List of nodes to display.
   */
  items: NodeUnion[]
  /**
   * If those nodes titles should display as <h2> or <h3>
   */
  headingLevel?: "h2" | "h3"
  /**
   * Total number of items to build the pager.
   */
  totalItems: number
  /**
   * Server action to load a page.
   */
  loadPage?: (_page: number) => Promise<JSX.Element>
}

const View = async ({viewId, displayId, items, totalItems, loadPage, headingLevel = "h3"}: Props) => {
  const component = `${viewId}--${displayId}`
  const viewProps = {totalItems, headingLevel, loadPage}

  switch (component) {
    case "stanford_basic_pages--basic_page_type_list":
      return <PageListView items={items as NodeStanfordPage[]} {...viewProps} />

    case "stanford_news--vertical_cards":
      return <NewsCardView items={items as NodeStanfordNews[]} {...viewProps} />

    case "stanford_news--block_1":
      return <NewsListView items={items as NodeStanfordNews[]} {...viewProps} />

    case "stanford_person--grid_list_all":
      return <PersonCardView items={items as NodeStanfordPerson[]} {...viewProps} />

    case "stanford_events--cards":
      return <EventsCardView items={items as NodeStanfordEvent[]} {...viewProps} />

    case "stanford_events--past_events_list_block":
    case "stanford_events--list_page":
      return <EventsListView items={items as NodeStanfordEvent[]} {...viewProps} />

    case "stanford_basic_pages--viewfield_block_1":
      return <PageCardView items={items as NodeStanfordPage[]} {...viewProps} />

    case "stanford_shared_tags--card_grid":
      return <SharedTagsCardView items={items} {...viewProps} />

    case "stanford_courses--default_list_viewfield_block":
      return <CourseListView items={items as NodeStanfordCourse[]} {...viewProps} />

    case "stanford_courses--vertical_teaser_viewfield_block":
      return <CourseCardView items={items as NodeStanfordCourse[]} {...viewProps} />

    case "stanford_publications--apa_list":
      return <PublicationsApaView items={items as NodeStanfordPublication[]} {...viewProps} />

    case "stanford_publications--chicago_list":
      return <PublicationsChicagoView items={items as NodeStanfordPublication[]} {...viewProps} />

    case "sum_courses--learner":
      return <CoursesLearnerType items={items as NodeSumSummerCourse[]} {...viewProps} />
  }
}
export default View
