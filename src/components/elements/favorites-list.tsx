"use client";

import useFavorites from "@lib/hooks/useFavorites";
import {ChatBubbleLeftEllipsisIcon, ClipboardDocumentIcon, EnvelopeIcon, HeartIcon} from "@heroicons/react/24/outline";
import {useIsClient} from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/20/solid";


const FavoritesList = () => {
  const { favs, removeFav } = useFavorites();
  const totalUnits = favs.reduce((totalUnits, item) => totalUnits + item.units, 0);
  const removeFavorite = (uuid: string) => removeFav(uuid);

  // No need to add the button on the server, but also it doesn't show initial state correctly for some reason.
  if (!useIsClient()) return;
  
  return (
    <div className="shadow border pt-12 pb-24 px-24">
      <div className="font-normal type-2 text-center rs-mb-1">Favorites</div>
      {favs.length > 0 ?
        <>
          <ul className="list-none pl-0">
            {favs.map(fav => 
              <li key={fav.uuid} className="flex flex-row items-start gap-5">
                <button type="button" onClick={() => removeFavorite(fav.uuid)}>
                  <XMarkIcon width={24} className="mt-2" />
                  <span className="sr-only">Remove &quot;{fav.title}&quot; from favorites</span>
                </button>
                <p>{fav.title}</p>
                <p>Units {fav.units}</p>
              </li>
            )}
          </ul>
          <div className="border-t border-archway-dark w-full flex">
            <div className="ml-auto mt-3">Total units {totalUnits}</div>
          </div>
        </>
        :
        <div className="pb-20 border-b border-archway-dark">
          Your favorites list is empty. Tap the{" "}
          <HeartIcon width={30} className="text-spirited-dark inline-block" />{" "}
          icon on courses you’re interested in to see them here. And share them with family and friends.
        </div>
      }
      <div className="mt-12 flex flex-row justify-between">
        {/* Shareable options: Text, Email, Copy Link */}
        <button className="flex flex-col items-center hocus:underline">
          <span className="bg-spirited-dark rounded-full p-5 mb-4">
            <ChatBubbleLeftEllipsisIcon width={30} className="text-white" />
          </span>
          Text
        </button>
        <button className="flex flex-col items-center hocus:underline">
          <span className="bg-spirited-dark rounded-full p-5 mb-4">
            <EnvelopeIcon width={30} className="text-white" />
          </span>
          Email
        </button>
        <button className="flex flex-col items-center hocus:underline">
          <span className="bg-spirited-dark rounded-full p-5 mb-4">
            <ClipboardDocumentIcon width={30} className="text-white" />
          </span>
          Copy
        </button>
      </div>
    </div>
  );
};

export default FavoritesList
