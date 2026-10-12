"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { X } from "lucide-react";
import content from "@/data/content.json";
import { ProductIcon, ProductLabel, TextLink } from "./ui";
import { RiveDemo } from "./rive-demo";

export function Hero() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const changing = useRef(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!track.current || innerWidth < 640) return;
        const r = track.current.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(0.9999, (24 - r.top) / (r.height - innerHeight + 48)),
        );
        setExpanded(r.top < 200 && r.bottom > innerHeight);
        if (!changing.current) setActive(Math.min(3, Math.floor(progress * 4)));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    if (
      innerWidth >= 640 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % 4), 6000);
    return () => clearTimeout(timer);
  }, [active]);
  const select = (i: number) => {
    setActive(i);
    if (innerWidth >= 640 && track.current) {
      changing.current = true;
      const top = track.current.getBoundingClientRect().top + scrollY;
      const range = track.current.offsetHeight - innerHeight + 48;
      window.scrollTo({
        top: top - 24 + range * (i / 4 + 0.03),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      setTimeout(() => {
        changing.current = false;
      }, 800);
    }
  };
  return (
    <section className="hero-wrap">
      <div className="hero-surface">
        <div className="hero-heading">
          <h1>{content.hero.headingMarkup}</h1>
          <p>{content.hero.body}</p>
          <div className="oauth-buttons">
            <a
              className="button oauth"
              href="https://calendly.com/signup?provider=google"
            >
              <span>
                <Image
                  src="/media/google-logo-mark.png"
                  width={22}
                  height={22}
                  alt=""
                />
              </span>
              Sign up with Google
            </a>
            <a
              className="button oauth"
              href="https://calendly.com/signup?provider=microsoft"
            >
              <span className="microsoft-mark">
                <i />
                <i />
                <i />
                <i />
              </span>
              Sign up with Microsoft
            </a>
          </div>
          <div className="hero-caption">
            <a href="https://calendly.com/signup">Sign up with email</a>
            <span> • No credit card required</span>
          </div>
        </div>
        <div className="hero-track" ref={track}>
          <div
            className={`hero-stage ${expanded ? "expanded" : ""}`}
            style={
              {
                "--hero-background-position": `${(active * 100) / 3}%`,
              } as CSSProperties
            }
          >
            <button
              className="hero-close"
              aria-label="Close product hero"
              tabIndex={expanded ? 0 : -1}
              onClick={() => {
                const bottom =
                  track.current!.getBoundingClientRect().bottom + scrollY;
                scrollTo({ top: bottom, behavior: "smooth" });
              }}
            >
              <X />
            </button>
            <div className="hero-presentation">
              <div
                className="product-tabs"
                role="tablist"
                aria-label="Calendly products"
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    e.preventDefault();
                    const next =
                      (active + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                    select(next);
                    (e.currentTarget.children[next] as HTMLElement).focus();
                  }
                }}
              >
                {content.products.map((p, i) => (
                  <button
                    key={p.product}
                    id={`hero-tab-${i}`}
                    role="tab"
                    aria-label={p.label}
                    aria-selected={active === i}
                    aria-controls={`hero-panel-${i}`}
                    tabIndex={active === i ? 0 : -1}
                    onClick={() => select(i)}
                    className={active === i ? "selected" : ""}
                  >
                    <ProductIcon product={p.product} />
                  </button>
                ))}
              </div>
              <div className="hero-panels">
                {content.products.map((p, i) => (
                  <div
                    key={p.product}
                    id={`hero-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`hero-tab-${i}`}
                    hidden={i !== active}
                    className="hero-product-panel"
                  >
                    <div className="hero-product-copy">
                      <ProductLabel product={p.product} badge={p.badge} />
                      <h2>{p.heading}</h2>
                      <p>{p.body}</p>
                      <TextLink href={p.cta.href} underline>
                        {p.cta.label}
                      </TextLink>
                    </div>
                    <RiveDemo
                      src={p.visual.src}
                      label={`${p.label} product demonstration`}
                      active={i === active}
                      hero
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
