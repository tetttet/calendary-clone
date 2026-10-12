# Calendly homepage inspection

Inspected https://calendly.com/ on October 8, 2026 using Playwright MCP, with a 1440 × 1000 desktop viewport. Connection verified by successful navigation, page title retrieval, DOM inspection, and screenshots. Scrolled the full approximately 13,879-pixel page. Declined optional cookies to clear the banner.

## Screenshots

- [Clean homepage viewport](calendly-homepage-clean.png)
- [Initial viewport with cookie banner](calendly-homepage-initial.png)
- [Full-page capture](calendly-homepage-full.png)

The full-page capture retains the site's tall scroll regions and sticky elements; it cannot represent every animated state at once. The individual screenshots below document those states.

## Animation and interaction inventory

| Area | Observed behavior | Evidence |
| --- | --- | --- |
| Header | Floating navigation during scrolling; Product, Solutions, and Resources menus open on hover. | Navigation interaction and expanded-state checks |
| Product hero | Scroll-pinned product presentation with four selectable tabs, animated icon selection, changing product panels and colored backgrounds. Tab selection moves the presentation to its expanded scroll position; the close control exits it. | `hero-{scheduling,callie,notetaker,payments}-{a,b}.png` |
| Meeting workflow | Book, Prep, Capture, and Follow up cards expand on hover, reveal descriptions and step lists, and change artwork. Card width transition is declared as 500ms ease-in-out; shadow transition is 180ms. | `workflow-{book,prep,capture,follow-up}.png` |
| Scheduling | Sticky illustration changes as six feature descriptions scroll through the active position. Inactive descriptions fade. | `feature-scheduling-{1..6}-{a,b}.png` |
| Callie | Three expandable feature panels switch animated email/assistant demos. Active panels have a progressing colored underline. | `feature-callie-{1..3}-{a,b}.png` |
| Notetaker | Four expandable feature panels switch animated recap, email, integration, and recall demos. | `feature-notetaker-{1..4}-{a,b}.png` |
| Payments | Four expandable feature panels switch animated payment, package, invoice, and payment-link demos. | `feature-payments-{1..4}-{a,b}.png` |
| Customer stories | Five tab selections change the centered story in a horizontal carousel with smaller neighboring cards. All five tab/panel changes verified. | `customer-story-{1..5}.png` |
| Integrations | Icon grid and suite cards; captured default and Zoom-hover appearances. | `integrations-a.png`, `integrations-hover.png` |
| Final call to action | Moving horizontal portrait cards with status labels such as Discovery Scheduled, Meeting Summarized, Interview Booked, and Payment Received. | `footer-motion-{a,b}.png` |

Paired screenshots, separated by roughly 1.7–2.5 seconds after initial settling, differed for all four hero demos and all 17 feature demos. This verifies visible motion in each captured presentation; it does not establish every loop's exact duration. Scroll/entrance transitions and layout changes were also observed during the full-page pass.

## Product demo coverage

- **Scheduling:** Full control over your calendar; Meeting templates for every scenario; Automated email & text workflows; Website embeds and routing forms; Scheduling whenever, wherever; Tools for teams of all sizes.
- **Callie:** Conversational scheduling; Precise coordination; 24/7 assistance with meeting tasks.
- **Notetaker:** Clear summaries with next steps; Pre-drafted follow-up emails; Works with your tools; Instant meeting recall.
- **Payments:** Upfront meeting payments; Meeting packages; Invoices; Payment links.

## Videos and rendering

The inspected desktop homepage had **no HTML video/audio elements, video-player iframe URLs, or observed MP4, WebM, MOV, HLS, YouTube-embed, Vimeo-player, or Wistia requests**. The video-like product demonstrations are Rive animations rendered into canvases. For example, the Notetaker illustration includes a video-player design inside its Rive canvas, rather than a separate playable video element.

Network inspection found **22 unique Rive files**, all returning HTTP 200: four hero demos, 17 feature demos, and `scheduling-homepage-hero-animation.riv`. The last asset belonged to an additional hero whose canvas had zero dimensions in this desktop presentation; it was fetched but its playback was not visually verified.

See [media inventory](calendly-media-inventory.json) for the exact asset URLs. Scope is the homepage variant served in this session at the desktop viewport; mobile layouts and other experiment variants were not audited. The browser was left at the top of the homepage.
