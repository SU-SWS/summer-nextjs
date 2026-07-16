import {H1} from "@components/elements/headers"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import AlgoliaSiteSearch from "@components/algolia/algolia-site-search"
import {Suspense} from "react"

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

      <div>
        {appId && indexName && apiKey && (
          <Suspense>
            <AlgoliaSiteSearch appId={appId} searchIndex={indexName} searchApiKey={apiKey} />
          </Suspense>
        )}
      </div>
      <noscript>Please enable Javascript in your browser to view search results.</noscript>
    </div>
  )
}

export default Page
