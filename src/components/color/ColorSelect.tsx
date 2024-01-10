"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useProductContext } from "@/context/product.context";
import { ColorProduct } from "@/models/products.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa6";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ColorSelectProps {
  colors: ColorProduct[];
  productId: number;
  handleColorChange: (id: string) => void;
}

const FormSchema = z.object({
  id: z.string({
    required_error: "Id es requerido",
  }),
});

export default function ColorSelect({
  colors,
  handleColorChange,
  productId,
}: ColorSelectProps) {
  const { getItemColorQuantity } = useProductContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: colors[0].id.toFixed() },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem className="flex w-full gap-2 items-center">
            <FormLabel>Colores:</FormLabel>
            <Select
              onValueChange={handleColorChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un color" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem
                    key={color.id}
                    value={color.id.toFixed()}
                    aria-label={color.attributes.Name}
                  >
                    <div className="flex gap-2">
                      <FaCircle
                        className="h-5 w-5 border rounded-full"
                        style={{ color: `${color.attributes.code}` }}
                      />
                      {color.attributes.Name}
                      <div className="flex ">
                        {getItemColorQuantity(productId, color.id) ? (
                          <>{"x" + getItemColorQuantity(productId, color.id)}</>
                        ) : null}
                      </div>
                    </div>
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
