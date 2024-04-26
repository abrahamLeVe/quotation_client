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
import { cartStore } from "@/store/cart.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsCartCheck } from "react-icons/bs";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCartContext } from "@/context/cart.context";

interface SizeSelectProps {
  selectedPrice: ProductPriceInterface;
  productPrices: ProductPriceInterface[];
  handleSizeChange: (id: string) => void;
}

const FormSchema = z.object({
  id: z.string({
    required_error: "Id es requerido",
  }),
});

export default function SizeSelect({
  selectedPrice,
  productPrices,
  handleSizeChange,
}: SizeSelectProps) {
  const cart = cartStore((state) => state);
  const { getItemQuantity } = useCartContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: selectedPrice.id.toFixed() },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 items-start">
            <FormLabel>Medidas:</FormLabel>
            <Select onValueChange={handleSizeChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccione una medida" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {productPrices.map((price) => {
                  const isInCurrentCart = cart.cartItemState.some(
                    (item) => item.id === price.id
                  );

                  if (!price.attributes.size.data) {
                    return null;
                  }

                  return (
                    <SelectItem key={price.id} value={price.id.toFixed()}>
                      <div className="flex gap-3">
                        <div className="flex">
                          {price.attributes.size.data.attributes.name}
                        </div>

                        {isInCurrentCart ? (
                          <div className="flex ">
                            <BsCartCheck className="h-5 w-5" />
                            {`x ${getItemQuantity(price.id)}`}
                          </div>
                        ) : null}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
