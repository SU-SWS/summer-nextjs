"use client";

import useFavorites from "@lib/hooks/useFavorites";
import { ChatBubbleLeftEllipsisIcon, ClipboardDocumentIcon, EnvelopeIcon, HeartIcon} from "@heroicons/react/24/outline";
import {useIsClient} from "usehooks-ts";
import { XMarkIcon } from "@heroicons/react/20/solid";


const ShareButtons = () => {
  const baseUrl = window.location.origin;
  const { favs } = useFavorites();
  const urlParams = `/favorites?fav=${favs.map(fav => `${fav.uuid}:${fav.title}:${fav.units}`).join(",")}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl + urlParams);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy URL: ", error);
      alert("Failed to copy URL. Please try again.");
    }
  };

  const handleSendEmail = () => {
    const subject = "Check out these summer courses!";
    const body = `Here is the link: ${baseUrl + urlParams}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSendSMS = () => {
    const body = `Check out this link: ${window.location.href}`;
    window.location.href = `sms:?body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <button className="flex flex-col items-center hocus:underline" onClick={handleSendSMS}>
        <span className="bg-spirited-dark rounded-full p-5 mb-4">
          <ChatBubbleLeftEllipsisIcon width={30} className="text-white" />
        </span>
        Text
      </button>
      <button className="flex flex-col items-center hocus:underline" onClick={handleSendEmail}>
        <span className="bg-spirited-dark rounded-full p-5 mb-4">
          <EnvelopeIcon width={30} className="text-white" />
        </span>
        Email
      </button>
      <button className="flex flex-col items-center hocus:underline" onClick={handleCopy}>
        <span className="bg-spirited-dark rounded-full p-5 mb-4">
          <ClipboardDocumentIcon width={30} className="text-white" />
        </span>
        Copy
      </button>
    </>
  );
};


const FavoritesList = ({isDisplayOnly = false}) => {
  const { favs, removeFav } = useFavorites();
  const totalUnits = favs.reduce((totalUnits, item) => totalUnits + item.units, 0);
  const removeFavorite = (uuid: string) => removeFav(uuid);

  // No need to add the button on the server, but also it doesn't show initial state correctly for some reason.
  if (!useIsClient()) return;
  
  return (
    <div className="shadow border rs-pt-1 rs-pb-2 rs-px-2">
      <div className="font-normal type-2 text-center rs-mb-1">Favorites List</div>
      {favs.length > 0 ?
        <>
          <ul className="list-none pl-0">
            {favs.map(fav => 
              <li key={fav.uuid} className="flex flex-row items-start gap-5">
                {!isDisplayOnly &&
                  <button type="button" onClick={() => removeFavorite(fav.uuid)} className="group">
                    <XMarkIcon width={24} className="mt-2 group-hocus:text-spirited-dark" />
                    <span className="sr-only">Remove &quot;{fav.title}&quot; from favorites</span>
                  </button>
                }
                <p className="font-roboto text-21">{fav.title}</p>
                <p className="ml-auto shrink-0 text-21">Units {fav.units}</p>
              </li>
            )}
          </ul>
          <div className="border-t border-archway-dark w-full flex pb-12">
            <div className="ml-auto mt-3 text-21">Total units {totalUnits}</div>
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
        <ShareButtons />
      </div>
    </div>
  );
};

export default FavoritesList
