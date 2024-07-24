import {HtmlHTMLAttributes} from "react"
import {getAlgoliaCredential} from "@lib/gql/gql-queries"
import {ParagraphSumUserFavorite} from "@lib/gql/__generated__/drupal.d"
import AlgoliaCourseList from "@components/algolia/algolia-course-list"
import FavoritesList from "@components/elements/favorites-list"
import {twMerge} from "tailwind-merge"

type Props = HtmlHTMLAttributes<HTMLDivElement> & {
  paragraph: ParagraphSumUserFavorite
}

const UserFavoriteParagraph = async ({...props}: Props) => {
  const [appId, indexName, apiKey] = await getAlgoliaCredential()

  if (!appId || !indexName || !apiKey) return

  return (
    <div {...props} className={twMerge("grid grid-cols-12 gap-12", props.className)}>
      <div className="col-span-12 md:col-span-4 xl:col-span-3">
        <FavoritesList isDisplayOnly />
      </div>
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <AlgoliaCourseList appId={appId} searchIndex={indexName} searchApiKey={apiKey} />
      </div>
    </div>
  )
}

export default UserFavoriteParagraph
