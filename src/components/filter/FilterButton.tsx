"use client";
import { useFilterContext } from "@/context/filter.context";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import Link from "next/link";
import { BsMic, BsSearch } from "react-icons/bs";
import { Icons } from "../Icons";

export default function FilterButton() {
  const { productsFilter, isListening } = useFilterContext();
  const { startListening } = useSpeechRecognition();

  return (
    <>
      {/* Search */}
      <div className="flex lg:ml-6">
        <div className="p-2 text-gray-400 hover:text-gray-500 relative">
          <span className="sr-only">Buscar</span>
          <BsSearch className="h-6 w-6" />
          <Link href={"/filter/search"} className="absolute inset-0" aria-label="Filtar productos"></Link>
        </div>
      </div>
      <div className="flex lg:ml-6">
        {isListening ? (
          <div className="p-2">
            <Icons.bars className="h-6 w-6 text-red-500" aria-hidden="true" />
          </div>
        ) : (
          <button
            onClick={startListening}
            className="p-2 text-gray-400 hover:text-gray-500 relative"
          >
            <span className="sr-only">Escuchar</span>
            <BsMic className="h-6 w-6" aria-hidden="true" />
            {/* <Link href={"/filter/search"} className="absolute inset-0"></Link> */}
          </button>
        )}
      </div>
    </>
  );
}
