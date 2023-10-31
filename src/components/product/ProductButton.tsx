"use client";
import { useCart } from "@/hooks/useCart";
import { ProductNAInterface } from "@/models/newArrivals.model";
import { useState } from "react";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { FaEye } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import ProductModal from "./ProductModal";

interface ProductButtonProps {
  product: ProductNAInterface;
  isModal?: boolean;
}

export function ButtonAddToCart({ product, isModal }: ProductButtonProps) {
  const [openModalRoot, setOpenModalRoot] = useState(false);
  const { getItemQuantity, addToCart, removeFromCart, decreaseQuantity } =
    useCart();
  const id = product.id;

  const itemQuantity = getItemQuantity(id);

  const showAddButton = itemQuantity === 0;
  const showCounterButtons = itemQuantity !== undefined && itemQuantity > 0;

  const buttons = [
    {
      icon: <FaEye />,
      text: "Detalles",
      onClick: () => setOpenModalRoot(true),
      visible: !isModal,
    },
    {
      icon: <HiOutlineShoppingBag />,
      text: "Añadir",
      onClick: () => addToCart(id),
      visible: showAddButton,
    },
    {
      icon: <MdDeleteOutline />,
      text: "Quitar",
      onClick: () => removeFromCart(id),
      visible: showCounterButtons,
    },
    {
      icon: <BsCartDash />,
      onClick: () => decreaseQuantity(id),
      visible: showCounterButtons,
    },
    {
      icon: <BsCartPlus />,
      onClick: () => addToCart(id),
      visible: showCounterButtons,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {buttons.map(
        (button, index) =>
          button.visible !== false && (
            <div
              className={`${
                button.text == "Detalles" && "absolute top-0 end-0"
              }`}
              key={index}
            >
              <CustomButton
                icon={button.icon}
                text={button.text}
                onClick={button.onClick}
              />
            </div>
          )
      )}
      {showCounterButtons && (
        <div className="font-medium">
          Cantidad: {itemQuantity !== null ? itemQuantity : "N/A"}
        </div>
      )}
      <ProductModal
        openModalRoot={openModalRoot}
        setOpenModalRoot={setOpenModalRoot}
        product={product}
      />
    </div>
  );
}

interface CustomButtonProps {
  icon?: JSX.Element;
  onClick: () => void;
  text?: string;
}

function CustomButton({ icon, onClick, text }: CustomButtonProps) {
  const isDetails = text != "Detalles" || undefined;
  return (
    <button
      className="flex flex-wrap border rounded-lg p-2 hover:bg-gray-200 transition-all items-center"
      onClick={onClick}
      title={text}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      {isDetails && <span>{text}</span>}
    </button>
  );
}
