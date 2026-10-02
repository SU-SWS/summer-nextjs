import {Maybe, ParagraphStanfordWysiwyg, ParagraphUnion} from "@lib/gql/__generated__/graphql"
import {decode} from "html-entities"

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

export const getIdAttribute = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric groups with hyphen
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
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
