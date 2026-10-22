import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) =>
    [1, 2, 7].includes(product.id),
  );

  return (
    <div className="product-grid">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} headingLevel="h3" />
      ))}
    </div>
  );
}
