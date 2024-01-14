"use client";
import { formatCurrency } from "@/utilities/utils";
import { Badge } from "@/components/ui/badge";

interface ProductPriceProps {
  price: number;
  discount?: number | undefined;
  popUp?: false | true;
}

export default function ProductPrice({
  price,
  discount,
  popUp = false,
}: ProductPriceProps) {
  const hasDiscount = discount! > 0;
  const formattedPrice = formatCurrency(price);
  const formattedDiscount = formatCurrency(price - discount!);
  return (
    <>
      {hasDiscount && (
        <>
          <p className="text-gray-500 line-through">{formattedPrice}</p>
          {popUp && (
            <Badge className="absolute top-2 left-2  py-[5px] shadow-lg">
              <p>¡Oferta!</p>
            </Badge>
          )}
        </>
      )}
      <p className="font-semibold">{formattedDiscount}</p>
    </>
  );
}
