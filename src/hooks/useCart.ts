import { cartStore } from "@/store/cart.store";
import productStorage from "@/store/product.store";

export function useCart() {
  const cart = cartStore((state) => state);
  const itemsOfCart = productStorage((state) => state.productsOfCart);

  function getItemQuantity(id: number) {
    const item = cart.itemCartQuantity(id);
    return item;
  }

  const getCartItems = () => {
    const products = itemsOfCart(cart.cartItemState);
    return products;
  };

  const calculateTotal = () => {
    const subTotal = productStorage((state) => state.calculateSubtotal)(
      cart.cartItemState
    );
    const igv = productStorage((state) => state.calculateIGV)(subTotal);
    const total = productStorage((state) => state.calculateTotal)(
      subTotal,
      igv
    );
    return { subTotal, igv, total };
  };

  return {
    cartItems: cart.cartItemState,
    getItemQuantity,
    addToCart: cart.increaseCartQuantity,
    removeFromCart: cart.removeCartItem,
    decreaseQuantity: cart.decreaseCartQuantity,
    getCartItems,
    calculateTotal,
  };
}
