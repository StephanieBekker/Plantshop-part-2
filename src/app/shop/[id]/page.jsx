import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";
import ProductCard from "@/components/products/ProductCard";
import ProductGallery from "@/components/products/ProductGallery";
import plantDetails from "@/data/plantDetails";
import AddToCartForm from "@/components/cart/AddToCartForm";
import { getProduct, getProducts } from "@/lib/products";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
  const details = plantDetails[product.trefleId];
  const plant = product.botanical;
  const description = plant.growth?.description || details?.description;
  const maximumHeight = plant.specifications?.maximum_height?.cm;

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const sections = [
    {
      id: "plant-care",
      title: "Plant care",
      content: details ? (
        <dl className="plant-facts">
          <dt>
            <Icon name="sun" className="care-icon" />
            Light
          </dt>
          <dd>{details.light}</dd>

          <dt>
            <Icon name="droplet" className="care-icon" />
            Water
          </dt>
          <dd>{details.water}</dd>

          <dt>
            <Icon name="info" className="care-icon" />
            Care note
          </dt>
          <dd>{details.note}</dd>
        </dl>
      ) : (
        <p>Care guidance is not available for this plant yet.</p>
      ),
    },
    {
      id: "plant-information",
      title: "Plant information",
      content: (
        <div className="plant-information">
          {details?.origin && <p>{details.origin}</p>}

          {plant.family && (
            <p>
              This plant belongs to the {plant.family} family
              {plant.genus && <> and the {plant.genus} genus</>}.
            </p>
          )}

          {maximumHeight != null && (
            <>
              <p aria-describedby="plant-height-note">
                Can grow up to {maximumHeight} cm.*
              </p>
              <p id="plant-height-note" className="plant-note">
                *This describes how tall the plant can grow, not its size on
                delivery. Growth depends on its conditions.
              </p>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <main className="plant-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.name}</span>
          </li>
        </ol>
      </nav>

      <article className="plant-layout">
        <ProductGallery
          key={product.id}
          images={product.gallery}
          name={product.name}
        />

        <div className="plant-summary">
          <h1>{product.name}</h1>
          <p className="plant-price">{product.price} kr</p>
          {description && <p>{description}</p>}

          <AddToCartForm
            key={`purchase-${product.id}`}
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            }}
          />

          <Accordion
            key={`info-${product.id}`}
            sections={sections}
            defaultOpenId="plant-care"
          />
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
