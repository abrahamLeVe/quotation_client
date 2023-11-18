import { getDataCategory } from "@/app/services/category.service";
import ResultSpeech from "@/components/filter/ResultSpeech";

export default async function FilterPage() {
  const { data: dataCategory } = await getDataCategory();
  return (
    <>
      <ResultSpeech data={dataCategory} />
    </>
  );
}
