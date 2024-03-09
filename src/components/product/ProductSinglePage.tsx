import { ProductInterface } from "@/models/products.model";
import CategoryProducts from "../category/CategoryProducts";
import ImageGalleryModal from "../ui/ImageGallery";
import { ProductDescription } from "./ProductDescription";
import ProductDetail from "./ProductDetail";
import ProductNotFound from "./ProductNotFound";

export default function ProductSinglePage({
  data: product,
}: {
  data: ProductInterface;
}) {
  return (
    <>
      {product ? (
        <>
          <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
            <div className="h-full lg:w-[50%] lg:sticky top-20">
              <ImageGalleryModal
                attributes={product.attributes}
                id={product.id}
              />
            </div>
            <div className="flex flex-col lg:w-[50%] gap-4">
              <div className="flex flex-col gap-2">
                <ProductDetail product={product} isPage />
              </div>

              <div>
                <ProductDescription
                  description={product.attributes.description}
                />
              </div>
            </div>
          </div>
          <CategoryProducts
            category={
              product?.attributes?.categories?.data[0]?.attributes?.name
            }
          />
        </>
      ) : (
        <div className="w-full min-h-screen">
          <ProductNotFound />
        </div>
      )}
    </>
  );
}
