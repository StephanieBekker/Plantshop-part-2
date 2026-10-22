import { getProduct } from "@/lib/products";

// Preserve the API description when available, with the same local fallback as Part 1.
export default async function ProductDescription({ id, fallback }) {
  let product;

  try {
    product = await getProduct(String(id));
  } catch {
    product = null;
  }

  const description = product?.botanical?.growth?.description || fallback;
  return description ? <p>{description}</p> : null;
}
