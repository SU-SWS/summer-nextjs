import Wysiwyg from "@components/elements/wysiwyg";
import {H1, H2, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import Image from "next/image";
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d";
import ArchBanner from "@components/patterns/arch-banner";
import { convertToLocalDateTime } from "@lib/utils/convert-date";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
  headingLevel?: "h2" | "h3"
}

const SummerCoursePage = ({ node, ...props }: Props) => {
  const startDate = node.sumCourseStartDate && convertToLocalDateTime(node.sumCourseStartDate).toUpperCase();
  const endDate = node.sumCourseEndDate && convertToLocalDateTime(node.sumCourseEndDate).toUpperCase();

  return (
    <article {...props}>
      <ArchBanner
        {...props}
        aria-labelledby="undefined"
        imageUrl="/images/temp-bg.jpg"
        imageAlt=""
        eagerLoadImage
      >
        <div className="w-screen">
          <div className="flex flex-col justify-center items-center border-archway-dark border-b rs-pb-4 rs-mx-6">
            {startDate &&
              <div className="font-sans font-normal rs-mb-0">
                {startDate}{endDate && (` — ${endDate}`)}
              </div>
            }
            <H1 className="font-normal max-w-[900px] font-roboto text-center rs-mb-0">
              {node.title}
            </H1>
            {node.sumCourseCatalogNumber &&
              <H2 className="font-normal">{node.sumCourseCatalogNumber}</H2>
            }
          </div>
        </div>
      </ArchBanner>
      <div className="centered my-32 grid grid-cols-12 gap-10">
        <div className="order-2 col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 rs-mb-4">
            {node.sumCourseImage &&
              <div className="relative w-full h-0 aspect-w-1 aspect-h-1 rounded-[25px] overflow-hidden">
                <Image
                  className="object-cover rounded-[25px]"
                  src={node.sumCourseImage.mediaImage.url}
                  alt={node.sumCourseImage.mediaImage.alt || ""}
                  fill
                  sizes="(max-width: 768px) 300px, 500px"
                />
              </div>
            }
            <div className="pt-12 children:mb-5 [&_span]:font-bold">
              <H3 className="text-m1 ">Details:</H3>

              {node.sumCourseSchedule && <div><span>Time:</span> {node.sumCourseSchedule}</div>} 
              {node.sumCourseUnits && <div><span>Units:</span> {node.sumCourseUnits}</div>} 
              
              {node.sumCourseInterestArea && <div><span>Interest Area:</span> {node.sumCourseInterestArea.name}</div>} 

              {node.sumCourseInstructors && 
                <div>
                  <span>Instructor: </span>
                      {node.sumCourseInstructors && node.sumCourseInstructors.length > 1 ? node.sumCourseInstructors.join(", ") : node.sumCourseInstructors[0]}
                </div>
              }

              {node.sumCoursePopulation &&
                <div>
                  <span>Population: </span>
                  {node.sumCoursePopulation.map((population, i) =>
                    <p className="inline-block mb-0" key={`population-${i}`}>
                      {population.name}{node.sumCoursePopulation && node.sumCoursePopulation.length > 1 && i !== node.sumCoursePopulation.length - 1 && ", "}
                    </p>
                  )}
                </div>
              }
              
              {node.sumCourseInterestArea && <div><span>Interest Area:</span> {node.sumCourseInterestArea.name}</div>}

              {node.sumCourseFormat && <div><span>Course Format & Length: </span>{node.sumCourseFormat}{node.sumCourseLength && `, ${node.sumCourseLength}`}</div>}


              {node.sumCourseCrossListing && (
                <div>
                  <span>Cross Listings: </span>
                  {node.sumCourseCrossListing && node.sumCourseCrossListing.length > 1 ? node.sumCourseCrossListing.join(", ") : node.sumCourseCrossListing[0]}
                </div>
              )}
            </div>
          </div>
          <div>
            {node.sumCourseDescription &&
              <div className="rs-mb-1"><H3 className="text-m1 mb-5">Summary:</H3><Wysiwyg html={node.sumCourseDescription.processed} /></div>
            }
            {node.sumCourseNotes &&
            <><H3 className="text-m1 mb-5">Course notes:</H3><Wysiwyg html={node.sumCourseNotes?.processed} /></>
            }
          </div>
        </div>
        <div className="order-1 col-span-12 md:col-span-4">
          {/* Favorite List */}
          <H3>Favorites List</H3>
        </div>
      </div>
      <div>
        {/* Related Courses Cards */}
      </div>
      <div>
        {/* Apply Now Link */}
      </div>
    </article>
  )
}
export default SummerCoursePage;