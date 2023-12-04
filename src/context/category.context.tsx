"use client";
import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import { BrandInterface } from "@/models/brand";
import { CategoryInterface } from "@/models/category.model";
import { createContext, useContext, useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface CategoryContext {
  categories: CategoryInterface[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;
  brands: BrandInterface[];
  setBrands: React.Dispatch<React.SetStateAction<BrandInterface[]>>;
  getCategories: () => Promise<void>;
  getBrands: () => Promise<void>;
}

const CategoryContext = createContext({} as CategoryContext);

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);

  async function getCategories() {
    try {
      const { data } = await getDataCategory();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getBrands() {
    try {
      const { data } = await getDataBrand();
      if (data) {
        setBrands(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        getCategories,
        brands,
        setBrands,
        getBrands
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
