"use client";
import { useFilterContext } from "@/context/filter.context";
import { ProductsInterface } from "@/models/products.model";
import { IoFilterSharp } from "react-icons/io5";
import ProductCard from "../product/ProductCard";
import { Button } from "../ui/button";

export default function ProductTable({
  products,
}: {
  products?: ProductsInterface;
}) {
  const { setOpenFilter } = useFilterContext();

  return (
    <>
      <div className="flex justify-end items-center gap-3 flex-row">
        <Button onClick={() => setOpenFilter(true)} title="Filtro">
          <IoFilterSharp className="h-6 w-6" /> Filtro
        </Button>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {products?.data?.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between relative text-sm"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
