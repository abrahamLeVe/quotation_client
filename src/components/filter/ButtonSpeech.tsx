"use client";
import { useFilterContext } from "@/context/filter.context";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import Link from "next/link";
import { BsMic, BsSearch } from "react-icons/bs";
import { Icons } from "../Icons";

export default function ButtonSpeech() {
  const { products, isListening } = useFilterContext();
  const { startListening } = useSpeechRecognition();

  return (
    <>
      {/* Search */}
      <div className="flex lg:ml-6">
        <div className="p-2 text-gray-400 hover:text-gray-500 relative">
          <span className="sr-only">Buscar</span>
          <BsSearch className="h-6 w-6" aria-hidden="true" />
          {products.length > 0 && (
            <div className="border rounded-full w-6 h-6 absolute top-0 -right-1">
              <p className="text-sm text-center">{products.length}</p>
            </div>
          )}
          <Link href={"/filter"} className="absolute inset-0"></Link>
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
            <Link href={"/filter"} className="absolute inset-0"></Link>
          </button>
        )}
      </div>
    </>
  );
}
