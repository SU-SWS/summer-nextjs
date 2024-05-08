"use client";

import { useCallback } from "react";
import { useLocalStorage, useIsClient } from "usehooks-ts";

const useFavorites = (): {
  favs: string[];
  addFav: (_uuid: string) => void;
  removeFav: (_uuid: string) => void;
} => {
  const isClient = useIsClient();
  const [favs, setFavs] = useLocalStorage<string[]>("favorites", [], { initializeWithValue: false });

  const addFav = useCallback(
    (uuid: string) => {
      setFavs([...favs, uuid ]);
    },
    [favs, setFavs]
  );

  const removeFav = useCallback(
    (uuid: string) => {
      const updatedFavs = favs.filter((fav) => fav !== uuid);
      setFavs(updatedFavs);
    },
    [favs, setFavs]
  );

  return { favs: isClient ? favs : [], addFav, removeFav };
};

export default useFavorites;
