"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandsInterface } from "@/models/brand";
import { capitalizeFirstLetter, truncate } from "@/utilities/utils";
import Link from "next/link";

interface BrandListProps {
  brands: BrandsInterface;
}

export default function BrandList({ brands }: BrandListProps) {
  return (
    <div className="flex flex-col items-start text-sm">
      <Accordion
        type="multiple"
        className="w-full bg-white min-h-screen h-full  dark:bg-slate-950"
      >
        {brands.data.map((brand) => (
          <AccordionItem value={`brand-${brand.id}`} key={`brand-${brand.id}`}>
            <AccordionTrigger className="dark:text-orange-300">
              {brand.attributes.name} -
              {` (${brand.attributes.products.data.length})`}
            </AccordionTrigger>
            <AccordionContent>
              {brand.attributes.products.data.map((product) => (
                <div key={product.id}>
                  <span
                    className="relative hover:underline"
                    title={capitalizeFirstLetter(product.attributes.name)}
                  >
                    <Link
                      href={`/product/${product.attributes.slug}`}
                      className="absolute inset-0"
                      scroll={false}
                    ></Link>
                    -{" "}
                    {truncate(
                      capitalizeFirstLetter(product.attributes.name),
                      40
                    )}
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
