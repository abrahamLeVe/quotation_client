"use client";
import { BrandInterface } from "@/models/brand";
import { CategoryInterface } from "@/models/category.model";
import { ColorInterface } from "@/models/colors.model";
import { createContext, useContext, useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface CategoryContext {
  categories: CategoryInterface[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;
  brands: BrandInterface[];
  setBrands: React.Dispatch<React.SetStateAction<BrandInterface[]>>;
  colors: ColorInterface[];
  setColors: React.Dispatch<React.SetStateAction<ColorInterface[]>>;
}

const CategoryContext = createContext({} as CategoryContext);

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [colors, setColors] = useState<ColorInterface[]>([]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,

        brands,
        setBrands,

        setColors,
        colors,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
