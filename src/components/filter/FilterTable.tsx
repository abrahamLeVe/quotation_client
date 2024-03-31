"use client";
import { useState, useEffect } from "react";
import { IoFilterSharp } from "react-icons/io5";
import ProductCard from "../product/ProductCard";
import { ProductsInterface, ProductInterface } from "@/models/products.model";
import { Slider } from "../ui/slider"; // Importa el componente Slider
import { useFilterContext } from "@/context/filter.context";
import { Button } from "../ui/button";

export default function ProductTable({
  products,
}: {
  products?: ProductsInterface;
}) {
  const { setOpenFilter } = useFilterContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [ratingRange, setRatingRange] = useState<[number, number]>([1, 5]); // Estado para almacenar el rango de rating

  useEffect(() => {
    if (products) {
      // Filtra los productos según el rango de rating seleccionado
      const filtered = products.data.filter((product) => {
        const rating = product.attributes.rating;
        return rating >= ratingRange[0] && rating <= ratingRange[1];
      });

      setFilteredProducts(filtered);
    }
  }, [products, ratingRange]); // Actualiza los productos filtrados cuando cambia el rango de rating

  return (
    <>
      <div className="flex justify-end items-center gap-3 flex-row">
        <Slider
          min={1}
          max={5}
          step={1}
          value={ratingRange}
          onValueChange={(range: [number, number]) => setRatingRange(range)} // Actualiza el estado del rango de rating cuando se mueve el slider
        />
        <Button onClick={() => setOpenFilter(true)} title="Filtro">
          <IoFilterSharp className="h-6 w-6" /> Filtro
        </Button>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {filteredProducts.map((product) => (
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
