import Rows from "@components/paragraphs/rows/rows"
import InteriorPage from "@components/layouts/interior-page"
import {H1} from "@components/elements/headers"
import {HtmlHTMLAttributes} from "react"
import {
  NodeStanfordPage,
  NodeStanfordPageSuPageBannerUnion,
  NodeStanfordPageSuPageComponentsUnion,
} from "@lib/gql/__generated__/graphql"
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph"
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph"
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"
import {getFirstText} from "@lib/utils/text-tools"
import Wysiwyg from "@components/elements/wysiwyg"
import cn from "@lib/utils/className"
import AnchorNav from "@components/elements/anchor-nav"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  node: NodeStanfordPage
  isHome?: boolean
}

const StanfordPagePage = ({node, isHome, ...props}: Props) => {
  // If the page contains any of the following components, force the page to be full width. This prevents the need to
  // address the large components on "interior" pages that contain a left sidebar. It's more effort than it's worth.
  const fullWidthComponents: NodeStanfordPageSuPageComponentsUnion["__typename"][] = [
    "ParagraphSumTestimonial",
    "ParagraphSumCarousel",
    "ParagraphSumCourseFilter",
    "ParagraphSumPillBanner",
    "ParagraphStanfordBanner",
  ]
  const pageTitleBanners: NodeStanfordPageSuPageBannerUnion["__typename"][] = [
    "ParagraphStanfordPageTitleBanner",
    "ParagraphSumArcBanner",
    "ParagraphSumTopBanner",
  ]

  const layout = node.layoutSelection?.id
  const anchorPosition =
    layout === "left_anchor_nav" || layout === "left_anchor_no_nav"
      ? "left"
      : layout === "top_anchor_nav" || layout === "top_anchor_nav_full_width"
        ? "top"
        : false
  const hideSecondaryNav = layout === "left_anchor_no_nav"

  const fullWidth =
    layout === "stanford_basic_page_full" ||
    layout === "top_anchor_nav_full_width" ||
    !!node.suPageComponents?.find(component => fullWidthComponents.includes(component.__typename))

  const lastComponent = node.suPageComponents?.[node.suPageComponents?.length - 1]?.__typename

  const hasBannerOrCalculator = [
    "ParagraphSumCalculator",
    "ParagraphSumTestimonial",
    "ParagraphSumPillBanner",
    "ParagraphStanfordBanner",
  ].includes(lastComponent ?? "")

  return (
    <article {...props} className={cn({"mb-80": !hasBannerOrCalculator}, props.className)}>
      <NodePageMetadata
        pageTitle={isHome ? undefined : node.title}
        metatags={node.metatag}
        backupDescription={getFirstText(node.suPageComponents)}
      />
      {node.suPageBanner && (
        <header>
          {node.suPageBanner.__typename === "ParagraphStanfordPageTitleBanner" && (
            <PageTitleBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} isHome={isHome} />
          )}
          {node.suPageBanner.__typename === "ParagraphSumArcBanner" && (
            <SumArcBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} isHome={isHome} />
          )}
          {node.suPageBanner?.__typename === "ParagraphSumTopBanner" && (
            <SumTopBannerParagraph paragraph={node.suPageBanner} pageTitle={node.title} isHome={isHome} />
          )}
        </header>
      )}

      {!pageTitleBanners.includes(node.suPageBanner?.__typename) && (
        <H1 className={cn("mt-80 centered", {"sr-only": isHome})}>{node.title}</H1>
      )}

      {!fullWidth && (
        <InteriorPage
          currentPath={node.path || "#"}
          leftSideBar={anchorPosition === "left" && <AnchorNav />}
          hideSecondaryNav={hideSecondaryNav}
        >
          {anchorPosition === "top" && <AnchorNav horizontal />}
          <Wysiwyg html={node.body?.processed} />
          <Rows components={node.suPageComponents} />
        </InteriorPage>
      )}

      {fullWidth && (
        <>
          {/* Full width pages have no sidebar, so a left anchor nav is displayed across the top instead. */}
          {anchorPosition && <AnchorNav horizontal className="centered" />}
          <Wysiwyg html={node.body?.processed} className="centered mb-40" />
          <Rows components={node.suPageComponents} />
        </>
      )}
    </article>
  )
}
export default StanfordPagePage
