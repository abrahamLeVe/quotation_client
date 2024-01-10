import {
  getDataProductBySlug,
  getDataProducts,
} from "@/app/services/product.service";
import CategoryProducts from "@/components/category/CategoryProducts";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";

import ProductDetail from "@/components/product/ProductDetail";
import ProductNotFound from "@/components/product/ProductNotFound";
import DisclosureIndex from "@/components/ui/Disclosure";
import ImageGalleryModal from "@/components/ui/ImageGallery";
import Markdown from "react-markdown";

export interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await getDataProducts();

  return products.data.map((product) => ({
    slug: product.attributes.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await getDataProductBySlug(params.slug);

  return (
    <>
      <NavBar />
      <main className="flex flex-col max-w-screen-xl mx-auto gap-5 relative p-3 md:p-5">
        {data[0] ? (
          <div className="flex flex-col h-full w-full lg:flex-row gap-5 p-6 relative">
            <div className="h-full lg:w-[50%] lg:sticky top-6">
              <ImageGalleryModal
                attributes={data[0].attributes}
                id={data[0].id}
              />
            </div>
            <div className="flex flex-col lg:w-[50%] gap-4">
              <div className="flex flex-col gap-2">
                <ProductDetail product={data[0]} isPage />
              </div>

              <div className="w-full border">
                <DisclosureIndex
                  title={"Descripción"}
                  child={
                    <article className="prose prose-base max-w-none">
                      <Markdown>{data[0].attributes.description}</Markdown>
                    </article>
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-screen">
            <ProductNotFound />
          </div>
        )}
        {data[0] ? (
          <>
            <CategoryProducts
              category={
                data[0]?.attributes?.categories?.data[0]?.attributes?.name
              }
            />
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
