import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="brand" href="/">Home</Link>
      <Link className="nav-link" href="/shop">Shop</Link>
      <Link className="nav-link" href="/cart">Cart</Link>
      <Link className="nav-link" href="/checkout">Checkout</Link>
    </nav>
  );
}