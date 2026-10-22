"use client";

// Cart and checkout derive their totals from the same provider items.

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/components/cart/CartProvider";

export default function CartContents() {
  const { items, total, clearCart } = useCart();

  return (
    <section className="cart">
      <h2>Your items</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-columns" aria-hidden="true">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          <aside
            className="cart-summary"
            aria-labelledby="cart-summary-heading"
          >
            <h2 id="cart-summary-heading">Order summary</h2>

            <div className="cart-total" aria-live="polite">
              <span>Total</span>
              <strong>{total} kr</strong>
            </div>

            <Link className="checkout-link" href="/checkout">
              Go to Checkout
            </Link>

            <button type="button" className="clear-cart" onClick={clearCart}>
              Clear Cart
            </button>
          </aside>
        </>
      )}
    </section>
  );
}
