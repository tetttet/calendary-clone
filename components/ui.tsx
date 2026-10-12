import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export const destination = (href: string) =>
  href.startsWith("/") ? `https://calendly.com${href}` : href;
export function Button({
  children,
  href = "/signup",
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <a
      href={destination(href)}
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
    >
      {children}
    </a>
  );
}
export function TextLink({
  children,
  href,
  underline = false,
}: {
  children: ReactNode;
  href: string;
  underline?: boolean;
}) {
  return (
    <a
      className={`text-link ${underline ? "underlined" : ""}`}
      href={destination(href)}
    >
      {children}
      <ArrowRight size={18} />
    </a>
  );
}
export function ProductIcon({
  product,
  className = "",
}: {
  product: string;
  className?: string;
}) {
  return (
    <span className={`product-icon product-${product} ${className}`}>
      <Image
        src={`/media/product-${["scheduling", "callie", "notetaker", "payments", "contacts"].includes(product) ? product : "scheduling"}.svg`}
        alt=""
        width={40}
        height={40}
      />
    </span>
  );
}
export function ProductLabel({
  product,
  badge,
}: {
  product: string;
  badge?: string | null;
}) {
  return (
    <div className="product-label">
      <ProductIcon product={product} />
      <span>
        {product === "callie"
          ? "Callie"
          : product.charAt(0).toUpperCase() + product.slice(1)}
      </span>
      {badge && <span className="badge">{badge}</span>}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  cta,
  reveal = true,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  cta?: boolean;
  reveal?: boolean;
}) {
  return (
    <div className={`section-heading${reveal ? " reveal" : ""}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {cta && <Button>Start for free</Button>}
    </div>
  );
}
