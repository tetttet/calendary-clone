"use client";
import Image from "next/image";
import { useState } from "react";
import content from "@/data/content.json";
import { ProductIcon, SectionHeading } from "./ui";
export function Workflow() {
  const [active, setActive] = useState(0);
  return (
    <section className="workflow-wrap">
      <div className="workflow-surface">
        <div className="container">
          <SectionHeading
            eyebrow="AI meeting management"
            title="Built for people whose work runs on meetings"
            cta
          >
            Meetings move you forward, but the work around them can slow you
            down. Calendly handles the tasks before, during, and after meetings,
            so you have more space for what matters.
          </SectionHeading>
          <div className="workflow-cards">
            {content.workflow.map((card, i) => (
              <article
                className={`workflow-card ${i === active ? "active" : ""}`}
                key={card.heading}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <button
                  className="workflow-card-title"
                  aria-expanded={active === i}
                  onClick={() => setActive(i)}
                >
                  <h3>{card.heading}</h3>
                </button>
                <div className="workflow-card-copy">
                  <p className="workflow-resting">{card.restingDescription}</p>
                  <div className="workflow-active">
                    <p>{card.description}</p>
                    <ul>
                      {card.steps.map((step) => (
                        <li key={step.text}>
                          <ProductIcon product={step.product} />
                          <span>{step.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="workflow-art">
                  <Image
                    className="workflow-idle-art"
                    src={card.restingVisual.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 350px, 250px"
                  />
                  <div
                    className="workflow-active-art"
                    style={{
                      backgroundImage: `url(${card.activeBackgroundGradient.src})`,
                    }}
                  >
                    <Image
                      src={card.activeVisual.src}
                      alt={`${card.heading} product preview`}
                      fill
                      sizes="(max-width: 768px) 350px, 400px"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
