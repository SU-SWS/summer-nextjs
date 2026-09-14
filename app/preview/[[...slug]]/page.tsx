import NodePage from "@components/nodes/pages/node-page"
import UnpublishedBanner from "@components/elements/unpublished-banner"
import {NodeUnion} from "@lib/gql/__generated__/graphql"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {notFound} from "next/navigation"
import {getPathFromContext, PageProps, Slug} from "@lib/drupal/utils"
import {Suspense} from "react"

export const instant = false

const PreviewPage = (props: PageProps) => (
  <Suspense>
    <PreviewContent params={props.params} />
  </Suspense>
)

/**
 * Render the draft revision of the requested node.
 *
 * Deliberately uncached: this renders draft content for an editor, so every request re-reads it
 * from Drupal. It streams inside the Suspense boundary above, which lets the static shell
 * prerender rather than turning the whole route dynamic.
 */
const PreviewContent = async ({params}: {params: PageProps["params"]}) => {
  const path = getPathFromContext((await params).slug || "/")
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
