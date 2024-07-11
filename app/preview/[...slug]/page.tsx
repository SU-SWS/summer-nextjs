import NodePage from "@components/nodes/pages/node-page"
import UnpublishedBanner from "@components/elements/unpublished-banner"
import {NodeUnion} from "@lib/gql/__generated__/drupal.d"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {notFound} from "next/navigation"
import {getPathFromContext, PageProps} from "@lib/drupal/utils"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"

const PreviewPage = async ({params}: PageProps) => {
  if (!isPreviewMode()) notFound()
  const {entity, error} = await getEntityFromPath<NodeUnion>(getPathFromContext({params}), isPreviewMode())

  if (error) throw error
  if (!entity) notFound()

  return (
    <UnpublishedBanner status={entity.status} message="Unpublished Page">
      <NodePage node={entity} />
    </UnpublishedBanner>
  )
}

export default PreviewPage
