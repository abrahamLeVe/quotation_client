import ColorIndex from "@/components/color/ColorIndex";

export default async function BrandPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;

  return <ColorIndex query={query} />;
}
