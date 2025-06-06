"use client"

import {AlgoliaHit} from "@components/algolia/results/default"
import Image from "next/image"
import useAccordion from "@lib/hooks/useAccordion"
import {H3, H4, H5} from "@components/elements/headers"
import {formatCurrency} from "@lib/utils/format-currency"
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid"
import FavoriteButton from "@components/elements/favorite-button"
import ShareCourses from "@components/elements/shareCourses"

export type CourseHit = AlgoliaHit & {
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
  sum_course_instructors?: string | string[]
  sum_course_grading?: string | string[]
}

type Props = {
  availabilityStatus: string
}

const CourseAvailability = ({availabilityStatus}: Props) => {
  switch (availabilityStatus) {
    case "Available":
      return (
        <div className="flex items-center">
          <CheckCircleIcon width={20} className="mr-3 text-digital-green" />
          {availabilityStatus.toUpperCase()}
        </div>
      )
    case "Almost Full":
      return (
        <div className="flex items-center">
          <ExclamationTriangleIcon width={20} className="mr-3 text-poppy" />
          {availabilityStatus.toUpperCase()}
        </div>
      )
    case "Full":
      return (
        <div className="flex items-center">
          <ExclamationCircleIcon width={20} className="mr-3 text-digital-red" />
          {availabilityStatus.toUpperCase()}
        </div>
      )
  }
}

const SummerCourse = ({hit}: {hit: CourseHit}) => {
  const {buttonProps, panelProps, expanded} = useAccordion()

  const start =
    hit.sum_course_start_date &&
    new Date(hit.sum_course_start_date * 1000).toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  const end =
    hit.sum_course_end_date &&
    new Date(hit.sum_course_end_date * 1000).toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  const hitDomain = new URL(hit.url).origin
  const imageUrl = hit.photo?.replace(hitDomain, process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string)

  return (
    <div className="rs-py-3 rs-mb-4 rs-px-4 flex flex-col rounded-[25px] bg-fog-light">
      <div className="flex flex-col gap-5 xl:flex-row xl:gap-[48px]">
        <div className="flex flex-grow flex-col">
          <H3 id={hit.objectID}>
            <a href={hit.url.replace(hitDomain, "")} className="font-normal">
              {hit.title}
            </a>
          </H3>
          <div className="order-first mb-6 font-semibold text-archway-dark">{hit.sum_course_catalog_number}</div>
        </div>

        {imageUrl && (
          <div className="relative order-first aspect-1 w-1/4 shrink-0">
            <Image className="rounded-[25px] object-cover" src={imageUrl} alt={""} fill sizes="500px" />
          </div>
        )}

        <div className="w-full shrink-0 *:mb-4 xl:w-1/4">
          {!!hit.sum_course_units && (
            <div>
              <span className="font-semibold">Units: </span>
              {hit.sum_course_units}
            </div>
          )}
          {hit.sum_course_class_number && (
            <div>
              <span className="font-semibold">Class Number: </span>
              {hit.sum_course_class_number}
            </div>
          )}
          {start && end && (
            <div>
              <span className="font-semibold">Dates: </span>
              {`${start} - ${end}`}
            </div>
          )}
          {!!hit.sum_course_course_cost && (
            <div>
              <span className="font-semibold">Course Cost: </span>
              {formatCurrency(hit.sum_course_course_cost)}
            </div>
          )}
          {hit.sum_course_population && (
            <div>
              <span className="font-semibold">Population: </span>
              {hit.sum_course_population.join(", ")}
            </div>
          )}
        </div>
      </div>

      <div className="rs-mb-2 order-first flex flex-row items-center justify-between">
        {hit.sum_course_availability && <CourseAvailability availabilityStatus={hit.sum_course_availability[0]} />}
        <div className="ml-auto flex flex-row justify-center gap-5">
          <ShareCourses
            courseUrl={hit.url.replace(hitDomain, "https://summer.stanford.edu")}
            courseNum={hit.sum_course_catalog_number || ""}
            courseName={hit.title}
          />
          <FavoriteButton title={hit.title} uuid={hit.objectID} path={hit.url} units={hit.sum_course_units || 0} />
        </div>
      </div>

      <H4 className="type-0 mb-0 ml-auto p-0 font-semibold group-hocus:underline">
        <button {...buttonProps} className="group mt-12 text-digital-blue no-underline hocus:underline">
          <span className="flex w-full items-center gap-5">
            {expanded ? "Collapse details" : "Show all details"}
            <ChevronDownIcon width={20} className={expanded ? "rotate-180" : undefined} />
          </span>
        </button>
      </H4>

      <div {...panelProps}>
        <div className="rs-mt-2 flex flex-col gap-10 xl:flex-row xl:gap-[90px]">
          <div className="flex-grow">
            {hit.html && (
              <div>
                <H5 className="mb-5 font-semibold">Description:</H5>
                {hit.html}
              </div>
            )}

            {hit.sum_course_notes && (
              <div className="mt-8">
                <H5 className="mb-5 font-semibold">Course notes:</H5>
                {hit.sum_course_notes}
              </div>
            )}
          </div>

          <div className="w-full shrink-0 *:mb-4 xl:w-1/4">
            <H5 className="font-semibold">Details:</H5>
            {hit.sum_course_interest && (
              <div>
                <span className="font-semibold">Interest Area{hit.sum_course_interest.length > 1 ? "s" : ""}: </span>
                {hit.sum_course_interest.join(", ")}
              </div>
            )}

            {hit.sum_course_instructors && (
              <div>
                <span className="font-semibold">
                  Instructor
                  {Array.isArray(hit.sum_course_instructors) && hit.sum_course_instructors.length > 1 ? "s" : ""}:{" "}
                </span>
                {Array.isArray(hit.sum_course_instructors) && hit.sum_course_instructors.join(", ")}
                {!Array.isArray(hit.sum_course_instructors) && hit.sum_course_instructors}
              </div>
            )}

            {hit.sum_course_schedule && (
              <div>
                <span className="font-semibold">Time: </span>
                {hit.sum_course_schedule}
              </div>
            )}

            {hit.sum_course_format && (
              <div>
                <span className="font-semibold">Format: </span>
                {hit.sum_course_format}
              </div>
            )}

            {hit.sum_course_length && (
              <div>
                <span className="font-semibold">Course length: </span>
                {hit.sum_course_length}
              </div>
            )}

            {hit.sum_course_prerequisites && (
              <div>
                <span className="font-semibold">Pre-requisites: </span>
                {hit.sum_course_prerequisites}
              </div>
            )}

            {hit.sum_course_cross_listing && (
              <div>
                <span className="font-semibold">Cross Listings: </span>
                {hit.sum_course_cross_listing}
              </div>
            )}

            {hit.sum_course_grading && (
              <div>
                <span className="font-semibold">Grading Basis: </span>
                {Array.isArray(hit.sum_course_grading) ? hit.sum_course_grading.join(", ") : hit.sum_course_grading}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SummerCourse
