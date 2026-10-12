"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Megaphone, X } from "lucide-react";
import content from "@/data/content.json";
import { Button, destination, ProductIcon } from "./ui";

const products = [
  {
    name: "Scheduling",
    description: "Simplified booking",
    product: "scheduling",
    href: "/scheduling",
  },
  {
    name: "Callie",
    description: "AI assistant",
    product: "callie",
    href: "/ai-assistant",
    badge: "Beta",
  },
  {
    name: "Notetaker",
    description: "Meeting recaps and action items",
    product: "notetaker",
    href: "/notetaker",
    badge: "New",
  },
  {
    name: "Contacts",
    description: "Relationship management tools",
    product: "contacts",
    href: "/contacts",
  },
  {
    name: "Payments",
    description: "Flexible ways to get paid",
    product: "payments",
    href: "/payments",
  },
];
const platform = [
  { label: "Integrations", link: "/integration" },
  { label: "Security", link: "/security" },
  { label: "Mobile app", link: "/features/mobile-apps" },
  { label: "Browser extension", link: "/features/browser-extensions" },
  { label: "Admin controls", link: "/features/admin-management" },
];
function MenuContent({ name }: { name: string }) {
  if (name === "Product")
    return (
      <div className="product-menu">
        <div>
          <div className="menu-overline">Products</div>
          {products.map((p) => (
            <a
              className="nav-product"
              href={destination(p.href)}
              key={p.product}
            >
              <ProductIcon product={p.product} />
              <span>
                <strong>
                  {p.name}
                  {p.badge && <small>{p.badge}</small>}
                </strong>
                <span>{p.description}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="platform-menu">
          <div className="menu-overline">Platform</div>
          {platform.map((p) => (
            <a href={destination(p.link)} key={p.label}>
              {p.label}
            </a>
          ))}
        </div>
      </div>
    );
  const menu = content.navigation.find((p) => p.label === name);
  return (
    <div className="menu-columns">
      {menu?.submenu?.map((group) => (
        <div key={group.label}>
          <div className="menu-overline">{group.label}</div>
          {group.submenu?.map((link) => (
            <a
              key={link.label}
              href={destination(
                link.link === "/contact/demo" ? "/demo" : link.link || "/",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
export function Header() {
  const [announcement, setAnnouncement] = useState(true);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 160);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        setMenu(null);
      }
    };
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, [mobile]);
  return (
    <header
      ref={ref}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${mobile ? "menu-is-open" : ""}`}
    >
      {announcement && (
        <div className="announcement">
          <a href="https://calendly.com/blog/new-calendly">
            <Megaphone size={16} />
            <span>
              Introducing the new Calendly, built to handle all of the work
              around meetings.
              <ArrowRight className="announcement-mobile-arrow" size={14} />
            </span>
            <small>
              Learn more <ArrowRight size={12} />
            </small>
          </a>
          <button
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncement(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className="nav-placeholder">
        <div
          className="nav-shell"
          onMouseLeave={() => {
            if (!mobile) setMenu(null);
          }}
        >
          <Link href="/" className="brand" aria-label="Calendly">
            <Image
              src="/media/calendly-logo.svg"
              alt="Calendly"
              width={157}
              height={32}
              preload
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {["Product", "Solutions", "Resources"].map((name) => (
              <div key={name} className="nav-item">
                <button
                  aria-expanded={menu === name}
                  aria-controls={`menu-${name}`}
                  onMouseEnter={() => setMenu(name)}
                  onFocus={() => setMenu(name)}
                  onClick={() => setMenu(name)}
                >
                  {name}
                  <ChevronDown size={14} />
                </button>
                {menu === name && (
                  <div
                    id={`menu-${name}`}
                    className={`dropdown dropdown-${name.toLowerCase()}`}
                  >
                    <MenuContent name={name} />
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://calendly.com/pricing"
              onMouseEnter={() => setMenu(null)}
            >
              Pricing
            </a>
          </nav>
          <div className="nav-actions">
            <a className="sales-link" href="https://calendly.com/contact">
              Talk to sales
            </a>
            <Button secondary href="/login" className="login">
              Log In
            </Button>
            <Button>
              <span className="signup-long">Get started for free</span>
              <span className="signup-short">Get started</span>
            </Button>
            <button
              className="mobile-toggle"
              aria-expanded={mobile}
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => {
                setMobile(!mobile);
                setMenu(null);
              }}
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {mobile && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {["Product", "Solutions", "Resources"].map((name) => (
              <div key={name}>
                <button
                  className="mobile-menu-row"
                  aria-expanded={menu === name}
                  onClick={() => setMenu(menu === name ? null : name)}
                >
                  {name}
                  <ChevronDown className={menu === name ? "rotate-180" : ""} />
                </button>
                {menu === name && <MenuContent name={name} />}
              </div>
            ))}
            <a className="mobile-menu-row" href="https://calendly.com/pricing">
              Pricing
              <ArrowRight />
            </a>
            <a className="mobile-menu-row" href="https://calendly.com/contact">
              Talk to sales
              <ArrowRight />
            </a>
          </nav>
          <div className="mobile-menu-bottom">
            <Button secondary href="/login">
              Log In
            </Button>
            <Button>Get started for free</Button>
          </div>
        </div>
      )}
    </header>
  );
}
