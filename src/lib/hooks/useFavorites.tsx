"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Favorite = {
  uuid: string;
  title: string;
  path: string; 
  units: number;
};

const useFavorites = (): {
  favs: Favorite[];
  addFav: (_uuid: string, _title: string, _path: string, _units: number) => void;
  removeFav: (_uuid: string) => void;
} => {
  const [favs, setFavs] = useLocalStorage<Favorite[]>("favorites", [], {initializeWithValue: false});

  const addFav = useCallback(
    (uuid: string, title: string, path: string, units: number) => {
      setFavs([...favs, { uuid, title, path, units }]);
    },
    [favs, setFavs]
  );

  const removeFav = useCallback(
    (uuid: string) => {
      const updatedFavs = favs.filter((fav) => fav.uuid !== uuid);
      setFavs(updatedFavs);
    },
    [favs, setFavs]
  );

  return { favs, addFav, removeFav };
};

export default useFavorites;
