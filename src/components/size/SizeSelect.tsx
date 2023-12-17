"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductPriceInterface } from "@/models/products.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SizeSelectProps {
  selectedSize: ProductPriceInterface;
  productPrices: ProductPriceInterface[];
  handleSizeChange: (id: string) => void;
}

const FormSchema = z.object({
  id: z.string({
    required_error: "Id es requerido",
  }),
});

export default function SizeSelect({
  selectedSize,
  productPrices,
  handleSizeChange,
}: SizeSelectProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: selectedSize.id.toFixed() },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medidas:</FormLabel>
            <Select onValueChange={handleSizeChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una medida" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {productPrices.map((price) => (
                  <SelectItem key={price.id} value={price.id.toFixed()}>
                    {`${price.attributes.size.data?.attributes.numberLatam}-${price.attributes.size.data?.attributes.category.data.attributes.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
