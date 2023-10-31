"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  quantity: number;
}

interface cartStateProps {
  cartItemState: CartItem[];
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  itemCartQuantity: (id: number) => number;
  removeCartItem: (id: number) => void;
}

export  const  cartStore = create<cartStateProps>()(
  persist(
    (set, get) => ({
      cartItemState: [],
      increaseCartQuantity: (id) => {
        set((state) => {
          const existingItem = state.cartItemState.find(
            (item) => item.id === id
          );

          if (existingItem) {
            return {
              cartItemState: state.cartItemState.map((item) => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              }),
            };
          } else {
            return {
              cartItemState: [...state.cartItemState, { id, quantity: 1 }],
            };
          }
        });
      },
      decreaseCartQuantity: (id) => {
        set((state) => {
          const updatedCart = state.cartItemState.map((item) => {
            if (item.id === id) {
              const newQuantity = item.quantity - 1;
              if (newQuantity <= 0) {
                return null;
              } else {
                return { ...item, quantity: newQuantity };
              }
            }
            return item;
          });
          const filteredCart = updatedCart.filter((item) => item !== null);
          return { cartItemState: filteredCart } as cartStateProps;
        });
      },
      removeCartItem: (id) => {
        set((state) => {
          const updatedCart = state.cartItemState.filter(
            (item) => item.id !== id
          );
          return { cartItemState: updatedCart };
        });
      },
      itemCartQuantity: (id) => {
        const item = get().cartItemState.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart",
    }
  )
);
