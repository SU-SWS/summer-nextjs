import {ConfigPagesQuery, ConfigPagesUnion, MenuAvailable, MenuItem, NodeUnion, RouteQuery, RouteRedirect, TermUnion} from "@lib/gql/__generated__/drupal.d"
import {cache} from "react"
import {graphqlClient} from "@lib/gql/gql-client"

export const getEntityFromPath = cache(
  async <T extends NodeUnion | TermUnion>(
    path: string,
    isPreviewMode?: boolean
  ): Promise<{
    entity?: T
    redirect?: RouteRedirect
    error?: Error
  }> => {
    "use server"
    let entity: T | undefined
    let query: RouteQuery

    try {
      query = await graphqlClient({next: {tags: [`paths:${path}`]}}, isPreviewMode).Route({path})
    } catch (e) {
      return {entity: undefined, redirect: undefined, error: e as Error}
    }

    if (query.route?.__typename === "RouteRedirect") return {redirect: query.route, entity: undefined}
    entity = query.route?.__typename === "RouteInternal" && query.route.entity ? (query.route.entity as T) : undefined
    return {entity, redirect: undefined, error: undefined}
  }
)

export const getConfigPage = async <T extends ConfigPagesUnion>(configPageType: ConfigPagesUnion["__typename"]): Promise<T | undefined> => {
  "use server"

  let query: ConfigPagesQuery
  try {
    query = await getConfigPagesData()
  } catch (e) {
    console.warn("Unable to fetch config pages")
    return
  }

  if (query.stanfordBasicSiteSettings.nodes[0]?.__typename === configPageType) return query.stanfordBasicSiteSettings.nodes[0] as T
  if (query.stanfordGlobalMessages.nodes[0]?.__typename === configPageType) return query.stanfordGlobalMessages.nodes[0] as T
  if (query.stanfordLocalFooters.nodes[0]?.__typename === configPageType) return query.stanfordLocalFooters.nodes[0] as T
  if (query.stanfordSuperFooters.nodes[0]?.__typename === configPageType) return query.stanfordSuperFooters.nodes[0] as T
  if (query.lockupSettings.nodes[0]?.__typename === configPageType) return query.lockupSettings.nodes[0] as T
}

const getConfigPagesData = cache(async (): Promise<ConfigPagesQuery> => {
  "use server"
  return graphqlClient({next: {tags: ["config-pages"]}}).ConfigPages()
})

export const getMenu = cache(async (name?: MenuAvailable): Promise<MenuItem[]> => {
  "use server"

  const menu = await graphqlClient({next: {tags: ["menus", `menu:${name || "main"}`]}}).Menu({name})
  const menuItems = (menu.menu?.items || []) as MenuItem[]

  const filterInaccessible = (items: MenuItem[]): MenuItem[] => {
    items = items.filter(item => item.title !== "Inaccessible")
    items.map(item => (item.children = filterInaccessible(item.children)))
    return items
  }
  return filterInaccessible(menuItems)
})

export const getAllNodePaths = cache(async () => {
  "use server"

  const nodeQuery = await graphqlClient({next: {tags: ["paths"]}}).AllNodes({first: 1000})
  const nodePaths: string[] = []
  // nodeQuery.nodeStanfordCourses.nodes.map(node => nodePaths.push(node.path))
  // nodeQuery.nodeStanfordEventSeriesItems.nodes.map(node => nodePaths.push(node.path))
  // nodeQuery.nodeStanfordEvents.nodes.map(node => nodePaths.push(node.path))
  // nodeQuery.nodeStanfordNewsItems.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeStanfordPages.nodes.map(node => nodePaths.push(node.path))
  // nodeQuery.nodeStanfordPeople.nodes.map(node => nodePaths.push(node.path))
  // nodeQuery.nodeStanfordPolicies.nodes.map(node => nodePaths.push(node.path))
  nodeQuery.nodeSumSummerCourses.nodes.map(node => nodePaths.push(node.path))
  return nodePaths
})
