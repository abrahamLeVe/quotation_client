"use client";

interface CartButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  icon?: React.ReactNode;
  name?: string;
}

export function CartButtonAction({
  onClick,
  title,
  icon,
  className,
  name,
}: CartButtonProps) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <button
        className={classNames(
          "flex flex-row w-full border bg-white border-gray-400 rounded-md  p-1.5 text-gray-800 hover:text-gray-900 hover:border-gray-900  transition-all duration-300 items-center justify-center gap-2",
          className as string
        )}
        onClick={onClick}
        title={title || name}
      >
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <p className={`${!title && "hidden"} text-sm`}>{title}</p>
      </button>
    </>
  );
}
