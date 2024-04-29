import Wysiwyg from "@components/elements/wysiwyg";
import {H1} from "@components/elements/headers";
import {HtmlHTMLAttributes} from "react";
import {NodeSumSummerCourse} from "@lib/gql/__generated__/drupal.d";
import ArchBanner from "@components/patterns/arch-banner";

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeSumSummerCourse
  headingLevel?: "h2" | "h3"
}

const SummerCoursePage = ({node, ...props}: Props) => {
  return (
    <article {...props}>
      <ArchBanner
        {...props}
        aria-labelledby="undefined"
        imageUrl="/images/temp-bg.jpg"
        imageAlt=""
        eagerLoadImage
      >
        <div className="flex flex-col justify-center items-center border-archway-dark border-b rs-pb-4 rs-mx-6">
          {/* {node.sumCourseStartDate && node.sumCourseEndDate &&
            <div>
              {node.sumCourseStartDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })} — {node.sumCourseEndDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
              })}
            </div>
          } */}
          <H1 className="font-normal font-roboto w-[900px] text-center">
            {node.title}
          </H1>
          {node.sumCourseCatalogNumber &&
            <div>{node.sumCourseCatalogNumber}</div>
          }
        </div>
      </ArchBanner>
      <div className="centered my-32 flex flex-col gap-10">
        {node.sumCourseClassNumber &&
          <div>{node.sumCourseClassNumber}</div>
        }

        {node.sumCourseCatalogNumber &&
          <div>{node.sumCourseCatalogNumber}</div>
        }
        
        {node.sumCourseCrossListing &&
          <div>{node.sumCourseCrossListing}</div>
        }
        
        {node.sumCourseInterestArea &&
          <div>{node.sumCourseInterestArea.name}</div>
        }
        
        {node.sumCoursePopulation &&
          <div>{node.sumCoursePopulation.name}</div>
        }

        <Wysiwyg html={node.sumCourseDescription?.processed}/>
        <Wysiwyg html={node.sumCourseNotes?.processed}/>

        {node.sumCourseInstructors &&
          <div>
            {node.sumCourseInstructors.map((instructor, i) =>
              <div key={`instructor-${i}`}>{instructor}</div>
            )}
          </div>
        }
      </div>
    </article>
  )
}
export default SummerCoursePage;