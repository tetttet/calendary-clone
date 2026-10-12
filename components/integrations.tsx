import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import { destination, SectionHeading, TextLink } from "./ui";
export function Integrations() {
  return (
    <section className="integrations-section section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="150+ integrations"
          title="Connect Calendly with your favorite tools"
        >
          Our extensive list of integrations makes Calendly flexible.
        </SectionHeading>
        <div className="integrations-cta">
          <TextLink href="/integration">View all integrations</TextLink>
        </div>
        <div className="integration-grid">
          {content.integrations.map((item) => (
            <a
              className="integration-tile"
              key={item.name}
              href={destination(item.href)}
              aria-label={item.name}
            >
              <span className="tile-connector tile-left" aria-hidden="true">
                <Connector />
              </span>
              <span className="tile-body">
                <Image src={item.icon} alt="" width={64} height={64} />
              </span>
              <span className="tile-connector tile-right" aria-hidden="true">
                <Connector />
              </span>
            </a>
          ))}
        </div>
        <div className="suite-grid">
          {content.suites.map((suite) => (
            <a
              key={suite.heading}
              className="suite-card"
              href={destination(suite.href)}
            >
              <Image
                src={suite.iconSrcs[0].url}
                alt={suite.iconSrcs[0].alt}
                width={24}
                height={24}
              />
              <span className="square-link suite-arrow">
                <ArrowUpRight size={16} />
              </span>
              <h3>{suite.heading}</h3>
              <p>{suite.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <svg viewBox="0 0 6.9722 40.5991" preserveAspectRatio="none">
      <path d="M6.9722 27.4315C3.53722 27.4319 0.944676 31.4613 0.412166 36.7245C-0.117137 41.9559 0.0285468 40.3814 0.0303304 40.3622V20.7186H6.9722ZM6.9722 20.7167H0.0234945L0.0205648 0.246933C0.0205648 0.246933 -0.133062 -1.4469 0.399471 4.03795C0.932075 9.52264 3.5312 13.7215 6.97076 13.7215V20.7167Z" />
    </svg>
  );
}
