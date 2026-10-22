"use client";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useCart } from "@/components/cart/CartProvider";

export default function CartItem({ item }) {
  const { setQuantity, removeItem } = useCart();

  function decreaseQuantity() {
    if (item.quantity === 1) {
      removeItem(item.id);
    } else {
      setQuantity(item.id, item.quantity - 1);
    }
  }

  return (
    <li>
      <Image
        className="cart-item-image"
        src={item.image}
        alt={item.name}
        width={76}
        height={92}
      />

      <p className="cart-unit-price">
        <span className="cart-price-label">Each:</span>
        {item.price} kr
      </p>

      <h3>{item.name}</h3>
      <p className="cart-item-total">{item.price * item.quantity} kr</p>

      <div className="quantity-controls">
        <button
          type="button"
          className="remove-one"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={decreaseQuantity}
        >
          -
        </button>

        <input
          className="quantity-input"
          type="number"
          min="1"
          step="1"
          aria-label={`Quantity of ${item.name}`}
          value={item.quantity}
          onFocus={(event) => event.target.select()}
          onChange={(event) => setQuantity(item.id, Number(event.target.value))}
        />

        <button
          type="button"
          className="add-one"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => setQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="remove-item"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => removeItem(item.id)}
      >
        <Icon name="trash" size={16} className="trash-icon" />
        <span>Remove</span>
      </button>
    </li>
  );
}
