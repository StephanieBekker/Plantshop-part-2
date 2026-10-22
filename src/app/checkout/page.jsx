import Link from "next/link";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function Checkout() {
  return (
    <main className="checkout">
      <h1>Checkout</h1>

      <Link className="back-link" href="/cart">
        ← Back to Cart
      </Link>

      <CheckoutForm />
    </main>
  );
}