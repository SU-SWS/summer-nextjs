"use client";

import {AlgoliaHit} from "@components/algolia-results/default";
import Image from "next/image";
import useAccordion from "@lib/hooks/useAccordion";
import {H3, H4} from "@components/elements/headers";
import {formatCurrency} from "@lib/utils/format-currency";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

type Props = {
  hit: AlgoliaHit
}

const SummerCourse = ({hit}: Props) => {
  const {buttonProps, panelProps, expanded} = useAccordion()

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
    <div className="flex flex-col">
      <div className="flex gap-5">

        <div className="flex flex-col flex-grow">
          <H3><a href={hit.url}>{hit.title}</a></H3>
          <div className="order-first">
            {hit.sum_course_catalog_number}
          </div>
        </div>

        {hit.photo &&
          <div className="order-first relative aspect-1 w-1/4">
            <Image
              className="object-cover"
              src={hit.photo}
              alt={""}
              fill
              sizes="300px"
            />
          </div>
        }

        <div className="w-1/4 shrink-0">
          {hit.sum_course_units &&
            <div>
              <span className="font-bold">Units: </span>{hit.sum_course_units}
            </div>
          }
          {(start && end) &&
            <div>
              <span className="font-bold">Dates: </span>{`${start} - ${end}`}
            </div>
          }
          {hit.sum_course_course_cost &&
            <div>
              <span className="font-bold">Course Cost: </span>{formatCurrency(hit.sum_course_course_cost)}
            </div>
          }
          {hit.sum_course_population &&
            <div>
              <span className="font-bold">Units: </span>{hit.sum_course_population.join(", ")}
            </div>
          }
        </div>
      </div>

      {hit.sum_course_availability &&
        <div className="order-first">
          {hit.sum_course_availability}
        </div>
      }

      <button {...buttonProps} className="group">
        <span className="flex gap-5 items-center w-full">
          <H4 className="ml-auto mb-0 p-0 text-m0 group-hocus:underline">Show all details</H4>
          <ChevronDownIcon width={20} className={expanded ? "rotate-180" : undefined}/>
        </span>
      </button>

      <div {...panelProps}>
        <div className="flex gap-5">
          <div className="flex-grow">
            <div>
              <div className="font-bold">Summary:</div>
              {hit.html}
            </div>

            {hit.sum_course_notes &&
              <div>
                <div className="font-bold">Course notes:</div>
                {hit.sum_course_notes}
              </div>
            }
          </div>

          <div className="w-1/4 shrink-0">
            {hit.sum_course_interest &&
              <div>
                <span className="font-bold">Interest Area: </span>{hit.sum_course_interest.join(", ")}
              </div>
            }

            {hit.sum_course_schedule &&
              <div>
                <span className="font-bold">Time: </span>{hit.sum_course_schedule}
              </div>
            }

            {hit.sum_course_format &&
              <div>
                <span className="font-bold">Format: </span>{hit.sum_course_format}
              </div>
            }

            {hit.sum_course_length &&
              <div>
                <span className="font-bold">Course length: </span>{hit.sum_course_length}
              </div>
            }

            {hit.sum_course_prerequisites &&
              <div>
                <span className="font-bold">Pre-requisites: </span>{hit.sum_course_prerequisites}
              </div>
            }

            {hit.sum_course_cross_listing &&
              <div>
                <span className="font-bold">Cross Listings: </span>{hit.sum_course_cross_listing}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default SummerCourse;