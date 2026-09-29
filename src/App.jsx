import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Check,
  Code2,
  Cpu,
  Database,
  Gamepad2,
  GitBranch,
  Globe2,
  Layers3,
  Menu,
  MessageCircle,
  Monitor,
  Network,
  Play,
  Plus,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { experiments, profile, projects, skills, toolbelt } from "./profile";
import { automaticMotionQuery, useSceneMotion } from "./useSceneMotion";

const icons = {
  code: Code2,
  brain: BrainCircuit,
  network: Network,
  cpu: Cpu,
  phone: Smartphone,
  database: Database,
  message: MessageCircle,
  window: Monitor,
  game: Gamepad2,
  terminal: Terminal,
};
const navigation = [
  ["work", "Work"],
  ["expertise", "Expertise"],
  ["about", "About"],
];

function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function useMotion() {
  const [motion, setMotion] = useState(true);
  const [automaticMotion, setAutomaticMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const automatic = window.matchMedia(automaticMotionQuery);
    const update = () => {
      setAutomaticMotion(automatic.matches);
      if (automatic.matches) {
        setMotion(!media.matches);
        return;
      }
      let preference;
      try {
        preference = localStorage.getItem("lumu-motion");
      } catch {}
      setMotion(
        preference === null || preference === undefined
          ? !media.matches
          : preference === "on",
      );
    };
    update();
    media.addEventListener("change", update);
    automatic.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      automatic.removeEventListener("change", update);
    };
  }, []);
  function toggle() {
    if (automaticMotion) return;
    setMotion((value) => {
      try {
        localStorage.setItem("lumu-motion", value ? "off" : "on");
      } catch {}
      return !value;
    });
  }
  return [motion, toggle, automaticMotion];
}

function useReveal(root, motion) {
  useEffect(() => {
    if (!motion || !root.current || !("IntersectionObserver" in window)) return;
    const nodes = [...root.current.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top > window.innerHeight * 0.95)
        node.dataset.visible = "false";
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach((node) => {
        node.dataset.visible = "true";
      });
    };
  }, [root, motion]);
}

function Tilt({ children, className = "", motion = true, ...props }) {
  function move(event) {
    if (!motion || event.pointerType !== "mouse") return;
    const element = event.currentTarget;
    const box = element.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    element.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    element.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  }
  function reset(event) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }
  return (
    <div
      className={`tilt ${className}`}
      onPointerMove={move}
      onPointerLeave={reset}
      {...props}
    >
      {children}
    </div>
  );
}

function OrbitScene({ motion }) {
  const host = useRef(null);
  const controller = useRef(null);
  const [ready, setReady] = useState(false);
  const currentMotion = useRef(motion);
  useEffect(() => {
    currentMotion.current = motion;
    controller.current?.setMotion(motion);
  }, [motion]);
  useEffect(() => {
    let cancelled = false;
    import("./createOrbitScene")
      .then(({ createOrbitScene }) => {
        if (cancelled || !host.current) return;
        controller.current = createOrbitScene(
          host.current,
          currentMotion.current,
        );
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);
  return (
    <div
      className={`orbit-scene ${ready ? "is-ready" : ""}`}
      aria-hidden="true"
    >
      <div className="orbit-fallback">
        <i />
        <i />
        <i />
      </div>
      <div className="webgl-host" ref={host} />
    </div>
  );
}

function Header({ motion, onToggle, automaticMotion }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner glass">
        <a
          className="wordmark"
          href="#home"
          aria-label="Lumu Xavier, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            lx<span>✳</span>
          </span>
          <span>
            LUMU XAVIER<small>SOFTWARE ENGINEER</small>
          </span>
        </a>
        <nav
          className={`navigation ${open ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
        <div className="header-controls">
          {!automaticMotion && (
            <button
              className="motion-toggle"
              type="button"
              onClick={onToggle}
              aria-label={motion ? "Pause motion" : "Enable motion"}
              aria-pressed={!motion}
              title={motion ? "Pause motion" : "Enable motion"}
            >
              {motion ? <AudioLines size={17} /> : <Play size={15} />}
            </button>
          )}
          <a href="#contact" className="header-cta">
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            id="menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function SignalField() {
  return (
    <svg
      className="signal-field"
      viewBox="0 0 600 620"
      fill="none"
      aria-hidden="true"
    >
      <g className="signal-traces">
        <path d="M20 160H120Q158 160 158 122V80H450Q510 80 510 140V405Q510 456 560 456" />
        <path d="M55 485H195Q236 485 236 527V567H426Q474 567 474 519V262Q474 220 540 220" />
      </g>
      <g className="signal-packets">
        <path
          pathLength="100"
          d="M20 160H120Q158 160 158 122V80H450Q510 80 510 140V405Q510 456 560 456"
        />
        <path
          pathLength="100"
          d="M55 485H195Q236 485 236 527V567H426Q474 567 474 519V262Q474 220 540 220"
        />
      </g>
      {[
        [20, 160],
        [560, 456],
        [55, 485],
        [540, 220],
      ].map(([x, y], index) => (
        <g
          className="signal-node"
          key={index}
          style={{ "--node-delay": `${index * -1.1}s` }}
        >
          <circle cx={x} cy={y} r="8" />
          <circle cx={x} cy={y} r="2.5" />
        </g>
      ))}
    </svg>
  );
}

function Hero({ motion }) {
  return (
    <section
      className="hero section-shell"
      id="home"
      aria-labelledby="hero-title"
      data-motion-scene
    >
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="availability">
            <span className="status-dot" /> OPEN TO COLLABORATIONS{" "}
            <span className="availability-line" />
          </div>
          <p className="hero-introduction">Hello, I’m Lumu Francis Xavier.</p>
          <h1 id="hero-title">
            <span className="hero-line">Big ideas.</span>
            <span className="hero-line">Real-world</span>
            <em>possibilities.</em>
            <span className="title-star" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            I design and build digital products—from considered interfaces and
            intelligent software to the infrastructure that connects it all.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button button-light">
              Explore my work <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a href="#contact" className="button button-outline">
              Let’s build something <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-location">
            <Globe2 size={15} aria-hidden="true" />
            <span>Based in Kampala. Building beyond borders.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-halo" aria-hidden="true" />
          <SignalField />
          <div className="orbit-track track-one" aria-hidden="true" />
          <div className="orbit-track track-two" aria-hidden="true" />
          <span className="visual-coordinate coord-top" aria-hidden="true">
            00°19′ N · 32°35′ E
          </span>
          <Tilt className="portrait-stage" motion={motion}>
            <div className="portrait-outline" />
            <div className="portrait-image">
              <img
                src={profile.portrait}
                alt="Lumu Francis Xavier"
                width="1080"
                height="1080"
                fetchPriority="high"
              />
              <div className="portrait-shade" />
            </div>
            <div className="portrait-caption">
              <span>THE MIND BEHIND THE CODE</span>
              <strong>
                Lumu Xavier<span>↗</span>
              </strong>
            </div>
            <div className="portrait-glint" aria-hidden="true" />
          </Tilt>
          <div className="floating-badge badge-ai glass">
            <BrainCircuit size={20} aria-hidden="true" />
            <div>
              <strong>Intelligence, applied.</strong>
              <span>AI & MACHINE LEARNING</span>
            </div>
            <span className="badge-dot" />
          </div>
          <div className="floating-badge badge-code glass">
            <Code2 size={18} aria-hidden="true" />
            <span>Engineered with intent.</span>
          </div>
          <div className="hero-orbit">
            <OrbitScene motion={motion} />
          </div>
          <div className="idea-note glass">
            <span className="note-icon">
              <Sparkles size={19} aria-hidden="true" />
            </span>
            <p>
              Imagine it.
              <br />
              <strong>Let’s engineer it.</strong>
            </p>
            <ArrowUpRight size={21} aria-hidden="true" />
          </div>
          <span className="visual-coordinate coord-bottom" aria-hidden="true">
            PRODUCT THINKING / SYSTEMS ENGINEERING
          </span>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>SOFTWARE ENGINEERING / AI / CONNECTED SYSTEMS</span>
        <a href="#expertise">
          SCROLL TO DISCOVER <ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="hero-bottom-last">IDEAS HAVE NO CEILING.</span>
      </div>
    </section>
  );
}

function CapabilityRail() {
  return (
    <div
      className="capability-rail"
      aria-label="Web applications, artificial intelligence, network infrastructure, mobile experiences, and data architecture"
      data-motion-scene
    >
      <div className="rail-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="rail-group" key={copy}>
            {[
              "Web experiences",
              "Artificial intelligence",
              "Network infrastructure",
              "Mobile experiences",
              "Data architecture",
            ].map((text) => (
              <span key={text}>
                {text}
                <i>✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ number, label, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">
          <span>{number}</span>
          {label}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Expertise({ motion }) {
  return (
    <section
      className="expertise-section container section"
      id="expertise"
      aria-labelledby="expertise-title"
      data-motion-scene
    >
      <SectionHeading
        number="01"
        label="ENGINEERING ACROSS THE STACK"
        title={
          <span id="expertise-title">
            Different dimensions.
            <br />
            <span className="muted-text">One connected vision.</span>
          </span>
        }
        description="The best ideas rarely fit into one box. I connect interfaces, intelligence, data, and infrastructure to bring the bigger picture to life."
      />
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const Icon = icons[skill.icon];
          return (
            <Tilt
              key={skill.id}
              motion={motion}
              className={`skill-shell skill-${skill.id}`}
              data-reveal
              style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
            >
              <article className="skill-card glass">
                <div className="skill-top">
                  <span className="skill-icon">
                    <Icon size={25} aria-hidden="true" />
                  </span>
                  <span className="micro">/{skill.number}</span>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <ul className="skill-tags">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="skill-proof">
                  <span />
                  {skill.proof}
                </div>
              </article>
            </Tilt>
          );
        })}
      </div>
      <div className="toolbelt" data-reveal>
        <span className="micro">THE TOOLS BEHIND THE THINKING</span>
        <div>
          {toolbelt.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionObject({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 110 50" fill="none">
      <path
        d="m55 3 25 11v22L55 47 30 36V14L55 3Z"
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m30 14 25 12 25-12M55 26v21M41 9l26 11v21"
        stroke="currentColor"
        opacity=".6"
      />
      <circle cx="55" cy="26" r="3" fill="currentColor" />
    </svg>
  );
}

function ProjectVisual({ id }) {
  if (id === "intelligent-systems")
    return (
      <div className="project-visual aqua-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="visual-brand">
          <span className="aqua-logo">
            <BrainCircuit size={20} />
          </span>
          INTELLIGENT SYSTEMS
          <span className="visual-live">
            <i /> VISION SYSTEM
          </span>
        </div>
        <div className="sonar-ring r1" />
        <div className="sonar-ring r2" />
        <div className="sonar-ring r3" />
        <div className="scan-line" />
        <div className="tracked-fish fish-one">
          <span>
            TRACK 01 <b>●</b>
          </span>
          <VisionObject />
        </div>
        <div className="tracked-fish fish-two">
          <span>
            TRACK 02 <b>●</b>
          </span>
          <VisionObject />
        </div>
        <div className="aqua-console glass">
          <span>FROM FRAMES TO INSIGHT</span>
          <div>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <small>
            DETECT <ArrowRight size={11} /> TRACK <ArrowRight size={11} />{" "}
            UNDERSTAND
          </small>
        </div>
        <div className="aqua-stat glass">
          <small>FROM DATA TO</small>
          <strong>
            Insight<span>↗</span>
          </strong>
        </div>
      </div>
    );
  if (id === "web-platforms")
    return (
      <div className="project-visual rental-visual" aria-hidden="true">
        <div className="rental-glow" />
        <div className="rental-browser glass">
          <div className="mock-browser-bar">
            <span>
              <i />
              <i />
              <i />
            </span>
            <small>interface / experience</small>
            <Layers3 size={12} />
          </div>
          <div className="rental-content">
            <p className="rental-logo">
              spaces<span>✳</span>
            </p>
            <h4>
              Your next chapter.
              <br />
              <em>Your next space.</em>
            </h4>
            <div className="rental-search">
              <span>
                <Globe2 size={11} /> Kampala, Uganda
              </span>
              <i>
                <ArrowUpRight size={13} />
              </i>
            </div>
            <div className="house-art">
              <div className="house-block block-back" />
              <div className="house-block block-front">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="house-ground" />
              <div className="house-label">
                SPACES THAT FEEL LIKE YOU <ArrowUpRight size={12} />
              </div>
            </div>
          </div>
        </div>
        <div className="rental-float glass">
          <Check size={14} />
          <span>
            Hosts & guests.
            <br />
            <strong>One connected platform.</strong>
          </span>
        </div>
      </div>
    );
  if (id === "business-systems")
    return (
      <div className="project-visual sm-visual" aria-hidden="true">
        <div className="engineering-grid" />
        <div className="sm-browser">
          <div className="sm-nav">
            <strong>
              lx<span>✳</span>
            </strong>
            <span>BUSINESS SYSTEMS</span>
            <Menu size={15} />
          </div>
          <div className="sm-content">
            <span>BUILT TO PERFORM.</span>
            <h4>
              Precision.
              <br />
              Power.
              <br />
              <em>Possibility.</em>
            </h4>
            <div className="metal-form">
              <i />
              <i />
              <i />
            </div>
            <small>INTERFACES / WORKFLOWS / AUTOMATION</small>
          </div>
          <div className="sm-bottom">
            REAL PROBLEMS. USEFUL SOFTWARE.
            <ArrowUpRight size={17} />
          </div>
        </div>
        <span className="visual-corner">
          DIGITAL EXPERIENCES / ILLUSTRATION
        </span>
      </div>
    );
  return (
    <div className="project-visual network-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="network-topline">
        <Network size={17} />
        <span>NETWORK ARCHITECTURE</span>
        <span>SYS.04</span>
      </div>
      <svg className="network-diagram" viewBox="0 0 540 230">
        <defs>
          <linearGradient id="networkLine">
            <stop stopColor="#73a9ff" />
            <stop offset="1" stopColor="#b191ff" />
          </linearGradient>
        </defs>
        <g
          className="network-lines"
          stroke="url(#networkLine)"
          strokeWidth="1.2"
          fill="none"
        >
          <path d="M270 52V100H70V168M270 100H200V168M270 100H340V168M270 100H470V168" />
        </g>
        <g
          className="network-pulses"
          stroke="#b9d5ff"
          strokeWidth="2"
          fill="none"
        >
          <path d="M270 52V100H70V168M270 100H200V168M270 100H340V168M270 100H470V168" />
        </g>
        <g fill="#141b33" stroke="#536b9b">
          <rect x="207" y="12" width="126" height="50" rx="12" />
          {[30, 160, 300, 430].map((x) => (
            <rect x={x} y="165" width="80" height="42" rx="10" key={x} />
          ))}
        </g>
        <g
          textAnchor="middle"
          fill="#d4ddff"
          fontFamily="monospace"
          fontSize="10"
        >
          <text x="270" y="41">
            NETWORK FABRIC
          </text>
          <text x="70" y="190">
            ACCESS
          </text>
          <text x="200" y="190">
            SERVICES
          </text>
          <text x="340" y="190">
            OBSERVE
          </text>
          <text x="470" y="190">
            AUTOMATE
          </text>
        </g>
        <g fill="#81e0c4">
          {[248, 270, 292].map((x) => (
            <circle cx={x} cy="53" r="1.6" key={x} />
          ))}
        </g>
      </svg>
      <div className="terminal-strip">
        <span>~</span> design. connect. observe. automate.
        <i />
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen, motion }) {
  const wide =
    project.id === "intelligent-systems" ||
    project.id === "network-infrastructure";
  return (
    <article
      className={`project-card ${wide ? "project-wide" : ""} project-${project.id}`}
      data-reveal
      data-motion-scene
    >
      <Tilt className="project-art" motion={motion}>
        <ProjectVisual id={project.id} />
      </Tilt>
      <div className="project-body">
        <div className="project-eyebrow">
          <span>{project.category}</span>
          <span>/{project.number}</span>
        </div>
        <h3>
          {project.title}
          <span>↗</span>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-description">{project.description}</p>
        <ul className="project-tags">
          {project.stack.slice(0, 4).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <button
          type="button"
          className="project-link"
          onClick={() => onOpen(project)}
          aria-label={`Explore ${project.title}`}
        >
          Explore this capability <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function Work({ onOpen, motion }) {
  const [filter, setFilter] = useState("All work");
  const filters = ["All work", "Applications", "AI & data", "Networks"];
  const shown = projects.filter(
    (project) => filter === "All work" || project.filter === filter,
  );
  return (
    <section
      className="work-section section container"
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        number="02"
        label="WHAT I BUILD"
        title={
          <span id="work-title">
            Ideas made <em>tangible.</em>
          </span>
        }
        description="Four connected areas of my practice. From the interface you see to the intelligence and infrastructure underneath."
      />
      <div className="work-toolbar" data-reveal>
        <div
          className="project-filters"
          role="group"
          aria-label="Filter capabilities"
        >
          {filters.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value}
              {value === "All work" && <span>04</span>}
            </button>
          ))}
        </div>
        <span className="micro work-index" aria-live="polite">
          {String(shown.length).padStart(2, "0")} BUILD DOMAINS
        </span>
      </div>
      <div className="projects-grid">
        {shown.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
            motion={motion}
          />
        ))}
      </div>
      <div className="workbench" data-reveal>
        <div className="workbench-heading">
          <span className="eyebrow">BEYOND THE INTERFACE</span>
          <span className="micro">MORE WAYS TO TURN IDEAS INTO REALITY.</span>
        </div>
        {experiments.map((experiment, index) => {
          const Icon = icons[experiment.icon];
          return (
            <details key={experiment.title} className="experiment">
              <summary>
                <span className="experiment-index">0{index + 5}</span>
                <Icon size={20} aria-hidden="true" />
                <h3>{experiment.title}</h3>
                <span className="experiment-stack">{experiment.stack}</span>
                <Plus
                  size={20}
                  className="experiment-plus"
                  aria-hidden="true"
                />
              </summary>
              <p>{experiment.description}</p>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    if (!project) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);
  function backdrop(event) {
    if (event.target === dialog.current) {
      const rect = dialog.current.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        onClose();
    }
  }
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={backdrop}
    >
      {project && (
        <div className="dialog-content">
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close capability details"
            autoFocus
          >
            <X size={20} />
          </button>
          <p className="eyebrow">
            CAPABILITY / {project.number}{" "}
            <span className="dialog-status">{project.status}</span>
          </p>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-lead">{project.summary}</p>
          <p className="dialog-role">{project.role}</p>
          <div className="case-study">
            <section>
              <span>01 / THE CHALLENGE</span>
              <p>{project.challenge}</p>
            </section>
            <section>
              <span>02 / THE APPROACH</span>
              <p>{project.detail}</p>
            </section>
            <section>
              <span>03 / WHAT I BRING</span>
              <p>{project.result}</p>
            </section>
          </div>
          {project.metrics && (
            <div className="project-metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          )}
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={16} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
          {project.note && <p className="project-note">{project.note}</p>}
          <ul className="project-tags">
            {project.stack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  );
}

function About() {
  return (
    <section
      className="about-section section container"
      id="about"
      aria-labelledby="about-title"
      data-motion-scene
    >
      <div className="about-portrait" data-reveal>
        <div className="about-photo-frame">
          <img
            src={profile.portrait}
            alt="Portrait of Lumu Francis Xavier"
            width="1080"
            height="1080"
            loading="lazy"
          />
          <div className="about-photo-gradient" />
          <div className="photo-caption">
            <span>PRODUCT THINKING. ENGINEERING INSTINCT.</span>
            <strong>
              More than
              <br />a line of code.
            </strong>
          </div>
        </div>
        <div className="about-location glass">
          <Globe2 size={23} aria-hidden="true" />
          <span>
            Kampala, Uganda<small>LOCAL ROOTS. LIMITLESS OUTLOOK.</small>
          </span>
          <span className="status-dot" />
        </div>
      </div>
      <div className="about-content" data-reveal>
        <p className="eyebrow">
          <span>03</span>THE HUMAN BEHIND THE SYSTEMS
        </p>
        <h2 id="about-title">
          Think in systems.
          <br />
          <em>Build for people.</em>
        </h2>
        <p className="about-lead">
          I’m Lumu Francis Xavier, a software engineer connecting product
          design, applied AI, and infrastructure to turn ambitious ideas into
          working systems.
        </p>
        <p>
          I work across the interface, the intelligence behind it, and the
          systems underneath. That perspective helps me see how a product should
          feel, how its data should move, and how its components should work
          together.
        </p>
        <p>
          My approach is direct: understand the problem, make deliberate
          technical choices, and build something useful. Based in Kampala, I’m
          focused on independent products and practical solutions for businesses
          with real problems to solve.
        </p>
        <div className="about-credentials">
          <div>
            <Layers3 size={21} aria-hidden="true" />
            <span>
              Product-minded engineering
              <small>Interfaces, application logic & connected services</small>
            </span>
          </div>
          <div>
            <BrainCircuit size={21} aria-hidden="true" />
            <span>
              Applied intelligence
              <small>
                Computer vision, model pipelines & useful interfaces
              </small>
            </span>
          </div>
          <div>
            <Network size={21} aria-hidden="true" />
            <span>
              Infrastructure perspective
              <small>Network design, Linux systems & automation</small>
            </span>
          </div>
        </div>
        <div className="about-signoff">
          <span className="signature">Lumu Xavier</span>
          <span className="micro">CLEAR THINKING. CONSIDERED EXECUTION.</span>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section
      className="philosophy container"
      aria-labelledby="philosophy-title"
      data-reveal
      data-motion-scene
    >
      <div className="philosophy-light" aria-hidden="true" />
      <span className="philosophy-star" aria-hidden="true">
        ✳
      </span>
      <p className="eyebrow">THE WAY I THINK</p>
      <h2 id="philosophy-title">
        “Impossible” is a starting point.
        <br />
        <span>Let’s see what we can build.</span>
      </h2>
      <div className="process">
        <div>
          <span>01</span>
          <strong>Understand</strong>
          <p>Find the problem worth solving.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Connect</strong>
          <p>Design how the pieces fit.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Build</strong>
          <p>Turn the idea into something real.</p>
        </div>
        <div>
          <span>04</span>
          <strong>Evolve</strong>
          <p>Test, learn, and make it better.</p>
        </div>
      </div>
      <div className="exploration">
        <ShieldCheck size={17} aria-hidden="true" />
        <p>
          A product focus:{" "}
          <strong>
            intelligent software, connected businesses, and better digital
            experiences.
          </strong>
        </p>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactForm() {
  const [error, setError] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  function compose(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !message) {
      setError("Add your name and a message to start the conversation.");
      return;
    }
    setError("");
    const url = new URL(profile.whatsapp);
    url.searchParams.set("text", `Hi Xavier, I’m ${name}.\n\n${message}`);
    setDraftUrl(url.href);
    window.open(url.href, "_blank", "noopener,noreferrer");
  }
  return (
    <form className="contact-form glass" onSubmit={compose}>
      <div className="form-heading">
        <span className="form-symbol">
          <MessageCircle size={22} aria-hidden="true" />
        </span>
        <div>
          <h3>Start a conversation.</h3>
          <p>Good things begin with a hello.</p>
        </div>
        <span className="status-dot" />
      </div>
      <label>
        Your name
        <input
          name="name"
          placeholder="What should I call you?"
          autoComplete="name"
          required
          maxLength="120"
        />
      </label>
      <label>
        What are you imagining?
        <textarea
          name="message"
          placeholder="An idea, a challenge, a collaboration…"
          rows="4"
          required
          maxLength="2000"
        />
      </label>
      <button className="button button-light" type="submit">
        Let’s make it happen <ArrowUpRight size={20} aria-hidden="true" />
      </button>
      <p className="form-note">
        <MessageCircle size={13} aria-hidden="true" /> Opens a WhatsApp draft.
        You choose when to send.
      </p>
      {error && (
        <p className="form-status" role="alert">
          {error}
        </p>
      )}
      {draftUrl && (
        <p className="form-status" role="status">
          Your draft is ready.{" "}
          <ExternalLink href={draftUrl}>
            Continue to WhatsApp <ArrowUpRight size={13} />
          </ExternalLink>
        </p>
      )}
    </form>
  );
}

function Contact() {
  return (
    <section
      className="contact-section section container"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy" data-reveal>
        <p className="eyebrow">
          <span>04</span>YOUR NEXT IDEA STARTS HERE
        </p>
        <h2 id="contact-title">
          Let’s make
          <br />
          <em>something</em>
          <br />
          extraordinary<span>.</span>
        </h2>
        <p>
          A platform. An intelligent system. A better way of doing things. Tell
          me what’s on your mind.
        </p>
        <ExternalLink href={profile.whatsapp} className="whatsapp-link">
          <MessageCircle size={20} aria-hidden="true" />{" "}
          {profile.whatsappDisplay}
          <ArrowUpRight size={18} aria-hidden="true" />
        </ExternalLink>
        <div className="social-links">
          <ExternalLink href={profile.github}>
            <GitBranch size={17} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={13} aria-hidden="true" />
          </ExternalLink>
          <ExternalLink href={profile.instagram}>
            <InstagramIcon />
            Instagram
            <ArrowUpRight size={13} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
      <div data-reveal>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer container">
      <a
        className="footer-logo"
        href="#home"
        aria-label="Lumu Xavier, back to top"
      >
        lumu<span>✳</span>
      </a>
      <p>
        © {new Date().getFullYear()} Lumu Francis Xavier
        <br />
        <span>Thoughtfully built. Endlessly evolving.</span>
      </p>
      <a href="#home" className="back-top">
        BACK TO TOP <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </footer>
  );
}

export default function App() {
  const [motion, toggleMotion, automaticMotion] = useMotion();
  const [project, setProject] = useState(null);
  const root = useRef(null);
  useReveal(root, motion);
  useSceneMotion(root, motion);
  return (
    <div
      className="portfolio"
      ref={root}
      data-motion={motion ? "running" : "paused"}
      data-motion-mode={automaticMotion ? "automatic" : "interactive"}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="ambient-backdrop" aria-hidden="true" />
      <div className="reading-progress" aria-hidden="true" />
      <Header
        motion={motion}
        onToggle={toggleMotion}
        automaticMotion={automaticMotion}
      />
      <main id="main">
        <Hero motion={motion} />
        <CapabilityRail />
        <Expertise motion={motion} />
        <Work motion={motion} onOpen={setProject} />
        <About />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </div>
  );
}
