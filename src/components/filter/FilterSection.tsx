"use client";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import { capitalizeFirstLetter } from "@/utilities/utils";
import { AiOutlineClear } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CartButton } from "../product/ProductCard";
import { DisclosureIndex } from "../ui/Disclosure";

export default function FilterSection() {
  const {
    filterProducts,
    cleanFilter,
    filterByPrice,
    minPrice,
    maxPrice,
    filterProductsByCategoryId,
    query,
    setQuery,
    setResultText,
  } = useFilterContext();
  const { categories } = useCategoryContext();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value.replace(/\s{2,}/g, " ");
    filterProducts(inputText);
    setQuery([inputText]);
  };

  return (
    <div className="lg:sticky top-0">
      <div className="flex flex-col min-w-[320px] h-full p-5 border-r-2 gap-3">
        <div className="flex gap-2 items-end">
          <div>
            <label
              htmlFor="query"
              className="text-lg font-bold tracking-tight text-gray-900 pb-3"
            >
              Buscador de productos
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <BsSearch
                  className="h-3 w-3 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <input
                onChange={handleFilterChange}
                value={query}
                placeholder="Anillo, billetera, reloj, auriculares"
                maxLength={50}
                type="text"
                name="query"
                id="query"
                className="block w-full rounded-md border-0 py-2 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              />
            </div>
          </div>

          <div title="Limpiar">
            <CartButton
              onClick={cleanFilter}
              icon={<AiOutlineClear className="text-gray-600" />}
              className="max-w-[42px]"
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-3">
          <h3 className="text-lg font-bold text-gray-900">
            Filtrar por precio
          </h3>
          <label htmlFor="range">Precio a partir de:</label>
          <input
            type="range"
            id="range"
            name="range"
            min="0"
            max={maxPrice}
            onChange={(event) => filterByPrice(event.target.value)}
            className="block w-full appearance-none bg-gray-400 h-4 rounded-lg overflow-hidden outline-none"
          />
          <div className="flex justify-between text-gray-600">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

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
                    <button
                      onClick={() => {
                        filterProductsByCategoryId(category.id),
                          setResultText(category.attributes.name);
                      }}
                      className="absolute inset-0 w-full"
                    ></button>
                  </div>
                ))}
              </>
            }
          />
        </div>
        <div className="flex flex-col w-full border-b">
          <DisclosureIndex title={"Marcas"} child={<>Trabajando en ello</>} />
        </div>
        <div className="flex flex-col w-full border-b">
          <DisclosureIndex title={"Medidas"} child={<>Trabajando en ello</>} />
        </div>
      </div>
    </div>
  );
}
