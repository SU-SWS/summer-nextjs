import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d"
import LoadMoreList from "@components/elements/load-more-list"
import {ViewDisplayProps} from "@components/views/view"
import ReverseVisualOrder from "@components/elements/reverse-visual-order"
import Link from "@components/elements/link"

const CoursesLearnerType = async ({items, totalItems, loadPage}: ViewDisplayProps<NodeSumSummerCourse>) => {
  return (
    <LoadMoreList
      buttonText={
        <>
          Load More<span className="sr-only">&nbsp;Courses</span>
        </>
      }
      ulProps={{className: "list-unstyled mb-20 lg:grid lg:grid-cols-3 gap-20"}}
      totalItems={totalItems}
      loadPage={loadPage}
    >
      {items.map(item => (
        <div key={item.uuid}>
          <ReverseVisualOrder>
            <Link href={item.path || "#"}>{item.title}</Link>
            <div className="text-18 text-archway-dark">{item.sumCourseCatalogNumber}</div>
          </ReverseVisualOrder>
        </div>
      ))}
    </LoadMoreList>
  )
}
export default CoursesLearnerType
