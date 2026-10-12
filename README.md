# Calendly homepage recreation

Next.js App Router, TypeScript, Tailwind CSS and locally hosted Rive animations.

```sh
pnpm install
pnpm dev --port 3001
```

Open http://localhost:3001. Production: `pnpm build` then `pnpm start`.

The complete homepage is composed in `app/page.tsx`; interactive sections live in `components/`. Reference content is in `data/content.json`. Original public fonts, illustrations, portraits, SVG artwork, Rive files and the WASM runtime are served locally from `public/`.

Implemented interactions include desktop dropdowns, mobile navigation, scroll-controlled hero tabs, workflow cards, product accordions, customer carousel, stepped conversion carousel, language links and local privacy preferences. Reduced-motion preferences are supported. Out-of-scope links lead to their original Calendly destinations. Authentication, payment processing and the third-party support backend are not simulated.

## Validation

- Playwright MCP inspected the live homepage and its animation assets.
- Matching full-page screenshots captured at widths 1440, 1280, 768 and 390, with a 1000px viewport height; see `artifacts/`.
- Production build, TypeScript and ESLint checks pass.
- Keyboard navigation, tabs, accordions, carousel, mobile menu and privacy dialog checked in Playwright.
- No horizontal overflow at the four target widths.

The recreation uses the original Rive demonstrations. Small differences remain in scroll transition curves, browser-specific rounded shapes, and dynamic animation frames. The support widget opens a local help panel linking to Calendly support. The privacy dialog stores only this recreation's preference locally.

The inspected reference contains canvas/Rive demonstrations, not native video elements. Downloaded reference scripts in `artifacts/` are inspection material and are not imported or executed by the application.
