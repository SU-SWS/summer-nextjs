import Rows from "@components/paragraphs/rows/rows"
import {notFound} from "next/navigation"
import {getConfigPageField, getEntityFromPath} from "@lib/gql/gql-queries"
import {NodeStanfordPage, NodeUnion, StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d"
import {Metadata} from "next"
import {getNodeMetadata} from "./[...slug]/metadata"
import PageTitleBannerParagraph from "@components/paragraphs/stanford-page-title-banner/page-title-banner-paragraph"
import SumArcBannerParagraph from "@components/paragraphs/sum-arc-banner/sum-arc-banner-paragraph"
import SumTopBannerParagraph from "@components/paragraphs/sum-top-banner/sum-top-banner-paragraph"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"

const Home = async () => {
  const {entity, error} = await getEntityFromPath<NodeStanfordPage>("/", isPreviewMode())

  if (error) throw error
  if (!entity) notFound()

  return (
    <article>
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

export const generateMetadata = async (): Promise<Metadata> => {
  const siteName = await getConfigPageField<StanfordBasicSiteSetting, StanfordBasicSiteSetting["suSiteName"]>(
    "StanfordBasicSiteSetting",
    "suSiteName"
  )

  const {entity} = await getEntityFromPath<NodeUnion>("/")
  const metadata = entity ? getNodeMetadata(entity) : {}
  metadata.title = siteName || metadata.title
  if (metadata.openGraph?.title) metadata.openGraph.title = siteName || metadata.openGraph.title
  return metadata
}

export default Home
