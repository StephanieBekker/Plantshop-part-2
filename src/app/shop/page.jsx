import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";

export default async function Shop() {
  const products = await getProducts();

  return (
    <main>
      <h1 id="shop-heading">Our plants</h1>

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
