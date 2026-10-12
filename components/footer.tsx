"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import content from "@/data/content.json";
import { destination } from "./ui";
const downloadIcons = [
  "apple.CoF0IO47.svg",
  "google-play.BnDlh9fx.svg",
  "edge.CoGLKjTb.svg",
  "safari.D_kv1qWz.svg",
  "chomre.B5KY3aBe.svg",
  "firefox.CZPCZ-Ap.svg",
  "outlook.BVilOKGX.svg",
];
export function Footer() {
  const [languages, setLanguages] = useState(false);
  const data = content.footer;
  return (
    <footer className="footer-wrap">
      <div className="footer-surface">
        <div className="footer-inner">
          <div className="footer-main">
            <div className="footer-brand">
              <p>{data.heading}</p>
              <Image
                src="/media/calendly-logo-white.svg"
                alt="Calendly"
                width={157}
                height={32}
              />
            </div>
            <nav className="footer-nav" aria-label="Footer">
              {data.linkGroups.map((group) => (
                <div className="footer-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a href={destination(link.href)}>
                          {link.label}
                          {link.badge && <small>{link.badge}</small>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="footer-mobile-logo">
            <Image
              src="/media/calendly-logo-white.svg"
              alt="Calendly"
              width={157}
              height={32}
            />
          </div>
          <div className="footer-utilities">
            <div>
              <span>{data.downloadsLabel}</span>
              <div className="footer-icons">
                {content.downloads.map((item, i) => (
                  <a href={item.href} key={item.label} aria-label={item.label}>
                    <Image
                      src={"/media/" + downloadIcons[i]}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <span>{data.socialLabel}</span>
              <div className="footer-icons">
                <a href="https://x.com/calendly" aria-label="Calendly on X">
                  𝕏
                </a>
                <a
                  href="https://instagram.com/calendly"
                  aria-label="Calendly on Instagram"
                >
                  <Image
                    src="/media/social-instagram.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </a>
                <a
                  href="https://facebook.com/calendly"
                  aria-label="Calendly on Facebook"
                >
                  <Image
                    src="/media/social-facebook.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </a>
                <a
                  href="https://linkedin.com/company/calendly"
                  aria-label="Calendly on LinkedIn"
                >
                  <Image
                    src="/media/social-linkedin.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </a>
                <a
                  href="https://www.youtube.com/c/Calendly"
                  aria-label="Calendly on YouTube"
                >
                  <Image
                    src="/media/social-youtube.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <div className="language-control">
                <button
                  aria-expanded={languages}
                  onClick={() => setLanguages(!languages)}
                >
                  <Globe size={16} />
                  English
                  <ChevronDown size={16} />
                </button>
                {languages && (
                  <div className="language-menu">
                    {data.languages.map((language) => (
                      <a
                        key={language.locale}
                        href={destination(language.href)}
                        lang={language.locale}
                      >
                        {language.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="legal-links">
                {data.bottomLinks.map((link) => (
                  <a key={link.label} href={destination(link.href)}>
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() =>
                    window.dispatchEvent(new Event("open-cookie-settings"))
                  }
                >
                  {data.cookieSettingsLabel}
                </button>
                <button
                  onClick={() =>
                    window.dispatchEvent(new Event("open-cookie-settings"))
                  }
                >
                  {data.privacyChoicesLabel}
                  <Image
                    style={{ width: "auto", height: 16 }}
                    src="/media/privacy-choices.C4P10rH7.svg"
                    alt=""
                    width={24}
                    height={16}
                  />
                </button>
              </div>
            </div>
            <p>© Copyright Calendly 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
