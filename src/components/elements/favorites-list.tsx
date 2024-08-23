"use client"

import useFavorites from "@lib/hooks/useFavorites"
import {ChatBubbleLeftEllipsisIcon, ClipboardDocumentIcon, EnvelopeIcon, HeartIcon} from "@heroicons/react/24/outline"
import {useCopyToClipboard, useIsClient} from "usehooks-ts"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {H2} from "./headers"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

const ShareButtons = () => {
  const [_copiedText, copy] = useCopyToClipboard()
  const {favs} = useFavorites()
  const isClient = useIsClient()
  const urlParams = `/courses/favorites?favs=${favs.map(fav => `${fav.uuid}`).join(",")}`
  const copyUrl = isClient ? window.location.origin + urlParams : urlParams

  const smsCopy =
    "sms:&body=" +
    encodeURIComponent(
      `I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
    )
  const emailCopy =
    "mailto:?subject=" +
    decodeURIComponent("Someone wants you to see their list of favorite courses from Stanford Summer Session") +
    "&body=" +
    encodeURIComponent(
      `I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
    )

  return (
    <>
      <button
        className="flex flex-col items-center font-semibold text-archway-dark no-underline hocus:underline"
        onClick={() => (location.href = smsCopy)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <span className={twMerge("mb-4 rounded-full bg-spirited-dark p-5", clsx({"bg-black-40": !favs.length}))}>
          <ChatBubbleLeftEllipsisIcon width={30} className="text-white" />
        </span>
        Text
      </button>
      <button
        className="flex flex-col items-center font-semibold text-archway-dark no-underline hocus:underline"
        onClick={() => (location.href = emailCopy)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <span className={twMerge("mb-4 rounded-full bg-spirited-dark p-5", clsx({"bg-black-40": !favs.length}))}>
          <EnvelopeIcon width={30} className="text-white" />
        </span>
        Email
      </button>
      <button
        className="flex flex-col items-center font-semibold hocus:underline"
        onClick={() => copy(copyUrl)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <span className={twMerge("mb-4 rounded-full bg-spirited-dark p-5", clsx({"bg-black-40": !favs.length}))}>
          <ClipboardDocumentIcon width={30} className="text-white" />
        </span>
        Copy
      </button>
    </>
  )
}

const FavoritesList = ({isDisplayOnly = false}) => {
  const {favs, removeFav} = useFavorites()
  const totalUnits = favs.reduce((totalUnits, item) => totalUnits + item.units, 0)
  const removeFavorite = (uuid: string) => removeFav(uuid)

  return (
    <div className="rs-pt-1 rs-pb-2 rs-px-2 border shadow">
      <H2 className="rs-mb-1 type-2 text-center">Favorites List</H2>
      {favs.length > 0 ? (
        <>
          <ul className="list-none pl-0">
            {favs.map(fav => (
              <li key={fav.uuid} className="flex flex-row items-start gap-5">
                {!isDisplayOnly && (
                  <button type="button" onClick={() => removeFavorite(fav.uuid)} className="group">
                    <XMarkIcon width={24} className="mt-2 group-hocus:text-spirited-dark" />
                    <span className="sr-only">Remove &quot;{fav.title}&quot; from favorites</span>
                  </button>
                )}
                <div className="flex w-full flex-col items-start *:mb-0 sm:flex-row sm:gap-5 sm:*:mb-[1em]">
                  <p className="font-roboto text-21">{fav.title}</p>
                  <p className="ml-auto shrink-0 text-21">Units {fav.units}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex w-full border-t border-archway-dark pb-12">
            <div className="ml-auto mt-3 text-21">Total units {totalUnits}</div>
          </div>
        </>
      ) : (
        <p className="border-b border-archway-dark pb-20 leading-relaxed">
          Your favorites list is empty. Tap the{" "}
          <HeartIcon width={30} className="inline-block text-spirited-dark" title="Favorite Heart" /> icon on courses
          you’re interested in to see them here. And share them with family and friends.
        </p>
      )}
      <div className="mt-12 flex flex-row justify-between">
        <ShareButtons />
      </div>
    </div>
  )
}

export default FavoritesList
