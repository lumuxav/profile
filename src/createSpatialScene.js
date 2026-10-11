import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  PMREMGenerator,
  ACESFilmicToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createSpatialModels } from "./spatialModels";

export function createSpatialScene(
  host,
  { motion, variant, interactive, onStatus },
) {
  const canvas = document.createElement("canvas");
  const compact = window.matchMedia(
    "(max-width: 900px), (pointer: coarse)",
  ).matches;
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: !compact,
    powerPreference: "low-power",
  });
  if (!context) throw new Error("WebGL unavailable");
  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: !compact,
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, compact ? 1.15 : 1.6),
  );
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.transmissionResolutionScale = 0.5;
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 30);
  camera.position.set(0, 0, 7.8);
  const generator = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  generator.dispose();
  const key = new DirectionalLight(0xffffff, 3);
  key.position.set(-3, 4, 4);
  const rim = new DirectionalLight(0xff677f, 2.6);
  rim.position.set(3, -0.4, 2);
  const fill = new DirectionalLight(0x9eaef8, 2);
  fill.position.set(-2, -2, 2);
  scene.add(key, rim, fill, new AmbientLight(0xc5ccec, 0.65));
  const model = createSpatialModels(compact);
  model.setVariant(variant);
  scene.add(model.root);
  host.querySelector(".spatial-canvas").append(canvas);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let moving = motion,
    visible = true,
    disposed = false,
    lost = false;
  let last = 0,
    elapsed = 0,
    targetX = 0,
    targetY = 0,
    inputX = 0,
    inputY = 0;
  let scrollDepth = 0,
    drag = null,
    spin = 0;
  let bounds = host.getBoundingClientRect();
  const interval = compact ? 1000 / 30 : 1000 / 50;

  function draw(time = 0) {
    if (disposed || lost) return;
    if (time && last && time - last < interval) return;
    const delta = last && time ? Math.min((time - last) / 1000, 0.08) : 0;
    last = time;
    if (moving && !reduced.matches) {
      elapsed += delta;
      inputX += (targetX - inputX) * 0.06;
      inputY += (targetY - inputY) * 0.06;
      model.root.rotation.set(
        Math.sin(elapsed * 0.25) * 0.12 + inputY * 0.12,
        elapsed * 0.17 + inputX * 0.3 + spin,
        Math.sin(elapsed * 0.18) * 0.09,
      );
      model.root.position.y =
        Math.sin(elapsed * 0.7) * 0.085 + scrollDepth * 0.12;
      model.orbiters.rotation.y = elapsed * -0.28;
      model.orbiters.rotation.z = elapsed * 0.12;
    }
    renderer.render(scene, camera);
  }

  function syncLoop() {
    last = 0;
    renderer.setAnimationLoop(
      moving && visible && !reduced.matches && !document.hidden && !lost
        ? draw
        : null,
    );
    if (visible && !document.hidden) draw();
  }
  function resize() {
    bounds = host.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    camera.aspect = bounds.width / bounds.height;
    camera.position.z = camera.aspect < 0.9 ? 8.8 : 7.8;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    last = 0;
    draw();
  }
  function scroll() {
    if (!visible) return;
    bounds = host.getBoundingClientRect();
    scrollDepth = Math.max(
      -1,
      Math.min(
        1,
        (window.innerHeight / 2 - bounds.top - bounds.height / 2) /
          window.innerHeight,
      ),
    );
  }
  function pointer(event) {
    if (!moving || reduced.matches) return;
    if (drag?.id === event.pointerId)
      spin = drag.spin + (event.clientX - drag.x) * 0.008;
    targetX = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
    );
    targetY = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
    );
  }
  function pointerDown(event) {
    if (!moving || reduced.matches || event.button > 0) return;
    bounds = host.getBoundingClientRect();
    drag = { id: event.pointerId, x: event.clientX, spin };
    host.setPointerCapture(event.pointerId);
    host.dataset.dragging = "true";
  }
  function pointerEnd() {
    drag = null;
    delete host.dataset.dragging;
  }
  function pointerLeave() {
    if (!drag) {
      targetX = 0;
      targetY = 0;
    }
  }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    renderer.setAnimationLoop(null);
    onStatus("fallback");
  }
  function contextRestored() {
    lost = false;
    syncLoop();
    onStatus("ready");
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      scroll();
      syncLoop();
    },
    { rootMargin: "60px" },
  );
  observer.observe(host);
  document.addEventListener("visibilitychange", syncLoop);
  reduced.addEventListener("change", syncLoop);
  window.addEventListener("scroll", scroll, { passive: true });
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  if (interactive) {
    host.addEventListener("pointermove", pointer, { passive: true });
    host.addEventListener("pointerdown", pointerDown);
    host.addEventListener("pointerup", pointerEnd);
    host.addEventListener("pointercancel", pointerEnd);
    host.addEventListener("lostpointercapture", pointerEnd);
    host.addEventListener("pointerleave", pointerLeave);
  }
  resize();
  syncLoop();
  onStatus("ready");
  return {
    setMotion(value) {
      moving = value;
      syncLoop();
    },
    setVariant(value) {
      model.setVariant(value);
      last = 0;
      draw();
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      reduced.removeEventListener("change", syncLoop);
      window.removeEventListener("scroll", scroll);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerdown", pointerDown);
      host.removeEventListener("pointerup", pointerEnd);
      host.removeEventListener("pointercancel", pointerEnd);
      host.removeEventListener("lostpointercapture", pointerEnd);
      host.removeEventListener("pointerleave", pointerLeave);
      model.dispose();
      environment.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
