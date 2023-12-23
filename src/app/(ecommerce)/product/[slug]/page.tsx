import {
  getDataProductBySlug,
  getDataProducts,
} from "@/app/services/product.service";
import CategoryProducts from "@/components/category/CategoryProducts";
import ProductSinglePage from "@/components/product/ProductSinglePage";
import { Suspense } from "react";

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
      <ProductSinglePage data={data[0]} />
      {data[0] ? (
        <>
          <Suspense fallback={<>Cargando...</>}>
            <CategoryProducts
              category={
                data[0]?.attributes?.categories?.data[0]?.attributes?.name
              }
            />
          </Suspense>
        </>
      ) : null}
    </>
  );
}
