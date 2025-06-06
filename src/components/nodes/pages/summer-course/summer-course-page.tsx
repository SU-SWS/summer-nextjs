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
import {ApplyNowLink} from "@components/elements/apply-now-link"
import Link from "next/link"
import SummerCourseMetadata from "@components/nodes/pages/summer-course/summer-course-metadata"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
}

const SummerCoursePage = async ({node, ...props}: Props) => {
  const startDate = node.sumCourseStartDate && convertToLocalDateTime(node.sumCourseStartDate).toUpperCase()
  const endDate = node.sumCourseEndDate && convertToLocalDateTime(node.sumCourseEndDate).toUpperCase()

  return (
    <article {...props} aria-labelledby={node.id}>
      <SummerCourseMetadata node={node} />
      <ArcBanner {...props} imageUrl="/images/temp-bg.jpg" imageAlt="">
        <div className="w-screen">
          <div className="rs-mx-6 flex flex-col items-center justify-center md:rs-mt-7">
            <H1 id={node.id} className="rs-mb-0 max-w-[900px] text-center font-roboto font-normal">
              {node.title}
            </H1>

            {startDate && (
              <div className="rs-mb-0 order-first font-sans font-normal">
                {startDate}
                {endDate && ` — ${endDate}`}
              </div>
            )}

            {node.sumCourseCatalogNumber && <div className="font-normal">{node.sumCourseCatalogNumber}</div>}
            <div className="rs-mb-4 rs-pb-4 centered w-full border-b border-archway-dark" />
          </div>
        </div>
      </ArcBanner>

      <div className="centered relative z-10 my-32 flex flex-col justify-between gap-10 md:gap-32 lg:flex-row">
        <FavoriteButton
          className="absolute -top-20 right-5 md:right-16 xl:right-0"
          title={node.title}
          uuid={node.id}
          path={node.path || "#"}
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

              {!!node.sumCourseUnits && (
                <div>
                  <span>Units:</span> {node.sumCourseUnits}
                </div>
              )}

              {node.sumCourseClassNumber && (
                <div>
                  <span>Class Number:</span> {node.sumCourseClassNumber}
                </div>
              )}

              {node.sumCourseInterestArea && (
                <div>
                  <span>Interest Area:</span> {node.sumCourseInterestArea.name}
                </div>
              )}

              {node.sumCourseInstructors && (
                <div>
                  <span>Instructor{node.sumCourseInstructors.length > 1 ? "s" : ""}: </span>
                  {node.sumCourseInstructors.join(", ")}
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

              {node.sumCoursePrerequisites && (
                <div>
                  <span>Pre-requisites: </span>
                  <Wysiwyg html={node.sumCoursePrerequisites.processed} />
                </div>
              )}

              {node.sumCourseCrossListing && (
                <div>
                  <span>Cross Listing{node.sumCourseCrossListing.length > 1 ? "s" : ""}: </span>
                  {node.sumCourseCrossListing.join(", ")}
                </div>
              )}

              {node.sumCourseGrading && (
                <div>
                  <span>Grading Basis: </span>
                  {node.sumCourseGrading.map(grading => grading.name).join(", ")}
                </div>
              )}

              {node.sumCourseSyllabusFile && (
                <div>
                  <Link prefetch={false} href={node.sumCourseSyllabusFile.mediaFile.url}>
                    View <span className="sr-only">{node.title}</span>Course Syllabus
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            {node.sumCourseDescription && (
              <div className="rs-mb-1">
                <H3 className="type-1 mb-5">Description:</H3>
                <Wysiwyg html={node.sumCourseDescription.processed} />
              </div>
            )}
            {node.sumCourseNotes && (
              <div className="rs-mb-1">
                <H3 className="type-1 mb-5">Course notes:</H3>
                <Wysiwyg className="max-w-full *:max-w-full" html={node.sumCourseNotes?.processed} />
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
      <div className="centered flex flex-col items-end">
        <div className="rs-mt-3 mb-32 w-full md:w-1/2">
          <ApplyNowLink href="/apply-now">
            Ready to dive in? Kick off your application today – let&apos;s make things happen!
          </ApplyNowLink>
        </div>
      </div>
    </article>
  )
}
export default SummerCoursePage
