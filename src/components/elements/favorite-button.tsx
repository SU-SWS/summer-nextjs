"use client";
import useFavorites from "@lib/hooks/useFavorites";
import { HTMLAttributes } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { useIsClient } from "usehooks-ts";

type Props = HTMLAttributes<HTMLButtonElement> & {
  uuid: string;
  title: string;
  path: string; 
  units: number;
};

const FavoriteButton = ({ uuid, title, path, units, ...props }: Props) => {
  const { favs, addFav, removeFav } = useFavorites();
  const isFavorite = favs.some((fav) => fav.uuid === uuid);

  const onClick = () => {
    isFavorite ? removeFav(uuid) : addFav(uuid, title, path, units);
  };

  // No need to add the button on the server, but also it doesn't show initial state correctly for some reason.
  if (!useIsClient()) return null;

  return (
    <button onClick={onClick} role="switch" aria-checked={isFavorite} {...props}>
      <HeartIcon
        width={30}
        className={clsx("text-spirited-dark", { "fill-spirited-dark": isFavorite })}
      />
      <span className="sr-only">Add/Remove &quot;{title}&quot; from favorites</span>
    </button>
  );
};

export default FavoriteButton;