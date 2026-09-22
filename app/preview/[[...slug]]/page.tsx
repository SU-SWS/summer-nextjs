import NodePage from "@components/nodes/pages/node-page"
import UnpublishedBanner from "@components/elements/unpublished-banner"
import {NodeUnion} from "@lib/gql/__generated__/graphql"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {notFound} from "next/navigation"
import {getPathFromContext, PageProps, Slug} from "@lib/drupal/utils"

export const instant = false

/**
 * Render the draft revision of the requested node.
 *
 * Deliberately uncached: this renders draft content for an editor, so every request re-reads it
 * from Drupal.
 */
const PreviewPage = async (props: PageProps) => {
  const path = getPathFromContext((await props.params).slug || "/")
  const {entity} = await getEntityFromPath<NodeUnion>(path, true)

  if (!entity) notFound()

  return (
    <UnpublishedBanner status={entity.status} message="Unpublished Page">
      <NodePage node={entity} isHome={path == "/"} />
    </UnpublishedBanner>
  )
}

export const generateStaticParams = async (): Promise<Array<Slug>> => [{slug: ["home"]}]

export default PreviewPage
