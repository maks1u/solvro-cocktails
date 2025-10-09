"use client"

import {getCocktails} from "~/api/getCocktails";
import {useCallback, useEffect, useState} from "react";

import type {Cocktail, CocktailsApiMeta} from "~/schemas/api";
import CocktailCard from "~/components/CocktailCard";

export default function CocktailsList() {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [listInfo, setListInfo] = useState<CocktailsApiMeta | undefined>(undefined);

  const [isLoading, setLoading] = useState(false);

  const getMoreCocktails = useCallback(async (search: string, reset = false) => {
    if (isLoading) return;
    setLoading(true);

    const page = reset ? 1 : (listInfo ? listInfo.currentPage + 1 : 1);
    const {apiMeta, cocktailsData} = await getCocktails(page, search);
    if (cocktailsData && apiMeta) {
      setCocktails(reset ? cocktailsData : [...cocktails, ...cocktailsData]);
      setListInfo(apiMeta);
    }

    setLoading(false)
  }, [isLoading, listInfo, cocktails])

  useEffect(() => {
    getMoreCocktails("", true).catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim().length > 0) {
        getMoreCocktails(search, true).catch(console.error);
      } else {
        getMoreCocktails("", true).catch(console.error);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className={"pb-2 border-b-1 border-b-cloud flex justify-between"}>
        <h4 className={"text-5xl max-lg:text-2xl"}>Koktajli:</h4>
        <p className={"text-xl max-lg:text-lg"}>
          {listInfo ? `${listInfo.currentPage == listInfo.lastPage ? listInfo.total : listInfo.currentPage * listInfo.perPage}/${listInfo.total}` : (<></>)}
        </p>
      </div>
      <div>
        <input type={"text"}
               className={"transition-all duration-200 focus:bg-snowy focus:outline-none w-full bg-light-blue border-1 border-b-dark text-b-dark rounded-md py-2 px-4 my-2"}
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder={"Wpisz nazwę"}
        />
      </div>
      <div>
        {
          cocktails.length > 0 && listInfo ?
            (
              <>
                <div className={"my-12 flex flex-wrap justify-between gap-y-10"}>
                  {
                    cocktails.map((cocktail, index) => (
                      <CocktailCard cocktailData={cocktail} key={index}/>
                    ))
                  }
                </div>
                {
                  listInfo.currentPage !== listInfo.lastPage ?
                    (
                      <div className={"flex items-center justify-center"}>
                        <button
                          className={`${isLoading ? "disabled cursor-not-allowed brightness-75" : "cursor-pointer hover:brightness-125"} flex text-cloud border-1 border-cloud/60 px-4 py-2 rounded-lg bg-dark transition-all duration-350`}
                          onClick={() => {
                            getMoreCocktails(search, false).catch(console.error)
                          }}
                        >
                          {isLoading ? "Wczytywanie" : "Zobacz więcej"}
                        </button>
                      </div>
                    ) :
                    (<></>)
                }
              </>
            )
            :
            search === "" ?
              (
                <div className={"mt-5 animate-pulse flex items-center justify-center"}>
                  <button
                    className={`${isLoading ? "disabled" : ""} flex text-cloud border-1 border-cloud/60 px-4 py-2 rounded-lg hover:cursor-pointer hover:brightness-125 bg-dark transition-all duration-350`}
                    onClick={() => {
                      getMoreCocktails(search, true).catch(console.error)
                    }}
                  >
                    Wczytywanie
                  </button>
                </div>
              )
              :
              (
                <div className={"flex items-center justify-center mt-5 text-lg"}>
                  Nic nie znaleziono :(
                </div>
              )
        }
      </div>
    </div>
  )
}