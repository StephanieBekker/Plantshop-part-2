// Native labels, input types and required fields provide browser form validation.
export default function CheckoutFields() {
  return (
    <section className="order-products">
      <h2>Your details</h2>

      <div className="checkout-fields">
        <label>
          Full Name
          <input name="fullName" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Address
          <input name="address" autoComplete="street-address" required />
        </label>
        <label>
          Postal Code
          <input name="postalCode" autoComplete="postal-code" required />
        </label>
        <label>
          City
          <input name="city" autoComplete="address-level2" required />
        </label>
      </div>
    </section>
  );
}
