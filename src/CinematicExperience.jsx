import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Network,
  Sparkles,
} from "lucide-react";
import { profile } from "./profile";
import SpatialScene from "./SpatialScene";

function useFilmScroll(ref, enabled) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const mobile = window.innerWidth <= 900;
      const travel = mobile
        ? element.offsetHeight
        : Math.max(1, element.offsetHeight - window.innerHeight);
      const progress =
        enabled && !reduced.matches
          ? Math.max(0, Math.min(1, -bounds.top / travel))
          : 0;
      element.style.setProperty("--film-progress", progress.toFixed(3));
      element.style.setProperty(
        "--portrait-scale",
        (1 - progress * 0.075).toFixed(4),
      );
      element.style.setProperty(
        "--portrait-lift",
        `${progress * (mobile ? -24 : -54)}px`,
      );
      element.style.setProperty(
        "--title-lift",
        `${progress * (mobile ? -12 : -90)}px`,
      );
    };
    const request = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    reduced.addEventListener("change", request);
    document.addEventListener("visibilitychange", request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduced.removeEventListener("change", request);
      document.removeEventListener("visibilitychange", request);
    };
  }, [ref, enabled]);
}

export function CinematicHero({ motion = true }) {
  const hero = useRef(null);
  useFilmScroll(hero, motion);
  return (
    <section
      className="film-hero"
      id="home"
      ref={hero}
      aria-labelledby="film-hero-title"
      data-motion-scene
    >
      <div className="film-frame">
        <div className="film-radiance" aria-hidden="true" />
        <div className="film-hairlines" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="film-topline">
          <span>THE PORTFOLIO OF LUMU FRANCIS XAVIER</span>
          <span>
            KAMPALA, UGANDA <i /> AVAILABLE WORLDWIDE
          </span>
        </div>
        <div className="film-stage">
          <div className="film-poster" aria-hidden="true">
            <span className="film-poster-name">XAVIER</span>
            <span className="film-poster-sub">
              ENGINEERING WITH IMAGINATION.
            </span>
          </div>
          <div className="film-portrait-halo" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="film-portrait">
            <img
              src={profile.portrait}
              width="1080"
              height="1080"
              fetchPriority="high"
              alt="Lumu Francis Xavier"
            />
          </div>
          <div className="film-orbital" aria-hidden="true">
            <SpatialScene motion={motion} />
          </div>
          <a href="#expertise" className="film-floating-card film-glass">
            <span className="film-card-symbol">
              <Network size={21} aria-hidden="true" />
            </span>
            <span>
              <small>CONNECTED THINKING</small>
              <strong>
                From idea.
                <br />
                To entire ecosystem.
              </strong>
            </span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <span className="film-scene-signature" aria-hidden="true">
            CREATIVITY, IN MOTION. <span>↗</span>
          </span>
        </div>
        <div className="film-caption-block film-glass">
          <p className="film-overline">
            <span className="film-red-dot" /> INDEPENDENT SOFTWARE ENGINEER
          </p>
          <h1 id="film-hero-title" className="film-headline">
            <span>Beyond</span>
            <span>
              the <em>expected.</em>
            </span>
          </h1>
          <p className="film-description">
            I connect expressive interfaces, applied AI and the systems
            underneath. Turning ambitious ideas into things people can use.
          </p>
          <div className="film-actions">
            <a className="film-button-primary" href="#work">
              Explore my work <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="film-button-secondary" href="#contact">
              Let’s build <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="film-card-footer">
            <span>SOFTWARE · INTELLIGENCE · SYSTEMS</span>
            <span>01 / INTRO</span>
          </div>
        </div>
        <div className="film-bottom-strip">
          <span>
            <i /> OPEN TO COLLABORATIONS
          </span>
          <a href="#vision">
            SCROLL TO EXPLORE <ArrowDown size={15} aria-hidden="true" />
          </a>
          <span>IDEAS HAVE NO CEILING.</span>
        </div>
      </div>
    </section>
  );
}

const dimensions = [
  {
    id: "systems",
    label: "Systems",
    icon: Network,
    number: "01",
    title: "See the whole system.",
    description:
      "Network architecture, connected services and automation. Every component has a purpose. Every connection matters.",
  },
  {
    id: "intelligence",
    label: "AI & data",
    icon: Sparkles,
    number: "02",
    title: "Give information direction.",
    description:
      "Computer vision, model pipelines and structured data. Intelligence becomes useful when it reaches the right interface.",
  },
  {
    id: "interfaces",
    label: "Interfaces",
    icon: Braces,
    number: "03",
    title: "Make complexity feel simple.",
    description:
      "Web platforms and mobile experiences with thoughtful interactions, clear journeys and the engineering to support them.",
  },
];

export function CinematicInterlude({ motion }) {
  const [selected, setSelected] = useState("systems");
  const dimension = dimensions.find(({ id }) => id === selected);
  return (
    <section
      className="film-interlude"
      id="vision"
      aria-labelledby="film-interlude-title"
      data-motion-scene
    >
      <div className="film-interlude-top">
        <span>THINK IN SYSTEMS. CREATE IN DIMENSIONS.</span>
        <span>02 / PERSPECTIVE</span>
      </div>
      <div className="film-interlude-grid">
        <div className="film-vision-copy">
          <span className="film-section-kicker">
            <span>✳</span> ONE MIND. CONNECTED DISCIPLINES.
          </span>
          <h2 id="film-interlude-title" data-reveal>
            Ideas in
            <br />
            <span>every</span>
            <br />
            <em>dimension.</em>
          </h2>
          <p>
            Great products happen where disciplines meet. I bring the interface,
            the intelligence and the infrastructure into the same conversation.
          </p>
          <a className="film-vision-link" href="#expertise">
            Explore my expertise <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="dimension-panel">
          <div className="dimension-topline">
            <span>
              <i /> EXPLORE THE CONNECTIONS
            </span>
            <span>{dimension.number} / 03</span>
          </div>
          <div className="dimension-art">
            <div className="dimension-orbit" aria-hidden="true" />
            <SpatialScene motion={motion} variant={selected} interactive />
            <span className="dimension-caption" aria-hidden="true">
              A DIFFERENT PERSPECTIVE.
            </span>
          </div>
          <div
            className="dimension-tabs"
            role="group"
            aria-label="Explore engineering disciplines"
          >
            {dimensions.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                aria-pressed={selected === id}
                aria-controls="dimension-story"
                onClick={() => setSelected(id)}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <div
            className="dimension-story"
            id="dimension-story"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3>{dimension.title}</h3>
            <p>{dimension.description}</p>
          </div>
          <span className="dimension-hint">
            Choose a discipline. Explore a new perspective.
          </span>
        </div>
      </div>
      <div className="film-red-ribbon" aria-hidden="true">
        <div className="film-ribbon-track">
          {[0, 1].map((i) => (
            <span key={i}>
              SOFTWARE ENGINEERING <b>✳</b> ARTIFICIAL INTELLIGENCE <b>✳</b>{" "}
              CONNECTED SYSTEMS <b>✳</b> DIGITAL EXPERIENCES <b>✳</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
