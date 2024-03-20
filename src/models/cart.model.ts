import { ReactNode } from "react";
import { PersistStorage, StorageValue } from "zustand/middleware";

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export interface CartStateProps {
  cartItemState: ProductCart[];

  increaseCartQuantity: (
    id: number,
    colorId: number,
    color?: Color,
    size?: string,
    picture_url?: string,
    title?: string
  ) => void;
  decreaseCartQuantity: (id: number, colorId: number) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
}

export interface CustomPersistStorage<T> extends PersistStorage<T> {
  getItem: (
    name: string
  ) => StorageValue<T> | Promise<StorageValue<T> | null> | null;
  setItem: (name: string, value: StorageValue<T>) => void | Promise<void>;
}

export interface ProductCart {
  id: number;
  title?: string;
  colors?: Color2[];
  quantity: number;
  picture_url?: string;
  size?: string;
}

export interface Color2 {
  id: number;
  color?: Color;
  quantity: number;
}

export interface Color {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  publishedAt: string;
}
