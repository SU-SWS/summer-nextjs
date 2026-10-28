import {MetadataRoute} from "next"
import {graphqlClient} from "@lib/gql/gql-client"
import {cacheFailure, getHomePagePath} from "@lib/gql/gql-queries"
import {cacheLife} from "next/cache"
import {AllNodesDocument, AllNodesQuery, NodeUnion} from "@lib/gql/__generated__/graphql"

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache: remote"
  let nodeQuery: AllNodesQuery
  try {
    nodeQuery = await graphqlClient().request<AllNodesQuery>(AllNodesDocument)
  } catch (e) {
    cacheFailure("Unable to fetch nodes for the sitemap", e)
    return []
  }
  cacheLife("weeks")
  const nodes: NodeUnion[] = []

  nodeQuery.nodeStanfordPages.nodes.map(node => nodes.push(node as NodeUnion))
  nodeQuery.nodeSumSummerCourses.nodes.map(node => nodes.push(node as NodeUnion))

  const sitemap: MetadataRoute.Sitemap = []

  const homePath = await getHomePagePath().catch(() => undefined)
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
