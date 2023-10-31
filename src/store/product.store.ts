"use client";
import { create } from "zustand";
import { CartItem } from "./cart.store";
import {
  NewArrivalInterface,
  ProductNAInterface,
} from "@/models/newArrivals.model";

interface productStorageProps {
  productState: NewArrivalInterface;
  addProduct: (data: NewArrivalInterface) => void;
  productsOfCart: (cartItems: CartItem[]) => ProductNAInterface[];
  calculateSubtotal: (cartItems: CartItem[]) => number;
  calculateIGV: (subtotal: number) => number;
  calculateTotal: (subtotal: number, igv: number) => number;
}

const productStorage = create<productStorageProps>((set, get) => ({
  productState: { data: [] },
  addProduct: (data) => set({ productState: data }),

  productsOfCart: (cartItems) => {
    const products = get().productState.data;

    const productsInCart = products.filter((product) =>
      cartItems.some((cartItem) => cartItem.id === product.id)
    );

    return productsInCart;
  },

  calculateSubtotal: (cartItems) => {
    const productsInCart = get().productsOfCart(cartItems);

    const subtotal = productsInCart.reduce((acc, product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return acc + product.attributes.price * cartItem!.quantity;
    }, 0);

    return subtotal;
  },

  calculateIGV: (subtotal) => {
    const igvRate = 0.18;
    const igv = subtotal * igvRate;

    return igv;
  },

  calculateTotal: (subtotal, igv) => {
    const total = subtotal + igv;

    return total;
  },
}));

export default productStorage;
