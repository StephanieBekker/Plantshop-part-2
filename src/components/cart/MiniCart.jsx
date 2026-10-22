"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function MiniCart({ open, onNavigate }) {
  // Read the shared cart instead of creating another cart state.
  const { items, total } = useCart();

  return (
    <aside className="mini-cart" aria-label="Cart preview" hidden={!open}>
      {items.length > 0 && <h2>Your cart</h2>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mini-cart-list">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  className="mini-cart-product"
                  href={`/shop/${item.id}`}
                  onClick={onNavigate}
                >
                  <Image src={item.image} alt="" width={48} height={60} />

                  <span>
                    <strong>{item.name}</strong>
                    <span>Quantity: {item.quantity}</span>
                  </span>
                </Link>

                <strong>{item.price * item.quantity} kr</strong>
              </li>
            ))}
          </ul>

          <p className="mini-cart-total">
            <span>Total</span>
            <strong>{total} kr</strong>
          </p>

          <div className="mini-cart-actions">
            <Link href="/cart" onClick={onNavigate}>
              View cart
            </Link>
            <Link
              className="checkout-link"
              href="/checkout"
              onClick={onNavigate}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}
