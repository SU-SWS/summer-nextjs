"use client"

import useFavorites, {Favorite} from "@lib/hooks/useFavorites"
import {HTMLAttributes} from "react"
import {HeartIcon} from "@heroicons/react/24/outline"
import {clsx} from "clsx"

type Props = HTMLAttributes<HTMLButtonElement> & Favorite

const FavoriteButton = ({uuid, title, path, units, ...props}: Props) => {
  const {favs, toggleFav} = useFavorites()
  const isFavorite = favs.some(fav => fav.uuid === uuid)

  return (
    <button
      onClick={() => toggleFav(uuid, title, path, units)}
      type="button"
      role="switch"
      aria-checked={isFavorite}
      {...props}
    >
      <span className="sr-only">
        {isFavorite ? "Add" : "Remove"}
        {` favorite ${title}`}
      </span>
      <HeartIcon width={30} className={clsx("text-spirited-dark", {"fill-spirited-dark": isFavorite})} />
    </button>
  )
}

export default FavoriteButton
