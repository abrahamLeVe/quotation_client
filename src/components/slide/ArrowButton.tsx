"use client";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface ArrowButtonProps {
  onClick?: () => void;
  direction: "left" | "right";
}

export function ArrowButton({ onClick, direction }: ArrowButtonProps) {
  const isLeft = direction === "left";

  const buttonStyle: React.CSSProperties = {
    left: isLeft ? "20px" : "auto",
    right: isLeft ? "auto" : "20px",
  };

  return (
    <div
      className="group-hover:block absolute top-[50%]  -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/70 duration-500 z-10"
      style={buttonStyle}
      onClick={onClick}
    >
      {isLeft ? (
        <BsChevronLeft className="h-6 w-6" aria-hidden="true" />
      ) : (
        <BsChevronRight className="h-6 w-6" aria-hidden="true" />
      )}
    </div>
  );
}
