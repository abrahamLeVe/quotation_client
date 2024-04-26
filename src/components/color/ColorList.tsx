"use client";
import { ColorsInterface } from "@/models/colors.model";
import { capitalizeFirstLetter } from "@/utilities/utils";
import Link from "next/link";
import { FaCircle } from "react-icons/fa6";
interface ColorListProps {
  colors?: ColorsInterface;
}

export default function ColorList({ colors }: ColorListProps) {
  return (
    <div className="flex flex-col items-start text-sm gap-2">
      {colors?.data.map((color) => (
        <span key={color.id} className="flex gap-2 relative hover:underline">
          <FaCircle
            className="h-5 w-5 border rounded-full"
            style={{
              color: `${color?.attributes.code}`,
            }}
          />
          <Link
            href={`/filter/color?query=${color.attributes.name}`}
            className="absolute inset-0"
            scroll={false}
          ></Link>
          <p>
            {capitalizeFirstLetter(color.attributes.name)}
            {` (${color.attributes.products.data.length})`}
          </p>
        </span>
      ))}
    </div>
  );
}
