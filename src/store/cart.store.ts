import {
  CartItem,
  CartStateProps,
  CustomPersistStorage,
} from "@/models/cart.model";
import { decryptCartState, encryptCartState } from "@/utilities/crypted";
import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";

const customStorage: CustomPersistStorage<CartStateProps> = {
  getItem: async (name: string) => {
    const encodedState = localStorage.getItem(name);
    if (encodedState) {
      const decodedState = decryptCartState(encodedState);
      return { state: decodedState } as StorageValue<CartStateProps>;
    }
    return null;
  },
  setItem: async (name: string, value: StorageValue<CartStateProps>) => {
    const decodedState = value.state;
    const encodedState = encryptCartState(decodedState);
    localStorage.setItem(name, encodedState);
  },
  removeItem: async (name: string) => localStorage.removeItem(name),
};

export const cartStore = create<CartStateProps>()(
  persist(
    (set) => ({
      cartItemState: [],
      increaseCartQuantity: (id: number) => {
        set((state: CartStateProps) => {
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
      decreaseCartQuantity: (id: number) => {
        set((state: CartStateProps) => {
          const updatedCart = state.cartItemState.map((item: CartItem) => {
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
          const filteredCart = updatedCart.filter(
            (item: CartItem | null) => item !== null
          );
          return { cartItemState: filteredCart } as CartStateProps;
        });
      },
      removeCartItem: (id: number) => {
        set((state: CartStateProps) => {
          const updatedCart = state.cartItemState.filter(
            (item) => item.id !== id
          );
          return { cartItemState: updatedCart };
        });
      },
    }),
    {
      name: "cart",
      storage: customStorage,
    }
  )
);
