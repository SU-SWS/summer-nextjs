import {Hit as HitType} from "instantsearch.js/es/types/results";
import {H3} from "@components/elements/headers";
import Link from "@components/elements/link";
import {Snippet} from "react-instantsearch";
import Image from "next/image";
import SummerCourse from "@components/algolia-results/summer-course/summer-course";

export type AlgoliaHit = {
  url: string
  title: string
  summary?: string
  photo?: string
  updated: number
  html?: string
  type: string
  sum_course_availability?: string
  sum_course_catalog_number?: string
  sum_course_class_number?: string
  sum_course_course_cost?: number
  sum_course_cross_listing?: string
  sum_course_end_date?: number
  sum_course_format?: string
  sum_course_interest?: string[]
  sum_course_length?: string
  sum_course_notes?: string
  sum_course_population?: string[]
  sum_course_prerequisites?: string
  sum_course_schedule?: string
  sum_course_start_date?: number
  sum_course_units?: number
}

const DefaultResult = ({hit}: { hit: HitType<AlgoliaHit> }) => {
  if (hit.type === "Summer Courses") return <SummerCourse hit={hit}/>

  const hitUrl = new URL(hit.url);

  return (
    <article className="@container flex justify-between gap-20 py-12">
      <div>
        <H3 className="text-m2">
          <Link href={hit.url.replace(hitUrl.origin, "")}>
            {hit.title}
          </Link>
        </H3>

        {hit.summary &&
          <p className="mb-10">{hit.summary}</p>
        }
        {(hit.html && !hit.summary) &&
          <p className="mb-10">
            <Snippet hit={hit} attribute="html"/>
          </p>
        }
      </div>

      {hit.photo &&
        <div className="relative shrink-0 aspect-[2/3] w-[150px]">
          <Image
            className="object-cover"
            src={hit.photo}
            alt=""
            fill
            sizes="300px"
          />
        </div>
      }
    </article>
  )
}
export default DefaultResult;