import FilterIndex from "@/components/filter/FilterIndex";

export default async function FilterProductPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;

  return <FilterIndex query={query} />;
}
