"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SizesInterface } from "@/models/size.model";
import { capitalizeFirstLetter, truncate } from "@/utilities/utils";
import { useRouter } from "next/navigation";

interface SizeListProps {
  sizes: SizesInterface;
}

export default function SizeList({ sizes }: SizeListProps) {
  const router = useRouter();
  const handleClick = (slug: string) => {
    router.push(`/product/${slug}`);
  };

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
                  <button
                    onClick={() => handleClick(product.attributes.slug)}
                    className="relative hover:underline"
                    title={capitalizeFirstLetter(product.attributes.name)}
                  >
                    -{" "}
                    {truncate(
                      capitalizeFirstLetter(product.attributes.name),
                      40
                    )}
                  </button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
