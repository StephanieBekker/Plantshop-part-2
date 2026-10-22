import ProductCard from "@/components/products/ProductCard";
import { getCatalogue } from "@/lib/products";

export default async function Shop() {
  const { products, error } = await getCatalogue();

  return (
    <main>
      <h1 id="shop-heading">Our plants</h1>

      {error && <p role="alert">{error}</p>}

      <section className="products" aria-labelledby="shop-heading">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
