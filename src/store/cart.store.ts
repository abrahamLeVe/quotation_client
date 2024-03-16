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
      increaseCartQuantity: (id: number, colorId: number) => {
        set((state: CartStateProps) => {
          const existingItem = state.cartItemState.find(
            (item) => item.id === id
          );
          if (existingItem) {
            return {
              cartItemState: state.cartItemState.map((item) => {
                if (item.id === id) {
                  let updatedColors = item.colors || [];

                  if (!colorId) {
                    updatedColors = [];
                  } else {
                    const existingColor = updatedColors.find(
                      (color) => color.id === colorId
                    );

                    if (existingColor) {
                      updatedColors = updatedColors.map((color) =>
                        color.id === colorId
                          ? { ...color, quantity: color.quantity + 1 }
                          : color
                      );
                    } else {
                      updatedColors = [
                        ...updatedColors,
                        { id: colorId, quantity: 1 },
                      ];
                    }
                  }

                  return {
                    ...item,
                    quantity: item.quantity + 1,
                    colors: updatedColors,
                  };
                }
                return item;
              }),
            };
          } else {
            const newItem: CartItem = {
              id,
              quantity: 1,
              colors: colorId !== null ? [{ id: colorId, quantity: 1 }] : [],
            };

            return {
              cartItemState: [...state.cartItemState, newItem],
            };
          }
        });
      },
      decreaseCartQuantity: (id: number, colorId: number) => {
        set((state: CartStateProps) => {
          const updatedCart = state.cartItemState.map((item: CartItem) => {
            if (item.id === id) {
              let updatedColors = item.colors || [];

              const existingColor = updatedColors.find(
                (color) => color.id === colorId
              );

              if (existingColor) {
                const newQuantity = existingColor.quantity - 1;
                if (newQuantity <= 0) {
                  updatedColors = updatedColors.filter(
                    (color) => color.id !== colorId
                  );
                } else {
                  updatedColors = updatedColors.map((color) =>
                    color.id === colorId
                      ? { ...color, quantity: newQuantity }
                      : color
                  );
                }
              }

              const newQuantity = item.quantity - 1;
              if (newQuantity <= 0) {
                return null;
              } else {
                return {
                  ...item,
                  quantity: newQuantity,
                  colors: updatedColors,
                };
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
      clearCart: () => {
        set({ cartItemState: [] });
      },
    }),
    {
      name: "cart",
      storage: customStorage,
    }
  )
);
