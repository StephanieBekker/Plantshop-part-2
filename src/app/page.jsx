import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FeaturedProducts from "@/components/FeaturedProducts";
import products from "@/data/product";

const heroPlant = products.find((product) => product.id === 2);

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-hero-copy">
          <p className="home-intro">Welcome to SPIRE</p>
          <h1 id="home-heading">A little green for your everyday</h1>
          <p className="home-description">
            Bring a little nature home. Find a plant that suits your space and
            your everyday.
          </p>
          <Link className="home-shop-link" href="/shop">
            Explore our plants
          </Link>
        </div>
        <Link
          className="home-hero-media"
          href={`/shop/${heroPlant.id}`}
          aria-label="Explore our Monstera"
        >
          <Image
            src={heroPlant.gallery[1]}
            alt="A Monstera in a cream pot on a wooden table beside a sofa."
            width={1086}
            height={1448}
            sizes="(max-width: 540px) 100vw, 390px"
          />
        </Link>
      </section>

      <section className="home-featured" aria-labelledby="featured-heading">
        <div className="home-section-heading">
          <h2 id="featured-heading">Find your next green favourite</h2>
          <Link href="/shop">View all plants</Link>
        </div>
        <Suspense fallback={<p role="status">Loading...</p>}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </main>
  );
}
