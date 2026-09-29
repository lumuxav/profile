import { useEffect } from "react";

export function useSceneMotion(root, motion) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;

    const hero = page.querySelector(".hero");
    const about = page.querySelector(".about-section");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    function update() {
      frame = 0;
      const depth = motion && !reduced.matches;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0;
      page.style.setProperty("--reading-progress", progress);
      const top = hero.getBoundingClientRect().top;
      hero.style.setProperty(
        "--hero-shift",
        depth ? `${Math.min(48, Math.max(0, -top * 0.075))}px` : "0px",
      );
      hero.style.setProperty("--pointer-x", depth ? pointerX : 0);
      hero.style.setProperty("--pointer-y", depth ? pointerY : 0);
      const rect = about.getBoundingClientRect();
      const travel = Math.max(
        -12,
        Math.min(
          12,
          (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.025,
        ),
      );
      about.style.setProperty("--photo-shift", depth ? `${travel}px` : "0px");
    }

    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(update);
    }

    function pointer(event) {
      if (
        !motion ||
        reduced.matches ||
        !finePointer.matches ||
        event.pointerType !== "mouse"
      )
        return;
      const rect = hero.getBoundingClientRect();
      pointerX = Math.max(
        -1,
        Math.min(1, (event.clientX / rect.width - 0.5) * 2),
      );
      pointerY = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
      );
      schedule();
    }

    function leave() {
      pointerX = 0;
      pointerY = 0;
      schedule();
    }

    function visibility() {
      page.dataset.pageHidden = String(document.hidden);
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    }

    const scenes = new Set();
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                entry.target.dataset.inView = String(entry.isIntersecting);
              });
            },
            { rootMargin: "80px" },
          )
        : null;

    function observeScenes() {
      scenes.forEach((scene) => {
        if (!page.contains(scene)) {
          observer?.unobserve(scene);
          scenes.delete(scene);
        }
      });
      page.querySelectorAll("[data-motion-scene]").forEach((scene) => {
        if (scenes.has(scene)) return;
        scenes.add(scene);
        observer?.observe(scene);
      });
      schedule();
    }

    const mutations = new MutationObserver(observeScenes);
    mutations.observe(page, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule);
    resize.observe(page);
    observeScenes();
    visibility();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    hero.addEventListener("pointermove", pointer, { passive: true });
    hero.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      mutations.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      hero.removeEventListener("pointermove", pointer);
      hero.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", visibility);
      scenes.forEach((scene) => delete scene.dataset.inView);
      delete page.dataset.pageHidden;
      hero.style.removeProperty("--hero-shift");
      hero.style.removeProperty("--pointer-x");
      hero.style.removeProperty("--pointer-y");
      about.style.removeProperty("--photo-shift");
    };
  }, [root, motion]);
}
