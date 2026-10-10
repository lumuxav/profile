import React, { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CircleDot, MoveUpRight } from "lucide-react";
import { profile } from "./profile";

function useFilmScroll(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const bounds = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));
      el.style.setProperty("--film-progress", progress.toFixed(3));
      el.style.setProperty("--portrait-scale", (1 - progress * (enabled ? .15 : 0)).toFixed(4));
      el.style.setProperty("--portrait-lift", Math.round(progress * (enabled ? -62 : 0)) + "px");
      el.style.setProperty("--title-lift", Math.round(progress * (enabled ? -95 : 0)) + "px");
      el.style.setProperty("--end-opacity", Math.min(1, Math.max(0, (progress - .33) * 2)).toFixed(3));
    };
    const request = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [ref, enabled]);
}

function DetailMark({ children }) {
  return <span className="film-detail"><i aria-hidden="true" />{children}</span>;
}

export function CinematicHero({ motion = true }) {
  const hero = useRef(null);
  useFilmScroll(hero, motion);
  return (
    <section className="film-hero" id="home" ref={hero} aria-labelledby="film-hero-title" data-motion-scene>
      <div className="film-frame">
        <div className="film-radiance" aria-hidden="true" />
        <div className="film-noise" aria-hidden="true" />
        <div className="film-hairlines" aria-hidden="true"><span /><span /><span /></div>
        <div className="film-topline" aria-hidden="true">
          <span>PORTFOLIO / 2026</span>
          <span>ENGINEERING / DESIGN / INTELLIGENCE</span>
          <span>KAMPALA — WORLDWIDE</span>
        </div>
        <div className="film-poster" aria-hidden="true">
          <span className="film-poster-name">XAVIER</span>
          <span className="film-poster-sub">THE FUTURE IS SOMETHING WE BUILD.</span>
        </div>
        <div className="film-portrait" aria-hidden="true">
          <div className="film-portrait-light" />
          <img src={profile.portrait} width="1080" height="1080" fetchPriority="high" alt="" />
        </div>
        <div className="film-red-sigil" aria-hidden="true">
          <div className="film-sigil-ring" /><div className="film-sigil-center" />
        </div>
        <div className="film-caption-block">
          <p className="film-overline"><span className="film-red-dot" /> INDEPENDENT SOFTWARE ENGINEER <span className="film-divider" /> AVAILABLE FOR COLLABORATION</p>
          <h1 id="film-hero-title" className="film-headline">
            <span>BEYOND</span>
            <span className="film-headline-last">THE <em>EXPECTED.</em></span>
          </h1>
          <p className="film-description">I turn ambitious thinking into digital experiences, intelligent systems and connected technology that feels ahead of its time.</p>
          <div className="film-actions">
            <a className="film-button-primary" href="#work">EXPLORE MY WORLD <ArrowUpRight size={19} aria-hidden="true" /></a>
            <a className="film-button-secondary" href="#contact">LET'S BUILD <ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="film-edge-right" aria-hidden="true"><span>01 — 04</span><span>CODE / CREATIVITY / SYSTEMS</span></div>
        <div className="film-bottom-strip">
          <DetailMark>BEYOND THE INTERFACE</DetailMark>
          <span className="film-scroll-label">SCROLL TO ENTER <ArrowDownRight size={17} aria-hidden="true" /></span>
          <DetailMark>IDEAS WITHOUT LIMITS</DetailMark>
        </div>
        <div className="film-exit-mark" aria-hidden="true"><span>THE NEXT CHAPTER</span><b>↓</b></div>
      </div>
    </section>
  );
}

export function CinematicInterlude() {
  return (
    <section className="film-interlude" aria-labelledby="film-interlude-title">
      <div className="film-interlude-top">
        <span>AN ENGINEER'S PERSPECTIVE</span>
        <span>02 / THE VISION</span>
      </div>
      <div className="film-interlude-content">
        <p className="film-interlude-aside">THE MIND<br/>BEHIND<br/>THE MACHINES. <CircleDot size={26} aria-hidden="true"/></p>
        <h2 id="film-interlude-title" data-reveal>
          <span>NOT JUST</span>
          <span className="film-outline-line">A LINE OF</span>
          <span>CODE<span className="film-red-period">.</span></span>
        </h2>
        <div className="film-interlude-stamp" aria-hidden="true"><span>DESIGN</span><span>BUILD</span><span>EVOLVE</span></div>
      </div>
      <div className="film-interlude-bottom">
        <p>Digital products are only the beginning. I connect engineering, intelligence, infrastructure and imagination into one complete vision.</p>
        <a href="#expertise">DISCOVER THE DISCIPLINES <MoveUpRight size={19} aria-hidden="true" /></a>
      </div>
      <div className="film-red-ribbon" aria-hidden="true">
        <div className="film-ribbon-track">
          {Array.from({length:2},(_,i)=><span key={i}>SOFTWARE ENGINEERING <b>✳</b> ARTIFICIAL INTELLIGENCE <b>✳</b> SYSTEMS THINKING <b>✳</b> DIGITAL EXPERIENCES <b>✳</b></span>)}
        </div>
      </div>
    </section>
  );
}
