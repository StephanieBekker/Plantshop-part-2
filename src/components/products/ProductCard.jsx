// A server component renders product content and delegates cart interaction to a client component.
import Image from "next/image";
import Link from "next/link";
import plantDetails from "@/data/plantDetails";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductCard({ product, headingLevel = "h2" }) {
  const Heading = headingLevel;
  const description = plantDetails[product.trefleId]?.description;
  const productUrl = `/shop/${product.id}`;

  return (
    <article className="product-card">
      <Link
        className="product-image-link"
        href={productUrl}
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={1254}
          height={1254}
          sizes="(max-width: 540px) 100vw, 50vw"
        />
      </Link>

      <Heading>
        <Link href={productUrl}>{product.name}</Link>
      </Heading>

      {description && <p className="product-fact">{description}</p>}

      <p>{product.price} kr</p>

      <AddToCartButton product={product} />
    </article>
  );
}
