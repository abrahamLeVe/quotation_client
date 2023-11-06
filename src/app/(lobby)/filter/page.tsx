"use client";

import ResultSpeech from "@/components/filter/ResultSpeech";
import { useSpeechFilter } from "@/context/speechFilter";

export default function FilterPage() {
  const { products, query } = useSpeechFilter();

  return (
    <div>
      <ResultSpeech products={products} query={query} />
    </div>
  );
}
