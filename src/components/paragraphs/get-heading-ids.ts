import {Maybe, ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {getIdAttribute, getUniqueIdAttributes} from "@lib/utils/text-tools"

/**
 * Heading id attributes keyed by paragraph uuid.
 */
export type HeadingIds = Record<string, string>

/**
 * Collect the headings of the paragraphs, and the paragraphs nested within them, in the order they are displayed.
 */
const getHeadings = (paragraphs: ParagraphUnion[]): {key: string; text?: Maybe<string>}[] =>
  paragraphs.flatMap(paragraph => {
    switch (paragraph.__typename) {
      case "ParagraphStanfordBanner":
        return [{key: paragraph.uuid, text: paragraph.suBannerHeader}]
      case "ParagraphStanfordCard":
        return [{key: paragraph.uuid, text: paragraph.suCardHeader}]
      case "ParagraphStanfordEntity":
        return [{key: paragraph.uuid, text: paragraph.suEntityHeadline}]
      case "ParagraphStanfordGallery":
        return [{key: paragraph.uuid, text: paragraph.suGalleryHeadline}]
      case "ParagraphStanfordList":
      case "ParagraphStanfordFilteredList":
        return [{key: paragraph.uuid, text: paragraph.suListHeadline}]
      case "ParagraphSumAccordion":
        return [{key: paragraph.uuid, text: paragraph.sumAccordionsHeading}]
      case "ParagraphSumAtAGlance":
        return [{key: paragraph.uuid, text: paragraph.sumAtAGlanceHeadline}]
      case "ParagraphSumTestimonial":
        return [{key: paragraph.uuid, text: paragraph.sumTestimonialHeading}]
      case "ParagraphSumCarousel":
        return [
          {key: paragraph.uuid, text: paragraph.sumCarouselHeader},
          ...getHeadings(paragraph.sumCarouselSlides || []),
        ]
      case "ParagraphSumPillBanner":
        return [
          {key: paragraph.uuid, text: paragraph.sumPillBannerHeadline},
          ...getHeadings(paragraph.sumPillBannerCards || []),
        ]
      case "ParagraphSumTopBanner":
        return getHeadings(paragraph.sumTopBannerCards || [])
    }
    return []
  })

/**
 * Build unique heading id attributes for all the paragraphs displayed on a page.
 */
export const getHeadingIds = (paragraphs?: Maybe<ParagraphUnion[]>): HeadingIds =>
  getUniqueIdAttributes(getHeadings(paragraphs || []))

/**
 * Get the id attribute for a paragraph heading, falling back to the heading text when no unique id was provided.
 */
export const getHeadingId = (uuid: string, text?: Maybe<string>, headingIds?: HeadingIds): string | undefined => {
  if (!text) return
  return headingIds?.[uuid] || getIdAttribute(text) || undefined
}
