import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph"
import EntityParagraph from "@components/paragraphs/stanford-entity/entity-paragraph"
import GalleryParagraph from "@components/paragraphs/stanford-gallery/gallery-paragraph"
import MediaCaptionParagraph from "@components/paragraphs/stanford-media-caption/media-caption-paragraph"
import SpacerParagraph from "@components/paragraphs/stanford-spacer/spacer-paragraph"
import WysiwygParagraph from "@components/paragraphs/stanford-wysiwyg/wysiwyg-paragraph"
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph"
import ListParagraph from "@components/paragraphs/stanford-lists/list-paragraph"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"
import {ParagraphUnion} from "@lib/gql/__generated__/drupal.d"
import {Suspense} from "react"
import UserFavoriteParagraph from "@components/paragraphs/summer-user-favorite/user-favorite-paragraph"
import SumCalculatorParagraph from "@components/paragraphs/sum-calculator/sum-calculator-paragraph"
import SumCourseFilterParagraph from "@components/paragraphs/sum-course-filter/sum-course-filter-paragraph"
import SumAccordionParagraph from "./sum-accordion/accordion-paragraph"
import SumCarouselParagraph from "@components/paragraphs/sum-carousel/sum-carousel-paragraph"
import SumSlideTeaserParagraph from "@components/paragraphs/sum-slide-teaser/sum-slide-teaser-paragraph"
import SumVideoParagraph from "@components/paragraphs/sum-video/video-paragraph"
import SumAtAGlanceParagraph from "@components/paragraphs/sum-at-a-glance/at-a-glance-paragraph"
import SumPillBannerParagraph from "@components/paragraphs/sum-pill-banner/sum-pill-banner-paragraph"
import SumTestimonialBannerParagraph from "@components/paragraphs/sum-testimonial-banner/sum-testimonial-banner-paragraph"
import UnpublishedBanner from "@components/elements/unpublished-banner"

type Props = {
  /**
   * Paragraph entity todisplay.
   */
  paragraph: ParagraphUnion
}

const Paragraph = async ({paragraph}: Props) => {
  return (
    <UnpublishedBanner status={paragraph.status} message="Unpublished Content">
      <ParagraphComponent paragraph={paragraph} />
    </UnpublishedBanner>
  )
}
const ParagraphComponent = async ({paragraph}: Props) => {
  const previewMode = await isPreviewMode()

  const itemProps: Record<string, string> = {}
  if (previewMode) {
    itemProps["data-type"] = paragraph.__typename || "unknown"
    itemProps["data-id"] = paragraph.uuid
  }

  switch (paragraph.__typename) {
    case "ParagraphStanfordBanner":
      return <BannerParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordCard":
      return <CardParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordEntity":
      return <EntityParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordGallery":
      return <GalleryParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordMediaCaption":
      return <MediaCaptionParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordSpacer":
      return <SpacerParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordWysiwyg":
      return <WysiwygParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphStanfordList":
      return (
        <Suspense>
          <ListParagraph paragraph={paragraph} {...itemProps} />
        </Suspense>
      )
    case "ParagraphSumCalculator":
      return <SumCalculatorParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumCourseFilter":
      return <SumCourseFilterParagraph {...itemProps} />
    case "ParagraphSumUserFavorite":
      return <UserFavoriteParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumAccordion":
      return <SumAccordionParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumCarousel":
      return <SumCarouselParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumSlideTeaser":
      return <SumSlideTeaserParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumVideo":
      return <SumVideoParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumAtAGlance":
      return <SumAtAGlanceParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumPillBanner":
      return <SumPillBannerParagraph paragraph={paragraph} {...itemProps} />
    case "ParagraphSumTestimonial":
      return <SumTestimonialBannerParagraph paragraph={paragraph} {...itemProps} />
  }
  console.warn(`Unknown paragraph ${paragraph.__typename}. Item ${paragraph.uuid}.`)
}
export default Paragraph
