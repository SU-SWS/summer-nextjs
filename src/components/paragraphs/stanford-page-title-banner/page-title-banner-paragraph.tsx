import React, {HtmlHTMLAttributes} from "react"
import {ParagraphStanfordPageTitleBanner} from "@lib/gql/__generated__/graphql"
import {H1} from "@components/elements/headers"
import HeroBanner from "@components/patterns/hero-banner"
import cn from "@lib/utils/className"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphStanfordPageTitleBanner
  pageTitle: string
  isHome?: boolean
}

const PageTitleBannerParagraph = ({paragraph, pageTitle, isHome, ...props}: Props) => {
  return (
    <HeroBanner
      {...props}
      imageUrl={paragraph.suTitleBannerImage?.mediaImage.url}
      imageAlt={paragraph.suTitleBannerImage?.mediaImage.alt}
      eagerLoadImage
    >
      <H1 className={cn("type-3 order-2 m-0 mb-[-10px] p-0", {"sr-only": isHome})}>{pageTitle}</H1>
    </HeroBanner>
  )
}
export default PageTitleBannerParagraph
