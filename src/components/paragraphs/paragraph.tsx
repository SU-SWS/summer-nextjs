import CardParagraph from "@components/paragraphs/stanford-card/card-paragraph";
import EntityParagraph from "@components/paragraphs/stanford-entity/entity-paragraph";
import GalleryParagraph from "@components/paragraphs/stanford-gallery/gallery-paragraph";
import MediaCaptionParagraph from "@components/paragraphs/stanford-media-caption/media-caption-paragraph";
import SpacerParagraph from "@components/paragraphs/stanford-spacer/spacer-paragraph";
import WysiwygParagraph from "@components/paragraphs/stanford-wysiwyg/wysiwyg-paragraph";
import BannerParagraph from "@components/paragraphs/stanford-banner/banner-paragraph";
import ListParagraph from "@components/paragraphs/stanford-lists/list-paragraph";
import {isPreviewMode} from "@lib/drupal/utils";
import {ParagraphUnion} from "@lib/gql/__generated__/drupal.d";
import {Suspense} from "react";
import UserFavoriteParagraph from "@components/paragraphs/summer-user-favorite/user-favorite-paragraph";
import SumCalculatorParagraph from "@components/paragraphs/sum-calculator/sum-calculator-paragraph";
import SumCourseFilterParagraph from "@components/paragraphs/sum-course-filter/sum-course-filter-paragraph";

type Props = {
  /**
   * Paragraph entity todisplay.
   */
  paragraph: ParagraphUnion
}

const Paragraph = async ({paragraph}: Props) => {
  const previewMode = isPreviewMode()

  const itemProps: Record<string, string> = {}
  if (previewMode) {
    itemProps["data-type"] = paragraph.__typename || "unknown";
    itemProps["data-id"] = paragraph.id;
  }

  switch (paragraph.__typename) {
    case "ParagraphStanfordBanner":
      return <BannerParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordCard":
      return <CardParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordEntity":
      return <EntityParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordGallery":
      return <GalleryParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordMediaCaption":
      return <MediaCaptionParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordSpacer":
      return <SpacerParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordWysiwyg":
      return <WysiwygParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphStanfordList":
      return <Suspense><ListParagraph paragraph={paragraph} {...itemProps}/></Suspense>
    case "ParagraphSumCalculator":
      return <SumCalculatorParagraph paragraph={paragraph} {...itemProps}/>
    case "ParagraphSumCourseFilter":
      return <SumCourseFilterParagraph {...itemProps}/>
    case "ParagraphSumUserFavorite":
      return <UserFavoriteParagraph paragraph={paragraph} {...itemProps}/>
  }
  console.warn(`Unknown paragraph ${paragraph.__typename}. Item ${paragraph.id}.`);
}
export default Paragraph;