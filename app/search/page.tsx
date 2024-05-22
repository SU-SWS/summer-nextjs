import {H1} from "@components/elements/headers";
import {getConfigPage} from "@lib/gql/gql-queries";
import {StanfordBasicSiteSetting} from "@lib/gql/__generated__/drupal.d";
import AlgoliaSiteSearch from "@components/algolia/algolia-site-search";
import {IndexUiState} from "instantsearch.js/es/types/ui-state";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = false;

export const metadata = {
  title: "Search",
  description: "Search the site",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  }
}
const Page = async ({searchParams}: { searchParams?: { [_key: string]: string } }) => {

  const siteSettingsConfig = await getConfigPage<StanfordBasicSiteSetting>("StanfordBasicSiteSetting")
  const initialState: IndexUiState = {}
  if (searchParams?.q) initialState.query = searchParams.q as string

  return (
    <div className="centered mt-32">
      <H1>Search</H1>

      {(siteSettingsConfig?.suSiteAlgoliaId && siteSettingsConfig?.suSiteAlgoliaIndex && siteSettingsConfig?.suSiteAlgoliaSearch) &&
        <AlgoliaSiteSearch
          appId={siteSettingsConfig.suSiteAlgoliaId}
          searchIndex={siteSettingsConfig.suSiteAlgoliaIndex}
          searchApiKey={siteSettingsConfig.suSiteAlgoliaSearch}
          initialUiState={initialState}
        />
      }
    </div>
  )
}

export default Page;