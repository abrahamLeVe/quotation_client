import { useFilterContext } from "@/context/filter.context";
import { BrandsInterface } from "@/models/brand";
import { capitalizeFirstLetter, truncate } from "@/utilities/utils";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BrandListProps {
  brands: BrandsInterface;
}

export default function BrandList({ brands }: BrandListProps) {
  const { setOpenFilter, cleanFilter } = useFilterContext();
  const router = useRouter();
  const handleClick = (slug: string) => {
    cleanFilter();
    setOpenFilter(false);
    router.push(`/product/${slug}`);
  };

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
                  <button
                    onClick={() => handleClick(product.attributes.slug)}
                    className="relative hover:underline"
                    title={capitalizeFirstLetter(product.attributes.name)}
                  >
                    <span>
                      -{" "}
                      {truncate(
                        capitalizeFirstLetter(product.attributes.name),
                        40
                      )}
                    </span>
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
