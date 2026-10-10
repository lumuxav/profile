import * as THREE from "three";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

function makeRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function connectNearest(points, maxDistance, maxLinks) {
  const positions = [];
  points.forEach((point, index) => {
    const neighbours = points
      .slice(index + 1)
      .map((target) => ({ target, distance: point.distanceTo(target) }))
      .filter(({ distance }) => distance < maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxLinks);

    neighbours.forEach(({ target }) => {
      positions.push(point.x, point.y, point.z, target.x, target.y, target.z);
    });
  });
  return positions;
}

function createWorld(container) {
  const canvas = document.createElement("canvas");
  canvas.className = "global-three-canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 90);
  camera.position.z = 10.5;

  const root = new THREE.Group();
  scene.add(root);

  const random = makeRandom(314159);
  let width = 1;
  let height = 1;
  let mobile = false;
  let starPoints = [];
  let starGeometry;
  let lineGeometry;
  let particles;
  let lines;
  const shapes = new THREE.Group();
  root.add(shapes);

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x456987,
    size: 0.034,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  });

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x5f83a7,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x6b86a5,
    wireframe: true,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });

  const glassMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8e8f6,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });

  const glowMaterial = new THREE.PointsMaterial({
    color: 0x9dc1dc,
    size: 0.09,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  });

  const geometries = [
    new THREE.TorusKnotGeometry(0.68, 0.16, 96, 12, 2, 5),
    new THREE.IcosahedronGeometry(0.78, 1),
    new THREE.TorusGeometry(0.76, 0.025, 8, 92),
  ];

  const shapeA = new THREE.Mesh(geometries[0], wireMaterial);
  const shapeB = new THREE.Mesh(geometries[1], wireMaterial);
  const shapeC = new THREE.Mesh(geometries[2], glassMaterial);
  shapes.add(shapeA, shapeB, shapeC);

  const glowGeometry = new THREE.BufferGeometry();
  const glowPositions = new Float32Array([
    2.6, 1.3, -1.4,
    -2.9, -1.6, -2.1,
    2.2, -2.0, -1.8,
  ]);
  glowGeometry.setAttribute("position", new THREE.BufferAttribute(glowPositions, 3));
  const glows = new THREE.Points(glowGeometry, glowMaterial);
  root.add(glows);

  function disposeStarGeometry() {
    particles?.removeFromParent();
    lines?.removeFromParent();
    starGeometry?.dispose();
    lineGeometry?.dispose();
    particles = null;
    lines = null;
  }

  function rebuildStars() {
    disposeStarGeometry();
    const distance = camera.position.z;
    const vertical = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    const horizontal = vertical * camera.aspect;
    const count = mobile ? 125 : 230;
    starPoints = [];
    const starPositions = [];

    for (let i = 0; i < count; i += 1) {
      const x = (random() - 0.5) * horizontal * 1.25;
      const y = (random() - 0.5) * vertical * 1.35;
      const z = -2.2 - random() * 3.4;
      const point = new THREE.Vector3(x, y, z);
      starPoints.push(point);
      starPositions.push(x, y, z);
    }

    starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    particles = new THREE.Points(starGeometry, particleMaterial);
    root.add(particles);

    lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        connectNearest(starPoints, mobile ? 1.65 : 1.9, mobile ? 1 : 2),
        3,
      ),
    );
    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    root.add(lines);
  }

  function resize() {
    width = window.innerWidth || 1;
    height = window.innerHeight || 1;
    mobile = width < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.55));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    particleMaterial.size = mobile ? 0.044 : 0.034;
    lineMaterial.opacity = mobile ? 0.36 : 0.3;
    rebuildStars();
  }

  let targetX = 0;
  let targetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  let lastTime = 0;
  let disposed = false;

  function placeShapes(scrollProgress) {
    const distance = camera.position.z;
    const vertical = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    const horizontal = vertical * camera.aspect;

    shapeA.position.set(horizontal * (mobile ? 0.18 : 0.28), vertical * (mobile ? -0.12 : -0.08), -1.1);
    shapeA.scale.setScalar(mobile ? 0.78 : 1.08);

    shapeB.position.set(horizontal * -0.37, vertical * (0.2 - scrollProgress * 0.36), -2.6);
    shapeB.scale.setScalar(mobile ? 0.42 : 0.72);

    shapeC.position.set(horizontal * 0.34, vertical * (-0.38 + scrollProgress * 0.24), -2.0);
    shapeC.scale.setScalar(mobile ? 0.65 : 1.0);
  }

  function readMotionState() {
    const portfolio = document.querySelector(".portfolio");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !reduced && portfolio?.dataset.motion !== "paused" && !document.hidden;
  }

  function render(time = 0) {
    if (disposed) return;
    const moving = readMotionState();
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - height);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    pointerX += (targetX - pointerX) * 0.04;
    pointerY += (targetY - pointerY) * 0.04;

    placeShapes(progress);

    if (moving) {
      const t = time * 0.001;
      root.rotation.y = pointerX * 0.06 + Math.sin(t * 0.13) * 0.025;
      root.rotation.x = pointerY * -0.045 + (progress - 0.5) * 0.08;
      root.position.y = (progress - 0.5) * (mobile ? 0.3 : 0.55);

      particles.rotation.z = Math.sin(t * 0.07) * 0.03;
      lines.rotation.z = particles.rotation.z;
      shapeA.rotation.set(t * 0.18, t * 0.23, Math.sin(t * 0.4) * 0.12);
      shapeB.rotation.set(0.4 + t * 0.11, t * -0.15, t * 0.08);
      shapeC.rotation.set(1.1, t * 0.18, t * 0.12);
      glows.position.y = Math.sin(t * 0.35) * 0.08;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function pointer(event) {
    targetX = (event.clientX / Math.max(1, width) - 0.5) * 2;
    targetY = (event.clientY / Math.max(1, height) - 0.5) * 2;
  }

  function touch(event) {
    const touchPoint = event.touches?.[0];
    if (!touchPoint) return;
    targetX = (touchPoint.clientX / Math.max(1, width) - 0.5) * 1.2;
    targetY = (touchPoint.clientY / Math.max(1, height) - 0.5) * 1.2;
  }

  resize();
  requestAnimationFrame(render);
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", pointer, { passive: true });
  window.addEventListener("touchmove", touch, { passive: true });

  return () => {
    disposed = true;
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", pointer);
    window.removeEventListener("touchmove", touch);
    disposeStarGeometry();
    geometries.forEach((geometry) => geometry.dispose());
    [particleMaterial, lineMaterial, wireMaterial, glassMaterial, glowMaterial].forEach((material) => material.dispose());
    glowGeometry.dispose();
    renderer.dispose();
    canvas.remove();
  };
}

function mount() {
  const container = document.querySelector(".portfolio");
  if (!container || container.querySelector(".global-three-canvas")) return;
  const dispose = createWorld(container);
  window.__lumuGlobalThreeDispose = dispose;
}

if (isBrowser) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    queueMicrotask(mount);
  }
}
