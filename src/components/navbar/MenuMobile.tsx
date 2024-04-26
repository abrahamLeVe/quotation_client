"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TiThMenu } from "react-icons/ti";
import { BrandsInterface } from "@/models/brand";
import { CategoriesInterface } from "@/models/category.model";
import Link from "next/link";
import { SpeachButton } from "../filter/FilterButton";
import { ModeToggle } from "../ui/mode-toggle";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface MenuMobileProps {
  categories?: CategoriesInterface;
  brands?: BrandsInterface;
}

export default function MenuMobile({ categories, brands }: MenuMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" title="Menú">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open menu</span>
          <TiThMenu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <ScrollArea className="h-full pr-3">
          <SheetHeader className="flex flex-row justify-between items-baseline">
            <SheetTitle>Menú</SheetTitle>
            <div>
              <ModeToggle />
              <SpeachButton className={""} />
            </div>
          </SheetHeader>
          <Separator className="my-4" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="productos">
              <AccordionTrigger>Productos</AccordionTrigger>
              {categories?.data.map((category) => (
                <Link
                  href={`/filter/category?query=${category.attributes.name}`}
                  passHref
                  key={category.id}
                >
                  <AccordionContent className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    {category.attributes.name}
                  </AccordionContent>
                </Link>
              ))}
            </AccordionItem>
            <AccordionItem value="marcas">
              <AccordionTrigger>Marcas</AccordionTrigger>
              {brands?.data.map((brand) => (
                <Link
                  href={`/filter/brand?query=${brand.attributes.name}`}
                  passHref
                  key={brand.id}
                >
                  <AccordionContent
                    key={brand.id}
                    className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    {brand.attributes.name}
                  </AccordionContent>
                </Link>
              ))}
            </AccordionItem>
          </Accordion>

          <SheetFooter>
            <div className="flex flex-col w-full items-start">
              <SheetClose></SheetClose>
            </div>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
