"use client";
import { readText, wordsExclude } from "@/hooks/useSpeech";
import { ProductNAInterface } from "@/models/newArrivals.model";
import productStorage from "@/store/product.store";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

interface SpeechFilterProviderProps {
  children: ReactNode;
}

interface SpeechFilterContext {
  filterProducts: (query: string) => void;
  products: ProductNAInterface[];
  query: string[];
}

const SpeechFilterContext = createContext({} as SpeechFilterContext);

export function useSpeechFilter() {
  return useContext(SpeechFilterContext);
}

export function SpeechFilterProvider({ children }: SpeechFilterProviderProps) {
  const productsStare = productStorage((state) => state.productState);
  const [products, setProducts] = useState<ProductNAInterface[]>([]);
  const [query, setQuery] = useState<string[]>([]);

  const router = useRouter();

  function filterProducts(speechResult: string) {
    const keywords = speechResult
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
  }

  function redirectFilter(filterMach: ProductNAInterface[], query: string[]) {
    let message = "No se encontraron resultados de: " + query;

    if (filterMach.length > 0) {
      message = "Estos son los resultados de: " + query;
    }
    setProducts(filterMach);
    setQuery(query);
    router.push("/filter", { scroll: true });
    readText(message);
  }

  return (
    <SpeechFilterContext.Provider
      value={{
        filterProducts,
        products,
        query,
      }}
    >
      {children}
    </SpeechFilterContext.Provider>
  );
}
