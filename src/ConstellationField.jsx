import React from "react";

function buildSky(seed) {
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };

  const points = Array.from({ length: 49 }, (_, i) => ({
    id: i,
    x: 32 + random() * 1136,
    y: 30 + random() * 750,
    radius: i % 11 === 0 ? 2.3 : i % 4 === 0 ? 1.65 : 1.1,
    delay: (random() * -9).toFixed(2) + "s",
    duration: (4.5 + random() * 5).toFixed(2) + "s",
  }));

  const lines = [];
  points.forEach((point, index) => {
    const closest = points
      .slice(index + 1)
      .map((target) => ({
        to: target.id,
        d: Math.hypot(point.x - target.x, point.y - target.y),
      }))
      .filter(({ d }) => d < 205)
      .sort((a, b) => a.d - b.d)
      .slice(0, index % 3 === 0 ? 2 : 1);

    closest.forEach(({ to }) => lines.push([index, to]));
  });

  return { points, lines };
}

const skies = [
  buildSky(1776),
  buildSky(2901),
  buildSky(4093),
  buildSky(5177),
  buildSky(6637),
  buildSky(7759),
];

export default function ConstellationField({ scene = 0, tone = "light", placement = "" }) {
  const sky = skies[scene % skies.length];
  return (
    <div className={"constellation-field constellation-" + tone + " " + placement} aria-hidden="true">
      <svg
        className="constellation-map"
        viewBox="0 0 1200 820"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        aria-hidden="true"
      >
        <g className="constellation-links">
          {sky.lines.map(([from, to]) => (
            <line
              key={from + "-" + to}
              x1={sky.points[from].x}
              y1={sky.points[from].y}
              x2={sky.points[to].x}
              y2={sky.points[to].y}
            />
          ))}
        </g>
        <g className="constellation-points">
          {sky.points.map((star) => (
            <circle
              key={star.id}
              className={star.radius > 2 ? "constellation-star constellation-bright" : "constellation-star"}
              cx={star.x}
              cy={star.y}
              r={star.radius}
              style={{ animationDelay: star.delay, animationDuration: star.duration }}
            />
          ))}
        </g>
        <g className="constellation-accents">
          {sky.points.filter((star) => star.radius > 2).map((star) => (
            <circle key={star.id} cx={star.x} cy={star.y} r="7.5" />
          ))}
        </g>
      </svg>
      <span className="constellation-soft-light" />
    </div>
  );
}
