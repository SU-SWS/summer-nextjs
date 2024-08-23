/**
 * Types that are not provided by Graphql integration.
 */

export type LayoutParagraphBehaviors = {
  layout: "layout_paragraphs_1_column" | "layout_paragraphs_2_column" | "layout_paragraphs_3_column" | string
  config: {label?: string}
  parent_uuid?: string
  region?: string
}

export type ListParagraphBehaviors = {
  hide_empty?: boolean
  empty_message?: string
  heading_behavior?: "show" | "hide" | "remove"
}

export type CardParagraphBehaviors = {
  heading?: "h2" | "h3" | "h4" | "div.su-splash-font"
  hide_heading?: boolean
  link_style?: "action" | "button"
  sum_card_bg_color_variant?: boolean
  sum_card_variant?: "pill"
  sum_card_pill_bg_color_variant?:
    | "semitransparent_poppy"
    | "olive"
    | "semitransparent_olive"
    | "spirited"
    | "semitransparent_spirited"
}

export type SummerCarouselBehaviors = {
  sum_carousel_arc?: boolean
  sum_carousel_text_size?: "large" | "small"
}

export type BannerParagraphBehaviors = {
  heading?: "h2" | "h3" | "h4" | "div.su-splash-font"
  hide_heading?: string
  overlay_position?: "left" | "right"
}

export type SumBannerParagraphBehaviors = {
  sum_banner_button?: boolean
  sum_banner_overlay_bkg?: "olive" | "spirited" | "spirited_dark"
}

export type SumTopBannerParagraphBehaviors = {
  sum_top_banner_alignment?: "left" | "right"
  sum_top_banner_button?: boolean
  sum_top_banner_overlay_bkg?: "olive" | "spirited" | "spirited_dark"
}

export type TeaserParagraphBehaviors = {
  heading_behavior?: "show" | "hide" | "remove"
}

export type PillBannerBehaviors = {
  sum_pill_banner_overlay_bkg?: "olive" | "spirited" | "spirited_dark" | "white"
  sum_pill_banner_oval_bkgd?: boolean
  sum_pill_banner_copy_size?: boolean
}

export type TestimonialBannerBehaviors = {
  sum_testimonial_banner_align?: boolean
  sum_testimonial_banner_heading?: "type_4"
  sum_testimonial_banner_overlay_bkg?: "olive" | "spirited" | "spirited_dark" | "white"
}

export type AtAGlanceBehaviors = {
  sum_at_a_glance_alignment?: boolean
}

export type ParagraphBehaviors = {
  layout_paragraphs?: LayoutParagraphBehaviors
  list_paragraph?: ListParagraphBehaviors
  su_card_styles?: CardParagraphBehaviors
  sum_carousel?: SummerCarouselBehaviors
  hero_pattern?: BannerParagraphBehaviors
  stanford_teaser?: TeaserParagraphBehaviors
  sum_pill_banner_behaviors?: PillBannerBehaviors
  sum_testimonial_banner?: TestimonialBannerBehaviors
  sum_at_a_glance_behavior?: AtAGlanceBehaviors
  sum_banner_behaviors?: SumBannerParagraphBehaviors
  sum_top_banner_behaviors?: SumTopBannerParagraphBehaviors
}
