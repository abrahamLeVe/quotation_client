"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterContext } from "@/context/filter.context";
import { ColorsInterface } from "@/models/colors.model";
import { ProductsInterface } from "@/models/products.model";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";
import { useState } from "react";

const IconSpider = (
  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
);

const ColorList = dynamic(() => import("../color/ColorList"), {
  loading: () => IconSpider,
});

interface FilterSliderProps {
  colors?: ColorsInterface;
  products?: ProductsInterface;
}

export default function FilterSlider({ colors, products }: FilterSliderProps) {
  const { openFilter, setOpenFilter } = useFilterContext();
  // const [productsForFil, setProsuctsForFill] = useState(products);

  // console.log("products ", products);
  return (
    <>
      <div
        onClick={() => setOpenFilter(false)}
        className={`absolute inset-0 bg-black bg-opacity-25 transition-opacity duration-500 ease-in-out ${
          openFilter ? "opacity-100" : "opacity-0 hidden"
        } z-20`}
      ></div>

      <div
        className={`absolute top-0 left-0 z-30 transition-transform ${
          openFilter ? "" : "-translate-x-[260px]"
        }`}
      >
        <Accordion
          type="single"
          collapsible
          className="w-[260px] bg-white min-h-screen h-full p-4 dark:bg-slate-950"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Categorías</AccordionTrigger>
            <AccordionContent>{/* <CategoryList /> */}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Marcas</AccordionTrigger>
            <AccordionContent>{/* <BrandList /> */}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Colores</AccordionTrigger>
            <AccordionContent>
              <ColorList colors={colors} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
