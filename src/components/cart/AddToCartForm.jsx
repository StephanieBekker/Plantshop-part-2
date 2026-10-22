"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState("1");
  const [cartMessage, setCartMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(quantity);

    // Validate the amount before updating the shared cart.
    if (!Number.isInteger(amount) || amount < 1) return;

    addToCart(product, amount);
    setCartMessage(
      `${amount} ${amount === 1 ? "plant" : "plants"} added to your cart.`,
    );
  }

  function changeQuantity(change) {
    const current = Number(quantity);
    const valid = Number.isInteger(current) && current >= 1 ? current : 1;
    setQuantity(String(Math.max(1, valid + change)));
  }

  return (
    <>
      <form className="plant-purchase" onSubmit={handleSubmit}>
        <div>
          <label className="sr-only" htmlFor="plant-quantity">
            Quantity
          </label>

          <div className="plant-quantity-control">
            <input
              id="plant-quantity"
              type="number"
              min="1"
              step="1"
              required
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />

            <div className="plant-quantity-buttons">
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => changeQuantity(1)}
              >
                <span aria-hidden="true">▲</span>
              </button>

              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={Number(quantity) <= 1}
                onClick={() => changeQuantity(-1)}
              >
                <span aria-hidden="true">▼</span>
              </button>
            </div>
          </div>
        </div>

        <button className="add-to-cart" type="submit">
          Add to Cart
        </button>
      </form>

      <p className="plant-cart-message" role="status">
        {cartMessage}
      </p>
    </>
  );
}
