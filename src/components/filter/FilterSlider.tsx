"use client";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { Transition } from "@headlessui/react";
import CategoryList from "../category/CategoryList";
import { DisclosureIndex } from "../ui/Disclosure";
import BrandList from "../brand/BrandList";
import { Suspense } from "react";
export default function FilterSlider() {
  const { openFilter, setOpenFilter } = useFilterContext();
  const { getCategories, getBrands } = useCategoryContext();

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
              child={
                <Suspense fallback={<>Cargando...</>}>
                  <CategoryList />
                </Suspense>
              }
            />

            <DisclosureIndex
              title={"Marcas"}
              getData={getBrands}
              child={
                <Suspense fallback={<>Cargando...</>}>
                  <BrandList />
                </Suspense>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
