import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";

// App Router displays this fallback while the Shop segment is pending.
export default function Loading() {
  return (
    <main aria-busy="true">
      <h1>Our plants</h1>
      <ProductGridSkeleton />
    </main>
  );
}
