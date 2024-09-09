import Rows from "@components/paragraphs/rows/rows"
import InteriorPage from "@components/layouts/interior-page"
import {H1} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {
  NodeStanfordPage,
  NodeStanfordPageSuPageBannerUnion,
  NodeStanfordPageSuPageComponentsUnion,
} from "@lib/gql/__generated__/drupal.d"
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph"
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph"
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph"
import clsx from "clsx"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
}

const StanfordPagePage = ({node, ...props}: Props) => {
  // If the page contains any of the following components, force the page to be full width. This prevents the need to
  // address the large components on "interior" pages that contain a left sidebar. It's more effort than it's worth.
  const fullWidthComponents: NodeStanfordPageSuPageComponentsUnion["__typename"][] = [
    "ParagraphSumTestimonial",
    "ParagraphSumCarousel",
    "ParagraphSumCourseFilter",
    "ParagraphSumPillBanner",
  ]
  const pageTitleBanners: NodeStanfordPageSuPageBannerUnion["__typename"][] = [
    "ParagraphStanfordPageTitleBanner",
    "ParagraphSumArcBanner",
    "ParagraphSumTopBanner",
  ]

  const fullWidth =
    node.layoutSelection?.id === "stanford_basic_page_full" ||
    !!node.suPageComponents?.find(component => fullWidthComponents.includes(component.__typename))

  const lastComponent = node.suPageComponents && node.suPageComponents[node.suPageComponents.length - 1]

  const hasBannerOrCalculator =
    lastComponent?.__typename?.includes("Banner") ||
    lastComponent?.__typename?.includes("Calculator") ||
    lastComponent?.__typename?.includes("Testimonial")

  return (
    <article {...props} className={clsx({"mb-32": !hasBannerOrCalculator}, props.className)}>
      {node.suPageBanner && (
        <header>
          {node.suPageBanner.__typename === "ParagraphStanfordPageTitleBanner" && (
            <PageTitleBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} />
          )}
          {node.suPageBanner.__typename === "ParagraphSumArcBanner" && (
            <SumArcBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} />
          )}
          {node.suPageBanner?.__typename === "ParagraphSumTopBanner" && (
            <SumTopBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} />
          )}
        </header>
      )}

      {!pageTitleBanners.includes(node.suPageBanner?.__typename) && <H1 className="centered mt-32">{node.title}</H1>}

      {!fullWidth && (
        <InteriorPage currentPath={node.path}>
          <Rows components={node.suPageComponents} />
        </InteriorPage>
      )}

      {fullWidth && <Rows components={node.suPageComponents} />}
    </article>
  )
}
export default StanfordPagePage
