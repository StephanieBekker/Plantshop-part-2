"use client";

// Checkout is reached through the cart; this menu shares the provider cart count.

import { useState } from "react";
import NavbarLink from "./NavbarLink";
import MiniCart from "@/components/cart/MiniCart";
import { useCart } from "@/components/cart/CartProvider";
import Icon from "@/components/ui/Icon";

export default function Navbar() {
  const { itemCount } = useCart();
  const [previewOpen, setPreviewOpen] = useState(false);

  // Keep the preview open while focus moves between its links.
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPreviewOpen(false);
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavbarLink className="brand" href="/">
        SPIRE
      </NavbarLink>
      <NavbarLink className="nav-link" href="/shop">
        Shop
      </NavbarLink>

      <div
        className="cart-menu"
        onMouseEnter={() => setPreviewOpen(true)}
        onMouseLeave={(event) => {
          if (!event.currentTarget.contains(document.activeElement)) {
            setPreviewOpen(false);
          }
        }}
        onFocus={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPreviewOpen(true);
          }
        }}
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setPreviewOpen(false);

            // Return focus before hiding the preview links.
            event.currentTarget.querySelector(".cart-link")?.focus();
          }
        }}
      >
        {/* The link also provides normal cart access on touch screens. */}
        <NavbarLink
          className="cart-link nav-link"
          href="/cart"
          aria-label={`Cart with ${itemCount} ${
            itemCount === 1 ? "item" : "items"
          }`}
          onClick={() => setPreviewOpen(false)}
        >
          <span className="cart-icon" aria-hidden="true">
            <Icon name="shoppingBag" size={32} className="bag-icon" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </span>
        </NavbarLink>

        <MiniCart open={previewOpen} onNavigate={() => setPreviewOpen(false)} />
      </div>
    </nav>
  );
}
