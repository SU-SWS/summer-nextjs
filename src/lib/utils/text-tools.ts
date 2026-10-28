import {Maybe, ParagraphStanfordWysiwyg, ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {decode} from "html-entities"
import {cache} from "react"

export const getFirstText = (components?: Maybe<ParagraphUnion[]>) => {
  const firstWysiwyg = components?.find(
    component => component.__typename === "ParagraphStanfordWysiwyg"
  ) as ParagraphStanfordWysiwyg
  if (firstWysiwyg) {
    return getCleanDescription(firstWysiwyg.suWysiwygText?.processed)
  }
}

export const getCleanDescription = (description?: Maybe<string>, numSentences?: number): string | undefined => {
  if (description) {
    const text: string =
      decode(description)
        .replaceAll(/(<([^>]+)>)/gi, " ")
        .replaceAll(/ +/g, " ")
        .replaceAll(/ </g, "<")
        .replace(/\.\s+$/, "")
        .split(".")
        .slice(0, numSentences || 1)
        .join(".") + "."
    return text?.length > 1 ? decode(text) : undefined
  }
}

type IdRegistry = {
  /**
   * Every id handed out so far, including the ones with a numeric suffix.
   */
  used: Set<string>
  /**
   * Next suffix to try for a given slug, so repeated duplicates don't rescan from 1.
   */
  nextSuffix: Map<string, number>
}

/**
 * Registry of ids already generated during the current render.
 *
 * `cache()` scopes this to a single server request, so ids restart at their unsuffixed form on every
 * page render instead of accumulating across requests. Outside of a server component render (client
 * components, both during SSR and hydration) `cache()` is a pass through, so each call gets a fresh
 * registry and the plain slug is returned. That keeps SSR and hydration in agreement.
 */
const getIdRegistry = cache((): IdRegistry => ({
  used: new Set<string>(),
  nextSuffix: new Map<string, number>(),
}))

const getSlugFromText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric groups with hyphen
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens

/**
 * Build a url friendly id from a string, appending a numeric suffix when that id is already taken:
 * "overview", "overview-1", "overview-2", etc.
 *
 * Call it once per element and reuse the returned value: every call consumes an id.
 */
export const getIdFromText = (text?: Maybe<string>): string | undefined => {
  if (!text) return undefined

  const slug = getSlugFromText(text)
  if (!slug) return undefined

  const {used, nextSuffix} = getIdRegistry()

  if (!used.has(slug)) {
    used.add(slug)
    return slug
  }

  // Keep incrementing in case the suffixed id is itself taken, ie. headings of "Section" and
  // "Section 1" both wanting `section-1`.
  let suffix = nextSuffix.get(slug) || 1
  while (used.has(`${slug}-${suffix}`)) suffix++

  const id = `${slug}-${suffix}`
  nextSuffix.set(slug, suffix + 1)
  used.add(id)
  return id
}

/**
 * Build id attributes from a list of headings, keeping each id unique. The first occurrence of a heading keeps the
 * plain id and each repeat has a number appended: "overview", "overview-1", "overview-2", etc.
 */
export const getUniqueIdAttributes = (headings: {key: string; text?: Maybe<string>}[]): Record<string, string> => {
  const usedIds = new Set<string>()
  const ids: Record<string, string> = {}

  headings.forEach(({key, text}) => {
    const baseId = text ? getIdAttribute(text) : undefined
    if (!baseId || ids[key]) return

    let id = baseId
    let count = 1
    while (usedIds.has(id)) id = `${baseId}-${count++}`

    usedIds.add(id)
    ids[key] = id
  })
  return ids
}
