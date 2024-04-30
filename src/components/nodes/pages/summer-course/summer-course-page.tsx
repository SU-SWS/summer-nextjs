import Wysiwyg from "@components/elements/wysiwyg";
import {H1, H3} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import Image from "next/image";
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d";
import ArchBanner from "@components/patterns/arch-banner";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
  headingLevel?: "h2" | "h3"
}

interface TimeObject {
  timezone: string;
  time: string;
}


const convertToLocalDateTime = (timeObject: TimeObject): string[] => {
  const utcDate = new Date(timeObject.time);

  // Use toLocaleString with the timeZone option and appropriate date and time styles
  const localDate = utcDate.toLocaleString("en-US", {
      timeZone: timeObject.timezone,
      month: "long", // Display full month name
      day: "numeric", // Display numeric day
      year: "numeric" // Display full year
  });

  // Use toLocaleString with the timeZone option and time style
  const localTime = utcDate.toLocaleString("en-US", {
      timeZone: timeObject.timezone,
      hour: "numeric", // Display numeric hour
      minute: "numeric", // Display numeric minute
      hour12: true // Use 12-hour clock
  });

  // Return an array with formatted date and time
  return [localDate, localTime];
};

const SummerCoursePage = ({ node, ...props }: Props) => {
  const startDateTime = node.sumCourseStartDate && convertToLocalDateTime(node.sumCourseStartDate);
  const endDateTime = node.sumCourseEndDate && convertToLocalDateTime(node.sumCourseEndDate);
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
            {startDateTime &&
              <div className="font-sans font-normal rs-mb-0">
                {startDateTime[0].toUpperCase()}{endDateTime && (` — ${endDateTime[0].toUpperCase()}`)}
              </div>
            }
            <H1 className="font-normal max-w-[900px] font-roboto text-center rs-mb-0">
              {node.title}
            </H1>
            {node.sumCourseCatalogNumber &&
              <div>{node.sumCourseCatalogNumber}</div>
            }
          </div>
          <div className="centered my-32 grid grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-4">
              {/* Favorite List */}
              <H3>Favorites List</H3>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div className="flex flex-col md:flex-row gap-10 rs-mb-4">
                <div className="relative aspect-1/1 w-full h-[200px] md:w-[500px] md:h-[500px] *:rounded-[25px]">
                  <Image
                    className="object-cover"
                    src="/images/temp-img.jpg"
                    alt=""
                    loading="eager"
                    fill
                    sizes="100vw"
                  />
                </div>
                <div className="pt-12 children:mb-5 [&_span]:font-bold">
                  <p className="font-bold">Details:</p>

                  {startDateTime && endDateTime && <div><span>Time:</span> {`${startDateTime[1]} — ${endDateTime[1]}`}</div>} 
                  {node.sumCourseUnits && <div><span>Units:</span> {node.sumCourseUnits}</div>} 
                  
                  {node.sumCourseInterestArea && <div><span>Interest Area:</span> {node.sumCourseInterestArea.name}</div>} 

                  {node.sumCourseInstructors &&
                    <div>
                      <span>Instructor(s):</span>
                      {node.sumCourseInstructors.map((instructor, i) =>
                        <p className="inline-block mb-0" key={`instructor-${i}`}> {instructor}</p>
                      )}
                    </div>
                  }
                  
                  {node.sumCoursePopulation && <div><span>Population:</span> {node.sumCoursePopulation.name}</div>}
                  
                  {node.sumCourseInterestArea && <div><span>Interest Area:</span> {node.sumCourseInterestArea.name}</div>}

                  {node.sumCourseFormat && <div><span>Course Format & Length:</span> {node.sumCourseFormat}</div>}

                  {node.sumCourseCrossListing && <div><span>Cross Listings:</span> {node.sumCourseCrossListing}</div>}
                </div>
              </div>
              <div>
                {node.sumCourseDescription &&
                  <div className="rs-mb-1"><p className="font-bold mb-5">Summary:</p><Wysiwyg html={node.sumCourseDescription.processed} /></div>
                }
                {node.sumCourseNotes &&
                <><p className="font-bold mb-5">Course notes:</p><Wysiwyg html={node.sumCourseNotes?.processed} /></>
                }
              </div>
            </div>
          </div>
          <div>
            {/* Related Courses Cards */}
          </div>
          <div>
            {/* Apply Now Link */}
          </div>
        </div>
      </ArchBanner>
    </article>
  )
}
export default SummerCoursePage;