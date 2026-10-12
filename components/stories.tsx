"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import content from "@/data/content.json";
import { SectionHeading } from "./ui";
export function Stories() {
  const [active, setActive] = useState(0);
  const start = useRef(0);
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const remaining = useRef(6000);
  useEffect(() => {
    remaining.current = 6000;
  }, [active]);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) =>
      setVisible(e.isIntersecting),
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (
      !visible ||
      paused ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const started = performance.now();
    const timer = setTimeout(
      () => setActive((a) => (a + 1) % content.stories.length),
      remaining.current,
    );
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - started),
      );
    };
  }, [active, visible, paused]);
  return (
    <section
      ref={section}
      className="stories-section section-pad"
      style={
        {
          "--story-play-state": visible && !paused ? "running" : "paused",
        } as React.CSSProperties
      }
    >
      <div className="stories-divider" />
      <SectionHeading
        eyebrow="Customer stories"
        title="Real customers. Real results."
      />
      <div
        className="story-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
        role="tabpanel"
        aria-label={content.stories[active].headline}
        onTouchStart={(e) => {
          start.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - start.current;
          if (Math.abs(delta) > 40)
            setActive((a) => (a + (delta < 0 ? 1 : 4)) % 5);
        }}
      >
        {content.stories.map((card, i) => {
          const offset = ((i - active + 7) % 5) - 2;
          return (
            <article
              key={card.id}
              className={`story-card ${offset === 0 ? "active" : ""}`}
              data-offset={offset}
              onClick={() => setActive(i)}
              tabIndex={offset === 0 ? -1 : 0}
              role={offset === 0 ? undefined : "button"}
              aria-label={
                offset === 0 ? undefined : `Read ${card.person.name}'s story`
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <Image
                className="story-background"
                src={card.backgroundImage.src}
                alt={card.backgroundImage.alt}
                fill
                sizes="110px"
              />
              <div className="story-inner">
                <div className="story-quote">
                  <h3>{card.headline}</h3>
                  <blockquote>{card.quote}</blockquote>
                  <div className="story-person">
                    <strong>{card.person.name}</strong>
                    <span className="person-connector" />
                    <p title={card.person.role}>{card.person.role}</p>
                  </div>
                </div>
                <div className="story-featured">
                  <Image
                    src={card.featuredImage.src}
                    alt={card.featuredImage.alt}
                    fill
                    sizes="(max-width: 767px) 280px, 320px"
                  />
                </div>
              </div>
              <span className="story-connector" aria-hidden="true">
                <svg viewBox="0 0 20 37.3338" preserveAspectRatio="none">
                  <path
                    d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z"
                    fill="white"
                  />
                </svg>
              </span>
            </article>
          );
        })}
      </div>
      <div
        className="carousel-dots"
        role="tablist"
        aria-label="Use cases"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            const next = (active + (e.key === "ArrowRight" ? 1 : 4)) % 5;
            setActive(next);
            (e.currentTarget.children[next] as HTMLElement).focus();
          }
        }}
      >
        {content.stories.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Use case ${i + 1}`}
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {active === i && <span key={active} className="story-progress" />}
          </button>
        ))}
      </div>
    </section>
  );
}
