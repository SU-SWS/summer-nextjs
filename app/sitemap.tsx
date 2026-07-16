import {MetadataRoute} from "next"
import {graphqlClient} from "@lib/gql/gql-client"
import {NodeUnion} from "@lib/gql/__generated__/drupal.d"
import {getHomePagePath} from "@lib/gql/gql-queries"
import {cacheLife} from "next/cache"
import {AllNodesDocument, AllNodesQuery} from "@lib/gql/__generated__/graphql"

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  "use cache: remote"
  cacheLife("weeks")
  const nodeQuery = await graphqlClient().request<AllNodesQuery>(AllNodesDocument)
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
