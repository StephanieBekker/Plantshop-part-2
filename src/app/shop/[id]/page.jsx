import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInformation from "@/components/products/ProductInformation";
import ProductDescription from "@/components/products/ProductDescription";
import AddToCartForm from "@/components/cart/AddToCartForm";
import plantDetails from "@/data/plantDetails";
import localProducts from "@/data/product";
import { getCatalogue } from "@/lib/products";

// Prepare the known product routes so direct visits have ready page content.
export function generateStaticParams() {
  return localProducts.map((product) => ({ id: String(product.id) }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  if (!localProducts.some((product) => String(product.id) === id)) notFound();

  const { products } = await getCatalogue();
  const product = products.find((item) => String(item.id) === id);
  const description = plantDetails[product.trefleId]?.description;
  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <main className="plant-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/">Home</Link></li>
          <li><span aria-hidden="true">/</span><Link href="/shop">Shop</Link></li>
          <li><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></li>
        </ol>
      </nav>

      <article className="plant-layout">
        <ProductGallery key={product.id} images={product.gallery} name={product.name} />
        <div className="plant-summary">
          <h1>{product.name}</h1>
          <p className="plant-price">{product.price} kr</p>
          {/* The local description stays visible while the API response streams in. */}
          <Suspense fallback={description ? <p>{description}</p> : null}>
            <ProductDescription id={product.id} fallback={description} />
          </Suspense>
          <AddToCartForm key={product.id} product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          }} />
          <ProductInformation key={product.id} product={product} />
        </div>
      </article>

      <section className="plant-related" aria-labelledby="related-heading">
        <h2 id="related-heading">You may also like</h2>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} headingLevel="h3" />
          ))}
        </div>
      </section>
    </main>
  );
}
