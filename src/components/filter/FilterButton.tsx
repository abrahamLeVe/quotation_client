"use client";
import { BsSearch } from "react-icons/bs";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FilterButton() {
  return (
    <Button className="relative" variant={"ghost"}>
      <span className="sr-only">Buscar</span>
      <BsSearch className="h-[1.2rem] w-[1.2rem]" />
      <Link
        href={"/filter/category?query=Galería%20de%20productos"}
        className="absolute inset-0"
        aria-label="Filtar productos"
        prefetch={true}
      ></Link>
    </Button>
  );
}
