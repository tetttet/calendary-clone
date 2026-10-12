"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import { ProductIcon, SectionHeading } from "./ui";

export function Conversion() {
  const data = content.conversion;
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(4);
  const [geometry, setGeometry] = useState({ step: 0, center: 0 });
  const [paused, setPaused] = useState(false);
  const [reset, setReset] = useState(true);
  useEffect(() => {
    const measure = () => {
      const cards =
        track.current?.querySelectorAll<HTMLElement>(".conversion-card");
      if (!cards || !viewport.current) return;
      setGeometry({
        step: cards[1].offsetLeft - cards[0].offsetLeft,
        center: (viewport.current.clientWidth - cards[0].offsetWidth) / 2,
      });
    };
    const observer = new ResizeObserver(measure);
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    if (index === 8) {
      const timer = setTimeout(() => {
        setReset(true);
        setIndex(4);
      }, 1200);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(
      () => {
        setReset(false);
        setIndex((i) => i + 1);
      },
      reset ? 4000 : 5200,
    );
    return () => clearTimeout(timer);
  }, [index, paused, reset]);
  return (
    <section className="conversion-section section-pad">
      <SectionHeading eyebrow={data.eyebrow} title={data.heading} cta>
        {data.body}
      </SectionHeading>
      <div
        ref={viewport}
        className="conversion-marquee"
        role="group"
        aria-label="Scrolling product highlights"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={track}
          className="conversion-track"
          style={{
            transform: `translateX(${geometry.center - index * geometry.step}px)`,
            transitionDuration: reset ? "0s" : "1.2s",
          }}
        >
          {[0, 1, 2].map((copy) => (
            <div className="conversion-set" key={copy} aria-hidden={copy !== 1}>
              {data.cards.map((card, i) => (
                <div
                  className={`conversion-card conversion-${card.product} ${index % 4 === i ? "active" : ""}`}
                  key={card.product}
                >
                  <div
                    className={`conversion-pattern pattern-${card.pattern}`}
                  />
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 341px, 656px"
                  />
                  <div className="conversion-label">
                    <span>
                      <ProductIcon product={card.product} />
                      {card.labels[0]}
                    </span>
                    <span>{card.labels[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
