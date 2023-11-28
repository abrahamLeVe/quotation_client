"use client";
import { formatCurrency } from "@/utilities/utils";

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
            <div className="absolute top-2 left-2 rounded-2xl px-3 py-[5px] bg-white shadow-lg">
              ¡Oferta!
            </div>
          )}
        </>
      )}
      <p className="font-semibold">{formattedDiscount}</p>
    </>
  );
}
