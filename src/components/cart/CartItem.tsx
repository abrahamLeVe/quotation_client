import { ProductNAInterface } from "@/models/newArrivals.model";
import { ButtonAddToCart } from "../product/ProductButton";
import { TruncatedText } from "../product/ProductName";
import ProductPrice from "../product/ProductPrice";

interface CartItemProps {
  product: ProductNAInterface;
}

export default function CartItem({ product }: CartItemProps) {
  return (
    <>
      <li key={product.id} className="flex py-6 relative">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={
              product.attributes.thumbnail.data.attributes.formats.thumbnail.url
            }
            alt={product.attributes.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={"#"} className="hover:underline">
                  <TruncatedText
                    text={product.attributes.name}
                    maxLength={50}
                  />
                </a>
              </h3>
            </div>
            <div className="my-1 text-sm text-gray-500">
              <ProductPrice
                price={product.attributes.price}
                discount={product.attributes.discount}
              />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex justify-start">
              <ButtonAddToCart product={product} isModal={true} />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
