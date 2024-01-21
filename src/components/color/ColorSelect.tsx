"use client";
import { useProductContext } from "@/context/product.context";
import { ColorProduct } from "@/models/products.model";
import { FaCircle } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ColorSelectProps {
  colors: ColorProduct[];
  priceId: number;
  handleColorChange: (id: string) => void;
}

export default function ColorSelect({
  colors,
  handleColorChange,
  priceId,
}: ColorSelectProps) {
  const { getItemColorQuantity } = useProductContext();

  return (
    <Select
      onValueChange={handleColorChange}
      defaultValue={colors.length === 1 ? colors[0].id.toFixed() : undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Color" />
      </SelectTrigger>
      <SelectContent>
        {colors?.map((color) => (
          <SelectItem key={color.id} value={color.id.toFixed()}>
            <div className="flex gap-2">
              <FaCircle
                className="h-5 w-5 border rounded-full"
                style={{ color: `${color.attributes.code}` }}
              />
              {color.attributes.Name}
              <div className="flex">
                {getItemColorQuantity(priceId, color.id) ? (
                  <>{"x" + getItemColorQuantity(priceId, color.id)}</>
                ) : null}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
