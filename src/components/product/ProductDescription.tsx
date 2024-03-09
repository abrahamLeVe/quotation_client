import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Markdown from "react-markdown";

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg">Descripción</AccordionTrigger>
        <AccordionContent>
          <article className="prose prose-base max-w-none dark:text-slate-50 ">
            <Markdown>{description}</Markdown>
          </article>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
