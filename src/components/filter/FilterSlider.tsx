"use client";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { Transition } from "@headlessui/react";
import { DisclosureIndex } from "../ui/Disclosure";

export default function FilterSlider() {
  const { openFilter, setOpenFilter } = useFilterContext();
  const { categories } = useCategoryContext();

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
          openFilter ? "" : "-translate-x-56"
        }`}
      >
        <div className={`w-56 bg-white min-h-screen`}>
          <div className="flex flex-col w-full border-b">
            <DisclosureIndex
              title={"Categorías"}
              child={
                <>
                  {categories.map((category) => (
                    <div key={category.id} className="relative hover:underline">
                      <p className="font-medium text-gray-900 ">
                        {capitalizeFirstLetter(category.attributes.name)}
                        {` (${category.attributes.products.data.length})`}
                      </p>
                      {/* <button
                        onClick={() => {
                          filterProductsByCategoryId(category.id),
                            setResultText(category.attributes.name);
                        }}
                        className="absolute inset-0 w-full"
                      ></button> */}
                    </div>
                  ))}
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
