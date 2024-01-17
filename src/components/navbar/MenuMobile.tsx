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
import { HiBars3 } from "react-icons/hi2";
import { SpeachButton } from "../filter/FilterButton";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative" title="Menú">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open menu</span>
          <HiBars3 className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <ScrollArea className="h-full pr-3">
          <SheetHeader className="flex flex-row justify-between items-baseline">
            <SheetTitle>Menú</SheetTitle>
            <SpeachButton />
          </SheetHeader>
          <Separator className="my-4" />
          <Accordion type="single" collapsible className="w-full">
            {navigation.categories.map((category) => (
              <AccordionItem value={category.id} key={category.id}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                {category.sections.map((section) => (
                  <AccordionContent key={section.id}>
                    {section.name}
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
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

export const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
