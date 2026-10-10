import {H1} from "@components/elements/headers"
import {graphqlClient} from "@lib/gql/gql-client"
import {notFound} from "next/navigation"
import {cacheTag} from "next/cache"
import {cacheFailure} from "@lib/gql/gql-queries"
import {isUuid} from "@lib/utils/security"
import Image from "next/image"
import {
  ParagraphDocument,
  ParagraphQuery,
  ParagraphQueryVariables,
  ParagraphStanfordGallery,
} from "@lib/gql/__generated__/graphql"

export const metadata = {
  title: "Gallery Image",
  robots: {
    index: false,
  },
}

type Props = {
  params: Promise<{uuid: string[]}>
}

export const instant = false

const Page = async (props: Props) => {
  "use cache: remote"

  const params = await props.params
  const [paragraphId, mediaUuid] = params.uuid

  // Reject malformed ids before they reach Drupal.
  if (!isUuid(paragraphId) || (mediaUuid && !isUuid(mediaUuid))) notFound()

  cacheTag("all-cache", "paragraphs", `paragraph:${paragraphId}`)

  let paragraphQuery: ParagraphQuery | undefined
  try {
    paragraphQuery = await graphqlClient().request<ParagraphQuery, ParagraphQueryVariables>(ParagraphDocument, {
      uuid: paragraphId,
    })
  } catch (e) {
    cacheFailure(`Unable to fetch gallery ${paragraphId}`, e)
  }
  if (paragraphQuery?.paragraph?.__typename !== "ParagraphStanfordGallery") notFound()

  const paragraph = paragraphQuery.paragraph as ParagraphStanfordGallery
  let galleryImages = mediaUuid
    ? paragraph.suGalleryImages?.filter(image => image.uuid === mediaUuid)
    : paragraph.suGalleryImages

  galleryImages = galleryImages?.filter(image => !!image.suGalleryImage?.url)

  return (
    <div className="my-80 centered">
      <H1>{paragraph.suGalleryHeadline || "Media"}</H1>
      {galleryImages?.map(galleryImage => {
        if (!galleryImage.suGalleryImage?.url) return

        return (
          <figure key={galleryImage.uuid}>
            <Image
              src={galleryImage.suGalleryImage.url}
              width={galleryImage.suGalleryImage.width}
              height={galleryImage.suGalleryImage.height}
              alt={""}
            />

            {galleryImage.suGalleryCaption && <figcaption>{galleryImage.suGalleryCaption}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}

export const generateStaticParams = async (): Promise<Array<{uuid: string[]}>> => [{uuid: ["none"]}]

export default Page
