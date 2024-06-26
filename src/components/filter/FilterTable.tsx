"use client";
import { ProductInterface, ProductsInterface } from "@/models/products.model";
import { useEffect, useState } from "react";
import { IoCloseCircle, IoFilterSharp } from "react-icons/io5";

import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import dynamic from "next/dynamic";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

import { useCartContext } from "@/context/cart.context";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Search = dynamic(() => import("../ui/search-filter"));

const CardTable = dynamic(() => import("./CardTable"), {
  ssr: false,
});

const EmptyCartMessage = dynamic(
  () => import("../cart/message/EmptyCartMessage"),
  {
    ssr: false,
  }
);

const FilterTableSkeleton = dynamic(
  () => import("../skeleton/filter/FilterSkeleton"),
  {
    ssr: false,
  }
);

export default function ProductTable({
  products,
  name,
  isFilter = false,
  query,
}: {
  products?: ProductsInterface;
  name: string;
  isFilter?: boolean;
  query?: string;
}) {
  const { setOpenMenu } = useCartContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    if (products) {
      let filtered = products.data.filter((product) => {
        const rating = product.attributes.rating;
        return rating >= ratingRange[0] && rating <= ratingRange[1];
      });

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.attributes.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

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
  }, [products, ratingRange, sortOrder, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <Separator className="my-0" />
      <div className="flex flex-col md:flex-row gap-5">
        <>
          {!isFilter ? (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={name}>
                {name}: {query}
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id={name}
                  placeholder={`Buscar producto...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                {searchTerm && (
                  <IoCloseCircle
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-lg cursor-pointer"
                    onClick={clearSearch}
                  />
                )}
              </div>
            </div>
          ) : (
            <Search placeholder={`Buscar por ${name}`} title={`${name}: `} />
          )}
        </>
        <Card className="flex flex-col w-full items-center justify-center md:w-3/4 ">
          <CardContent className="flex flex-row flex-wrap w-full justify-between gap-6 p-4">
            <div className="w-full md:w-[40%] flex flex-col gap-3">
              <label>Filtrar por popularidad 1 - 5</label>
              <Slider
                min={0}
                max={5}
                step={1}
                value={ratingRange}
                onValueChange={(range: [number, number]) =>
                  setRatingRange(range)
                }
              />
            </div>
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc">Alfabético Ascendente</SelectItem>
                  <SelectItem value="desc">Alfabético Descendente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={() => setOpenMenu(true)} title="Filtro">
              <IoFilterSharp className="h-6 w-6" /> Filtro
            </Button>
          </CardContent>
        </Card>
      </div>
      {products === undefined ? (
        <>
          <FilterTableSkeleton />
        </>
      ) : (
        <>
          {products.data.length > 0 ? (
            <>
              <div className="inline-block min-h-screen min-w-full align-middle">
                <div className="pagination-info min-w-48">
                  Página {currentPage} de{" "}
                  {Math.ceil(filteredProducts.length / productsPerPage)}
                </div>

                <>
                  {currentProducts.length === 0 ? (
                    <EmptyCartMessage
                      title="Sin resultados"
                      description="Buscar en todos nustros productos"
                    />
                  ) : (
                    <CardTable currentProducts={currentProducts} />
                  )}
                </>
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
