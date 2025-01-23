import {H1} from "@components/elements/headers"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import AlgoliaSiteSearch from "@components/algolia/algolia-site-search"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false
export const dynamic = "force-static"

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
}
const Page = async () => {
  const [appId, indexName, apiKey] = await getAlgoliaCredential()

  return (
    <div className="centered mt-32">
      <H1>Search</H1>

      {appId && indexName && apiKey && (
        <AlgoliaSiteSearch appId={appId} searchIndex={indexName} searchApiKey={apiKey} />
      )}
      <noscript>Please enable Javascript in your browser to view search results.</noscript>
    </div>
  )
}

export default Page
