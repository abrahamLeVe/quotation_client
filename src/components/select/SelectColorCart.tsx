"use client";
import { useProductContext } from "@/context/product.context";
import { Color2 } from "@/models/cart.model";
import { FaCircle } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectColorCartProps {
  colors: Color2[];
  productId: number;
  handleColorChange: (id: string) => void;
}

export default function SelectColorCart({
  colors,
  handleColorChange,
  productId,
}: SelectColorCartProps) {
  const { getItemColorQuantity } = useProductContext();
  return (
    <Select
      onValueChange={handleColorChange}
      defaultValue={colors?.length === 1 ? colors[0].id.toFixed() : undefined}
      key={colors?.length}
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
                style={{
                  color: `${color.color?.attributes.code}`,
                }}
              />
              {color.color?.attributes?.name}
              <div className="flex">
                {getItemColorQuantity(productId, color.id) ? (
                  <>{"x" + getItemColorQuantity(productId, color.id)}</>
                ) : null}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
