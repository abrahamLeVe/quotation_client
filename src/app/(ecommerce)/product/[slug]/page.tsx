import { getDataProduct } from "@/app/services/product.service";
import ProductIndex from "@/components/product/ProductIndex";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await getDataProduct(params.slug);

  return <>{!data[0] ? notFound() : <ProductIndex data={data} />}</>;
}
