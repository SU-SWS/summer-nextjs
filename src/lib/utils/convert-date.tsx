import {DateTime} from "@lib/gql/__generated__/drupal.d"

export const convertToLocalDateTime = (timeObject: DateTime): string => {
  return new Date(timeObject.time).toLocaleString("en-US", {
    timeZone: timeObject.timezone,
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
