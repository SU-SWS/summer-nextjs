import {NodeUnion} from "@lib/gql/__generated__/graphql"
import {getEntityFromPath} from "@lib/gql/gql-queries"
import {getPathFromContext} from "@lib/drupal/utils"

/**
 * Whether the node at the given url wants the reduced header and footer.
 *
 * Only basic pages carry `sumMinimalHeadFoot`, so every other bundle - and every route that isn't
 * a node at all, like the search page - keeps the full chrome.
 *
 * The segment layouts call this for the same path the page itself resolves. For published content
 * that is a read of the cache entry {@link getEntityFromPath} already populated rather than a
 * second request to Drupal.
 *
 * @param slug         Route segments of the current url.
 * @param previewMode  When `true`, reads the draft revision so editors see the flag they just set.
 */
export const hasMinimalChrome = async (slug?: string[], previewMode?: boolean): Promise<boolean> => {
  const {entity} = await getEntityFromPath<NodeUnion>(getPathFromContext(slug || ""), previewMode)
  return entity?.__typename === "NodeStanfordPage" && !!entity.sumMinimalHeadFoot
}
