import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Box, Cpu, MousePointer2, MoveUpRight, Play, Sparkles, X } from "lucide-react";

const DEMO_SCENE = "https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode";
const SPLINE_VIEWER = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
const LEGACY_THREE = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_NET = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js";
const ANIME_MODULE = "https://cdn.jsdelivr.net/npm/animejs@4.5.0/dist/bundles/anime.esm.min.js";

const scripts = new Map();
function loadScript(url, type) {
  if (scripts.has(url)) return scripts.get(url);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    if (type) script.type = type;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Unable to load the 3D resource"));
    document.head.appendChild(script);
  });
  scripts.set(url, promise);
  promise.catch(() => scripts.delete(url));
  return promise;
}

function useInView(ref, margin = "180px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: margin });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, margin]);
  return near;
}

function VantaField({ enabled, near }) {
  const canvas = useRef(null);
  const instance = useRef(null);
  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (!enabled || !near || reduce || saveData || window.innerWidth < 720 || !canvas.current) return;
    (async () => {
      try {
        await loadScript(LEGACY_THREE);
        if (cancelled) return;
        await loadScript(VANTA_NET);
        if (cancelled || !canvas.current || !window.VANTA?.NET) return;
        instance.current = window.VANTA.NET({
          el: canvas.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          color: 0x80bbdb,
          backgroundColor: 0x071322,
          points: 9,
          maxDistance: 23,
          spacing: 19,
          showDots: true,
        });
      } catch {
        canvas.current?.classList.add("vanta-static");
      }
    })();
    return () => {
      cancelled = true;
      instance.current?.destroy();
      instance.current = null;
    };
  }, [enabled, near]);
  return <div className="vanta-field" ref={canvas} aria-hidden="true" />;
}

function ThreeSculpture({ motion, near }) {
  const host = useRef(null);
  const controller = useRef(null);
  useEffect(() => {
    let cancelled = false;
    if (!near || !host.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    import("./createOrbitScene").then(({ createOrbitScene }) => {
      if (cancelled || !host.current) return;
      controller.current = createOrbitScene(host.current, motion);
    }).catch(() => {});
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [near]);
  useEffect(() => { controller.current?.setMotion(motion); }, [motion]);
  return (
    <div className="lab-three-wrap">
      <div className="lab-three-fallback" aria-hidden="true"><i /><i /><i /></div>
      <div className="lab-three-canvas" ref={host} aria-label="Interactive three-dimensional orbital sculpture" role="img" />
      <span className="lab-axis axis-x">X / 01</span>
      <span className="lab-axis axis-y">Y / ∞</span>
    </div>
  );
}

function SplineStage({ active, onClose }) {
  const mount = useRef(null);
  const [state, setState] = useState("idle");
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let viewer;
    setState("loading");
    loadScript(SPLINE_VIEWER, "module").then(() => {
      if (cancelled || !mount.current) return;
      viewer = document.createElement("spline-viewer");
      viewer.setAttribute("url", DEMO_SCENE);
      viewer.setAttribute("loading", "lazy");
      viewer.setAttribute("background", "#080d1a");
      viewer.setAttribute("aria-label", "Interactive 3D demonstration from Spline");
      viewer.className = "spline-player";
      mount.current.replaceChildren(viewer);
      setState("ready");
    }).catch(() => {
      if (!cancelled) setState("error");
    });
    return () => {
      cancelled = true;
      viewer?.remove();
      mount.current?.replaceChildren();
    };
  }, [active]);
  return (
    <div className="spline-stage">
      {active ? (
        <>
          <div className="spline-mount" ref={mount} />
          {state === "loading" && <div className="spline-loading" role="status">Initializing the 3D world…</div>}
          {state === "error" && <div className="spline-loading" role="status">The interactive scene is unavailable. Please check your connection and try again.</div>}
          <button className="lab-close-scene" type="button" onClick={onClose} aria-label="Close interactive scene"><X size={18} /></button>
        </>
      ) : (
        <div className="spline-idle" aria-hidden="true">
          <div className="spline-satellite s-one" /><div className="spline-satellite s-two" />
          <div className="spline-core"><Box size={72} strokeWidth={0.7} /></div>
          <span>CLICK TO ENTER THE THIRD DIMENSION</span>
        </div>
      )}
    </div>
  );
}

function useAnimeLab(ref, near, motion) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !near || !motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let animation;
    (async () => {
      try {
        const { animate, stagger } = await import(/* @vite-ignore */ ANIME_MODULE);
        if (cancelled) return;
        const targets = [...node.querySelectorAll("[data-anime-lab]")];
        animation = animate(targets, {
          opacity: [0, 1],
          y: [26, 0],
          duration: 1100,
          delay: stagger(115),
          ease: "outExpo",
        });
      } catch {
        // The section remains completely readable without the optional animation CDN.
      }
    })();
    return () => {
      cancelled = true;
      animation?.pause?.();
    };
  }, [ref, near, motion]);
}

export default function ImmersiveLab({ motion }) {
  const labRef = useRef(null);
  const sculptureRef = useRef(null);
  const near = useInView(labRef, "220px");
  const sculptureNear = useInView(sculptureRef, "60px");
  const [splineActive, setSplineActive] = useState(false);
  useAnimeLab(labRef, near, motion);
  useEffect(() => {
    if (!motion) setSplineActive(false);
  }, [motion]);
  return (
    <section className="immersive-lab" id="lab" aria-labelledby="lab-title" ref={labRef} data-motion-scene>
      <div className="lab-sky">
        <VantaField near={near} enabled={motion && !splineActive} />
        <div className="lab-sky-overlay" />
        <div className="container lab-hero">
          <div className="lab-pretitle" data-anime-lab><span className="lab-live" /> CREATIVE COMPUTATION / 001</div>
          <h2 id="lab-title"><span data-anime-lab>Beyond the screen.</span><em data-anime-lab>Into the extraordinary.</em></h2>
          <p data-anime-lab>Code is more than something you read. It can be a world you enter, a system you touch, or an idea you watch come alive.</p>
          <div className="lab-sky-bottom" data-anime-lab><span>EXPLORE THE INTERACTIVE LAB</span><ArrowRight size={22} /></div>
        </div>
      </div>
      <div className="container lab-content">
        <div className="lab-headline"><div><span className="lab-eyebrow"><Sparkles size={15} /> IMMERSIVE EXPERIMENTS</span><h3>Touch the <i>future.</i></h3></div><p>Two interactive spaces. One philosophy: technology should feel as remarkable as the possibilities behind it.</p></div>
        <div className="lab-gallery">
          <article className="lab-display" ref={sculptureRef}>
            <div className="lab-display-top"><span>01 / THREE.JS</span><span className="lab-online"><i /> LIVE RENDER</span></div>
            <ThreeSculpture motion={motion} near={sculptureNear && motion} />
            <div className="lab-display-info"><div><h4>Spatial intelligence.</h4><p>Real-time geometry, light and motion. Move your cursor to influence this living sculpture.</p></div><span className="lab-display-icon"><MousePointer2 size={22} /></span></div>
          </article>
          <article className="lab-display lab-spline-display">
            <div className="lab-display-top"><span>02 / SPLINE 3D</span><span>INTERACTIVE WORLD</span></div>
            <SplineStage active={splineActive} onClose={() => setSplineActive(false)} />
            <div className="lab-display-info"><div><h4>Enter another dimension.</h4><p>Explore a public Spline demonstration. The scene loads only when you enter.</p></div>
              <button type="button" onClick={() => setSplineActive(value => !value)} className="lab-enter" disabled={!motion} aria-label={splineActive ? "Close Spline scene" : "Launch Spline scene"}>{splineActive ? <X size={20} /> : <Play size={20} fill="currentColor" />}</button>
            </div>
          </article>
        </div>
        <div className="lab-footnote"><span><Cpu size={16} /> THREE.JS <b>·</b> ANIME.JS <b>·</b> SPLINE <b>·</b> VANTA.JS</span><span>THE DEMONSTRATION SCENE IS PROVIDED BY <a href="https://viewer.spline.design/" target="_blank" rel="noopener noreferrer">SPLINE <MoveUpRight size={13} /></a></span></div>
        <div className="lab-bottom-cta"><span>HAVE AN IDEA THAT NEEDS A NEW DIMENSION?</span><a href="#contact">LET'S CREATE IT <ArrowUpRight size={17} /></a></div>
      </div>
    </section>
  );
}
