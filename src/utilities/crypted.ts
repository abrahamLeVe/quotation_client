import { CartStateProps } from "@/models/cart.model";

export const decryptCartState = (encodedState: string): CartStateProps => {
  const decodedState = atob(encodedState);
  return JSON.parse(decodedState);
};

export const encryptCartState = (state: CartStateProps): string => {
  const serializedState = JSON.stringify(state);
  return btoa(serializedState);
};
