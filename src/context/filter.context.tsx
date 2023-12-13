"use client";
import { FilterActions } from "@/components/filter/FilterSelect";
import { ProductInterface, ProductsInterface } from "@/models/products.model";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [originalProducts, setOriginalProducts] = useState<ProductInterface[]>(
    []
  );

  useEffect(() => {
    if (productsFilter?.data) {
      const allPrices = productsFilter.data.flatMap((product) =>
        product.attributes.prices.data.map((price) => price.attributes.value)
      );
      const min = Math.min(...allPrices);
      const max = Math.max(...allPrices);
      setMinPrice(min);
      setMaxPrice(max);
    }
    return;
  }, [productsFilter]);

  function filterByPrice(price: string) {
    const newMinPrice = parseFloat(price);

    if (newMinPrice > maxPrice) {
      setMinPrice(newMinPrice);
      setMaxPrice(newMinPrice);
    }

    const currentOriginalProducts = originalProducts.length
      ? originalProducts
      : [...productsFilter?.data!];
    setOriginalProducts(currentOriginalProducts);

    const filteredProducts = currentOriginalProducts
      .filter((product) =>
        product.attributes.prices.data.some(
          (price) => price.attributes.value >= newMinPrice
        )
      )
      .sort((a, b) => {
        const priceA = Math.min(
          ...a.attributes.prices.data.map((price) => price.attributes.value)
        );
        const priceB = Math.min(
          ...b.attributes.prices.data.map((price) => price.attributes.value)
        );

        return priceA - priceB;
      });

    setProductsFilter({ ...productsFilter, data: filteredProducts });
    setSelected(FilterActions[0]);
  }

  function sortAlphabetically() {
    if (productsFilter && productsFilter.data) {
      const sortedProducts = productsFilter.data
        .slice()
        .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

      setProductsFilter({
        ...productsFilter,
        data: sortedProducts,
      });
    }
  }

  function filterDiscountedProducts() {
    if (productsFilter && productsFilter.data) {
      const sortedProducts = productsFilter.data.slice().sort((a, b) => {
        const discountA = a.attributes.prices.data.some(
          (price) => price.attributes.discount! > 0
        );
        const discountB = b.attributes.prices.data.some(
          (price) => price.attributes.discount! > 0
        );

        if (discountA && !discountB) {
          return -1;
        } else if (!discountA && discountB) {
          return 1;
        } else {
          return a.attributes.name.localeCompare(b.attributes.name);
        }
      });

      setProductsFilter({
        ...productsFilter,
        data: sortedProducts,
      });
    }
  }

  function allProducts() {
    // setProductsFilter(products);
  }

  function sortByDateNewest() {
    if (productsFilter && productsFilter.data) {
      const sortedProducts = productsFilter.data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.attributes.updatedAt).getTime() -
            new Date(a.attributes.updatedAt).getTime()
        );

      setProductsFilter({
        ...productsFilter,
        data: sortedProducts,
      });
    }
  }

  function sortByRating() {
    if (productsFilter && productsFilter.data) {
      const sortedProducts = productsFilter.data
        .slice()
        .sort((a, b) => b.attributes.rating - a.attributes.rating);
      setProductsFilter({
        ...productsFilter,
        data: sortedProducts,
      });
    }
  }

  function cleanFilter(): void {
    setProductsFilter(undefined);
    setOriginalProducts([]);
    setSelected(FilterActions[0]);
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
