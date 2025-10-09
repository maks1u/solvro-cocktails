"use client";

import type { Cocktail } from "~/schemas/api";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export default function CocktailCard({ cocktailData }: { cocktailData: Cocktail }) {
  const [isAnotherSide, changeSide] = useState(true);
  const [isFavorite, changeFavorite] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const actualFavorites = favorites.split(",").filter(Boolean);
      changeFavorite(actualFavorites.includes(cocktailData.id.toString()));
    }
  }, [cocktailData.id]);

  const addFavorite = () => {
    const favorites = localStorage.getItem("favorites");
    let actualFavorites: string[] = favorites ? favorites.split(",").filter(Boolean) : [];

    if (isFavorite) {
      actualFavorites = actualFavorites.filter(fav => fav !== cocktailData.id.toString());
    } else {
      actualFavorites.push(cocktailData.id.toString());
    }

    localStorage.setItem("favorites", actualFavorites.join(","));
    changeFavorite(!isFavorite);
  };

  return (
    <div
      className={`${isAnotherSide ? "" : "hover:cursor-pointer"} relative z-10 flex flex-col max-lg:w-full lg:w-[44%] xl:w-[30%] bg-b-dark pt-3 pb-2 px-2 overflow-hidden rounded-lg border-1 border-midnight hover:scale-105 transition-all duration-400 drop-shadow-midnight/0 hover:drop-shadow-midnight/10 drop-shadow-xl`}
      onClick={() => {
        if (!isAnotherSide) changeSide(!isAnotherSide);
      }}
    >
      <Image
        loader={({ src }) => src}
        src={cocktailData.imageUrl}
        alt={cocktailData.name + "'s zdjęcie"}
        className={`absolute inset-0 w-full h-full object-cover ${isAnotherSide ? "brightness-50 blur-sm" : "blur-xl"} opacity-10`}
        width={100}
        height={100}
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        {isAnotherSide ? (
          <>
            <div>
              <div className={"flex flex-row items-start justify-between"}>
                <div>
                  <p className="font-light">
                    Name: <span className="font-medium">{cocktailData.name}</span>
                  </p>
                  <p className="font-light">
                    Category: <span className="font-medium">{cocktailData.category}</span>
                  </p>
                </div>
                <div>
                  {isFavorite ? (
                    <IoIosHeart className="text-2xl hover:cursor-pointer" onClick={addFavorite} />
                  ) : (
                    <IoIosHeartEmpty className="text-2xl hover:cursor-pointer" onClick={addFavorite} />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 my-2 text-sm">
                <div className="bg-dark/50 rounded-lg border-1 border-midnight/60 py-0.5 px-2 ">
                  #{cocktailData.id}
                </div>
                <div className="bg-dark/50 rounded-lg border-1 border-midnight/60 py-0.5 px-2">
                  {cocktailData.glass}
                </div>
                {cocktailData.alcoholic && (
                  <div className="bg-dark/50 rounded-lg border-1 border-midnight/60 py-0.5 px-2">
                    Alcoholic
                  </div>
                )}
              </div>
              <p className="font-light text-md text-justify text-pretty">{cocktailData.instructions}</p>
            </div>
            <div className={"w-full flex flex-row justify-end"}>
              <button
                className={"text-right font-medium border-b-1 border-b-midnight border-midnight/0 border-1 py-0.5 px-2 hover:border-midnight hover:cursor-pointer transition-all duration-300"}
                onClick={() => changeSide(!isAnotherSide)}
              >
                Zobacz zdjęcie
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-between">
              <p className="text-xl font-medium">{cocktailData.name}</p>
              <p className="text-md font-light">#{cocktailData.id}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 my-2 text-sm">
              <div className="bg-dark rounded-lg border-1 border-midnight/60 py-0.5 px-2">
                {cocktailData.glass}
              </div>
              {cocktailData.alcoholic && (
                <div className="bg-dark rounded-lg border-1 border-midnight/60 py-0.5 px-2">
                  Alcoholic
                </div>
              )}
            </div>
            <Image
              loader={({ src }) => src}
              src={cocktailData.imageUrl}
              alt={cocktailData.name + "'s zdjęcie"}
              className="h-auto mx-auto"
              width={700}
              height={700}
            />
          </>
        )}
      </div>
    </div>
  );
}