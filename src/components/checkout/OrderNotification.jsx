"use client";

import { useCart } from "@/components/cart/CartProvider";
import Icon from "@/components/ui/Icon";

export default function OrderNotification() {
  const { orderPlaced, dismissOrderConfirmation } = useCart();

  if (!orderPlaced) return null;

  return (
    <>
      <div className="order-confirmation-backdrop" aria-hidden="true" />
      <div className="order-confirmation">
        <Icon
          name="shoppingBag"
          size={64}
          className="order-confirmation-icon"
        />
        <div role="status">
          <strong>Thank you for your order!</strong>
          <p>Your demo order has been placed successfully!</p>
        </div>

        <button
          type="button"
          className="order-confirmation-shop"
          onClick={dismissOrderConfirmation}
        >
          Back to shopping
        </button>
      </div>
    </>
  );
}
