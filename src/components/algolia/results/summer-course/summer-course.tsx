"use client";

import {AlgoliaHit} from "@components/algolia/results/default";
import Image from "next/image";
import {Hit as HitType} from "instantsearch.js/es/types/results";
import useAccordion from "@lib/hooks/useAccordion";
import {H3, H4} from "@components/elements/headers";
import {formatCurrency} from "@lib/utils/format-currency";
import { CheckCircleIcon, ChevronDownIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import FavoriteButton from "@components/elements/favorite-button";

type Props = {
  hit: HitType<AlgoliaHit>
}

type CourseAvailabilityProps = {
  availabilityStatus: string
}

const CourseAvailability: React.FC<CourseAvailabilityProps> = ({ availabilityStatus }) => {
  switch (availabilityStatus) {
    case "Available":
      return (
        <>
          <CheckCircleIcon width={20} className="text-digital-green mr-3" />
          {availabilityStatus.toUpperCase()}
        </>
      )
    case "Almost Full":
      return (
        <>
          <ExclamationTriangleIcon width={20} className="text-poppy mr-3" />
          {availabilityStatus.toUpperCase()}
        </>
      )
    case "Full":
      return (
        <>
          <ExclamationCircleIcon width={20} className="text-digital-red mr-3" />
          {availabilityStatus.toUpperCase()}
        </>
      )
    default:
      return;
  }
}

const SummerCourse = ({hit}: Props) => {
  const { buttonProps, panelProps, expanded } = useAccordion()

  const start = hit.sum_course_start_date && new Date(hit.sum_course_start_date * 1000).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const end = hit.sum_course_end_date && new Date(hit.sum_course_end_date * 1000).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="flex flex-col rounded-[25px] bg-fog-light rs-py-3 rs-px-4 rs-mb-4">
      <div className="flex flex-col md:flex-row gap-5 md:gap-[48px]">

        <div className="flex flex-col flex-grow">
          <H3 id={hit.objectID}><a href={hit.url} className="font-normal">{hit.title}</a></H3>
          <div className="order-first font-semibold text-archway-dark mb-6">
            {hit.sum_course_catalog_number}
          </div>
        </div>

        {hit.photo &&
          <div className="order-first relative aspect-1 w-1/4">
            <Image
              className="object-cover rounded-[25px]"
              src={hit.photo}
              alt={""}
              fill
              sizes="300px"
            />
          </div>
        }

        <div className="w-1/4 shrink-0 *:mb-4">
          {hit.sum_course_units &&
            <div>
              <span className="font-semibold">Units: </span>{hit.sum_course_units}
            </div>
          }
          {(start && end) &&
            <div>
              <span className="font-semibold">Dates: </span>{`${start} - ${end}`}
            </div>
          }
          {hit.sum_course_course_cost &&
            <div>
              <span className="font-semibold">Course Cost: </span>{formatCurrency(hit.sum_course_course_cost)}
            </div>
          }
          {hit.sum_course_population &&
            <div>
              <span className="font-semibold">Population: </span>{hit.sum_course_population.join(", ")}
            </div>
          }
        </div>
      </div>

      <div className="order-first flex flex-row justify-between items-center rs-mb-2">
        {hit.sum_course_availability && <CourseAvailability availabilityStatus={hit.sum_course_availability[0]} />}
        {hit && hit.sum_course_units && 
          <div className="ml-auto">
            <FavoriteButton title={hit.title} uuid={hit.objectID} path={hit.url} units={hit.sum_course_units} />
          </div>
        }
      </div>

      <H4 className="ml-auto mb-0 p-0 text-m0 group-hocus:underline font-semibold">
        <button {...buttonProps} className="group text-digital-blue no-underline mt-12">
        <span className="flex gap-5 items-center w-full">
          {expanded ? "Collapse details" : "Show all details"}
          <ChevronDownIcon width={20} className={expanded ? "rotate-180" : undefined}/>
        </span>
        </button>
      </H4>

      <div {...panelProps}>
        <div className="flex flex-col md:flex-row gap-10 md:gap-[90px] rs-mt-2">
          <div className="flex-grow">
            <div>
              <div className="font-semibold text-m1 mb-5">Summary:</div>
              {hit.html}
            </div>

            {hit.sum_course_notes &&
              <div className="mt-8">
                <div className="font-semibold text-m1 mb-5">Course notes:</div>
                {hit.sum_course_notes}
              </div>
            }
          </div>

          <div className="w-1/4 shrink-0 *:mb-4">
            <div className="font-semibold text-m1">Details:</div>
            {hit.sum_course_interest &&
              <div>
                <span className="font-semibold">Interest Area: </span>{hit.sum_course_interest.join(", ")}
              </div>
            }

            {hit.sum_course_schedule &&
              <div>
                <span className="font-semibold">Time: </span>{hit.sum_course_schedule}
              </div>
            }

            {hit.sum_course_format &&
              <div>
                <span className="font-semibold">Format: </span>{hit.sum_course_format}
              </div>
            }

            {hit.sum_course_length &&
              <div>
                <span className="font-semibold">Course length: </span>{hit.sum_course_length}
              </div>
            }

            {hit.sum_course_prerequisites &&
              <div>
                <span className="font-semibold">Pre-requisites: </span>{hit.sum_course_prerequisites}
              </div>
            }

            {hit.sum_course_cross_listing &&
              <div>
                <span className="font-semibold">Cross Listings: </span>{hit.sum_course_cross_listing}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default SummerCourse;