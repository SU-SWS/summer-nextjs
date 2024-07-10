import Wysiwyg from "@components/elements/wysiwyg"
import {H1, H2, H3} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import Image from "next/image"
import {NodeSumSummerCourse, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import ArchBanner from "@components/patterns/arch-banner"
import {convertToLocalDateTime} from "@lib/utils/convert-date"
import FavoritesList from "@components/elements/favorites-list"
import RelatedCourses from "@components/algolia/algolia-course-related"
import {getConfigPage} from "@lib/gql/gql-queries"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
}

const SummerCoursePage = async ({node, ...props}: Props) => {
  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  const startDate = node.sumCourseStartDate && convertToLocalDateTime(node.sumCourseStartDate).toUpperCase()
  const endDate = node.sumCourseEndDate && convertToLocalDateTime(node.sumCourseEndDate).toUpperCase()

  if (!siteSettingsConfig?.suSiteAlgoliaId || !siteSettingsConfig.suSiteAlgoliaSearch || !siteSettingsConfig.suSiteAlgoliaIndex) {
    return
  }
  return (
    <article {...props}>
      <ArchBanner
        {...props}
        imageUrl="/images/temp-bg.jpg"
        imageAlt=""
      >
        <div className="w-screen">
          <div className="rs-pb-4 rs-mx-6 flex flex-col items-center justify-center border-b border-archway-dark">
            {startDate && (
              <div className="rs-mb-0 font-sans font-normal">
                {startDate}
                {endDate && ` — ${endDate}`}
              </div>
            )}
            <H1 className="rs-mb-0 max-w-[900px] text-center font-roboto font-normal">{node.title}</H1>
            {node.sumCourseCatalogNumber && <div className="font-normal">{node.sumCourseCatalogNumber}</div>}
          </div>
        </div>
      </ArchBanner>
      <div className="centered relative z-10 my-32 grid grid-cols-12 gap-10">
        <div className="order-2 col-span-12 lg:col-span-8">
          <div className="rs-mb-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {node.sumCourseImage && (
              <div className="aspect-h-1 aspect-w-1 relative">
                <Image
                  className="rounded-[25px] object-cover"
                  src={node.sumCourseImage.mediaImage.url}
                  alt={node.sumCourseImage.mediaImage.alt || ""}
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                />
              </div>
            )}
            <div className="pt-12 children:mb-5 [&_span]:font-bold">
              <H2 className="text-m1">Details:</H2>

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
                  {node.sumCourseInstructors && node.sumCourseInstructors.length > 1 && node.sumCourseInstructors.join(", ")}
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
                  {node.sumCourseCrossListing && node.sumCourseCrossListing.length > 1 && node.sumCourseCrossListing.join(", ")}
                </div>
              )}
            </div>
          </div>
          <div>
            {node.sumCourseDescription && (
              <div className="rs-mb-1">
                <H3 className="mb-5 text-m1">Summary:</H3>
                <Wysiwyg html={node.sumCourseDescription.processed} />
              </div>
            )}
            {node.sumCourseNotes && (
              <>
                <H3 className="mb-5 text-m1">Course notes:</H3>
                <Wysiwyg html={node.sumCourseNotes?.processed} />
              </>
            )}
          </div>
        </div>
        <div className="order-1 col-span-12 lg:col-span-4">
          <FavoritesList isDisplayOnly />
        </div>
      </div>
      <div className="centered">
        <RelatedCourses
          objectID={node.id}
          appId={siteSettingsConfig.suSiteAlgoliaId}
          searchIndex={siteSettingsConfig.suSiteAlgoliaIndex}
          searchApiKey={siteSettingsConfig.suSiteAlgoliaSearch}
        />
      </div>
      <div>{/* Apply Now Link */}</div>
    </article>
  )
}
export default SummerCoursePage
