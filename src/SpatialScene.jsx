import React, { useEffect, useRef, useState } from "react";

export default function SpatialScene({
  motion,
  variant = "systems",
  interactive = false,
}) {
  const host = useRef(null);
  const controller = useRef(null);
  const current = useRef({ motion, variant });
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    current.current = { motion, variant };
    controller.current?.setMotion(motion);
    controller.current?.setVariant(variant);
  }, [motion, variant]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let started = false;
    const start = async () => {
      if (started || cancelled) return;
      started = true;
      try {
        const { createSpatialScene } = await import("./createSpatialScene");
        if (cancelled) return;
        controller.current = createSpatialScene(element, {
          ...current.current,
          interactive,
          onStatus: (next) => !cancelled && setStatus(next),
        });
      } catch {
        if (!cancelled) setStatus("fallback");
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          start();
        }
      },
      { rootMargin: "250px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      controller.current?.dispose();
      controller.current = null;
    };
  }, [interactive]);

  return (
    <div
      className={`spatial-scene ${interactive ? "is-interactive" : ""}`}
      ref={host}
      data-renderer={status}
      data-variant={variant}
      aria-hidden="true"
    >
      <div className="spatial-fallback">
        <div className="spatial-fallback-object">
          <i className="spatial-ring spatial-ring-one" />
          <i className="spatial-ring spatial-ring-two" />
          <i className="spatial-ring spatial-ring-three" />
          <span className="spatial-core" />
          <span className="spatial-satellite satellite-one" />
          <span className="spatial-satellite satellite-two" />
        </div>
      </div>
      <div className="spatial-canvas" />
    </div>
  );
}
