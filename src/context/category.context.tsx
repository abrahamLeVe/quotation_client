"use client";
import { getDataBrand } from "@/app/services/brand.service";
import { getDataCategory } from "@/app/services/category.service";
import { getDataColor } from "@/app/services/color.service";
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
  getCategories: () => Promise<void>;
  getBrands: () => Promise<void>;
  getColors: () => Promise<void>;
}

const CategoryContext = createContext({} as CategoryContext);

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [colors, setColors] = useState<ColorInterface[]>([]);

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

  async function getColors() {
    try {
      const { data } = await getDataColor();
      if (data) {
        setColors(data);
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
        getBrands,
        setColors,
        colors,
        getColors,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
