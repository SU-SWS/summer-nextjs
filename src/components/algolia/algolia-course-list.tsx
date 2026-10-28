"use client"

import {liteClient} from "algoliasearch/lite"
import {useHits, usePagination, Configure, InstantSearch} from "react-instantsearch"
import {HTMLAttributes, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import {Hit as HitType} from "instantsearch.js"
import SummerCourse from "@components/algolia/results/summer-course/summer-course"
import useFavorites from "@lib/hooks/useFavorites"
import {useSearchParams} from "next/navigation"
import {AlgoliaHit} from "@components/algolia/results/default"
import {useBoolean} from "usehooks-ts"
import AlgoliaPager from "@components/algolia/algolia-pager"
import type {SendEventForHits} from "instantsearch.js/es/lib/utils"
import {getSharedFavorites, resolveFavoritePrefixes} from "@lib/utils/shared-favorites"
import useRevealKey from "@lib/hooks/useRevealKey"

type Props = {
  appId: string
  searchIndex: string
  searchApiKey: string
}

const AlgoliaCourseList = ({appId, searchIndex, searchApiKey}: Props) => {
  // Remount with a fresh InstantSearch instance each time the cached route is revealed again.
  const revealKey = useRevealKey()
  const searchClient = useMemo(() => liteClient(appId, searchApiKey), [appId, searchApiKey])
  const {favs} = useFavorites()
  const searchParams = useSearchParams()

  const sharedFavorites = useMemo(() => getSharedFavorites(searchParams), [searchParams])
  const sharedPrefixes = sharedFavorites?.prefixes?.join(".")
  const [resolvedPrefixes, setResolvedPrefixes] = useState<{prefixes: string; uuids: string[]}>()

  // Shortened links only carry the start of each uuid, so match them against every course's uuid.
  useEffect(() => {
    if (sharedPrefixes === undefined) return
    let cancelled = false

    getCourseUuids(searchClient, searchIndex)
      .then(uuids => resolveFavoritePrefixes(sharedPrefixes.split("."), uuids))
      .catch(e => {
        console.warn("Unable to resolve the shared favorite courses", e instanceof Error ? e.message : e)
        return []
      })
      .then(uuids => {
        if (!cancelled) setResolvedPrefixes({prefixes: sharedPrefixes, uuids})
      })

    return () => {
      cancelled = true
    }
  }, [sharedPrefixes, searchClient, searchIndex])

  let itemUuids: string[] | undefined = favs.map(item => item.uuid)
  if (sharedFavorites?.uuids) itemUuids = sharedFavorites.uuids
  if (sharedPrefixes !== undefined) {
    itemUuids = resolvedPrefixes?.prefixes === sharedPrefixes ? resolvedPrefixes.uuids : undefined
  }

  // Wait for the shared link to be resolved.
  if (!itemUuids) return null

  let filters = itemUuids.map(uuid => `objectID:'${uuid}'`).join(" OR ") || "type:'Summer Courses'"
  // A shared link that matches no courses shouldn't fall back to listing every course.
  if (sharedFavorites && !itemUuids.length) filters = "objectID:'none'"

  return (
    // Plain InstantSearch, rather than InstantSearchNext, so that searching only happens in the browser.
    <InstantSearch
      key={revealKey}
      indexName={searchIndex}
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
      // Click and conversion events only count on production, so previews and local builds don't skew the stats.
      insights={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
    >
      <Configure filters={filters} attributesToHighlight={["html"]} attributesToSnippet={["html"]} />
      <HitList />
    </InstantSearch>
  )
}

/**
 * Uuids of every summer course.
 */
const getCourseUuids = async (searchClient: ReturnType<typeof liteClient>, indexName: string) => {
  const {results} = await searchClient.search({
    requests: [
      {
        indexName,
        filters: "type:'Summer Courses'",
        hitsPerPage: 1000,
        attributesToRetrieve: ["objectID"],
        attributesToHighlight: [],
        analytics: false,
      },
    ],
  })
  const result = results[0]
  return result && "hits" in result ? result.hits.map((hit: {objectID: string}) => hit.objectID) : []
}

const HitList = () => {
  const {items: hits, results, sendEvent} = useHits<AlgoliaHit>({})
  const {currentRefinement: currentPage} = usePagination({padding: 2})

  // Placeholder results are provided until the first search response arrives.
  if (!results || results.__isArtificial) return null

  if (hits.length === 0) {
    return <p>No favorites at this time.</p>
  }

  return (
    <div>
      <ul className="list-unstyled">
        {hits.map((hit, position) => (
          <HitItem
            key={hit.objectID}
            focusOnItem={position === 0 && currentPage > 0}
            className="border-b border-gray-300 last:border-0"
            hit={hit}
            sendEvent={sendEvent}
          />
        ))}
      </ul>
      <AlgoliaPager />
    </div>
  )
}

const HitItem = ({
  focusOnItem,
  hit,
  sendEvent,
  ...props
}: HTMLAttributes<HTMLLIElement> & {focusOnItem?: boolean; hit: HitType<AlgoliaHit>; sendEvent: SendEventForHits}) => {
  const ref = useRef<HTMLLIElement>(null)
  const {value: focus, setFalse: disableFocus} = useBoolean(focusOnItem)

  useLayoutEffect(() => {
    if (focus) {
      const reduceMotion = !!window.matchMedia("(prefers-reduced-motion: reduce)")?.matches
      ref.current?.scrollIntoView({behavior: reduceMotion ? "instant" : "smooth", block: "end", inline: "nearest"})
      ref.current?.focus({preventScroll: true})
    }
  }, [focus])

  return (
    <li
      {...props}
      onClick={() => sendEvent("click", hit, "Hit Clicked")}
      onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
      tabIndex={focus ? 0 : undefined}
      ref={focus ? ref : undefined}
      onBlur={disableFocus}
    >
      <SummerCourse hit={hit} />
    </li>
  )
}

export default AlgoliaCourseList
