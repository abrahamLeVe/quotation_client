import { useShoppingCart } from "@/context/cart.context";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const id = product.id;
  const quantity = getItemQuantity(id);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {isModal ? null : (
        <CustomButton
          onClick={() => setIsModalOpen(true)}
          icon={<FaEye />}
          text="Detalles"
        />
      )}
      {quantity === 0 ? (
        <CustomButton
          icon={<HiOutlineShoppingBag />}
          onClick={() => increaseCartQuantity(id)}
          text="Añadir"
        />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CustomButton
            icon={<MdDeleteOutline />}
            onClick={() => removeFromCart(id)}
            text="Quitar"
          />
          <CustomButton
            icon={<BsCartDash />}
            onClick={() => decreaseCartQuantity(id)}
          />
          <span>{quantity}</span>
          <CustomButton
            icon={<BsCartPlus />}
            onClick={() => increaseCartQuantity(id)}
          />
        </div>
      )}
      <ProductModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
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
  return (
    <button
      className="flex flex-wrap border rounded-lg p-2 justify-center hover:bg-gray-200 transition-all gap-2 items-center"
      onClick={onClick}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      {text ? <span>{text}</span> : null}
    </button>
  );
}
