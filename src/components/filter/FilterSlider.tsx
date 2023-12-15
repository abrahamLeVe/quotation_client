"use client";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import DisclosureIndex from "../ui/Disclosure";
const CategoryList = dynamic(() => import("../category/CategoryList"), {
  loading: () => <p>Cargando...</p>,
});
const BrandList = dynamic(() => import("../brand/BrandList"), {
  loading: () => <p>Cargando...</p>,
});
const ColorList = dynamic(() => import("../color/ColorList"), {
  loading: () => <p>Cargando...</p>,
});

export default function FilterSlider() {
  const { openFilter, setOpenFilter } = useFilterContext();
  const { getCategories, getBrands, getColors } = useCategoryContext();

  return (
    <>
      <Transition
        as="div"
        show={openFilter}
        onClick={() => setOpenFilter(false)}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className={"absolute inset-0 bg-black/25 transition-opacity z-20"}
      />

      <div
        className={`absolute top-0 left-0 z-30 transition-transform ${
          openFilter ? "" : "-translate-x-[250px]"
        }`}
      >
        <div className={`w-[250px] bg-white min-h-screen`}>
          <div className="flex flex-col w-full border-b">
            <DisclosureIndex
              title={"Categorías"}
              getData={getCategories}
              child={<CategoryList />}
            />

            <DisclosureIndex
              title={"Marcas"}
              getData={getBrands}
              child={<BrandList />}
            />

            <DisclosureIndex
              title={"Colores"}
              getData={getColors}
              child={<ColorList />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
