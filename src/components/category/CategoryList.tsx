"use client";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { useRouter } from "next/navigation";

export default function CategoryList() {
  const { categories } = useCategoryContext();
  const { setOpenFilter } = useFilterContext();
  const router = useRouter();
  const handleClick = (name: string) => {
    setOpenFilter(false);
    router.push(`/filter/category?query=${name}`);
  };

  return (
    <div className="flex flex-col items-start text-sm">
      {categories.map((category) => (
        <button
          onClick={() => handleClick(category.attributes.name)}
          key={category.id}
          className="relative hover:underline"
        >
          <p className="text-gray-900 ">
            {capitalizeFirstLetter(category.attributes.name)}
            {` (${category.attributes.products.data.length})`}
          </p>
        </button>
      ))}
    </div>
  );
}
