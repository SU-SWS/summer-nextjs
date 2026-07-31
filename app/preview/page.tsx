import Rows from "@components/paragraphs/rows/rows"
import {notFound} from "next/navigation"
import {getConfigPageField, getEntityFromPath} from "@lib/gql/gql-queries"
import {NodeStanfordPage, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph"
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph"
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph"
import NodePageMetadata from "@components/nodes/pages/node-page-metadata"

const PreviewPage = async () => {
  const {entity} = await getEntityFromPath<NodeStanfordPage>("/", true)
  if (!entity) notFound()

  const siteName =
    (await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteName"]>(
      "StanfordBasicSiteSetting",
      "suSiteName"
    )) || "Stanford University"

  return (
    <article>
      <h1 className="sr-only" id="page-title">
        {siteName}
      </h1>
      <NodePageMetadata pageTitle={undefined} metatags={entity.metatag} />
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

export default PreviewPage
