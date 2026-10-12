"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { Button } from "./ui";
const subscribeToConsent = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("consent-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("consent-change", callback);
  };
};
const getConsentBanner = () =>
  !localStorage.getItem("calendly-recreation-consent");
export function Privacy() {
  const banner = useSyncExternalStore(
    subscribeToConsent,
    getConsentBanner,
    () => false,
  );
  const [settings, setSettings] = useState(false);
  const [optional, setOptional] = useState(false);
  const [chat, setChat] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const open = () => setSettings(true);
    window.addEventListener("open-cookie-settings", open);
    return () => window.removeEventListener("open-cookie-settings", open);
  }, []);
  useEffect(() => {
    if (settings) dialog.current?.showModal();
    else dialog.current?.close();
  }, [settings]);
  const save = (accept: boolean) => {
    localStorage.setItem(
      "calendly-recreation-consent",
      accept ? "accepted" : "declined",
    );
    window.dispatchEvent(new Event("consent-change"));
    setSettings(false);
  };
  return (
    <>
      {banner && (
        <aside className="cookie-banner" aria-label="Cookie banner">
          <button
            className="cookie-close"
            aria-label="Close cookie banner"
            onClick={() => save(false)}
          >
            <X size={16} />
          </button>
          <p>
            We use cookies and similar technologies to improve and personalize
            your experience, to understand website interactions (including
            clicks, cursor movement and screen recordings), and for marketing.
            Click “Decline” to decline optional cookies or “Cookie Settings” to
            manage individual settings. To learn more, visit our{" "}
            <a href="https://calendly.com/legal/privacy-notice">
              privacy notice
            </a>
            .
          </p>
          <div className="cookie-actions">
            <button onClick={() => save(false)}>Decline</button>
            <button className="cookie-accept" onClick={() => save(true)}>
              I understand
            </button>
            <button
              className="cookie-settings"
              onClick={() => setSettings(true)}
            >
              Cookie settings <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      )}
      <dialog
        ref={dialog}
        className="privacy-dialog"
        onCancel={() => setSettings(false)}
      >
        <button
          className="dialog-close"
          aria-label="Close privacy settings"
          onClick={() => setSettings(false)}
        >
          <X />
        </button>
        <h2>Privacy Preference Center</h2>
        <p>
          Manage your cookie preferences. Your selection is saved in this
          browser.
        </p>
        <div className="privacy-option">
          <strong>Strictly necessary cookies</strong>
          <span>Always active</span>
        </div>
        <label className="privacy-option">
          <strong>Optional cookies</strong>
          <input
            type="checkbox"
            checked={optional}
            onChange={(e) => setOptional(e.target.checked)}
          />
        </label>
        <button className="button" onClick={() => save(optional)}>
          Confirm my choices
        </button>
      </dialog>
      <div className="support-widget">
        {chat && (
          <div className="support-panel">
            <button aria-label="Close support" onClick={() => setChat(false)}>
              <X size={18} />
            </button>
            <h3>How can we help?</h3>
            <p>Find answers and get help from Calendly.</p>
            <Button href="/help">Visit the help center</Button>
            <a href="https://calendly.com/help/support">
              Contact support <ArrowRight size={16} />
            </a>
          </div>
        )}
        <button
          className="support-toggle"
          aria-label={chat ? "Close help" : "Open help"}
          onClick={() => setChat(!chat)}
        >
          {chat ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
}
