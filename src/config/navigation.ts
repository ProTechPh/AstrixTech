export type NavLink = {
  title: string;
  href: string;
  description?: string;
};

export const primaryNav: NavLink[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Technologies", href: "/technologies" },
  { title: "Contact", href: "/contact" },
];

/** Whether a nav href matches the current pathname (exact or nested). */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
