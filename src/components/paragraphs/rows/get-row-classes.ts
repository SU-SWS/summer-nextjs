import {LayoutConfig} from "@lib/drupal/drupal-jsonapi.d"
import cn from "@lib/utils/className"

/**
 * Spacing and background classes for a layout paragraph row, based on its Drupal layout configuration.
 */
export const getRowClasses = (config?: LayoutConfig, className?: string) =>
  cn(
    "mb-80 last:mb-0",
    {
      "px-20 py-40": !!config?.bg_color,
      "pt-0": config?.top_padding === "none",
      "pt-80": config?.top_padding === "more",
      "mb-0": config?.bottom_margin === "none",
      "pb-0": config?.bottom_padding === "none",
      "bg-fog-light": config?.bg_color === "f4f4f4",
      "bg-[#ebeae4]": config?.bg_color === "ebeae5",
      "bg-[#dcecef]": config?.bg_color === "dcecef",
      "bg-[#dcefec]": config?.bg_color === "dcefec",
      "bg-[#f2e8f1]": config?.bg_color === "f2e8f1",
      "bg-[#f7ecde]": config?.bg_color === "f7ecde",
    },
    className
  )
