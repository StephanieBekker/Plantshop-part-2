import { Suspense } from "react";
import Accordion from "@/components/ui/Accordion";
import Icon from "@/components/ui/Icon";
import ProductInformationSkeleton from "./ProductInformationSkeleton";
import plantDetails from "@/data/plantDetails";
import { getProduct } from "@/lib/products";

// Only API facts wait on the server; local care guidance remains available.
async function BotanicalInformation({ id, origin }) {
  let product;

  try {
    product = await getProduct(String(id));
  } catch {
    product = null;
  }

  const plant = product?.botanical;
  const maximumHeight = plant?.specifications?.maximum_height?.cm;

  return (
    <>
      {!plant && (
        <p role="alert">Plant information is unavailable right now. Please try again later.</p>
      )}
      <div className="plant-information">
        {origin && <p>{origin}</p>}
        {plant?.family && (
          <p>
            This plant belongs to the {plant.family} family
            {plant.genus && <> and the {plant.genus} genus</>}.
          </p>
        )}
        {maximumHeight != null && (
          <>
            <p aria-describedby="plant-height-note">Can grow up to {maximumHeight} cm.*</p>
            <p id="plant-height-note" className="plant-note">
              *This describes how tall the plant can grow, not its size on
              delivery. Growth depends on its conditions.
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default function ProductInformation({ product }) {
  const details = plantDetails[product.trefleId];
  const sections = [
    {
      id: "plant-care",
      title: "Plant care",
      content: details ? (
        <dl className="plant-facts">
          <dt><Icon name="sun" className="care-icon" />Light</dt>
          <dd>{details.light}</dd>
          <dt><Icon name="droplet" className="care-icon" />Water</dt>
          <dd>{details.water}</dd>
          <dt><Icon name="info" className="care-icon" />Care note</dt>
          <dd>{details.note}</dd>
        </dl>
      ) : <p>Care guidance is not available for this plant yet.</p>,
    },
    {
      id: "plant-information",
      title: "Plant information",
      content: (
        <Suspense fallback={
          <>
            <ProductInformationSkeleton />
            <div className="plant-information">
              {details?.origin && <p>{details.origin}</p>}
            </div>
          </>
        }>
          <BotanicalInformation id={product.id} origin={details?.origin} />
        </Suspense>
      ),
    },
  ];

  // Pass server-rendered content into the interactive accordion.
  return <Accordion sections={sections} defaultOpenId="plant-care" />;
}
