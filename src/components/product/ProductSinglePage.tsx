'use client'
import { ProductInterface } from "@/models/products.model";
import dynamic from "next/dynamic";
import DisclosureIndex from "../ui/Disclosure";
import ImageGalleryModal from "../ui/ImageGallery";
const ProductDetail = dynamic(() => import("./ProductDetail"));
const ReactMarkdown = dynamic(() => import("react-markdown"));
const ProductNotFound = dynamic(() => import("./ProductNotFound"));

export default function ProductSinglePage({
  data: product,
}: {
  data: ProductInterface[];
}) {
  return (
    <>
      {product[0] ? (
        <>
          <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
            <div className="h-full lg:w-[50%] lg:sticky top-6">
              <ImageGalleryModal
                attributes={product[0].attributes}
                id={product[0].id}
              />
            </div>
            <div className="flex flex-col lg:w-[50%] gap-4">
              <div className="flex flex-col gap-2">
                <ProductDetail product={product[0]} isPage />
              </div>

              <div className="w-full border">
                <DisclosureIndex
                  title={"Descripción"}
                  child={
                    <article className="prose prose-base max-w-none">
                      <ReactMarkdown>
                        {product[0].attributes.description}
                      </ReactMarkdown>
                    </article>
                  }
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full min-h-screen">
          <ProductNotFound />
        </div>
      )}
    </>
  );
}
