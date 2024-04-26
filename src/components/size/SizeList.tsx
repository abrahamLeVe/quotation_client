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
    <div className="flex flex-col items-start text-sm">
      <Accordion
        type="multiple"
        className="w-full bg-white min-h-screen h-full  dark:bg-slate-950"
      >
        {sizes.data.map((size) => (
          <AccordionItem value={`size-${size.id}`} key={`size-${size.id}`}>
            <AccordionTrigger className="dark:text-orange-300">
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
