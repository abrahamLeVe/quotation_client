"client";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import QuotationCheck from "../quotation/QuotationCheck";

import { Button } from "../ui/button";

export default function CartCheckout() {
  return (
    <div className="w-full py-4 border-t">
      <div className="flex gap-2 py-2  justify-end">
        <Button className="relative">
          <Link
            href={"/cart"}
            title="Ver carrito"
            scroll={true}
            className="absolute inset-0"
          ></Link>
          <BsCart className="h-[1.2rem] w-[1.2rem]" /> Ver carrito
        </Button>

        <QuotationCheck />
      </div>
    </div>
  );
}
