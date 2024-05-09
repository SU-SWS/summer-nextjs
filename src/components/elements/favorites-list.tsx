"use client";

import useFavorites from "@lib/hooks/useFavorites";
import {HeartIcon} from "@heroicons/react/24/outline";
import {useIsClient} from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/20/solid";


const FavoritesList = () => {
  const { favs, removeFav } = useFavorites();

  const removeFavorite = (uuid: string) => removeFav(uuid);

  // No need to add the button on the server, but also it doesn't show initial state correctly for some reason.
  if (!useIsClient()) return;
  
  return (
    <div>
      {favs.length > 0 ?
        <>
          <ul>
            {favs.map(fav => 
              <li key={fav.uuid}>
                <button type="button" onClick={() => removeFavorite(fav.uuid)}>
                  <XMarkIcon width={24} />
                  <span className="sr-only">Remove &quot;{fav.title}&quot; from favorites</span>
                </button>
                <p>{fav.title}</p>
                <p>Units {fav.units}</p>
              </li>
            )}
          </ul>
          <div>
            Total units 
          </div>
        </>
        :
        <div>
          Your favorites list is empty. Tap the{" "}
          <HeartIcon width={30} className="text-spirited-dark" />{" "}
          icon on courses you’re interested in to see them here. And share them with family and friends.
        </div>
      }
      <div>
        {/* Shareable options: Text, Email, Copy Link */}
      </div>
    </div>
  );
};

export default FavoritesList
