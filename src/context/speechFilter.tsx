"use client";
import { ProductNAInterface } from "@/models/newArrivals.model";
import productStorage from "@/store/product.store";
import { ReactNode, createContext, useContext, useState } from "react";

interface SpeechFilterProviderProps {
  children: ReactNode;
}

interface SpeechFilterContext {
  filterProducts: (query: string) => void;
  cleanFilter: () => void;
  products: ProductNAInterface[];
  query: string[];
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  filterByPrice: (price: string) => void;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const SpeechFilterContext = createContext({} as SpeechFilterContext);

export function useSpeechFilter() {
  return useContext(SpeechFilterContext);
}

export function SpeechFilterProvider({ children }: SpeechFilterProviderProps) {
  const productsStare = productStorage((state) => state.productState);
  const [products, setProducts] = useState<ProductNAInterface[]>([]);
  const [query, setQuery] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  function filterProducts(speechResult: string) {
    const keywords = speechResult
      .replace(/[.,]/g, "")
      .slice(0, 50)
      .toLowerCase()
      .split(" ")
      .filter((word) => !wordsExclude.has(word));

    const cleanedQuery = keywords.filter(
      (element) => element.trim() !== "" && element.trim().length >= 3
    );

    if (cleanedQuery.length === 0) {
      cleanFilter();
      return;
    }

    console.log(cleanedQuery);

    const everyMatch = productsStare.data.filter((product) => {
      const productName = product.attributes.name.toLowerCase();
      return cleanedQuery.every((keyword) => productName.includes(keyword));
    });

    if (everyMatch.length > 0) {
      redirectFilter(everyMatch, cleanedQuery);
      return;
    }

    const someMatch = productsStare.data.filter((product) => {
      const productName = product.attributes.name.toLowerCase();
      return cleanedQuery.some((keyword) => productName.includes(keyword));
    });

    redirectFilter(someMatch, cleanedQuery);
  }

  function redirectFilter(filterMach: ProductNAInterface[], query: string[]) {
    setProducts(filterMach);
    setQuery(query);
  }

  function cleanFilter() {
    setProducts([]);
    setQuery([]);
    return;
  }

  function filterByPrice(price: string) {
    const minPrice = parseFloat(price);

    const filteredProducts = productsStare.data
      .filter((product) => product.attributes.price >= minPrice)
      .sort((a, b) => a.attributes.price - b.attributes.price);

    // Calcula el valor máximo de precio
    const maxPrice = filteredProducts.reduce(
      (max, product) => Math.max(max, product.attributes.price),
      0
    );

    // Actualiza el estado
    setProducts(filteredProducts);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);

    // Actualiza la query
    setQuery([
      "Precio: min-$" + minPrice.toFixed(),
      "max-$" + maxPrice.toFixed(),
    ]);
  }

  return (
    <SpeechFilterContext.Provider
      value={{
        filterProducts,
        products,
        query,
        isListening,
        setIsListening,
        cleanFilter,
        filterByPrice,
        maxPrice,
        minPrice,
        setMaxPrice,
        setMinPrice,
      }}
    >
      {children}
    </SpeechFilterContext.Provider>
  );
}

export const wordsExclude = new Set([
  "a",
  "b",
  "búscame",
  "busca",
  "buscar",
  "c",
  "categoría",
  "categorías",
  "cómo",
  "con",
  "d",
  "de",
  "del",
  "e",
  "el",
  "en",
  "encuentra",
  "es",
  "están",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "la",
  "le",
  "lo",
  "los",
  "m",
  "mi",
  "n",
  "no",
  "o",
  "p",
  "para",
  "producto",
  "productos",
  "por",
  "q",
  "quien eres",
  "r",
  "s",
  "se",
  "t",
  "u",
  "una",
  "un",
  "v",
  "vende",
  "vendes",
  "w",
  "x",
  "y",
  "z",
  "aquel",
  "aquella",
  "aquellas",
  "aquellos",
  "aqui",
  "bien",
  "como",
  "cuál",
  "cuáles",
  "cuándo",
  "cuánto",
  "desde",
  "donde",
  "dos",
  "este",
  "esto",
  "estos",
  "hasta",
  "hoy",
  "mas",
  "menos",
  "mismo",
  "nada",
  "nadie",
  "ni",
  "ningún",
  "ninguna",
  "ningunas",
  "ningunos",
  "nunca",
  "otra",
  "otras",
  "otros",
  "pero",
  "puede",
  "pueden",
  "pues",
  "que",
  "quien",
  "saber",
  "si",
  "sí",
  "sobre",
  "solo",
  "son",
  "su",
  "sus",
  "tal",
  "también",
  "tanto",
  "tiene",
  "tiempo",
  "todo",
  "trabaja",
  "trabajar",
  "trabajo",
  "tu",
  "tus",
  "vez",
]);
