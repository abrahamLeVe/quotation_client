import { ProductInterface } from "@/models/products.model";
import DisclosureIndex from "../ui/Disclosure";
import ImageGalleryModal from "../ui/ImageGallery";
import ProductDetail from "./ProductDetail";
import ProductNotFound from "./ProductNotFound";
import Markdown from "react-markdown";
import CategoryProducts from "../category/CategoryProducts";

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
            <div className="h-full lg:w-[50%] lg:sticky top-6">
              <ImageGalleryModal
                attributes={product.attributes}
                id={product.id}
              />
            </div>
            <div className="flex flex-col lg:w-[50%] gap-4">
              <div className="flex flex-col gap-2">
                <ProductDetail product={product} isPage />
              </div>

              <div className="w-full border">
                <DisclosureIndex
                  title={"Descripción"}
                  child={
                    <article className="prose prose-base max-w-none">
                      <Markdown>{product.attributes.description}</Markdown>
                    </article>
                  }
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
