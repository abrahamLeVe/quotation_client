"use client";
import { FilterActions } from "@/components/filter/FilterSelect";
import { ProductsInterface } from "@/models/products.model";
import { createContext, useContext, useState } from "react";

interface FilterProviderProps {
  children: React.ReactNode;
}

interface FilterContext {
  productsFilter: ProductsInterface | undefined;
  setProductsFilter: React.Dispatch<
    React.SetStateAction<ProductsInterface | undefined>
  >;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;

  cleanFilter: () => void;
  query: string[];
  setQuery: React.Dispatch<React.SetStateAction<string[]>>;
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
  const [productsFilter, setProductsFilter] = useState<
    ProductsInterface | undefined
  >(undefined);
  const [isListening, setIsListening] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [query, setQuery] = useState<string[]>([]);
  const [resultText, setResultText] = useState<string>("Sin resultados.");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selected, setSelected] = useState(FilterActions[0]);

  function filterProductsByCategoryId(categoryId: number) {
    cleanFilter();
    // setProductsFilter(
    //   products?.filter((product) => {
    //     return product.attributes.categories.data.some(
    //       (category) => category.id === categoryId
    //     );
    //   })
    // );
  }

  function filterByPrice(price: string) {
    const minPrice = parseFloat(price);

    // const filteredProducts = products
    //   .filter((product) => product.attributes.price >= minPrice)
    //   .sort((a, b) => a.attributes.price - b.attributes.price);

    // const maxPrice = filteredProducts.reduce(
    //   (max, product) => Math.max(max, product.attributes.price),
    //   0
    // );
    // cleanFilter();

    // setProductsFilter(filteredProducts);
    // setMinPrice(minPrice);
    // setMaxPrice(maxPrice);

    // setResultText("min-$" + minPrice.toFixed() + " max-$" + maxPrice.toFixed());
  }

  function sortAlphabetically() {
    // setProductsFilter(
    //   productsFilter
    //     .slice()
    //     .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name))
    // );
  }

  function filterDiscountedProducts() {
    // setProductsFilter(
    //   productsFilter.filter((product) => product.attributes.discount > 0)
    // );
  }

  function allProducts() {
    // setProductsFilter(products);
  }

  function sortByDateNewest() {
    // setProductsFilter(
    //   productsFilter
    //     .slice()
    //     .sort(
    //       (a, b) =>
    //         new Date(b.attributes.updatedAt).getTime() -
    //         new Date(a.attributes.updatedAt).getTime()
    //     )
    // );
  }

  function sortByRating() {
    // setProductsFilter(
    //   productsFilter
    //     .slice()
    //     .sort((a, b) => b.attributes.rating - a.attributes.rating)
    // );
  }

  function cleanFilter(): void {
    // setQuery([]);
    // setProductsFilter([]);
    // setSelected(FilterActions[0]);
    // setMinPrice(0);
  }

  return (
    <FilterContext.Provider
      value={{
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
        openFilter,
        setOpenFilter,
        setProductsFilter,
        isPending,
        setIsPending,
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
  "hechos",
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
