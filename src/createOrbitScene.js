import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Mesh,
  TorusKnotGeometry,
  TorusGeometry,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  DirectionalLight,
  AmbientLight,
  PMREMGenerator,
  ACESFilmicToneMapping,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createOrbitScene(host, motion = true) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!context) throw new Error("WebGL unavailable; use the CSS sculpture.");
  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, 0.1, 30);
  camera.position.set(0, 0, 6.9);
  const generator = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  generator.dispose();

  const sculpture = new Group();
  scene.add(sculpture);
  const geometry = new TorusKnotGeometry(1.06, 0.29, 160, 24, 2, 3);
  const material = new MeshPhysicalMaterial({
    color: 0xc5cddc,
    metalness: 0.97,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    iridescence: 0.2,
    iridescenceIOR: 1.6,
    envMapIntensity: 1.1,
  });
  const knot = new Mesh(geometry, material);
  knot.rotation.set(0.35, -0.2, -0.4);
  sculpture.add(knot);
  const ringGeometry = new TorusGeometry(1.86, 0.009, 6, 110);
  const ringMaterial = new MeshBasicMaterial({
    color: 0x586f91,
    transparent: true,
    opacity: 0.38,
  });
  const ring = new Mesh(ringGeometry, ringMaterial);
  ring.rotation.set(0.7, 0.15, -0.5);
  sculpture.add(ring);
  const ring2 = new Mesh(ringGeometry, ringMaterial);
  ring2.rotation.set(-0.7, 0.8, 0.25);
  sculpture.add(ring2);
  const satelliteGeometry = new IcosahedronGeometry(0.095, 1);
  const satellites = [];
  for (let i = 0; i < 4; i += 1) {
    const satellite = new Mesh(satelliteGeometry, material);
    const angle = i * Math.PI * 0.5;
    satellite.position.set(
      Math.cos(angle) * 1.8,
      Math.sin(angle) * 1.65,
      Math.sin(angle + 1) * 0.5,
    );
    sculpture.add(satellite);
    satellites.push(satellite);
  }
  const key = new DirectionalLight(0xf0effc, 5);
  key.position.set(-3, 3, 4);
  const fill = new DirectionalLight(0xa9bfdc, 4);
  fill.position.set(3, -1, 2);
  scene.add(key, fill, new AmbientLight(0xd0d9eb, 0.5));
  host.appendChild(renderer.domElement);

  let moving = motion,
    visible = true,
    disposed = false,
    last = 0,
    elapsed = 0;
  let targetX = 0,
    targetY = 0,
    angleX = 0,
    angleY = 0;
  function draw(time = 0) {
    if (disposed) return;
    if (last && time && time - last < 30) return;
    const delta = last && time ? Math.min((time - last) / 1000, 0.06) : 0;
    last = time;
    if (moving) {
      elapsed += delta;
      angleX += (targetX - angleX) * 0.035;
      angleY += (targetY - angleY) * 0.035;
      sculpture.rotation.set(angleY * 0.23, angleX * 0.3, 0);
      knot.rotation.y = -0.2 + elapsed * 0.15;
      knot.rotation.z = -0.4 + Math.sin(elapsed * 0.28) * 0.18;
      knot.position.y = Math.sin(elapsed * 0.7) * 0.08;
      ring.rotation.z = -0.5 + elapsed * 0.05;
      ring2.rotation.y = 0.8 - elapsed * 0.035;
      satellites.forEach((satellite, i) => {
        const angle = elapsed * 0.22 + i * Math.PI * 0.5;
        satellite.position.set(
          Math.cos(angle) * 1.84,
          Math.sin(angle) * 1.64,
          Math.sin(angle + 1) * 0.62,
        );
        satellite.rotation.y = elapsed * 0.35 + i;
      });
    }
    renderer.render(scene, camera);
  }
  function updateLoop() {
    last = 0;
    renderer.setAnimationLoop(
      moving && visible && !document.hidden ? draw : null,
    );
    draw();
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    last = 0;
    draw();
  }
  function pointer(event) {
    if (!moving || !visible || document.hidden || event.pointerType === "touch")
      return;
    const rect = host.getBoundingClientRect();
    targetX = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
    );
    targetY = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
    );
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateLoop();
  });
  observer.observe(host);
  document.addEventListener("pointermove", pointer, { passive: true });
  document.addEventListener("visibilitychange", updateLoop);
  resize();
  updateLoop();
  return {
    setMotion(value) {
      moving = value;
      updateLoop();
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", updateLoop);
      [
        geometry,
        ringGeometry,
        satelliteGeometry,
        material,
        ringMaterial,
        environment,
      ].forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
