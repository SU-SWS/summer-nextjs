import Wysiwyg from "@components/elements/wysiwyg"
import {H1, H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d"
import ArcBanner from "@components/patterns/arc-banner"
import {convertToLocalDateTime} from "@lib/utils/convert-date"
import FavoritesList from "@components/elements/favorites-list"
import RelatedCourses from "@components/algolia/algolia-course-related"
import FavoriteButton from "@components/elements/favorite-button"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
}

const SummerCoursePage = async ({node, ...props}: Props) => {
  const startDate = node.sumCourseStartDate && convertToLocalDateTime(node.sumCourseStartDate).toUpperCase()
  const endDate = node.sumCourseEndDate && convertToLocalDateTime(node.sumCourseEndDate).toUpperCase()

  return (
    <article {...props}>
      <ArcBanner {...props} imageUrl="/images/temp-bg.jpg" imageAlt="">
        <div className="w-screen">
          <div className="rs-pb-4 rs-mx-6 flex flex-col items-center justify-center border-b border-archway-dark">
            <H1 className="rs-mb-0 max-w-[900px] text-center font-roboto font-normal">{node.title}</H1>

            {startDate && (
              <div className="rs-mb-0 order-first font-sans font-normal">
                {startDate}
                {endDate && ` — ${endDate}`}
              </div>
            )}

            {node.sumCourseCatalogNumber && <div className="font-normal">{node.sumCourseCatalogNumber}</div>}
          </div>
        </div>
      </ArcBanner>

      <div className="centered relative z-10 my-32 flex flex-col justify-between gap-10 md:gap-32 lg:flex-row">
        <FavoriteButton
          className="absolute -top-20 right-5 md:right-16 xl:right-0"
          title={node.title}
          uuid={node.id}
          path={node.path}
          units={node.sumCourseUnits || 0}
        />

        <div className="lg:w-7/12 2xl:w-8/12">
          <div className="rs-mb-4 flex flex-col gap-10 lg:flex-row">
            {node.sumCourseImage && (
              <div className="lg:w-1/2">
                <div className="relative aspect-1">
                  <Image
                    className="rounded-[25px] object-cover"
                    src={node.sumCourseImage.mediaImage.url}
                    alt={node.sumCourseImage.mediaImage.alt || ""}
                    fill
                    sizes="(max-width: 992px) 100vw, 700px"
                  />
                </div>
              </div>
            )}
            <div className="pt-12 children:mb-5 [&_span]:font-bold">
              <H2 className="type-1">Details:</H2>

              {node.sumCourseSchedule && (
                <div>
                  <span>Time:</span> {node.sumCourseSchedule}
                </div>
              )}
              {node.sumCourseUnits && (
                <div>
                  <span>Units:</span> {node.sumCourseUnits}
                </div>
              )}

              {node.sumCourseInterestArea && (
                <div>
                  <span>Interest Area:</span> {node.sumCourseInterestArea.name}
                </div>
              )}

              {node.sumCourseInstructors && (
                <div>
                  <span>Instructor: </span>
                  {node.sumCourseInstructors &&
                    node.sumCourseInstructors.length > 1 &&
                    node.sumCourseInstructors.join(", ")}
                </div>
              )}

              {node.sumCoursePopulation && (
                <div>
                  <span>Population: </span>
                  {node.sumCoursePopulation.map(population => population.name).join(", ")}
                </div>
              )}

              {node.sumCourseInterestArea && (
                <div>
                  <span>Interest Area:</span> {node.sumCourseInterestArea.name}
                </div>
              )}

              {node.sumCourseFormat && (
                <div>
                  <span>Course Format & Length: </span>
                  {node.sumCourseFormat}
                  {node.sumCourseLength && `, ${node.sumCourseLength}`}
                </div>
              )}

              {node.sumCourseCrossListing && (
                <div>
                  <span>Cross Listings: </span>
                  {node.sumCourseCrossListing &&
                    node.sumCourseCrossListing.length > 1 &&
                    node.sumCourseCrossListing.join(", ")}
                </div>
              )}
            </div>
          </div>
          <div>
            {node.sumCourseDescription && (
              <div className="rs-mb-1">
                <H3 className="type-1 mb-5">Summary:</H3>
                <Wysiwyg html={node.sumCourseDescription.processed} />
              </div>
            )}
            {node.sumCourseNotes && (
              <div className="rs-mb-1">
                <H3 className="type-1 mb-5">Course notes:</H3>
                <Wysiwyg html={node.sumCourseNotes?.processed} />
              </div>
            )}
          </div>
        </div>
        <div className="order-first lg:w-5/12 2xl:w-4/12">
          <FavoritesList isDisplayOnly />
        </div>
      </div>
      <div className="centered">
        <RelatedCourses objectId={node.id} />
      </div>
      <div>{/* Apply Now Link */}</div>
    </article>
  )
}
export default SummerCoursePage
