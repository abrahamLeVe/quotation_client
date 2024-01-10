import {
  getDataProductBySlug,
  getDataProducts,
} from "@/app/services/product.service";
import ProductSinglePage from "@/components/product/ProductSinglePage";

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
    </>
  );
}
