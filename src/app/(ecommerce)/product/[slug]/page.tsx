import {
  getDataProductBySlug,
  getDataProductSlug,
} from "@/app/services/product.service";
import { ProductDescription } from "@/components/product/ProductDescription";
import ProductDetail from "@/components/product/ProductDetail";
import ImageGalleryModal from "@/components/ui/ImageGallery";

import dynamic from "next/dynamic";
const CategoryProducts = dynamic(
  () => import("@/components/category/CategoryProducts")
);
const ProductNotFound = dynamic(
  () => import("@/components/product/ProductNotFound")
);

export interface ProductPageProps {
  params: {
    slug: string;
  };
}
export async function generateStaticParams() {
  const products = await getDataProductSlug();
  return products.data.map((product) => ({
    slug: product.attributes.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await getDataProductBySlug(params.slug);

  return (
    <>
      <main className="flex flex-col md:container mx-auto gap-5 relative p-3 md:p-5">
        {data[0] ? (
          <>
            <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
              <div className="h-full lg:w-[50%] lg:sticky top-20">
                <ImageGalleryModal
                  attributes={data[0].attributes}
                  id={data[0].id}
                />
              </div>
              <div className="flex flex-col lg:w-[50%] gap-4">
                <div className="flex flex-col gap-2">
                  <ProductDetail product={data[0]} isPage />
                </div>

                <div>
                  <ProductDescription
                    description={data[0].attributes.description}
                  />
                </div>
              </div>
            </div>
            <CategoryProducts
              category={
                data[0].attributes?.categories?.data[0]?.attributes?.name
              }
            />
          </>
        ) : (
          <div className="w-full min-h-screen">
            <ProductNotFound />
          </div>
        )}
      </main>
    </>
  );
}
