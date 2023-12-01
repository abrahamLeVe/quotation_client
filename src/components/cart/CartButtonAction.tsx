"use client";

interface CartButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  title?: string;
  icon?: React.ReactNode;
}

export function CartButtonAction({
  onClick,
  title,
  icon,
  className,
}: CartButtonProps) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <button
        className={classNames(
          "flex flex-wrap w-full border border-gray-400 rounded-md  p-1.5 text-gray-800 hover:text-gray-900 hover:border-gray-900  transition-all items-center justify-center gap-2",
          className as string
        )}
        onClick={onClick}
        title={title}
      >
        <span className="text-2xl" aria-hidden="true">
          {icon}
        </span>
        <p className={`${!title && "hidden"} text-sm`}>{title}</p>
      </button>
    </>
  );
}
