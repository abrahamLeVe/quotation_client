import { getDataProduct } from "@/app/services/product.service";
import ProductIndex from "@/components/product/ProductIndex";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // await new Promise((resolve) =>
  //   setTimeout(() => resolve("¡Promesa resuelta después de 3 segundos!"), 10000)
  // );
  const { data } = await getDataProduct(params.slug);
  return (
    <>
      <ProductIndex data={data} />
    </>
  );
}
