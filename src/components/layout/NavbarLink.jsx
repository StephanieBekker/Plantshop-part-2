"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ActiveLink({ href, ...props }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  return <Link {...props} href={href} aria-current={active ? "page" : undefined} />;
}

// Keep each link visible while Next.js resolves the current dynamic route.
export default function NavbarLink(props) {
  return (
    <Suspense fallback={<Link {...props} />}>
      <ActiveLink {...props} />
    </Suspense>
  );
}
