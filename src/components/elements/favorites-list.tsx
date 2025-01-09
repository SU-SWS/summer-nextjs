"use client"

import useFavorites from "@lib/hooks/useFavorites"
import {ChatBubbleLeftEllipsisIcon, ClipboardDocumentIcon, EnvelopeIcon, HeartIcon} from "@heroicons/react/24/outline"
import {useCopyToClipboard, useIsClient} from "usehooks-ts"
import {XMarkIcon} from "@heroicons/react/20/solid"
import {H2} from "./headers"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "react-toastify"

const ShareButtons = () => {
  const [, copy] = useCopyToClipboard()
  const {favs} = useFavorites()
  const isClient = useIsClient()
  const urlParams = `/courses/favorites?favs=${favs.map(fav => `${fav.uuid}`).join(",")}`
  const copyUrl = isClient ? window.location.origin + urlParams : urlParams

  const copyToClip = (text: string) => {
    copy(text).catch(_e => console.warn("An error occurred when copying to clipboard"))
    toast("Copied!")
  }

  const smsCopy =
    "sms:?body=" +
    encodeURIComponent(
      `I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
    )
  const emailCopy =
    "mailto:?subject=" +
    encodeURIComponent("Someone wants you to see their list of favorite courses from Stanford Summer Session") +
    "&body=" +
    encodeURIComponent(
      `I saved some Stanford Summer Session courses that looked interesting to me. What do you think? ${copyUrl}`
    )

  return (
    <div className="mt-12 flex flex-row justify-between gap-5 *:max-w-60 *:flex-1 *:shrink-0 @md:gap-20">
      <button
        className="text-center font-semibold text-archway-dark no-underline hocus:underline"
        onClick={() => (location.href = smsCopy)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <ChatBubbleLeftEllipsisIcon
          width={30}
          className={twMerge(
            "mb-4 block w-full rounded-full bg-spirited-dark p-5 text-white",
            clsx({"bg-black-40": !favs.length})
          )}
        />
        Text
      </button>
      <button
        className="text-center font-semibold text-archway-dark no-underline hocus:underline"
        onClick={() => (location.href = emailCopy)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <EnvelopeIcon
          width={30}
          className={twMerge(
            "mb-4 block w-full rounded-full bg-spirited-dark p-5 text-white",
            clsx({"bg-black-40": !favs.length})
          )}
        />
        Email
      </button>
      <button
        className="text-center font-semibold hocus:underline"
        onClick={() => copyToClip(copyUrl)}
        data-course-shared="Favorites"
        disabled={!favs.length}
      >
        <ClipboardDocumentIcon
          width={30}
          className={twMerge(
            "mb-4 block w-full rounded-full bg-spirited-dark p-5 text-white",
            clsx({"bg-black-40": !favs.length})
          )}
        />
        Copy
      </button>
    </div>
  )
}

const FavoritesList = ({isDisplayOnly = false}) => {
  const {favs, removeFav} = useFavorites()
  const totalUnits = favs.reduce((totalUnits, item) => totalUnits + item.units, 0)

  return (
    <div className="rs-pt-1 rs-pb-2 rs-px-2 border shadow @container">
      <H2 className="rs-mb-1 type-2 text-center">Favorites List</H2>
      {favs.length > 0 && (
        <>
          <ul className="list-unstyled">
            {favs.map(fav => (
              <li key={fav.uuid} className="flex flex-row items-start gap-5">
                {!isDisplayOnly && (
                  <button type="button" onClick={() => removeFav(fav.uuid)} className="group">
                    <XMarkIcon width={24} className="mt-2 group-hocus:text-spirited-dark" />
                    <span className="sr-only">Remove &quot;{fav.title}&quot; from favorites</span>
                  </button>
                )}
                <div className="flex w-full flex-col items-start @sm:flex-row sm:gap-5">
                  <div className="font-roboto text-21">{fav.title}</div>
                  <div className="ml-auto shrink-0 text-21">Units {fav.units}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-archway-dark pb-12 pt-3 text-right text-21">Total units {totalUnits}</div>
        </>
      )}
      {favs.length === 0 && (
        <p className="border-b border-archway-dark pb-20 leading-relaxed">
          Your favorites list is empty. Tap the{" "}
          <HeartIcon width={30} className="inline-block text-spirited-dark" title="Favorite Heart" /> icon on courses
          you’re interested in to see them here, and share them with family and friends.
        </p>
      )}

      <ShareButtons />
    </div>
  )
}

export default FavoritesList
