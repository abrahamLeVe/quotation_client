import BrandIndex from "@/components/brand/BrandIndex";

export default async function BrandPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;

  return <BrandIndex query={query} />;
}
