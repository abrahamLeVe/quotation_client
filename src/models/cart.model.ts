import { ReactNode } from "react";
import { PersistStorage, StorageValue } from "zustand/middleware";
import { ColorProduct } from "./products.model";

export type ShoppingCartProviderProps = {
  children: ReactNode;
};

export interface CartStateProps {
  cartItemState: ProductCart[];

  increaseCartQuantity: ({
    priceId,
    colorId,
    color,
    size,
    picture_url,
    title,
    slug,
    value,
    discount,
  }: IncreaseCartQuantityProps) => void;
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
  size?: string | null;
  slug?: string;
  value?: number;
  discount?: number;
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

export interface CartButtonActionsProps {
  priceId: number;
  colorId?: number;
  isPage?: boolean;
  colors?: number;
  color?: ColorProduct;
  size?: string | null;
  picture_url?: string;
  title?: string;
  slug?: string;
  value?: number;
  discount?: number;
}

export interface IncreaseCartQuantityProps {
  priceId: number;
  colorId?: number;
  color?: Color;
  size?: string | null;
  picture_url?: string;
  title?: string;
  slug?: string;
  value?: number;
  discount?: number;
}
