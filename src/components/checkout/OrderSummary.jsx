// Children place the form actions and request feedback below the shared summary.
import Image from "next/image";

export default function OrderSummary({ items, total, children }) {
  return (
    <section className="order-summary">
      <h2>Order summary</h2>

      <ul className="order-list">
        {items.map((item) => (
          <li key={item.id}>
            <Image src={item.image} alt={item.name} width={64} height={80} />
            <div>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>

            <strong>{item.price * item.quantity} kr</strong>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Total</span>
        <strong>{total} kr</strong>
      </div>
      {children}
    </section>
  );
}
