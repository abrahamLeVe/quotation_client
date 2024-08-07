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
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ColorsInterface } from "@/models/colors.model";
import dynamic from "next/dynamic";
import { Icons } from "../Icons";

import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import { SizesInterface } from "@/models/size.model";

import { useCartContext } from "@/context/cart.context";
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
  const { openMenu, setOpenMenu } = useCartContext();

  return (
    <Sheet open={openMenu} onOpenChange={setOpenMenu}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-3">
          <SheetTitle>Filtrar</SheetTitle>
          <SheetDescription>en toda la tienda</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full pr-2">
          <Accordion
            type="single"
            collapsible
            className="bg-white p-2 dark:bg-slate-950  "
          >
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
          </Accordion>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
