"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SizesInterface } from "@/models/size.model";
import { capitalizeFirstLetter, truncate } from "@/utilities/utils";
import Link from "next/link";

interface SizeListProps {
  sizes: SizesInterface;
}

export default function SizeList({ sizes }: SizeListProps) {
  return (
    <Accordion
      type="multiple"
      className="w-full bg-white  dark:bg-slate-950 pb-6"
    >
      {sizes.data.map((size) => (
        <AccordionItem value={`size-${size.id}`} key={`size-${size.id}`}>
          <AccordionTrigger className="text-orange-500">
            {size.attributes.name} -
            {` (${size.attributes.products.data.length})`}
          </AccordionTrigger>
          <AccordionContent>
            {size.attributes.products.data.map((product) => (
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
