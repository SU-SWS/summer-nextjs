import {MetadataRoute} from "next"
import {graphqlClient} from "@lib/gql/gql-client"
import {NodeUnion} from "@lib/gql/__generated__/drupal.d"
import {getHomePagePath} from "@lib/gql/gql-queries"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 604800
export const dynamic = "force-static"

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const nodeQuery = await graphqlClient({cache: "no-cache"}).AllNodes()
  const nodes: NodeUnion[] = []

  nodeQuery.nodeStanfordPages.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeSumSummerCourses.nodes.map(node => nodes.push(node as NodeUnion))

  const sitemap: MetadataRoute.Sitemap = []

  const homePath = await getHomePagePath()
  nodes.map(node =>
    sitemap.push({
      url: `https://summer.stanford.edu` + (homePath === node.path ? "/" : node.path),
      lastModified: new Date(node.changed.time),
      priority: node.__typename === "NodeStanfordPage" ? 1 : 0.8,
      changeFrequency: node.__typename === "NodeStanfordPage" ? "weekly" : "monthly",
    })
  )

  return sitemap
}

export default Sitemap
