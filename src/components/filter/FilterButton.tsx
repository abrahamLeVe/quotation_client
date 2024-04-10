"use client";
import { useProductContext } from "@/context/product.context";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import Link from "next/link";
import { BsMic, BsSearch } from "react-icons/bs";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

export default function FilterButton() {
  return (
    <Button className="relative" variant={"ghost"}>
      <span className="sr-only">Buscar</span>
      <BsSearch className="h-[1.2rem] w-[1.2rem]" />
      <Link
        href={
          "/filter/category?query=Materiales%20eléctricos%20para%20transformadores"
        }
        className="absolute inset-0"
        aria-label="Filtar productos"
      ></Link>
    </Button>
  );
}

export function SpeachButton() {
  const { isListening } = useProductContext();
  const { startListening } = useSpeechRecognition();
  return (
    <>
      {isListening ? (
        <Button variant={"ghost"}>
          <Icons.bars className="h-[1.2rem] w-[1.2rem] text-red-500" />
        </Button>
      ) : (
        <Button onClick={startListening} variant={"ghost"}>
          <span className="sr-only">Escuchar</span>
          <BsMic className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}
    </>
  );
}
