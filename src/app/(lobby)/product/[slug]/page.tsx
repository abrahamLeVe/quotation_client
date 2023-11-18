import { getDataProduct } from "@/app/services/product.service";
import ProductIndex from "@/components/product/ProductIndex";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await getDataProduct(params.slug);
  if (!data.length) {
    redirect("/");
  }
  return (
    <>
      <ProductIndex data={data} />
    </>
  );
}
