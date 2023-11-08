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

  function filterProducts(speechResult: string) {
    if (speechResult.length < 4) {
      setProducts([]);
      return;
    }

    const trimmedSpeechResult = speechResult.trim();

    if (trimmedSpeechResult !== "") {
      const keywords = trimmedSpeechResult
        .toLowerCase()
        .split(" ")
        .filter((word) => !wordsExclude.has(word));

      const everyMatch = productsStare.data.filter((product) => {
        const productName = product.attributes.name.toLowerCase();
        return keywords.every((keyword) => productName.includes(keyword));
      });

      if (everyMatch.length > 0) {
        redirectFilter(everyMatch, keywords);
        return;
      }

      const someMatch = productsStare.data.filter((product) => {
        const productName = product.attributes.name.toLowerCase();
        return keywords.some((keyword) => productName.includes(keyword));
      });

      redirectFilter(someMatch, keywords);
    } else {
      // Aquí puedes manejar el caso de entrada vacía (puedes mostrar un mensaje o simplemente no hacer nada)
    }
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

  return (
    <SpeechFilterContext.Provider
      value={{
        filterProducts,
        products,
        query,
        isListening,
        setIsListening,
        cleanFilter,
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
  "r",
  "s",
  "se",
  "t",
  "u",
  "una",
  "un",
  "v",
  "vende",
  "w",
  "x",
  "y",
  "z",
]);
