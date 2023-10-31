"use client";
import { CartItem, cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";
import { useEffect, useState } from "react";

export function useCart() {
  const [cartState, setCartState] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const cart = cartStore((state) => state);

  useEffect(() => {
    setCartState(cart.cartItemState);
  }, [cart]);

  const itemsOfCart = productStorage((state) => state.productsOfCart);

  function getItemQuantity(id: number) {
    const item = cart.itemCartQuantity(id);
    return item;
  }

  const getCartItems = () => {
    const products = itemsOfCart(cartState);
    return products;
  };

  const calculateTotal = () => {
    const subTotal = productStorage((state) => state.calculateSubtotal)(
      cartState
    );
    const igv = productStorage((state) => state.calculateIGV)(subTotal);
    const total = productStorage((state) => state.calculateTotal)(
      subTotal,
      igv
    );
    return { subTotal, igv, total };
  };

  return {
    cartItems: cartState,
    getItemQuantity,
    addToCart: cart.increaseCartQuantity,
    removeFromCart: cart.removeCartItem,
    decreaseQuantity: cart.decreaseCartQuantity,
    getCartItems,
    calculateTotal,
    openCart,
    setOpenCart,
    openMenu,
    setOpenMenu,
  };
}
