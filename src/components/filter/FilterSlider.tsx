"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFilterContext } from "@/context/filter.context";
import { ColorsInterface } from "@/models/colors.model";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";

import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import { SizesInterface } from "@/models/size.model";

import { ScrollArea } from "../ui/scroll-area";

const IconSpider = (
  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
);
const ColorList = dynamic(() => import("../color/ColorList"), {
  loading: () => IconSpider,
});
const CategoryList = dynamic(() => import("../category/CategoryList"), {
  loading: () => IconSpider,
});
const BrandList = dynamic(() => import("../brand/BrandList"), {
  loading: () => IconSpider,
});
const SizeList = dynamic(() => import("../size/SizeList"), {
  loading: () => IconSpider,
});

interface FilterSliderProps {
  colors?: ColorsInterface;
  categories: CategoriesInterface;
  brands: BrandsInterface;
  sizes: SizesInterface;
}

export default function FilterSlider({
  colors,
  categories,
  brands,
  sizes,
}: FilterSliderProps) {
  const { openFilter, setOpenFilter } = useFilterContext();

  return (
    <>
      <Sheet open={openFilter} onOpenChange={setOpenFilter}>
        <SheetContent className="w-full sm:max-w-md">
          <ScrollArea className="h-full pr-3">
            <SheetHeader>
              <SheetTitle>Filtro</SheetTitle>
            </SheetHeader>
            <Accordion
              type="single"
              collapsible
              className="w-[350px] bg-white h-full p-4 dark:bg-slate-950  max-h-[550px]"
            >
              <ScrollArea className="  pr-3">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Categorías</AccordionTrigger>
                  <AccordionContent>
                    <CategoryList categories={categories} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Marcas</AccordionTrigger>
                  <AccordionContent>
                    <BrandList brands={brands} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Colores</AccordionTrigger>
                  <AccordionContent>
                    <ColorList colors={colors} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Medidas</AccordionTrigger>
                  <AccordionContent>
                    <SizeList sizes={sizes} />
                  </AccordionContent>
                </AccordionItem>
              </ScrollArea>
            </Accordion>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
