import Image from "next/image";

// Decorative icons accompany visible text labels.
const icons = {
  sun: "/icons/sun.svg",
  droplet: "/icons/droplet.svg",
  info: "/icons/info.svg",
  shoppingBag: "/icons/shopping-bag.svg",
  trash: "/icons/trash.svg",
};

export default function Icon({ name, size = 18, className = "" }) {
  return (
    <Image
      src={icons[name]}
      width={size}
      height={size}
      className={className}
      alt=""
      aria-hidden="true"
      unoptimized
    />
  );
}
