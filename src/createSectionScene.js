import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, TorusKnotGeometry,
  IcosahedronGeometry, TorusGeometry, MeshPhysicalMaterial,
  MeshBasicMaterial, BufferGeometry, Float32BufferAttribute, Points,
  PointsMaterial, AdditiveBlending, DirectionalLight, AmbientLight,
  ACESFilmicToneMapping
} from "three";

export function createSectionScene(host, kind = "network", initialMotion = true) {
  const canvas = document.createElement("canvas");
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: window.innerWidth > 800, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1 : 1.4));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.75;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, .1, 30);
  camera.position.set(0, 0, 7.2);
  const group = new Group();
  scene.add(group);
  const hue = kind === "network" ? 0x8ebce8 : kind === "flow" ? 0x739cba : kind === "crystal" ? 0xc6cadb : 0x98b8a5;
  const material = new MeshPhysicalMaterial({
    color: hue, metalness: .57, roughness: .17, clearcoat: 1, clearcoatRoughness: .08, transparent: true, opacity: .9
  });
  const edge = new MeshBasicMaterial({color: 0x7394b7, transparent: true, opacity: .36, wireframe: kind === "network"});
  const coreGeometry = kind === "crystal"
    ? new IcosahedronGeometry(1.55, 2)
    : kind === "flow"
      ? new TorusKnotGeometry(1.12, .22, 210, 20, 3, 7)
      : kind === "rings"
        ? new TorusKnotGeometry(.98, .19, 160, 16, 2, 5)
        : new IcosahedronGeometry(1.3, 1);
  const core = new Mesh(coreGeometry, material);
  core.rotation.set(.25, .4, .22);
  group.add(core);
  const wire = new Mesh(new IcosahedronGeometry(1.7, 1), edge);
  if (kind === "network" || kind === "crystal") group.add(wire);
  const ringGeometry = new TorusGeometry(1.95, .018, 8, 116);
  const ringMat = new MeshBasicMaterial({color: 0x6c9ac3, transparent: true, opacity: .5});
  const rings = [new Mesh(ringGeometry, ringMat), new Mesh(ringGeometry, ringMat)];
  rings[0].rotation.set(.92, .2, -.3);
  rings[1].rotation.set(-.6, .95, .45);
  group.add(...rings);
  const dustGeometry = new BufferGeometry();
  const positions = [];
  const count = window.innerWidth < 800 ? 65 : 180;
  for (let i = 0; i < count; i++) {
    const angle = i * 2.3999632297;
    const r = 1.5 + Math.sqrt(i / count) * 2.7;
    positions.push(Math.cos(angle) * r, Math.sin(angle) * r * .8, (Math.sin(angle * 3) * 1.2) - 1);
  }
  dustGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const dustMaterial = new PointsMaterial({color: 0x83a8cf, size: .026, sizeAttenuation: true, transparent: true, opacity: .65, blending: AdditiveBlending, depthWrite: false});
  group.add(new Points(dustGeometry, dustMaterial));
  const light = new DirectionalLight(0xeaf7ff, 4.4);
  light.position.set(-3, 4, 5);
  const rim = new DirectionalLight(0x81b5e3, 3.2);
  rim.position.set(4, -2, 2);
  scene.add(light, rim, new AmbientLight(0xadc7e1, 1.8));
  let motion = initialMotion;
  let visible = true;
  let destroyed = false;
  let last = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  function draw(now = 0) {
    if (destroyed) return;
    if (last && now && now - last < 32) return;
    const dt = last && now ? Math.min((now - last) / 1000, .06) : 0;
    last = now;
    if (motion) {
      elapsed += dt;
      group.rotation.y += (pointerX * .16 - group.rotation.y) * .02;
      group.rotation.x += (pointerY * -.12 - group.rotation.x) * .02;
      core.rotation.y = .4 + elapsed * .12;
      core.rotation.z = .2 + Math.sin(elapsed * .4) * .13;
      core.position.y = Math.sin(elapsed * .65) * .085;
      rings[0].rotation.z = -.3 + elapsed * .045;
      rings[1].rotation.y = .95 - elapsed * .04;
      wire.rotation.y = -elapsed * .035;
    }
    renderer.render(scene, camera);
  }
  function loop() {
    last = 0;
    renderer.setAnimationLoop(motion && visible && !document.hidden ? draw : null);
    draw();
  }
  function resize() {
    const box = host.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) return;
    camera.aspect = box.width / box.height;
    camera.updateProjectionMatrix();
    renderer.setSize(box.width, box.height);
    draw();
  }
  function pointer(event) {
    if (event.pointerType !== "mouse" || !motion) return;
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  }
  const resizer = new ResizeObserver(resize);
  resizer.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    loop();
  }, {rootMargin: "120px"});
  observer.observe(host);
  document.addEventListener("pointermove", pointer, {passive: true});
  document.addEventListener("visibilitychange", loop);
  resize();
  loop();
  return {
    setMotion(value) {motion = value; loop();},
    dispose() {
      destroyed = true;
      renderer.setAnimationLoop(null);
      resizer.disconnect();
      observer.disconnect();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("visibilitychange", loop);
      coreGeometry.dispose();
      wire.geometry.dispose();
      ringGeometry.dispose();
      dustGeometry.dispose();
      material.dispose();
      edge.dispose();
      ringMat.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      canvas.remove();
    }
  };
}
