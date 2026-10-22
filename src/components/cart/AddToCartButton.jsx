"use client";

import { useCart } from "@/components/cart/CartProvider";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  return (
    <button
      className="add-to-cart"
      type="button"
      onClick={() => addToCart(product)}
    >
      Add to cart
    </button>
  );
}
