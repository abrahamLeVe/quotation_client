"use client";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import Link from "next/link";
import { BsMic, BsSearch } from "react-icons/bs";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useCartContext } from "@/context/cart.context";

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

interface SpeachButtonProps {
  className: string;
  title?: string;
  variant?: "ghost" | "outline";
}

export function SpeachButton({
  className = "",
  title = "",
  variant = "ghost",
}: SpeachButtonProps) {
  const { startListening } = useSpeechRecognition();
  const { isLoading } = useCartContext();

  const buttonClasses = cn("h-[1.2rem] w-[1.2rem] ", className);
  const handleClick = () => {
    startListening();
  };

  return (
    <>
      {isLoading ? (
        <Button variant={variant}>
          <Icons.bars className={buttonClasses + " text-red-500"} />
        </Button>
      ) : (
        <Button onClick={handleClick} variant={variant}>
          <span className="sr-only">Escuchar</span>
          <BsMic className={buttonClasses} />{" "}
          {title && <span className="text-base">{title}</span>}
        </Button>
      )}
    </>
  );
}
