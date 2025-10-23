import NodePage from "@components/nodes/pages/node-page"
import UnpublishedBanner from "@components/elements/unpublished-banner"
import {NodeUnion} from "@lib/gql/__generated__/drupal.d"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {notFound} from "next/navigation"
import {getPathFromContext, PageProps} from "@lib/drupal/utils"
import {isPreviewMode} from "@lib/drupal/is-preview-mode"

const PreviewPage = async (props: PageProps) => {
  const params = await props.params
  if (!(await isPreviewMode())) notFound()
  const {entity} = await getEntityFromPath<NodeUnion>(getPathFromContext(params.slug), true)

  if (!entity) notFound()

  return (
    <UnpublishedBanner status={entity.status} message="Unpublished Page">
      <NodePage node={entity} />
    </UnpublishedBanner>
  )
}

export default PreviewPage
