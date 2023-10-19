import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

type ArrowButtonProps = {
  onClick: () => void;
  direction: "left" | "right";
};

export function ArrowButton({ onClick, direction }: ArrowButtonProps) {
  const isLeft = direction === "left";

  const buttonStyle: React.CSSProperties = {
    left: isLeft ? "20px" : "auto",
    right: isLeft ? "auto" : "20px",
  };

  return (
    <div
      className="group-hover:block absolute top-[50%]  -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
      style={buttonStyle}
      onClick={onClick}
    >
      {isLeft ? (
        <ArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </div>
  );
}
