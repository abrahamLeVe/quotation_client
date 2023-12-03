import CategoryIndex from "@/components/category/CategoryIndex";

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query;

  return <CategoryIndex query={query} />;
}
