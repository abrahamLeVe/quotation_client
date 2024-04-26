"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CategoriesInterface } from "@/models/category.model";
import { capitalizeFirstLetter, truncate } from "@/utilities/utils";
import Link from "next/link";

interface CategoryListProps {
  categories: CategoriesInterface;
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="flex flex-col items-start text-sm">
      <Accordion
        type="multiple"
        className="w-full bg-white min-h-screen h-full  dark:bg-slate-950"
      >
        {categories.data.map((category) => (
          <AccordionItem
            value={`category-${category.id}`}
            key={`category-${category.id}`}
          >
            <AccordionTrigger className="dark:text-orange-300">
              {category.attributes.name} -
              {` (${category.attributes.products.data.length})`}
            </AccordionTrigger>
            <AccordionContent>
              {category.attributes.products.data.map((product) => (
                <div key={product.id}>
                  <span
                    className="relative hover:underline"
                    title={capitalizeFirstLetter(product.attributes.name)}
                  >
                    -{" "}
                    {truncate(
                      capitalizeFirstLetter(product.attributes.name),
                      40
                    )}
                    <Link
                      href={`/product/${product.attributes.slug}`}
                      className="absolute inset-0"
                      scroll={false}
                    ></Link>
                  </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
