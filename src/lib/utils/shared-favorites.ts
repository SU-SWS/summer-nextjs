/**
 * Shortened favorite course links.
 *
 * A shared link carries the first block of each course uuid, e.g. `/courses/favorites?f=950afaca.ef01ee88`, instead of
 * the full uuids. The favorites page resolves the prefixes back to uuids by matching them against every course's uuid.
 */

const sharedFavoritesPath = "/courses/favorites"

/**
 * Number of uuid characters kept in a shared link. The first block of a uuid is unique across the courses with plenty
 * of room to spare, and a collision would only add an extra course to the shared list.
 */
const prefixLength = 8

const prefixPattern = /^[0-9a-f]{4,32}$/
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

/**
 * Relative url for sharing a list of favorite courses.
 */
export const getSharedFavoritesUrl = (uuids: string[]) =>
  `${sharedFavoritesPath}?f=${uuids.map(uuid => uuid.slice(0, prefixLength).toLowerCase()).join(".")}`

export type SharedFavorites =
  | {
      /**
       * Full uuids from the original `?favs=` links.
       */
      uuids: string[]
      prefixes?: never
    }
  | {
      /**
       * Shortened uuids that still need to be resolved.
       */
      prefixes: string[]
      uuids?: never
    }

/**
 * Read the shared favorites from the url, if any. Anything that doesn't look like a uuid, or the start of one, is
 * dropped since the values end up in an Algolia filter.
 */
export const getSharedFavorites = (searchParams: URLSearchParams): SharedFavorites | undefined => {
  const prefixes = searchParams.get("f")
  if (prefixes !== null) {
    return {
      prefixes: prefixes
        .toLowerCase()
        .split(".")
        .filter(prefix => prefixPattern.test(prefix)),
    }
  }

  const uuids = searchParams.get("favs")
  if (uuids !== null) {
    return {
      uuids: uuids
        .toLowerCase()
        .split(",")
        .filter(uuid => uuidPattern.test(uuid)),
    }
  }
}

/**
 * Find the uuids that start with any of the given prefixes.
 */
export const resolveFavoritePrefixes = (prefixes: string[], uuids: string[]) =>
  uuids.filter(uuid => prefixes.some(prefix => uuid.toLowerCase().startsWith(prefix)))
