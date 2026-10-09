import { useEffect, useRef, useState } from "react";

const CDN = {
  three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
  vanta: "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js",
  spline: "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js",
  anime: "https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.esm.min.js"
};
const SPLINE_SCENE = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";
const loadedScripts = new Map();

function getScript(url, type) {
  if (loadedScripts.has(url)) return loadedScripts.get(url);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    if (type) script.type = type;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Optional animation could not load"));
    document.head.appendChild(script);
  });
  loadedScripts.set(url, promise);
  promise.catch(() => loadedScripts.delete(url));
  return promise;
}

function useVisible(ref, margin = "160px") {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: margin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, margin]);
  return visible;
}

function allowHeavy() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !navigator.connection?.saveData &&
    window.matchMedia("(min-width: 861px)").matches;
}

export function SceneArt({ kind = "network", motion = true, className = "" }) {
  const ref = useRef(null);
  const host = useRef(null);
  const controller = useRef(null);
  const visible = useVisible(ref);
  useEffect(() => {
    let cancelled = false;
    if (!visible || !motion || !allowHeavy()) return;
    import("./createSectionScene.js").then(({ createSectionScene }) => {
      if (cancelled || !host.current) return;
      controller.current = createSectionScene(host.current, kind, motion);
    }).catch(() => {});
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [kind, visible, motion]);
  return (
    <div className={"cinematic-shape shape-" + kind + " " + className} ref={ref} aria-hidden="true">
      <div className="shape-aura" />
      <div className="shape-orbit shape-orbit-one" />
      <div className="shape-orbit shape-orbit-two" />
      <div className="shape-inner">
        <span className="shape-core" />
        <span className="shape-point point-a" />
        <span className="shape-point point-b" />
        <span className="shape-point point-c" />
      </div>
      <div className="shape-webgl" ref={host} />
    </div>
  );
}

export function NetworkAtmosphere({ motion = true, tone = "light" }) {
  const ref = useRef(null);
  const host = useRef(null);
  const visible = useVisible(ref, "80px");
  useEffect(() => {
    if (!visible || !motion || !allowHeavy()) return;
    let cancelled = false;
    let instance;
    (async () => {
      try {
        await getScript(CDN.three);
        if (cancelled) return;
        await getScript(CDN.vanta);
        if (cancelled || !host.current || !window.VANTA?.NET) return;
        instance = window.VANTA.NET({
          el: host.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          color: tone === "dark" ? 0x729cb9 : 0x617b9d,
          backgroundColor: tone === "dark" ? 0x071526 : 0xe5e8f0,
          points: 7,
          maxDistance: 20,
          spacing: 20,
          showDots: true,
          minWidth: 200,
          minHeight: 200
        });
      } catch {}
    })();
    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [motion, visible, tone]);
  return (
    <div className={"kinetic-network network-" + tone} ref={ref} aria-hidden="true">
      <div className="network-fallback" />
      <div className="network-vanta" ref={host} />
    </div>
  );
}

export function SplineAtmosphere({ motion = true }) {
  const ref = useRef(null);
  const host = useRef(null);
  const visible = useVisible(ref, "50px");
  useEffect(() => {
    if (!visible || !motion || !allowHeavy()) return;
    let cancelled = false;
    let viewer;
    (async () => {
      try {
        await getScript(CDN.spline, "module");
        if (cancelled || !host.current) return;
        await customElements.whenDefined("spline-viewer");
        if (cancelled || !host.current) return;
        viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", SPLINE_SCENE);
        viewer.setAttribute("loading", "lazy");
        viewer.setAttribute("aria-hidden", "true");
        viewer.setAttribute("background", "transparent");
        viewer.style.pointerEvents = "none";
        host.current.appendChild(viewer);
      } catch {}
    })();
    return () => { cancelled = true; viewer?.remove(); };
  }, [visible, motion]);
  return (
    <div className="spline-environment" ref={ref} aria-hidden="true">
      <span className="spline-ambient-ring ring-one" />
      <span className="spline-ambient-ring ring-two" />
      <span className="spline-ambient-sphere" />
      <div className="spline-environment-render" ref={host} />
    </div>
  );
}

export function GlobalAtmosphere() {
  return (
    <div className="sitewide-atmosphere" aria-hidden="true">
      <span className="ambient-star star-one" />
      <span className="ambient-star star-two" />
      <span className="ambient-star star-three" />
      <span className="ambient-thread thread-one" />
      <span className="ambient-thread thread-two" />
    </div>
  );
}

export function useCinematicAnimations(ref, motion) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let observer;
    const animations = [];
    (async () => {
      try {
        const { animate, stagger } = await import(/* @vite-ignore */ CDN.anime);
        if (cancelled) return;
        const sections = root.querySelectorAll(".hero, .expertise-section, .work-section, .about-section, .philosophy, .contact-section");
        observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            const targets = entry.target.querySelectorAll(".skill-icon, .project-art, .about-credentials > div, .process > div, .contact-form, .floating-badge");
            if (!targets.length) continue;
            animations.push(animate(targets, {
              opacity: [.65, 1],
              y: [14, 0],
              duration: 1000,
              delay: stagger(80),
              ease: "outExpo"
            }));
          }
        }, { threshold: .06 });
        sections.forEach(section => observer.observe(section));
      } catch {}
    })();
    return () => {
      cancelled = true;
      observer?.disconnect();
      animations.forEach(animation => animation?.pause?.());
    };
  }, [ref, motion]);
}
