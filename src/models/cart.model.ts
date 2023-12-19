import { ReactNode } from "react";
import { PersistStorage, StorageValue } from "zustand/middleware";

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartStateProps {
  cartItemState: CartItem[];
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeCartItem: (id: number) => void;
}

export interface CustomPersistStorage<T> extends PersistStorage<T> {
  getItem: (
    name: string
  ) => StorageValue<T> | Promise<StorageValue<T> | null> | null;
  setItem: (name: string, value: StorageValue<T>) => void | Promise<void>;
}
