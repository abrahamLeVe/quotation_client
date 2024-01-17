"use client";
import { useFilterContext } from "@/context/filter.context";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import Link from "next/link";
import { BsMic, BsSearch } from "react-icons/bs";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

export default function FilterButton() {
  return (
    <Button className="relative" variant={"link"}>
      <span className="sr-only">Buscar</span>
      <BsSearch className="h-6 w-6" />
      <Link
        href={"/filter/search"}
        className="absolute inset-0"
        aria-label="Filtar productos"
      ></Link>
    </Button>
  );
}

export function SpeachButton() {
  const { isListening } = useFilterContext();
  const { startListening } = useSpeechRecognition();
  return (
    <>
      {isListening ? (
        <Button variant={"link"}>
          <Icons.bars className="h-6 w-6 text-red-500" />
        </Button>
      ) : (
        <Button onClick={startListening} variant={"link"}>
          <span className="sr-only">Escuchar</span>
          <BsMic className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
