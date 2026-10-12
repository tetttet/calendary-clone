"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  PanelsTopLeft,
  List,
  Mail,
  Grid2X2,
  Sparkles,
  WalletCards,
  Package,
  Receipt,
  Link as LinkIcon,
  Workflow as WorkflowIcon,
  Users,
  Globe,
  Clock,
  MessagesSquare,
} from "lucide-react";
import content from "@/data/content.json";
import { destination, ProductLabel } from "./ui";
import { RiveDemo } from "./rive-demo";
const icons = [CalendarDays, PanelsTopLeft, WorkflowIcon, Globe, Clock, Users];
const featureIcons = [
  [AtSign, CalendarDays, MessagesSquare],
  [List, Mail, Grid2X2, Sparkles],
  [WalletCards, Package, Receipt, LinkIcon],
];
export function Scheduling() {
  const data = content.scheduling;
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let index = 0;
        let distance = Infinity;
        rows.current.forEach((e, i) => {
          if (e) {
            const r = e.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - innerHeight / 2);
            if (d < distance) {
              distance = d;
              index = i;
            }
          }
        });
        setActive(index);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <section className="scheduling-section section-pad">
      <div className="container scheduling-grid">
        <div className="scheduling-copy">
          <div className="scheduling-heading">
            <ProductLabel product="scheduling" />
            <h2 className="serif-heading">{data.heading}</h2>
          </div>
          <div className="scheduling-items">
            {data.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <div
                  className={`scheduling-item ${active === i ? "active" : ""}`}
                  key={item.title}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                >
                  <button
                    className="scheduling-title"
                    aria-expanded={active === i}
                    onClick={() => {
                      setActive(i);
                      if (innerWidth >= 1024)
                        rows.current[i]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                    }}
                  >
                    <Icon size={24} />
                    <span>{item.title}</span>
                  </button>
                  <div className="scheduling-description">
                    <p>{item.description}</p>
                    <a
                      className="square-link"
                      href={destination(item.href || "/scheduling")}
                      aria-label={`Open ${item.title}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <div className="scheduling-mobile-visual">
                    <RiveDemo src={item.riveFileSrc} label={item.title} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="scheduling-visual">
          {data.items.map((item, i) => (
            <div
              className="demo-layer"
              key={item.title}
              style={{
                opacity: active === i ? 1 : 0,
                visibility: active === i ? "visible" : "hidden",
              }}
            >
              <RiveDemo
                src={item.riveFileSrc}
                label={item.title}
                active={active === i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function FeatureSection({ index }: { index: number }) {
  const data = content.features[index];
  const product = data.eyebrowData.productLogo[0];
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 },
    );
    if (section.current) obs.observe(section.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = setTimeout(
      () => setActive((a) => (a + 1) % data.items.length),
      6000,
    );
    return () => clearTimeout(timer);
  }, [active, visible, cycle, data.items.length]);
  return (
    <section
      ref={section}
      className={`feature-section section-pad feature-${product} ${index !== 1 ? "reverse" : ""}`}
      id={product}
    >
      <div className="container feature-grid">
        <div className="feature-copy">
          <div className="feature-heading">
            <ProductLabel
              product={product}
              badge={data.eyebrowData.badgeLabel}
            />
            <h2 className="serif-heading">{data.heading}</h2>
          </div>
          <div
            className="feature-accordion"
            aria-label={`${product} features`}
            onKeyDown={(event) => {
              if (
                !["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(
                  event.key,
                )
              )
                return;
              event.preventDefault();
              const next =
                (active +
                  (["ArrowDown", "ArrowRight"].includes(event.key)
                    ? 1
                    : data.items.length - 1)) %
                data.items.length;
              setActive(next);
              setCycle((c) => c + 1);
              (
                event.currentTarget.querySelectorAll("h3 button")[
                  next
                ] as HTMLButtonElement
              ).focus();
            }}
          >
            {data.items.map((item, i) => {
              const Icon = featureIcons[index][i];
              return (
                <div
                  className={`feature-item ${active === i ? "active" : ""}`}
                  key={item.title}
                >
                  <h3>
                    <button
                      aria-expanded={active === i}
                      aria-controls={`${product}-detail-${i}`}
                      onClick={() => {
                        setActive(i);
                        setCycle((c) => c + 1);
                      }}
                    >
                      <Icon size={24} />
                      {item.title}
                    </button>
                  </h3>
                  <div
                    id={`${product}-detail-${i}`}
                    className="feature-expand"
                    inert={active !== i}
                  >
                    <div>
                      <div className="feature-description">
                        <p>{item.description}</p>
                        <a
                          className="square-link"
                          href={destination(item.href)}
                          aria-label={`Learn more about ${item.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                      <div className="feature-mobile-visual">
                        <RiveDemo
                          src={item.riveFileSrc}
                          label={item.title}
                          active={active === i}
                        />
                      </div>
                    </div>
                  </div>
                  {active === i && (
                    <span
                      key={`${cycle}-${active}`}
                      className="feature-progress"
                      style={{
                        animationPlayState: visible ? "running" : "paused",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="feature-visual">
          {data.items.map((item, i) => (
            <div
              className="demo-layer"
              key={item.title}
              style={{
                opacity: active === i ? 1 : 0,
                visibility: active === i ? "visible" : "hidden",
              }}
            >
              <RiveDemo
                src={item.riveFileSrc}
                label={item.title}
                active={active === i}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
