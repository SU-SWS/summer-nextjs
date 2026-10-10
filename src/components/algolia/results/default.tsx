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
  // Point the photo at Drupal so the optimizer accepts it (see images.remotePatterns in next.config.ts).
  const imageUrl = hit.photo?.replace(hitDomain, process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string)

  return (
    <article className="@container flex justify-between gap-50 py-30">
      <div>
        <H3 className="type-3">
          <Link href={hit.url.replace(hitDomain, "")}>{hit.title}</Link>
        </H3>

        {hit.summary && <p className="mb-25">{hit.summary}</p>}
        {hit.html && !hit.summary && (
          <p className="mb-25">
            <Snippet hit={hit} attribute="html" />
          </p>
        )}
      </div>

      {imageUrl && (
        <div className="relative aspect-[2/3] w-[150px] shrink-0">
          {/* An image style derivative (`?itok=`) is already sized by Drupal and needs its token intact. */}
          <Image
            className="object-cover"
            src={imageUrl}
            alt=""
            fill
            sizes="300px"
            unoptimized={imageUrl.includes("?")}
          />
        </div>
      )}
    </article>
  )
}
export default DefaultResult
