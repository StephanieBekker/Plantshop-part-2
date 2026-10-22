import ProductCard from "@/components/products/ProductCard";
import { getCatalogue } from "@/lib/products";

export default async function FeaturedProducts() {
  const { products, error } = await getCatalogue();
  const featuredProducts = products.filter((product) =>
    [1, 2, 7].includes(product.id),
  );

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} headingLevel="h3" />
        ))}
      </div>
    </>
  );
}
