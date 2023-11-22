"use client";
import { FilterActions } from "@/components/filter/FilterSelect";
import { ProductInterface } from "@/models/products.model";
import { removeDiacritics } from "@/utilities/utils";
import { createContext, useContext, useState } from "react";
import { useProductContext } from "./product.context";

interface FilterProviderProps {
  children: React.ReactNode;
}

interface FilterContext {
  filterProducts: (query: string) => void;
  cleanFilter: () => void;
  productsFilter: ProductInterface[];
  query: string[];
  setQuery: React.Dispatch<React.SetStateAction<string[]>>;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  filterByPrice: (price: string) => void;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  selected: { id: string; name: string };
  setSelected: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
  sortAlphabetically: () => void;
  sortByDateNewest: () => void;
  sortByRating: () => void;
  filterDiscountedProducts: () => void;
  allProducts: () => void;
  filterProductsByCategoryId: (id: number) => void;
  resultText: string;
  setResultText: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = createContext({} as FilterContext);

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }: FilterProviderProps) {
  const { products } = useProductContext();
  const [productsFilter, setProductsFilter] = useState<ProductInterface[]>([]);
  const [query, setQuery] = useState<string[]>([]);
  const [resultText, setResultText] = useState<string>("Sin resultados.");
  const [isListening, setIsListening] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selected, setSelected] = useState(FilterActions[0]);

  let currentResults: ProductInterface[] = [];

  function filterProducts(speechResult: string): void {
    const cleanedQuery = processQuery(speechResult);
    if (cleanedQuery.length === 0) {
      cleanFilter();
      return;
    }
    console.log(cleanedQuery);
    const categoryMatches = filterByCategory(cleanedQuery);
    const everyMatch = filterByEvery(cleanedQuery);
    const keywordMatches = filterByKeywords(cleanedQuery);
    const everyDescriptionMatches = filterByEveryDescription(cleanedQuery);
    const keywordDescriptionMatches = filterByKeywordDescription(cleanedQuery);

    const combinedResults: ProductInterface[] = [
      ...categoryMatches,
      ...everyMatch,
      ...keywordMatches,
      ...everyDescriptionMatches,
      ...keywordDescriptionMatches,
    ];

    currentResults = Array.from(
      new Set([...currentResults, ...combinedResults])
    );
    setProductsFilter(currentResults);
  }

  function processQuery(speechResult: string): string[] {
    setResultText(speechResult);
    cleanFilter();

    const firstFilter = removeDiacritics(speechResult.toLowerCase());
    const keywords = firstFilter
      .replace(/[.,]/g, "")
      .slice(0, 50)
      .split(" ")
      .filter((word) => !wordsExclude.has(word));

    return keywords
      .map((word) => word.replace(/s$|es$/, ""))
      .filter((element) => element.length >= 3);
  }

  function filterByCategory(query: string[]): ProductInterface[] {
    return products.filter((product) => {
      const productCategories = product.attributes.categories.data.map(
        (category) => removeDiacritics(category.attributes.name.toLowerCase())
      );
      return query.some((keyword) =>
        productCategories.some((category) => category.includes(keyword))
      );
    });
  }

  function filterProductsByCategoryId(categoryId: number) {
    cleanFilter();
    setProductsFilter(
      products?.filter((product) => {
        return product.attributes.categories.data.some(
          (category) => category.id === categoryId
        );
      })
    );
  }

  function filterByEvery(query: string[]): ProductInterface[] {
    return products.filter((product) => {
      const productName = removeDiacritics(
        product.attributes.name.toLowerCase()
      );

      return query.every((keyword) => productName.includes(keyword));
    });
  }

  function filterByEveryDescription(query: string[]): ProductInterface[] {
    return products.filter((product) => {
      const productName = removeDiacritics(
        product.attributes.description.toLowerCase()
      );

      return query.every((keyword) => productName.includes(keyword));
    });
  }

  function filterByKeywordDescription(query: string[]): ProductInterface[] {
    return products.filter((product) => {
      const productName = removeDiacritics(
        product.attributes.description.toLowerCase()
      );

      return query.some((keyword) => productName.includes(keyword));
    });
  }

  function filterByKeywords(query: string[]): ProductInterface[] {
    return products.filter((product) => {
      const productName = removeDiacritics(
        product.attributes.name.toLowerCase()
      );

      return query.some((keyword) => productName.includes(keyword));
    });
  }

  function filterByPrice(price: string) {
    const minPrice = parseFloat(price);

    const filteredProducts = products
      .filter((product) => product.attributes.price >= minPrice)
      .sort((a, b) => a.attributes.price - b.attributes.price);

    const maxPrice = filteredProducts.reduce(
      (max, product) => Math.max(max, product.attributes.price),
      0
    );
    cleanFilter();

    setProductsFilter(filteredProducts);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);

    setResultText("min-$" + minPrice.toFixed() + " max-$" + maxPrice.toFixed());
  }

  function sortAlphabetically() {
    setProductsFilter(
      products
        .slice()
        .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
    );
  }

  function filterDiscountedProducts() {
    setProductsFilter(
      products.filter((product) => product.attributes.discount > 0)
    );
  }

  function allProducts() {
    setProductsFilter(products);
  }

  function sortByDateNewest() {
    setProductsFilter(
      products
        .slice()
        .sort(
          (a, b) =>
            new Date(b.attributes.updatedAt).getTime() -
            new Date(a.attributes.updatedAt).getTime()
        )
    );
  }

  function sortByRating() {
    setProductsFilter(
      products.slice().sort((a, b) => b.attributes.rating - a.attributes.rating)
    );
  }

  function cleanFilter(): void {
    currentResults = [];
    setQuery([]);
    setProductsFilter([]);
    setSelected(FilterActions[0]);
    setMinPrice(0);
  }

  return (
    <FilterContext.Provider
      value={{
        filterProducts,
        cleanFilter,
        productsFilter,
        query,
        setQuery,
        isListening,
        setIsListening,
        filterByPrice,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selected,
        setSelected,
        sortAlphabetically,
        sortByDateNewest,
        sortByRating,
        filterDiscountedProducts,
        allProducts,
        filterProductsByCategoryId,
        resultText,
        setResultText,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const wordsExclude = new Set([
  "a",
  "aquella",
  "aquellas",
  "aquellos",
  "aquí",
  "ayudame",
  "ayúdame",
  "b",
  "bien",
  "búscame",
  "busca",
  "buscar",
  "buscame",
  "c",
  "categoria",
  "categoría",
  "categorias",
  "categorías",
  "chiste",
  "como",
  "con",
  "cuál",
  "cuales",
  "cuando",
  "cuánto",
  "cuentame",
  "cuéntame",
  "d",
  "de",
  "del",
  "desde",
  "dia",
  "donde",
  "dos",
  "e",
  "el",
  "en",
  "encuentra",
  "entre",
  "eres",
  "es",
  "este",
  "esto",
  "estos",
  "estan",
  "f",
  "g",
  "h",
  "hasta",
  "hoy",
  "i",
  "j",
  "k",
  "l",
  "la",
  "le",
  "lo",
  "los",
  "m",
  "mas",
  "menos",
  "mismo",
  "nada",
  "nadie",
  "ni",
  "ningun",
  "ninguna",
  "ningunas",
  "ningunos",
  "ningunos",
  "ningunas",
  "ningunos",
  "nunca",
  "o",
  "otra",
  "otras",
  "otros",
  "p",
  "par",
  "para",
  "pero",
  "por",
  "puede",
  "pueden",
  "pues",
  "producto",
  "productos",
  "puedes",
  "q",
  "que",
  "quien",
  "quién",
  "saber",
  "se",
  "si",
  "sobre",
  "solo",
  "son",
  "su",
  "sus",
  "t",
  "tal",
  "también",
  "tambien",
  "tanto",
  "tiempo",
  "todo",
  "trabaja",
  "trabajar",
  "trabajo",
  "tu",
  "tus",
  "u",
  "una",
  "un",
  "v",
  "vende",
  "vendes",
  "vez",
  "w",
  "x",
  "y",
  "z",
]);
