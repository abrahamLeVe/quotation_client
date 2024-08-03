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
    <Accordion type="multiple" className="w-full bg-white  dark:bg-slate-950">
      {brands.data.map((brand) => (
        <AccordionItem value={`brand-${brand.id}`} key={`brand-${brand.id}`}>
          <AccordionTrigger className="text-orange-500">
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
                  - {capitalizeFirstLetter(product.attributes.name)}
                </span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
