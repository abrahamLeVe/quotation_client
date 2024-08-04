"use client";
import { useCartContext } from "@/context/cart.context";
import { useSpeechRecognition } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";
import { BsMic } from "react-icons/bs";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

interface SpeachButtonProps {
  className: string;
  title?: string;
  variant?:
    | "link"
    | "default"
    | "ghost"
    | "outline"
    | "destructive"
    | "secondary"
    | null
    | undefined;
}

export default function SpeachButton({
  className = "",
  title = "",
  variant = "ghost",
}: SpeachButtonProps) {
  const { startListening } = useSpeechRecognition();
  const { isLoading } = useCartContext();

  const buttonClasses = cn("h-[1.3rem] w-[1.3rem] ");
  const handleClick = () => {
    startListening();
  };

  return (
    <div title="Por favor, mencione el producto que desea buscar después del mensaje del bot. Por ejemplo: cartón, cinta, llave, aceite, aislador, etc.">
      {isLoading ? (
        <Button variant={variant}>
          <Icons.bars className={buttonClasses + " text-red-500"} />
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          variant={variant}
          className={cn(className)}
        >
          <span className="sr-only">Escuchar</span>
          <BsMic className={buttonClasses} />
          {title && <span className="text-base font-semibold">{title}</span>}
        </Button>
      )}
    </div>
  );
}
