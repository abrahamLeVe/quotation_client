"use client";
import { getDataCategory } from "@/app/services/category.service";
import { CategoryInterface } from "@/models/category.model";
import { createContext, useContext, useEffect, useState } from "react";

interface CategoryProviderProps {
  children: React.ReactNode;
}

interface CategoryContext {
  categories: CategoryInterface[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;
}

const CategoryContext = createContext({} as CategoryContext);

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDataCategory();
        if (data) {
          console.log("into usereffect getcategorydata ", data);
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
