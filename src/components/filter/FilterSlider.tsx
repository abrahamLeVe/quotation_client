"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCategoryContext } from "@/context/category.context";
import { useFilterContext } from "@/context/filter.context";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";

const IconSpider = (
  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
);
const CategoryList = dynamic(() => import("../category/CategoryList"), {
  loading: () => IconSpider,
});
const BrandList = dynamic(() => import("../brand/BrandList"), {
  loading: () => IconSpider,
});
const ColorList = dynamic(() => import("../color/ColorList"), {
  loading: () => IconSpider,
});

export default function FilterSlider() {
  const { openFilter, setOpenFilter } = useFilterContext();
  const { getCategories, getBrands, getColors } = useCategoryContext();

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
          className="w-[260px] bg-white min-h-screen h-full p-2 dark:bg-slate-950"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={getCategories}>
              Categorías
            </AccordionTrigger>
            <AccordionContent>
              <CategoryList />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger onClick={getBrands}>Marcas</AccordionTrigger>
            <AccordionContent>
              <BrandList />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger onClick={getColors}>Colores</AccordionTrigger>
            <AccordionContent>
              <ColorList />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
