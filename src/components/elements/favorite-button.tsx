"use client"

import useFavorites, {Favorite} from "@lib/hooks/useFavorites"
import {HTMLAttributes} from "react"
import {HeartIcon} from "@heroicons/react/24/outline"
import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

type Props = HTMLAttributes<HTMLButtonElement> & Favorite

const FavoriteButton = ({uuid, title, path, units, ...props}: Props) => {
  const {favs, toggleFav} = useFavorites()
  const isFavorite = favs.some(fav => fav.uuid === uuid)

  return (
    <button
      {...props}
      onClick={() => toggleFav(uuid, title, path, units)}
      type="button"
      role="switch"
      aria-checked={isFavorite}
      className={twMerge(
        "hocus-visible:outline-3 rounded-full border-2 border-transparent hocus-visible:outline hocus-visible:outline-spirited-dark",
        props.className
      )}
    >
      <span className="sr-only">{isFavorite ? `Remove favorite "${title}"` : `Add favorite "${title}"`}</span>
      <HeartIcon width={30} className={clsx("text-spirited-dark", {"fill-spirited-dark": isFavorite})} />
    </button>
  )
}

export default FavoriteButton
