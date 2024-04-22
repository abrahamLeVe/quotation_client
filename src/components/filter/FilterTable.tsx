"use client";
import { ProductInterface, ProductsInterface } from "@/models/products.model";
import { Suspense, useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Search from "@/components/ui/search-filter";
import { useProductContext } from "@/context/product.context";
import dynamic from "next/dynamic";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

const ProductsTableSkeleton = dynamic(
  () => import("../skeleton/product/ProductSkeleton")
);

const ProductCard = dynamic(() => import("../product/ProductCard"), {
  ssr: false,
});

const EmptyCartMessage = dynamic(
  () => import("../cart/message/EmptyCartMessage"),
  {
    ssr: false,
  }
);

export default function ProductTable({
  products,
  name,
}: {
  products?: ProductsInterface;
  name: string;
}) {
  const { setIsOpen } = useProductContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [ratingRange, setRatingRange] = useState<[number, number]>([1, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (products) {
      const filtered = products.data.filter((product) => {
        const rating = product.attributes.rating;
        return rating >= ratingRange[0] && rating <= ratingRange[1];
      });

      if (sortOrder === "asc") {
        filtered.sort((a, b) =>
          a.attributes.name.localeCompare(b.attributes.name)
        );
      } else if (sortOrder === "desc") {
        filtered.sort((a, b) =>
          b.attributes.name.localeCompare(a.attributes.name)
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, ratingRange, sortOrder]);

  const renderSortSelector = () => (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="sort-selector dark:text-black"
    >
      <option value="">Sin orden</option>
      <option value="asc">Alfabético Ascendente</option>
      <option value="desc">Alfabético Descendente</option>
    </select>
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <Separator className="my-0" />
      {products === undefined ? (
        <>
          <Suspense>
            <Search placeholder={`Buscar por ${name}`} title={`${name}: `} />
          </Suspense>
          <ProductsTableSkeleton />
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-5">
            <Suspense>
              <Search placeholder={`Buscar por ${name}`} title={`${name}: `} />
            </Suspense>
            <Card className="flex flex-col w-full items-center justify-center md:w-3/4 ">
              <CardContent className="flex flex-row flex-wrap w-full justify-between  gap-6 p-4">
                <div className="w-full md:w-[40%] flex flex-col gap-3">
                  <label>Filtrar por popularidad 1 - 5</label>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={ratingRange}
                    onValueChange={(range: [number, number]) =>
                      setRatingRange(range)
                    }
                  />
                </div>
                <div className="flex justify-between items-center">
                  {renderSortSelector()}
                </div>
                <Button onClick={() => setIsOpen(true)} title="Filtro">
                  <IoFilterSharp className="h-6 w-6" /> Filtro
                </Button>
              </CardContent>
            </Card>
          </div>
          {products.data.length > 0 ? (
            <>
              <div className="inline-block min-h-screen min-w-full align-middle">
                <div className="pagination-info min-w-48">
                  Página {currentPage} de{" "}
                  {Math.ceil(filteredProducts.length / productsPerPage)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col justify-between relative text-sm"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (currentPage > 1) {
                          paginate(currentPage - 1);
                        }
                      }}
                    />
                  </PaginationItem>
                  {Array.from(
                    {
                      length: Math.ceil(
                        filteredProducts.length / productsPerPage
                      ),
                    },
                    (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              currentPage === index + 1
                                ? "blue"
                                : "transparent",
                            color:
                              currentPage === index + 1
                                ? "black dark:white"
                                : "black dark:white ",
                          }}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          currentPage <
                          Math.ceil(filteredProducts.length / productsPerPage)
                        ) {
                          paginate(currentPage + 1);
                        }
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <EmptyCartMessage
              title="Sin resultados"
              description="Buscar en todos nustros productos"
            />
          )}
        </>
      )}
    </div>
  );
}
