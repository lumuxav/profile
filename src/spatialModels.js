import {
  Group,
  Mesh,
  TorusKnotGeometry,
  TorusGeometry,
  IcosahedronGeometry,
  BoxGeometry,
  SphereGeometry,
  EdgesGeometry,
  LineSegments,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  LineBasicMaterial,
} from "three";

export function createSpatialModels(compact = false) {
  const chrome = new MeshPhysicalMaterial({
    color: 0xc5cbdc,
    metalness: 0.92,
    roughness: 0.2,
    clearcoat: 1,
  });
  const coral = new MeshStandardMaterial({
    color: 0xff6775,
    metalness: 0.55,
    roughness: 0.24,
    emissive: 0x701528,
    emissiveIntensity: 0.25,
  });
  const glass = new MeshPhysicalMaterial({
    color: 0xd1d9fb,
    metalness: 0.08,
    roughness: 0.13,
    clearcoat: 1,
    transmission: compact ? 0 : 0.58,
    thickness: 0.35,
    ior: 1.45,
    transparent: compact,
    opacity: compact ? 0.52 : 1,
  });
  const line = new LineBasicMaterial({
    color: 0x8a9bc8,
    transparent: true,
    opacity: 0.58,
  });
  const root = new Group();
  const groups = {
    systems: new Group(),
    intelligence: new Group(),
    interfaces: new Group(),
  };
  Object.values(groups).forEach((group) => root.add(group));

  const knot = new Mesh(
    new TorusKnotGeometry(
      0.88,
      0.25,
      compact ? 88 : 144,
      compact ? 12 : 20,
      2,
      3,
    ),
    chrome,
  );
  knot.rotation.set(0.35, -0.2, -0.35);
  groups.systems.add(knot);
  const orbit = new Mesh(new TorusGeometry(1.66, 0.022, 8, 96), coral);
  orbit.rotation.set(1.1, 0.25, -0.3);
  groups.systems.add(orbit);
  const glassOrb = new Mesh(
    new SphereGeometry(0.38, compact ? 16 : 28, compact ? 12 : 20),
    glass,
  );
  glassOrb.position.set(1.2, 0.8, 0.2);
  groups.systems.add(glassOrb);

  const shellGeometry = new IcosahedronGeometry(1.2, 1);
  const shell = new Mesh(shellGeometry, glass);
  const edges = new LineSegments(new EdgesGeometry(shellGeometry), line);
  groups.intelligence.add(shell, edges);
  const nodeGeometry = new SphereGeometry(0.075, 12, 8);
  const vertices = shellGeometry.getAttribute("position");
  const seen = new Set();
  for (let i = 0; i < vertices.count; i += 1) {
    const x = vertices.getX(i),
      y = vertices.getY(i),
      z = vertices.getZ(i);
    const key = `${x.toFixed(3)}:${y.toFixed(3)}:${z.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const node = new Mesh(nodeGeometry, seen.size % 3 ? chrome : coral);
    node.position.set(x, y, z);
    groups.intelligence.add(node);
  }
  const intelligenceCore = new Mesh(new IcosahedronGeometry(0.53, 1), coral);
  groups.intelligence.add(intelligenceCore);

  const panelGeometry = new BoxGeometry(1.64, 1.08, 0.09);
  for (let i = 0; i < 3; i += 1) {
    const panel = new Group();
    panel.position.set((i - 1) * 0.16, (i - 1) * 0.2, (i - 1) * 0.58);
    panel.add(
      new Mesh(panelGeometry, glass),
      new LineSegments(new EdgesGeometry(panelGeometry), line),
    );
    const header = new Mesh(
      new BoxGeometry(1.22, 0.035, 0.025),
      i === 2 ? coral : chrome,
    );
    header.position.set(0, 0.27, 0.062);
    panel.add(header);
    for (let j = 0; j < 3; j += 1) {
      const tile = new Mesh(
        new BoxGeometry(0.32, 0.36, 0.035),
        j === i ? coral : chrome,
      );
      tile.position.set((j - 1) * 0.44, -0.08, 0.08);
      panel.add(tile);
    }
    groups.interfaces.add(panel);
  }
  groups.interfaces.rotation.set(-0.12, -0.45, -0.14);

  const orbiters = new Group();
  const satelliteGeometry = new IcosahedronGeometry(0.1, 0);
  for (let i = 0; i < 5; i += 1) {
    const satellite = new Mesh(satelliteGeometry, i % 2 ? coral : chrome);
    const angle = (i / 5) * Math.PI * 2;
    satellite.position.set(
      Math.cos(angle) * 1.65,
      Math.sin(angle) * 1.42,
      Math.sin(angle * 2) * 0.45,
    );
    orbiters.add(satellite);
  }
  root.add(orbiters);

  function setVariant(variant) {
    Object.entries(groups).forEach(([key, group]) => {
      group.visible = key === variant;
    });
  }
  setVariant("systems");
  return {
    root,
    groups,
    orbiters,
    setVariant,
    dispose() {
      const geometries = new Set(),
        materials = new Set();
      root.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    },
  };
}
