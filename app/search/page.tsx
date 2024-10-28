import {H1} from "@components/elements/headers"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import AlgoliaSiteSearch from "@components/algolia/algolia-site-search"
import {IndexUiState} from "instantsearch.js/es/types/ui-state"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
}
const Page = async (props: {searchParams?: Promise<{[_key: string]: string}>}) => {
  const searchParams = await props.searchParams
  const [appId, indexName, apiKey] = await getAlgoliaCredential()
  const initialState: IndexUiState = {}
  if (searchParams?.q) initialState.query = searchParams.q

  return (
    <div className="centered mt-32">
      <H1>Search</H1>

      {appId && indexName && apiKey && (
        <AlgoliaSiteSearch appId={appId} searchIndex={indexName} searchApiKey={apiKey} initialUiState={initialState} />
      )}
      <noscript>Please enable Javascript in your browser to view search results.</noscript>
    </div>
  )
}

export default Page
