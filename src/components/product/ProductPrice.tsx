"use client";
import { useMounted } from "@/hooks/useMounted";
import { formatCurrency } from "@/utilities/utils";

interface ProductPriceProps {
  price: number;
  discount: number;
}

export default function ProductPrice({ price, discount }: ProductPriceProps) {
  const mounted = useMounted();
  const hasDiscount = discount > 0;
  const formattedPrice = formatCurrency(price);
  const formattedDiscount = formatCurrency(price - discount);
  return (
    <div className="flex flex-wrap gap-2">
      {mounted ? (
        <>
          {hasDiscount && (
            <>
              <div>
                <p className="text-gray-500 line-through">
                  {formattedDiscount}
                </p>
              </div>
              <div className="absolute top-2 left-2 rounded-2xl px-3 py-[5px] bg-white shadow-lg">
                Oferta!
              </div>
            </>
          )}
          <div>
            <p className="font-semibold">{formattedPrice}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-[60px] h-[16px] rounded-md bg-gray-200 "></div>
          <div className="w-[60px] h-[16px] rounded-md bg-gray-200 "></div>
        </>
      )}
    </div>
  );
}
