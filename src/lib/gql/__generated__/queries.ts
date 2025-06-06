/** THIS IS GENERATED FILE. DO NOT MODIFY IT DIRECTLY, RUN 'yarn graphql' INSTEAD. **/
import * as DrupalTypes from './drupal.d';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export const FragmentPageInfoFragmentDoc = gql`
    fragment FragmentPageInfo on ConnectionPageInfo {
  hasNextPage
  endCursor
}
    `;
export const AllNodeInterfaceFragmentDoc = gql`
    fragment AllNodeInterface on NodeInterface {
  id
  path
  changed {
    time
  }
}
    `;
export const FragmentNameTypeFragmentDoc = gql`
    fragment FragmentNameType on NameType {
  title
  given
  middle
  family
  generational
  credentials
}
    `;
export const FragmentDateTimeFragmentDoc = gql`
    fragment FragmentDateTime on DateTime {
  timezone
  time
}
    `;
export const FragmentNodeInterfaceFragmentDoc = gql`
    fragment FragmentNodeInterface on NodeInterface {
  __typename
  id
  title
  status
  path
  changed {
    ...FragmentDateTime
  }
  created {
    ...FragmentDateTime
  }
}
    ${FragmentDateTimeFragmentDoc}`;
export const FragmentTextSummaryFragmentDoc = gql`
    fragment FragmentTextSummary on TextSummary {
  processed
}
    `;
export const FragmentTermInterfaceFragmentDoc = gql`
    fragment FragmentTermInterface on TermInterface {
  __typename
  id
  name
  path
  weight
  parent {
    ... on TermInterface {
      id
    }
  }
}
    `;
export const FragmentNodeStanfordCourseFragmentDoc = gql`
    fragment FragmentNodeStanfordCourse on NodeStanfordCourse {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suCourseAcademicYear
  suCourseCode
  suCourseId
  suCourseInstructors
  suCourseLink {
    url
    title
  }
  suCourseQuarters {
    ...FragmentTermInterface
  }
  suCourseSectionUnits
  suCourseSubject {
    ...FragmentTermInterface
  }
  suCourseTags {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentParagraphInterfaceFragmentDoc = gql`
    fragment FragmentParagraphInterface on ParagraphInterface {
  __typename
  id
  behaviors
  status
}
    `;
export const FragmentTextFragmentDoc = gql`
    fragment FragmentText on Text {
  processed
}
    `;
export const FragmentParagraphStanfordAccordionFragmentDoc = gql`
    fragment FragmentParagraphStanfordAccordion on ParagraphStanfordAccordion {
  ...FragmentParagraphInterface
  suAccordionBody {
    ...FragmentText
  }
  suAccordionTitle
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentMediaInterfaceFragmentDoc = gql`
    fragment FragmentMediaInterface on MediaInterface {
  __typename
  id
  name
}
    `;
export const FragmentMediaImageFragmentDoc = gql`
    fragment FragmentMediaImage on MediaImage {
  ...FragmentMediaInterface
  mediaImage {
    url
    alt
    height
    width
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordBannerFragmentDoc = gql`
    fragment FragmentParagraphStanfordBanner on ParagraphStanfordBanner {
  ...FragmentParagraphInterface
  suBannerHeader
  suBannerBody {
    ...FragmentText
  }
  suBannerSupHeader
  suBannerButton {
    url
    title
  }
  suBannerImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentMediaEmbeddableFragmentDoc = gql`
    fragment FragmentMediaEmbeddable on MediaEmbeddable {
  ...FragmentMediaInterface
  mediaEmbeddableCode
  mediaEmbeddableOembed
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaFileFragmentDoc = gql`
    fragment FragmentMediaFile on MediaFile {
  ...FragmentMediaInterface
  mediaFile {
    url
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaGoogleFormFragmentDoc = gql`
    fragment FragmentMediaGoogleForm on MediaGoogleForm {
  ...FragmentMediaInterface
  mediaGoogleForm
  mediaGoogleForm
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaStanfordGalleryImageFragmentDoc = gql`
    fragment FragmentMediaStanfordGalleryImage on MediaStanfordGalleryImage {
  ...FragmentMediaInterface
  suGalleryCaption
  suGalleryImage {
    url
    alt
    height
    width
  }
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaVideoFragmentDoc = gql`
    fragment FragmentMediaVideo on MediaVideo {
  ...FragmentMediaInterface
  mediaOembedVideo
}
    ${FragmentMediaInterfaceFragmentDoc}`;
export const FragmentMediaUnionFragmentDoc = gql`
    fragment FragmentMediaUnion on MediaUnion {
  ...FragmentMediaEmbeddable
  ...FragmentMediaFile
  ...FragmentMediaGoogleForm
  ...FragmentMediaImage
  ...FragmentMediaStanfordGalleryImage
  ...FragmentMediaVideo
}
    ${FragmentMediaEmbeddableFragmentDoc}
${FragmentMediaFileFragmentDoc}
${FragmentMediaGoogleFormFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentMediaStanfordGalleryImageFragmentDoc}
${FragmentMediaVideoFragmentDoc}`;
export const FragmentParagraphStanfordCardFragmentDoc = gql`
    fragment FragmentParagraphStanfordCard on ParagraphStanfordCard {
  ...FragmentParagraphInterface
  suCardHeader
  suCardSuperHeader
  suCardBody {
    ...FragmentText
  }
  suCardLink {
    url
    title
  }
  suCardMedia {
    ...FragmentMediaUnion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
export const FragmentParagraphStanfordEntityFragmentDoc = gql`
    fragment FragmentParagraphStanfordEntity on ParagraphStanfordEntity {
  ...FragmentParagraphInterface
  suEntityHeadline
  suEntityDescription {
    ...FragmentText
  }
  suEntityButton {
    url
    title
  }
  suEntityItem {
    ... on NodeInterface {
      id
      path
    }
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordGalleryFragmentDoc = gql`
    fragment FragmentParagraphStanfordGallery on ParagraphStanfordGallery {
  ...FragmentParagraphInterface
  suGalleryHeadline
  suGalleryDescription {
    ...FragmentText
  }
  suGalleryButton {
    url
    title
  }
  suGalleryImages {
    ...FragmentMediaStanfordGalleryImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaStanfordGalleryImageFragmentDoc}`;
export const FragmentParagraphStanfordLayoutFragmentDoc = gql`
    fragment FragmentParagraphStanfordLayout on ParagraphStanfordLayout {
  ...FragmentParagraphInterface
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordListFragmentDoc = gql`
    fragment FragmentParagraphStanfordList on ParagraphStanfordList {
  ...FragmentParagraphInterface
  suListHeadline
  suListDescription {
    ...FragmentText
  }
  suListButton {
    url
    title
  }
  suListView {
    view
    display
    contextualFilter
    pageSize
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordMediaCaptionFragmentDoc = gql`
    fragment FragmentParagraphStanfordMediaCaption on ParagraphStanfordMediaCaption {
  ...FragmentParagraphInterface
  suMediaCaptionMedia {
    ...FragmentMediaUnion
  }
  suMediaCaptionLink {
    url
    title
  }
  suMediaCaptionCaption {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphStanfordSpacerFragmentDoc = gql`
    fragment FragmentParagraphStanfordSpacer on ParagraphStanfordSpacer {
  ...FragmentParagraphInterface
  suSpacerSize
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphStanfordWysiwygFragmentDoc = gql`
    fragment FragmentParagraphStanfordWysiwyg on ParagraphStanfordWysiwyg {
  ...FragmentParagraphInterface
  suWysiwygText {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphSumAccordionFragmentDoc = gql`
    fragment FragmentParagraphSumAccordion on ParagraphSumAccordion {
  ...FragmentParagraphInterface
  sumAccordionsAccords {
    ...FragmentParagraphStanfordAccordion
  }
  sumAccordionsDesc {
    ...FragmentText
  }
  sumAccordionsHeading
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordAccordionFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentParagraphSumArcBannerFragmentDoc = gql`
    fragment FragmentParagraphSumArcBanner on ParagraphSumArcBanner {
  ...FragmentParagraphInterface
  sumArcSuperhead
  sumArcImage {
    ...FragmentMediaImage
  }
  sumArcDescription {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTextFragmentDoc}`;
export const FragmentDoubleIntFloatFragmentDoc = gql`
    fragment FragmentDoubleIntFloat on DoubleIntFloat {
  first
  second
}
    `;
export const FragmentDoubleStringFloatFragmentDoc = gql`
    fragment FragmentDoubleStringFloat on DoubleStringFloat {
  first
  second
}
    `;
export const FragmentParagraphSumCalculatorFragmentDoc = gql`
    fragment FragmentParagraphSumCalculator on ParagraphSumCalculator {
  ...FragmentParagraphInterface
  sumCalcAppFee
  sumCalcBooks
  sumCalcCommuteHelp {
    ...FragmentText
  }
  sumCalcDocuments
  sumCalcGradAppHelp {
    ...FragmentText
  }
  sumCalcGradUnitCost {
    ...FragmentDoubleIntFloat
  }
  sumCalcGradUnitHelp {
    ...FragmentText
  }
  sumCalcHealthFee
  sumCalcHighAppHelp {
    ...FragmentText
  }
  sumCalcHighUnitCost {
    ...FragmentDoubleIntFloat
  }
  sumCalcHighUnitHelp {
    ...FragmentText
  }
  sumCalcHouseFees {
    ...FragmentDoubleStringFloat
  }
  sumCalcHouseHelp {
    ...FragmentText
  }
  sumCalcI20Fee
  sumCalcI20Help {
    ...FragmentText
  }
  sumCalcInsHelp {
    ...FragmentText
  }
  sumCalcInsWaveHelp {
    ...FragmentText
  }
  sumCalcInsurance
  sumCalcMailFee
  sumCalcMeals
  sumCalcProgFee {
    ...FragmentDoubleStringFloat
  }
  sumCalcTechFee
  sumCalcUgAppHelp {
    ...FragmentText
  }
  sumCalcUgUnitCost {
    ...FragmentDoubleIntFloat
  }
  sumCalcUgUnitHelp {
    ...FragmentText
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentDoubleIntFloatFragmentDoc}
${FragmentDoubleStringFloatFragmentDoc}`;
export const FragmentLinkFragmentDoc = gql`
    fragment FragmentLink on Link {
  title
  url
}
    `;
export const FragmentNodeStanfordCourseTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordCourseTeaser on NodeStanfordCourse {
  ...FragmentNodeInterface
  suCourseSubject {
    ...FragmentTermInterface
  }
  suCourseAcademicYear
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentAddressTypeFragmentDoc = gql`
    fragment FragmentAddressType on Address {
  langcode
  country {
    name
    code
  }
  givenName
  additionalName
  familyName
  organization
  addressLine1
  addressLine2
  postalCode
  sortingCode
  dependentLocality
  locality
  administrativeArea
}
    `;
export const FragmentSmartDateTypeFragmentDoc = gql`
    fragment FragmentSmartDateType on SmartDateType {
  value
  end_value
  timezone
  rrule_index
  rrule
}
    `;
export const FragmentNodeStanfordEventTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordEventTeaser on NodeStanfordEvent {
  ...FragmentNodeInterface
  suEventAltLoc
  suEventSubheadline
  suEventDek
  suEventLocation {
    ...FragmentAddressType
  }
  suEventDateTime {
    ...FragmentSmartDateType
  }
  suEventType {
    ...FragmentTermInterface
  }
  suEventSource {
    url
    title
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordEventSeriesTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordEventSeriesTeaser on NodeStanfordEventSeries {
  ...FragmentNodeInterface
  suEventSeriesDek
}
    ${FragmentNodeInterfaceFragmentDoc}`;
export const FragmentNodeStanfordNewsTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordNewsTeaser on NodeStanfordNews {
  ...FragmentNodeInterface
  suNewsDek
  suNewsFeaturedMedia {
    ...FragmentMediaImage
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
  suNewsPublishingDate {
    ...FragmentDateTime
  }
  suNewsSource {
    url
    title
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentDateTimeFragmentDoc}`;
export const FragmentParagraphSumVideoFragmentDoc = gql`
    fragment FragmentParagraphSumVideo on ParagraphSumVideo {
  ...FragmentParagraphInterface
  sumVideoVideo {
    ...FragmentMediaVideo
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaVideoFragmentDoc}`;
export const FragmentParagraphSumTopBannerFragmentDoc = gql`
    fragment FragmentParagraphSumTopBanner on ParagraphSumTopBanner {
  ...FragmentParagraphInterface
  sumTopBannerCards {
    ...FragmentParagraphSumVideo
    ...FragmentParagraphStanfordCard
  }
  sumTopBannerDescrip {
    ...FragmentText
  }
  sumTopBannerImage {
    ...FragmentMediaImage
  }
  sumTopBannerLink {
    ...FragmentLink
  }
  sumTopBannerSuperhead
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphSumVideoFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentParagraphStanfordPageTitleBannerFragmentDoc = gql`
    fragment FragmentParagraphStanfordPageTitleBanner on ParagraphStanfordPageTitleBanner {
  ...FragmentParagraphInterface
  suTitleBannerImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeStanfordPageTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPageTeaser on NodeStanfordPage {
  ...FragmentNodeInterface
  suPageDescription
  suPageImage {
    ...FragmentMediaImage
  }
  suPageBanner {
    ...FragmentParagraphSumTopBanner
    ...FragmentParagraphStanfordPageTitleBanner
    ...FragmentParagraphSumArcBanner
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentParagraphSumTopBannerFragmentDoc}
${FragmentParagraphStanfordPageTitleBannerFragmentDoc}
${FragmentParagraphSumArcBannerFragmentDoc}`;
export const FragmentNodeStanfordPersonTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPersonTeaser on NodeStanfordPerson {
  ...FragmentNodeInterface
  suPersonPhoto {
    ...FragmentMediaImage
  }
  suPersonFullTitle
  suPersonShortTitle
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentNodeStanfordPolicyTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicyTeaser on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
    summary
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}`;
export const FragmentNodeStanfordPublicationTeaserFragmentDoc = gql`
    fragment FragmentNodeStanfordPublicationTeaser on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeSumSummerCourseTeaserFragmentDoc = gql`
    fragment FragmentNodeSumSummerCourseTeaser on NodeSumSummerCourse {
  ...FragmentNodeInterface
  sumCourseCatalogNumber
}
    ${FragmentNodeInterfaceFragmentDoc}`;
export const FragmentNodeTeaserUnionFragmentDoc = gql`
    fragment FragmentNodeTeaserUnion on NodeUnion {
  ...FragmentNodeInterface
  ...FragmentNodeStanfordCourseTeaser
  ...FragmentNodeStanfordEventTeaser
  ...FragmentNodeStanfordEventSeriesTeaser
  ...FragmentNodeStanfordNewsTeaser
  ...FragmentNodeStanfordPageTeaser
  ...FragmentNodeStanfordPersonTeaser
  ...FragmentNodeStanfordPolicyTeaser
  ...FragmentNodeStanfordPublicationTeaser
  ...FragmentNodeSumSummerCourseTeaser
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordCourseTeaserFragmentDoc}
${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentNodeStanfordEventSeriesTeaserFragmentDoc}
${FragmentNodeStanfordNewsTeaserFragmentDoc}
${FragmentNodeStanfordPageTeaserFragmentDoc}
${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentNodeStanfordPolicyTeaserFragmentDoc}
${FragmentNodeStanfordPublicationTeaserFragmentDoc}
${FragmentNodeSumSummerCourseTeaserFragmentDoc}`;
export const FragmentParagraphSumSlideTeaserFragmentDoc = gql`
    fragment FragmentParagraphSumSlideTeaser on ParagraphSumSlideTeaser {
  ...FragmentParagraphInterface
  sumSlideTeaserEntity {
    ...FragmentNodeTeaserUnion
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentNodeTeaserUnionFragmentDoc}`;
export const FragmentParagraphSumCarouselFragmentDoc = gql`
    fragment FragmentParagraphSumCarousel on ParagraphSumCarousel {
  ...FragmentParagraphInterface
  sumCarouselDescription {
    ...FragmentText
  }
  sumCarouselHeader
  sumCarouselLink {
    ...FragmentLink
  }
  sumCarouselSlides {
    ...FragmentParagraphStanfordCard
    ...FragmentParagraphSumSlideTeaser
  }
  sumCarouselSuperheader
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentParagraphSumSlideTeaserFragmentDoc}`;
export const FragmentParagraphSumCourseFilterFragmentDoc = gql`
    fragment FragmentParagraphSumCourseFilter on ParagraphSumCourseFilter {
  ...FragmentParagraphInterface
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphSumUserFavoriteFragmentDoc = gql`
    fragment FragmentParagraphSumUserFavorite on ParagraphSumUserFavorite {
  ...FragmentParagraphInterface
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphSumFactFragmentDoc = gql`
    fragment FragmentParagraphSumFact on ParagraphSumFact {
  ...FragmentParagraphInterface
  sumFactsLabel
  sumFactsText
}
    ${FragmentParagraphInterfaceFragmentDoc}`;
export const FragmentParagraphSumAtAGlanceFragmentDoc = gql`
    fragment FragmentParagraphSumAtAGlance on ParagraphSumAtAGlance {
  ...FragmentParagraphInterface
  sumAtAGlanceDescrip {
    ...FragmentText
  }
  sumAtAGlanceFacts {
    ...FragmentParagraphSumFact
  }
  sumAtAGlanceHeadline
  sumAtAGlanceLink {
    ...FragmentLink
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentParagraphSumFactFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentParagraphSumPillBannerFragmentDoc = gql`
    fragment FragmentParagraphSumPillBanner on ParagraphSumPillBanner {
  ...FragmentParagraphInterface
  sumPillBannerBkgd {
    ...FragmentMediaImage
  }
  sumPillBannerCards {
    ...FragmentParagraphStanfordCard
  }
  sumPillBannerDescrip {
    ...FragmentText
  }
  sumPillBannerHeadline
  sumPillBannerLink {
    ...FragmentLink
  }
  sumPillBannerSuphead
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentLinkFragmentDoc}`;
export const FragmentParagraphSumTestimonialFragmentDoc = gql`
    fragment FragmentParagraphSumTestimonial on ParagraphSumTestimonial {
  ...FragmentParagraphInterface
  sumTestimonialAffi
  sumTestimonialBkgImg {
    ...FragmentMediaImage
  }
  sumTestimonialButton {
    ...FragmentLink
  }
  sumTestimonialDescrip {
    ...FragmentText
  }
  sumTestimonialHeading
  sumTestimonialHsVideo {
    ...FragmentMediaImage
    ...FragmentMediaVideo
  }
  sumTestimonialName
  sumTestimonialType
  sumTestimonialUniv
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentLinkFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaVideoFragmentDoc}`;
export const FragmentParagraphUnionFragmentDoc = gql`
    fragment FragmentParagraphUnion on ParagraphUnion {
  ...FragmentParagraphInterface
  ...FragmentParagraphStanfordAccordion
  ...FragmentParagraphStanfordBanner
  ...FragmentParagraphStanfordCard
  ...FragmentParagraphStanfordEntity
  ...FragmentParagraphStanfordGallery
  ...FragmentParagraphStanfordLayout
  ...FragmentParagraphStanfordList
  ...FragmentParagraphStanfordMediaCaption
  ...FragmentParagraphStanfordSpacer
  ...FragmentParagraphStanfordWysiwyg
  ...FragmentParagraphSumAccordion
  ...FragmentParagraphSumArcBanner
  ...FragmentParagraphSumCalculator
  ...FragmentParagraphSumCarousel
  ...FragmentParagraphSumCourseFilter
  ...FragmentParagraphSumTopBanner
  ...FragmentParagraphSumUserFavorite
  ...FragmentParagraphSumVideo
  ...FragmentParagraphSumAtAGlance
  ...FragmentParagraphSumPillBanner
  ...FragmentParagraphSumTestimonial
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentParagraphStanfordAccordionFragmentDoc}
${FragmentParagraphStanfordBannerFragmentDoc}
${FragmentParagraphStanfordCardFragmentDoc}
${FragmentParagraphStanfordEntityFragmentDoc}
${FragmentParagraphStanfordGalleryFragmentDoc}
${FragmentParagraphStanfordLayoutFragmentDoc}
${FragmentParagraphStanfordListFragmentDoc}
${FragmentParagraphStanfordMediaCaptionFragmentDoc}
${FragmentParagraphStanfordSpacerFragmentDoc}
${FragmentParagraphStanfordWysiwygFragmentDoc}
${FragmentParagraphSumAccordionFragmentDoc}
${FragmentParagraphSumArcBannerFragmentDoc}
${FragmentParagraphSumCalculatorFragmentDoc}
${FragmentParagraphSumCarouselFragmentDoc}
${FragmentParagraphSumCourseFilterFragmentDoc}
${FragmentParagraphSumTopBannerFragmentDoc}
${FragmentParagraphSumUserFavoriteFragmentDoc}
${FragmentParagraphSumVideoFragmentDoc}
${FragmentParagraphSumAtAGlanceFragmentDoc}
${FragmentParagraphSumPillBannerFragmentDoc}
${FragmentParagraphSumTestimonialFragmentDoc}`;
export const FragmentParagraphStanfordPersonCtumFragmentDoc = gql`
    fragment FragmentParagraphStanfordPersonCtum on ParagraphStanfordPersonCtum {
  ...FragmentParagraphInterface
  suPersonCtaName
  suPersonCtaTitle
  suPersonCtaLink {
    url
    title
  }
  suPersonCtaImage {
    ...FragmentMediaImage
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentMediaImageFragmentDoc}`;
export const FragmentParagraphStanfordScheduleFragmentDoc = gql`
    fragment FragmentParagraphStanfordSchedule on ParagraphStanfordSchedule {
  ...FragmentParagraphInterface
  suScheduleHeadline
  suScheduleDescription {
    ...FragmentText
  }
  suScheduleDateTime {
    ...FragmentSmartDateType
  }
  suScheduleLocation {
    ...FragmentAddressType
  }
  suScheduleUrl {
    url
    title
  }
  suScheduleSpeaker {
    ...FragmentParagraphStanfordPersonCtum
  }
}
    ${FragmentParagraphInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentParagraphStanfordPersonCtumFragmentDoc}`;
export const FragmentNodeStanfordEventFragmentDoc = gql`
    fragment FragmentNodeStanfordEvent on NodeStanfordEvent {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suEventAltLoc
  suEventAudience {
    ...FragmentTermInterface
  }
  suEventComponents {
    ...FragmentParagraphUnion
  }
  suEventContactInfo
  suEventCta {
    url
    title
  }
  suEventDateTime {
    ...FragmentSmartDateType
  }
  suEventDek
  suEventEmail
  suEventGroups {
    ...FragmentTermInterface
  }
  suEventKeywords {
    ...FragmentTermInterface
  }
  suEventLocation {
    ...FragmentAddressType
  }
  suEventMapLink {
    url
    title
  }
  suEventSchedule {
    ...FragmentParagraphStanfordSchedule
  }
  suEventSource {
    url
    title
  }
  suEventSponsor
  suEventSubheadline
  suEventSubject {
    ...FragmentTermInterface
  }
  suEventTelephone
  suEventType {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentSmartDateTypeFragmentDoc}
${FragmentAddressTypeFragmentDoc}
${FragmentParagraphStanfordScheduleFragmentDoc}`;
export const FragmentNodeStanfordEventSeriesFragmentDoc = gql`
    fragment FragmentNodeStanfordEventSeries on NodeStanfordEventSeries {
  ...FragmentNodeInterface
  suEventSeriesComponents {
    ...FragmentParagraphUnion
  }
  suEventSeriesDek
  suEventSeriesEvent {
    ...FragmentNodeStanfordEventTeaser
  }
  suEventSeriesSubheadline
  suEventSeriesType {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordNewsFragmentDoc = gql`
    fragment FragmentNodeStanfordNews on NodeStanfordNews {
  ...FragmentNodeInterface
  suNewsBanner {
    ...FragmentMediaUnion
  }
  suNewsBannerMediaCaption
  suNewsByline
  suNewsComponents {
    ...FragmentParagraphUnion
  }
  suNewsDek
  suNewsFeaturedMedia {
    ...FragmentMediaUnion
  }
  suNewsHideSocial
  suNewsPublishingDate {
    ...FragmentDateTime
  }
  suNewsSource {
    url
    title
  }
  suNewsTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentMediaUnionFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentDateTimeFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeStanfordPageFragmentDoc = gql`
    fragment FragmentNodeStanfordPage on NodeStanfordPage {
  ...FragmentNodeInterface
  layoutSelection {
    id
  }
  suBasicPageType {
    ...FragmentTermInterface
  }
  suPageBanner {
    ...FragmentParagraphSumTopBanner
    ...FragmentParagraphStanfordPageTitleBanner
    ...FragmentParagraphSumArcBanner
  }
  suPageComponents {
    ...FragmentParagraphUnion
  }
  suPageDescription
  suPageImage {
    ...FragmentMediaUnion
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentParagraphSumTopBannerFragmentDoc}
${FragmentParagraphStanfordPageTitleBannerFragmentDoc}
${FragmentParagraphSumArcBannerFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentMediaUnionFragmentDoc}`;
export const FragmentNodeStanfordPersonFragmentDoc = gql`
    fragment FragmentNodeStanfordPerson on NodeStanfordPerson {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suPersonAcademicAppt
  suPersonAdminAppts
  suPersonAffiliations {
    url
    title
  }
  suPersonComponents {
    ...FragmentParagraphUnion
  }
  suPersonEducation
  suPersonEmail
  suPersonFax
  suPersonFirstName
  suPersonFullTitle
  suPersonLastName
  suPersonLinks {
    url
    title
  }
  suPersonLocationAddress {
    ...FragmentText
  }
  suPersonLocationName
  suPersonMailCode
  suPersonMapUrl {
    url
    title
  }
  suPersonMobilePhone
  suPersonPhoto {
    ...FragmentMediaImage
  }
  suPersonProfileLink {
    url
    title
  }
  suPersonPronouns
  suPersonResearch {
    ...FragmentText
  }
  suPersonResearchInterests
  suPersonScholarlyInterests {
    ...FragmentText
  }
  suPersonShortTitle
  suPersonTelephone
  suPersonTypeGroup {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentSuPolicyLogFragmentDoc = gql`
    fragment FragmentSuPolicyLog on SuPolicyLog {
  __typename
  id
  suPolicyDate {
    ...FragmentDateTime
  }
  suPolicyNotes
  suPolicyPublic
  suPolicyTitle
}
    ${FragmentDateTimeFragmentDoc}`;
export const FragmentNodeStanfordPolicyFragmentDoc = gql`
    fragment FragmentNodeStanfordPolicy on NodeStanfordPolicy {
  ...FragmentNodeInterface
  body {
    ...FragmentTextSummary
  }
  suPolicyAuthority
  suPolicyAutoPrefix
  suPolicyChangelog {
    ...FragmentSuPolicyLog
  }
  suPolicyChapter
  suPolicyEffective {
    ...FragmentDateTime
  }
  suPolicyPolicyNum
  suPolicyRelated {
    ... on NodeInterface {
      id
      path
    }
  }
  suPolicySubchapter
  suPolicyTitle
  suPolicyUpdated {
    ...FragmentDateTime
  }
  book {
    id
    title
    url
    expanded
    children {
      id
      title
      url
      expanded
      children {
        id
        title
        url
        expanded
        children {
          id
          title
          url
          expanded
          children {
            id
            title
            url
            expanded
            children {
              id
              title
              url
              expanded
            }
          }
        }
      }
    }
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTextSummaryFragmentDoc}
${FragmentSuPolicyLogFragmentDoc}
${FragmentDateTimeFragmentDoc}`;
export const FragmentNodeStanfordPublicationFragmentDoc = gql`
    fragment FragmentNodeStanfordPublication on NodeStanfordPublication {
  ...FragmentNodeInterface
  suPublicationAuthorRef {
    ...FragmentNodeStanfordPersonTeaser
  }
  suPublicationComponents {
    ...FragmentParagraphUnion
  }
  suPublicationCta {
    url
    title
  }
  suPublicationImage {
    ...FragmentMediaImage
  }
  suPublicationTopics {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentParagraphUnionFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentTermInterfaceFragmentDoc}`;
export const FragmentNodeSumSummerCourseFragmentDoc = gql`
    fragment FragmentNodeSumSummerCourse on NodeSumSummerCourse {
  ...FragmentNodeInterface
  sumCourseAvailability {
    ...FragmentTermInterface
  }
  sumCourseCatalogNumber
  sumCourseClassNumber
  sumCourseCourseCost
  sumCourseCrossListing
  sumCourseDescription {
    ...FragmentText
  }
  sumCourseEndDate {
    ...FragmentDateTime
  }
  sumCourseFormat
  sumCourseImage {
    ...FragmentMediaImage
  }
  sumCourseInstructors
  sumCourseInterestArea {
    ...FragmentTermInterface
  }
  sumCourseLength
  sumCourseNotes {
    ...FragmentText
  }
  sumCoursePopulation {
    ...FragmentTermInterface
  }
  sumCoursePrerequisites {
    ...FragmentText
  }
  sumCourseSchedule
  sumCourseStartDate {
    ...FragmentDateTime
  }
  sumCourseSyllabusFile {
    ...FragmentMediaFile
  }
  sumCourseUniqueImportId
  sumCourseUnits
  sumStudentsAlsoStudied
  sumCourseGrading {
    ...FragmentTermInterface
  }
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentTermInterfaceFragmentDoc}
${FragmentTextFragmentDoc}
${FragmentDateTimeFragmentDoc}
${FragmentMediaImageFragmentDoc}
${FragmentMediaFileFragmentDoc}`;
export const FragmentNodeUnionFragmentDoc = gql`
    fragment FragmentNodeUnion on NodeUnion {
  ...FragmentNodeInterface
  ...FragmentNodeStanfordCourse
  ...FragmentNodeStanfordEvent
  ...FragmentNodeStanfordEventSeries
  ...FragmentNodeStanfordNews
  ...FragmentNodeStanfordPage
  ...FragmentNodeStanfordPerson
  ...FragmentNodeStanfordPolicy
  ...FragmentNodeStanfordPublication
  ...FragmentNodeSumSummerCourse
}
    ${FragmentNodeInterfaceFragmentDoc}
${FragmentNodeStanfordCourseFragmentDoc}
${FragmentNodeStanfordEventFragmentDoc}
${FragmentNodeStanfordEventSeriesFragmentDoc}
${FragmentNodeStanfordNewsFragmentDoc}
${FragmentNodeStanfordPageFragmentDoc}
${FragmentNodeStanfordPersonFragmentDoc}
${FragmentNodeStanfordPolicyFragmentDoc}
${FragmentNodeStanfordPublicationFragmentDoc}
${FragmentNodeSumSummerCourseFragmentDoc}`;
export const FragmentMenuLinkFragmentDoc = gql`
    fragment FragmentMenuLink on MenuItem {
  url
  title
  id
  expanded
}
    `;
export const FragmentViewPageInfoFragmentDoc = gql`
    fragment FragmentViewPageInfo on ViewPageInfo {
  page
  total
}
    `;
export const NodeDocument = gql`
    query Node($uuid: ID!) {
  node(id: $uuid) {
    ...FragmentNodeUnion
  }
}
    ${FragmentNodeUnionFragmentDoc}`;
export const AllNodesDocument = gql`
    query AllNodes($first: Int = 1000, $nodeStanfordPages: Cursor, $nodeSumSummerCourses: Cursor) {
  nodeSumSummerCourses(
    first: $first
    after: $nodeSumSummerCourses
    sortKey: CREATED_AT
  ) {
    nodes {
      ...AllNodeInterface
    }
    pageInfo {
      ...FragmentPageInfo
    }
  }
  nodeStanfordPages(first: $first, after: $nodeStanfordPages, sortKey: CREATED_AT) {
    nodes {
      ...AllNodeInterface
    }
    pageInfo {
      ...FragmentPageInfo
    }
  }
}
    ${AllNodeInterfaceFragmentDoc}
${FragmentPageInfoFragmentDoc}`;
export const CoursesDocument = gql`
    query Courses($first: Int = 1000, $after: Cursor) {
  nodeStanfordCourses(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordCourse
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordCourseFragmentDoc}`;
export const EventSeriesDocument = gql`
    query EventSeries($first: Int = 1000, $after: Cursor) {
  nodeStanfordEventSeriesItems(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordEventSeries
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordEventSeriesFragmentDoc}`;
export const EventsDocument = gql`
    query Events($first: Int = 1000, $after: Cursor) {
  nodeStanfordEvents(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordEvent
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordEventFragmentDoc}`;
export const NewsDocument = gql`
    query News($first: Int = 1000, $after: Cursor) {
  nodeStanfordNewsItems(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordNews
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordNewsFragmentDoc}`;
export const BasicPagesDocument = gql`
    query BasicPages($first: Int = 1000, $after: Cursor) {
  nodeStanfordPages(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordPage
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordPageFragmentDoc}`;
export const PeopleDocument = gql`
    query People($first: Int = 1000, $after: Cursor) {
  nodeStanfordPeople(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordPerson
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordPersonFragmentDoc}`;
export const PoliciesDocument = gql`
    query Policies($first: Int = 1000, $after: Cursor) {
  nodeStanfordPolicies(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordPolicy
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordPolicyFragmentDoc}`;
export const PublicationsDocument = gql`
    query Publications($first: Int = 1000, $after: Cursor) {
  nodeStanfordPublications(first: $first, after: $after, sortKey: CREATED_AT) {
    nodes {
      ...FragmentNodeStanfordPublication
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${FragmentNodeStanfordPublicationFragmentDoc}`;
export const MediaDocument = gql`
    query Media($uuid: ID!) {
  media(id: $uuid) {
    ...FragmentMediaUnion
  }
}
    ${FragmentMediaUnionFragmentDoc}`;
export const TermDocument = gql`
    query Term($uuid: ID!) {
  term(id: $uuid) {
    ...FragmentTermInterface
  }
}
    ${FragmentTermInterfaceFragmentDoc}`;
export const ParagraphDocument = gql`
    query Paragraph($uuid: ID!) {
  paragraph(id: $uuid) {
    ...FragmentParagraphUnion
  }
}
    ${FragmentParagraphUnionFragmentDoc}`;
export const ConfigPagesDocument = gql`
    query ConfigPages {
  stanfordBasicSiteSettings(first: 1) {
    nodes {
      __typename
      suGoogleAnalytics
      suSiteAlgoliaUi
      suSiteAlgolia
      suSiteAlgoliaId
      suSiteAlgoliaIndex
      suSiteAlgoliaSearch
      suSiteDropdowns
      suSiteMenuLevels
      suSiteName
      suSiteNobots
      sumSiteHeaderPrim {
        ...FragmentLink
      }
      sumSiteHeaderSec {
        ...FragmentLink
      }
    }
  }
  stanfordGlobalMessages(first: 1) {
    nodes {
      __typename
      suGlobalMsgEnabled
      suGlobalMsgHeader
      suGlobalMsgLink {
        title
        url
      }
      suGlobalMsgMessage {
        ...FragmentText
      }
    }
  }
  stanfordLocalFooters(first: 1) {
    nodes {
      __typename
      suFooterEnabled
      suLocalFootAction {
        title
        url
      }
      suLocalFootAddress {
        additionalName
        addressLine1
        addressLine2
        administrativeArea
        country {
          code
          name
        }
        dependentLocality
        familyName
        givenName
        langcode
        locality
        organization
        postalCode
        sortingCode
      }
      suLocalFootFButton
      suLocalFootFIntro {
        ...FragmentText
      }
      suLocalFootFMethod
      suLocalFootFUrl {
        url
        title
      }
      suLocalFootLine1
      suLocalFootLine4
      suLocalFootLine2
      suLocalFootLine3
      suLocalFootLine5
      suLocalFootLocImg {
        alt
        height
        url
        width
      }
      suLocalFootLocLink {
        title
        url
      }
      suLocalFootLocOp
      suLocalFootPrCo {
        ...FragmentText
      }
      suLocalFootPrimary {
        title
        url
      }
      suLocalFootPrimeH
      suLocalFootSeCo {
        ...FragmentText
      }
      suLocalFootSecond {
        title
        url
      }
      suLocalFootSecondH
      suLocalFootSocial {
        title
        url
      }
      suLocalFootSunetT
      suLocalFootTr2Co {
        ...FragmentText
      }
      suLocalFootTrCo {
        ...FragmentText
      }
      suLocalFootUseLoc
      suLocalFootUseLogo
    }
  }
  stanfordSuperFooters(first: 1) {
    nodes {
      __typename
      suSuperFootEnabled
      suSuperFootIntranet {
        title
        url
      }
      suSuperFootLink {
        title
        url
      }
      suSuperFootText {
        ...FragmentText
      }
      suSuperFootTitle
    }
  }
  lockupSettings(first: 1) {
    nodes {
      __typename
      suLine1
      suLine2
      suLine3
      suLine4
      suLine5
      suLockupEnabled
      suLockupOptions
      suUploadLogoImage {
        alt
        height
        url
        width
      }
      suUseThemeLogo
    }
  }
}
    ${FragmentLinkFragmentDoc}
${FragmentTextFragmentDoc}`;
export const GlobalMessagesDocument = gql`
    query GlobalMessages {
  summerGlobalMsgs(first: 10) {
    nodes {
      id
      label
      sumGlobalMsgHide
      sumGlobalMsgLink {
        title
        url
      }
      sumGlobalMsgBody {
        processed
      }
    }
  }
}
    `;
export const MenuDocument = gql`
    query Menu($name: MenuAvailable = MAIN) {
  menu(name: $name) {
    items {
      ...FragmentMenuLink
      children {
        ...FragmentMenuLink
        children {
          ...FragmentMenuLink
          children {
            ...FragmentMenuLink
            children {
              ...FragmentMenuLink
            }
          }
        }
      }
    }
  }
}
    ${FragmentMenuLinkFragmentDoc}`;
export const RouteDocument = gql`
    query Route($path: String!, $teaser: Boolean = false) {
  route(path: $path) {
    __typename
    ... on RouteRedirect {
      url
      internal
      status
      redirect
    }
    ... on RouteInternal {
      entity {
        ...FragmentNodeUnion @skip(if: $teaser)
        ...FragmentNodeTeaserUnion @include(if: $teaser)
      }
    }
  }
}
    ${FragmentNodeUnionFragmentDoc}
${FragmentNodeTeaserUnionFragmentDoc}`;
export const RedirectsDocument = gql`
    query Redirects($first: Int = 1000, $after: Cursor) {
  redirects(first: $first, after: $after) {
    redirects: nodes {
      id
      redirectSource {
        url
      }
      redirectRedirect {
        url
      }
      statusCode
    }
    pageInfo {
      endCursor
    }
  }
}
    `;
export const StanfordBasicPagesDocument = gql`
    query stanfordBasicPages($contextualFilters: StanfordBasicPagesContextualFilterInput, $sortKey: StanfordBasicPagesSortKeys, $sortDir: SortDirection, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordBasicPages(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
    sortKey: $sortKey
    sortDir: $sortDir
  ) {
    results {
      ...FragmentNodeStanfordPageTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordPageTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordCoursesDocument = gql`
    query stanfordCourses($contextualFilters: StanfordCoursesContextualFilterInput, $pageSize: Int = -1, $page: Int, $offset: Int) {
  stanfordCourses(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordCourse
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordCourseFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordEventsDocument = gql`
    query stanfordEvents($contextualFilters: StanfordEventsContextualFilterInput, $pageSize: Int, $page: Int = -1, $offset: Int) {
  stanfordEvents(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordEventTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordEventsPastEventsDocument = gql`
    query stanfordEventsPastEvents($contextualFilters: StanfordEventsPastEventsContextualFilterInput, $pageSize: Int = -1, $page: Int, $offset: Int) {
  stanfordEventsPastEvents(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordEventTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordEventTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordNewsDocument = gql`
    query stanfordNews($contextualFilters: StanfordNewsContextualFilterInput, $pageSize: Int = -1, $page: Int, $offset: Int) {
  stanfordNews(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordNewsTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordNewsTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordPersonDocument = gql`
    query stanfordPerson($contextualFilters: StanfordPersonContextualFilterInput, $pageSize: Int, $page: Int = -1, $offset: Int) {
  stanfordPerson(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordPersonTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordPersonTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordPublicationsDocument = gql`
    query stanfordPublications($contextualFilters: StanfordPublicationsContextualFilterInput, $pageSize: Int = -1, $page: Int, $offset: Int) {
  stanfordPublications(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeStanfordPublicationTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeStanfordPublicationTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const StanfordSharedTagsDocument = gql`
    query stanfordSharedTags($contextualFilters: StanfordSharedTagsContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  stanfordSharedTags(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeTeaserUnion
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeTeaserUnionFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;
export const SumCoursesDocument = gql`
    query sumCourses($contextualFilters: SumCoursesContextualFilterInput, $pageSize: Int = 3, $page: Int, $offset: Int) {
  sumCourses(
    contextualFilter: $contextualFilters
    pageSize: $pageSize
    page: $page
    offset: $offset
  ) {
    results {
      ...FragmentNodeSumSummerCourseTeaser
    }
    pageInfo {
      ...FragmentViewPageInfo
    }
  }
}
    ${FragmentNodeSumSummerCourseTeaserFragmentDoc}
${FragmentViewPageInfoFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Node(variables: DrupalTypes.NodeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.NodeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.NodeQuery>(NodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Node', 'query', variables);
    },
    AllNodes(variables?: DrupalTypes.AllNodesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.AllNodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.AllNodesQuery>(AllNodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllNodes', 'query', variables);
    },
    Courses(variables?: DrupalTypes.CoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.CoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.CoursesQuery>(CoursesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Courses', 'query', variables);
    },
    EventSeries(variables?: DrupalTypes.EventSeriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.EventSeriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.EventSeriesQuery>(EventSeriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EventSeries', 'query', variables);
    },
    Events(variables?: DrupalTypes.EventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.EventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.EventsQuery>(EventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Events', 'query', variables);
    },
    News(variables?: DrupalTypes.NewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.NewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.NewsQuery>(NewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'News', 'query', variables);
    },
    BasicPages(variables?: DrupalTypes.BasicPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.BasicPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.BasicPagesQuery>(BasicPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BasicPages', 'query', variables);
    },
    People(variables?: DrupalTypes.PeopleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.PeopleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.PeopleQuery>(PeopleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'People', 'query', variables);
    },
    Policies(variables?: DrupalTypes.PoliciesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.PoliciesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.PoliciesQuery>(PoliciesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Policies', 'query', variables);
    },
    Publications(variables?: DrupalTypes.PublicationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.PublicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.PublicationsQuery>(PublicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Publications', 'query', variables);
    },
    Media(variables: DrupalTypes.MediaQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.MediaQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.MediaQuery>(MediaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Media', 'query', variables);
    },
    Term(variables: DrupalTypes.TermQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.TermQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.TermQuery>(TermDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Term', 'query', variables);
    },
    Paragraph(variables: DrupalTypes.ParagraphQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.ParagraphQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.ParagraphQuery>(ParagraphDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Paragraph', 'query', variables);
    },
    ConfigPages(variables?: DrupalTypes.ConfigPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.ConfigPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.ConfigPagesQuery>(ConfigPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ConfigPages', 'query', variables);
    },
    GlobalMessages(variables?: DrupalTypes.GlobalMessagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.GlobalMessagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.GlobalMessagesQuery>(GlobalMessagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GlobalMessages', 'query', variables);
    },
    Menu(variables?: DrupalTypes.MenuQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.MenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.MenuQuery>(MenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Menu', 'query', variables);
    },
    Route(variables: DrupalTypes.RouteQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.RouteQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.RouteQuery>(RouteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Route', 'query', variables);
    },
    Redirects(variables?: DrupalTypes.RedirectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.RedirectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.RedirectsQuery>(RedirectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Redirects', 'query', variables);
    },
    stanfordBasicPages(variables?: DrupalTypes.StanfordBasicPagesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordBasicPagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordBasicPagesQuery>(StanfordBasicPagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordBasicPages', 'query', variables);
    },
    stanfordCourses(variables?: DrupalTypes.StanfordCoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordCoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordCoursesQuery>(StanfordCoursesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordCourses', 'query', variables);
    },
    stanfordEvents(variables?: DrupalTypes.StanfordEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordEventsQuery>(StanfordEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordEvents', 'query', variables);
    },
    stanfordEventsPastEvents(variables?: DrupalTypes.StanfordEventsPastEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordEventsPastEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordEventsPastEventsQuery>(StanfordEventsPastEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordEventsPastEvents', 'query', variables);
    },
    stanfordNews(variables?: DrupalTypes.StanfordNewsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordNewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordNewsQuery>(StanfordNewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordNews', 'query', variables);
    },
    stanfordPerson(variables?: DrupalTypes.StanfordPersonQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordPersonQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordPersonQuery>(StanfordPersonDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordPerson', 'query', variables);
    },
    stanfordPublications(variables?: DrupalTypes.StanfordPublicationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordPublicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordPublicationsQuery>(StanfordPublicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordPublications', 'query', variables);
    },
    stanfordSharedTags(variables?: DrupalTypes.StanfordSharedTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.StanfordSharedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.StanfordSharedTagsQuery>(StanfordSharedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stanfordSharedTags', 'query', variables);
    },
    sumCourses(variables?: DrupalTypes.SumCoursesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DrupalTypes.SumCoursesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DrupalTypes.SumCoursesQuery>(SumCoursesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sumCourses', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;