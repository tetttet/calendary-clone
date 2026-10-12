"use client";

import { useEffect, useRef, useState } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  RuntimeLoader,
} from "@rive-app/react-webgl2";

// The runtime and artwork are served locally; no third-party script or tracker is loaded.
RuntimeLoader.setWasmUrl("/media/rive.wasm");
function Player({ src, active }: { src: string; active: boolean }) {
  const [reduced, setReduced] = useState(false);
  const { rive, RiveComponent } = useRive({
    src,
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!rive) return;
    if (rive.stateMachineNames.length) rive.play(rive.stateMachineNames[0]);
    if (!active) rive.pause();
    if (reduced) {
      const timer = setTimeout(() => rive.pause(), 80);
      return () => clearTimeout(timer);
    }
  }, [rive, active, reduced]);
  return <RiveComponent aria-hidden="true" />;
}
export function RiveDemo({
  src,
  label,
  active = true,
  hero = false,
}: {
  src: string;
  label: string;
  active?: boolean;
  hero?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "180px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`rive-demo ${hero ? "rive-hero" : ""}`}
    >
      {loaded && <Player src={src} active={active && visible} />}
    </div>
  );
}
