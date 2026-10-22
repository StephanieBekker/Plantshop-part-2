"use client";

// Submit only product IDs and quantities; the Route Handler validates them and uses server prices.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import CheckoutFields from "@/components/checkout/CheckoutFields";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutForm() {
  const { items, total, completeOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || items.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Personal form details stay in the browser.
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map(({ id, quantity }) => ({
            id,
            quantity,
          })),
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "The order could not be completed.");
      }

      // Clear the cart only after the server confirms success.
      completeOrder();
      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "The order could not be completed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <form
      className="checkout-layout"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
    >
      <CheckoutFields />

      <OrderSummary items={items} total={total}>
        <p>
          Demo checkout. Personal details are not saved or sent. No payment is
          taken.
        </p>

        {error && <p role="alert">{error}</p>}

        <button className="place-order" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Place Order"}
        </button>
      </OrderSummary>
    </form>
  );
}
