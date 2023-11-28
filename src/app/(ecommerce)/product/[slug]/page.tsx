import { getDataProductBySlug } from "@/app/services/product.service";
import ProductIndex from "@/components/product/ProductIndex";

export interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await getDataProductBySlug(params.slug);

  return (
    <>
      <ProductIndex data={data} />
    </>
  );
}
