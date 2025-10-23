import Rows from "@components/paragraphs/rows/rows"
import {notFound} from "next/navigation"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {NodeStanfordPage} from "@lib/gql/__generated__/drupal.d"
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph"
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph"
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"
import StanfordPageMetadata from "@components/nodes/pages/stanford-page/stanford-page-metadata"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"

const Home = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>("/", await isPreviewMode())
  if (!entity) notFound()

  return (
    <article>
      <StanfordPageMetadata node={entity} isHome />
      {entity.suPageBanner?.__typename === "ParagraphStanfordPageTitleBanner" && (
        <PageTitleBannerParagraph paragraph={entity.suPageBanner} pageTitle="" />
      )}
      {entity.suPageBanner?.__typename === "ParagraphSumArcBanner" && (
        <SumArcBannerParagraph paragraph={entity.suPageBanner} pageTitle="" />
      )}
      {entity.suPageBanner?.__typename === "ParagraphSumTopBanner" && (
        <SumTopBannerParagraph paragraph={entity.suPageBanner} pageTitle="" />
      )}
      {entity.suPageComponents && <Rows components={entity.suPageComponents} />}
    </article>
  )
}

export default Home
