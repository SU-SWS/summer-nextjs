import {Hit as HitType, AlgoliaHit as BaseAlgoliaHit} from "instantsearch.js/es/types/results"
import {H3} from "@components/elements/headers"
import Link from "@components/elements/link"
import {Snippet} from "react-instantsearch"
import Image from "next/image"
import SummerCourse from "@components/algolia/results/summer-course/summer-course"

export type AlgoliaHit = BaseAlgoliaHit & {
  url: string
  title: string
  summary?: string
  photo?: string
  updated: number
  html?: string
  objectID: string
  type: string
}

const DefaultResult = ({hit}: {hit: HitType<AlgoliaHit>}) => {
  if (hit.type === "Summer Courses") return <SummerCourse hit={hit} />

  const hitDomain = new URL(hit.url).origin

  return (
    <article className="flex justify-between gap-20 py-12 @container">
      <div>
        <H3 className="type-3">
          <Link href={hit.url.replace(hitDomain, "")}>{hit.title}</Link>
        </H3>

        {hit.summary && <p className="mb-10">{hit.summary}</p>}
        {hit.html && !hit.summary && (
          <p className="mb-10">
            {/* @ts-expect-error React 19 types don't match with the library. */}
            <Snippet hit={hit} attribute="html" />
          </p>
        )}
      </div>

      {hit.photo && (
        <div className="relative aspect-[2/3] w-[150px] shrink-0">
          <Image className="object-cover" src={hit.photo} alt="" fill sizes="300px" />
        </div>
      )}
    </article>
  )
}
export default DefaultResult
