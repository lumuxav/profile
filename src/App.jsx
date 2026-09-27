import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Cpu,
  Database,
  GitBranch as Github,
  Layers3,
  Menu,
  Network,
  Smartphone,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { profile } from "./profile";

const navItems = [
  ["about", "About"],
  ["capabilities", "Capabilities"],
  ["systems", "What I build"],
  ["approach", "Approach"],
];

const capabilities = [
  { number: "01", title: "Web applications", icon: Code2, copy: "Fast, responsive interfaces connected to real backends, APIs, authentication and deployment workflows.", tags: ["React", "Vite", "Node.js", "REST APIs"] },
  { number: "02", title: "System development", icon: Cpu, copy: "Operational systems built around the way a business actually works — records, workflows, roles, reporting and automation.", tags: ["Architecture", "Dashboards", "Automation", "Workflows"] },
  { number: "03", title: "AI & machine learning", icon: BrainCircuit, copy: "Applied computer vision and intelligent workflows that turn raw video, data and conversations into useful decisions.", tags: ["Python", "YOLO", "PyTorch", "Gemini"] },
  { number: "04", title: "Networking", icon: Network, copy: "The infrastructure underneath the interface: Linux services, routing, VLANs, DHCP, DNS and repeatable network automation.", tags: ["Linux", "Cisco", "GNS3", "Bash"] },
  { number: "05", title: "Database management", icon: Database, copy: "Structured data models that keep products reliable as they grow — from transactional records to searchable operational data.", tags: ["SQL", "MySQL", "Data modelling", "CRUD"] },
  { number: "06", title: "Mobile-ready products", icon: Smartphone, copy: "Responsive product experiences and API-first foundations designed to move naturally from the browser to mobile clients.", tags: ["Responsive UI", "API-first", "PWA thinking", "UX"] },
];

const capabilityMarquee = ["WEB APPLICATIONS", "SYSTEM DEVELOPMENT", "AI + MACHINE LEARNING", "NETWORK ENGINEERING", "DATABASES", "MOBILE EXPERIENCES"];

const buildDomains = [
  {
    id: "business-systems",
    number: "01",
    title: "Business Systems",
    category: "Systems engineering",
    status: "Workflows → software",
    summary: "Operational software designed around the way a real organisation works, not the other way around.",
    detail: "I translate messy day-to-day processes into structured digital workflows: records, permissions, payments, dashboards, reporting, automation and the logic that holds everything together.",
    role: "System architecture · workflow modelling · implementation",
    stack: ["Business logic", "Databases", "Dashboards", "Automation"],
    highlights: [
      "Role-aware workflows and operational dashboards",
      "Transaction, inventory and record-management logic",
      "Systems designed to grow without becoming confusing",
    ],
  },
  {
    id: "web-platforms",
    number: "02",
    title: "Web Platforms",
    category: "Full-stack development",
    status: "Interface → deployment",
    summary: "Fast, responsive digital products that feel deliberate on every screen.",
    detail: "From the interface to APIs, deployment and integration, I approach websites as products rather than pages — with performance, usability, maintainability and a clear path for future features.",
    role: "Front-end · APIs · deployment · product structure",
    stack: ["React", "Vite", "JavaScript", "Node.js", "REST APIs"],
    highlights: [
      "Responsive, motion-led user interfaces",
      "API-ready architecture and integration workflows",
      "Production deployment across modern hosting platforms",
    ],
  },
  {
    id: "intelligent-systems",
    number: "03",
    title: "Intelligent Systems",
    category: "AI & machine learning",
    status: "Data → useful decisions",
    summary: "AI that does something useful with vision, data or conversation.",
    detail: "I explore applied machine learning through computer vision, tracking, sequence models and AI-assisted workflows — focusing on how models connect to interfaces and real system behaviour.",
    role: "Applied ML · prototyping · integration",
    stack: ["Python", "PyTorch", "YOLO", "OpenCV", "Gemini"],
    highlights: [
      "Computer-vision detection and tracking pipelines",
      "Sequence-aware classification concepts",
      "AI features integrated into practical application flows",
    ],
  },
  {
    id: "network-infrastructure",
    number: "04",
    title: "Network Infrastructure",
    category: "Networking & Linux",
    status: "Below the interface",
    summary: "The networks, services and automation that keep applications connected.",
    detail: "I work with routing, switching, segmentation and Linux services, then automate repetitive setup where possible. The goal is infrastructure that is understandable, testable and reliable.",
    role: "Network configuration · Linux services · automation",
    stack: ["Cisco IOS", "GNS3", "Linux", "Bash", "DHCP / DNS"],
    highlights: [
      "VLANs and inter-VLAN routing",
      "DHCP and DNS service configuration",
      "Linux-based network automation and lab environments",
    ],
  },
  {
    id: "data-layer",
    number: "05",
    title: "Data & Databases",
    category: "Data architecture",
    status: "Structure before scale",
    summary: "Clean data models that make software easier to trust, query and extend.",
    detail: "I design relational structures around the questions a system needs to answer: who did what, when it happened, what changed, what is owed and what should happen next.",
    role: "Data modelling · relational design · application data",
    stack: ["SQL", "MySQL", "Relational modelling", "CRUD"],
    highlights: [
      "Structured relational schemas",
      "Transaction and history-oriented records",
      "Data models designed around real application workflows",
    ],
  },
  {
    id: "mobile-ready",
    number: "06",
    title: "Mobile-Ready Products",
    category: "Product engineering",
    status: "Designed beyond desktop",
    summary: "Experiences designed to move naturally between browser, phone and future clients.",
    detail: "I build responsive interfaces and API-first foundations with mobile use in mind, so a product can evolve without having to rethink its entire architecture later.",
    role: "Responsive UX · API-first thinking · product architecture",
    stack: ["Responsive UI", "PWA thinking", "REST APIs", "Mobile UX"],
    highlights: [
      "Phone-first responsive interaction patterns",
      "Reusable interface components",
      "Architecture prepared for future mobile clients",
    ],
  },
];

const principles = [
  {
    title: "Prototype fast",
    description: "Turn the idea into something visible early, then improve it with evidence instead of assumptions.",
    stack: "IDEA / PROTOTYPE / TEST",
  },
  {
    title: "Think in systems",
    description: "Treat interface, logic, data, infrastructure and deployment as connected parts of the same product.",
    stack: "UI / LOGIC / DATA / INFRA",
  },
  {
    title: "Automate repetition",
    description: "If a process keeps repeating, I look for a clean way to make the machine do more of it.",
    stack: "SCRIPTS / APIs / WORKFLOWS",
  },
  {
    title: "Keep learning",
    description: "New tools are useful when they solve a real problem. I learn by building, breaking, debugging and rebuilding.",
    stack: "BUILD / BREAK / LEARN / SHIP",
  },
];

function ExternalLink({ href, children, className = "", ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">LX</span>
          <span className="brand-copy">Lumu Xavier<small>software engineer</small></span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function PortraitStage() {
  const stageRef = useRef(null);
  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    stage.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    stage.style.setProperty("--shift-x", `${(x * 14).toFixed(2)}px`);
    stage.style.setProperty("--shift-y", `${(y * 14).toFixed(2)}px`);
  };
  const resetTilt = () => {
    const stage = stageRef.current;
    if (!stage) return;
    ["--tilt-x", "--tilt-y"].forEach((key) => stage.style.setProperty(key, "0deg"));
    ["--shift-x", "--shift-y"].forEach((key) => stage.style.setProperty(key, "0px"));
  };
  return (
    <div className="portrait-stage" ref={stageRef} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" /><div className="portrait-glow" aria-hidden="true" />
      <div className="portrait-card">
        <img src={profile.portrait} alt="Stylized portrait of Lumu Francis Xavier" width="1080" height="1080" fetchPriority="high" style={{ width: "88%", height: "88%", objectFit: "contain", margin: "6% auto", borderRadius: "24px", filter: "none" }} />
        <div className="portrait-overlay" aria-hidden="true" />
        <div className="portrait-corner top-left">01 / 26</div><div className="portrait-corner bottom-right">BUILD / LEARN / SHIP</div>
      </div>
      <div className="float-chip chip-ai"><BrainCircuit size={17} /> AI / ML</div>
      <div className="float-chip chip-systems"><Layers3 size={17} /> SYSTEMS</div>
      <div className="float-chip chip-network"><Network size={17} /> NETWORKS</div>
      <div className="availability-card glass-panel"><span className="availability-dot" /><div><small>AVAILABLE FOR</small><strong>Ambitious builds</strong></div><ArrowUpRight size={18} /></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid-bg" aria-hidden="true" /><div className="aurora aurora-a" aria-hidden="true" /><div className="aurora aurora-b" aria-hidden="true" />
      <div className="page-shell hero-layout">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow hero-eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · KAMPALA / WORLDWIDE</p>
          <h1>I build digital systems<span className="hero-outline"> that feel like the future.</span></h1>
          <p className="hero-lead">From web applications and business systems to AI, networks and data — I turn ambitious ideas into working technology.</p>
          <div className="hero-actions"><a className="button button-primary" href="#systems">See what I build <ArrowRight size={18} /></a><ExternalLink className="button button-ghost" href={profile.whatsapp}>Let&apos;s build <ArrowUpRight size={18} /></ExternalLink></div>
          <div className="hero-proof"><div><strong>06</strong><span>capability lanes</span></div><div><strong>{buildDomains.length.toString().padStart(2, "0")}</strong><span>build domains</span></div><div><strong>∞</strong><span>room to build</span></div></div>
        </div>
        <div className="hero-visual" data-reveal><PortraitStage /></div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">SCROLL TO EXPLORE <ArrowDown size={15} /></a>
    </section>
  );
}

function Marquee() {
  return <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...capabilityMarquee, ...capabilityMarquee].map((item, index) => <React.Fragment key={`${item}-${index}`}><span>{item}</span><Sparkles size={16} /></React.Fragment>)}</div></div>;
}

function SectionHeading({ kicker, title, copy }) {
  return <div className="section-heading split" data-reveal><div><p className="eyebrow">{kicker}</p><h2>{title}</h2></div>{copy && <p>{copy}</p>}</div>;
}

function About() {
  return (
    <section className="about section" id="about"><div className="page-shell about-grid">
      <div className="about-intro" data-reveal><p className="eyebrow">01 / ABOUT</p><h2>Not just websites.<br /><span>Systems.</span></h2></div>
      <div className="about-copy" data-reveal><p className="about-lead">I&apos;m Lumu Francis Xavier — a software engineering student and hands-on builder working across product, infrastructure and intelligent systems.</p><p>My work moves between interfaces people touch and the deeper layers they depend on: APIs, databases, Linux services, networks, automation and machine learning. That range lets me think beyond a single page and design the whole experience around the problem.</p><p>I learn aggressively and build with a simple mindset: understand the problem, prototype the idea, test the assumptions, improve the system and ship something useful.</p></div>
      <div className="about-object" data-reveal aria-hidden="true"><div className="core-orb"><div className="core-ring ring-a" /><div className="core-ring ring-b" /><div className="core-ring ring-c" /><div className="core-center"><Cpu size={34} /></div></div><span>IDEA</span><span>ARCHITECTURE</span><span>BUILD</span><span>ITERATE</span></div>
    </div></section>
  );
}

function Capabilities() {
  return (
    <section className="section capabilities" id="capabilities"><div className="page-shell">
      <SectionHeading kicker="02 / CAPABILITIES" title="One builder. Multiple layers." copy="The strongest products happen when interface, logic, data and infrastructure are designed as one connected system." />
      <div className="capability-grid">{capabilities.map((item) => { const Icon = item.icon; return <article className="capability-card glass-panel" key={item.number} data-reveal><div className="capability-top"><span>{item.number}</span><Icon size={24} /></div><h3>{item.title}</h3><p>{item.copy}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>; })}</div>
    </div></section>
  );
}

function BuildCard({ item, index }) {
  const icons = [Layers3, Code2, BrainCircuit, Network, Database, Smartphone];
  const Icon = icons[index % icons.length];
  return <article className="project-card" data-reveal><div className={`project-visual project-tone-${(index % 4) + 1}`}><div className="project-visual-grid" aria-hidden="true" /><div className="project-visual-top"><span>{item.number}</span><span>{item.category}</span></div><div className="project-symbol" aria-hidden="true"><div className="project-symbol-ring" /><Icon size={56} /></div><div className="project-visual-title">{item.title}</div><div className="project-status">{item.status}</div></div><div className="project-copy"><div className="project-copy-top"><span>{item.role}</span><ArrowUpRight size={20} /></div><h3>{item.summary}</h3><p>{item.detail}</p><div className="tag-row project-tags">{item.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><ul className="project-points">{item.highlights.map((point) => <li key={point}>{point}</li>)}</ul></div></article>;
}

function Systems() {
  return <section className="section work" id="systems"><div className="page-shell"><SectionHeading kicker="03 / WHAT I BUILD" title="Capability without exposing private work." copy="This is the kind of engineering I can take on. The portfolio shows the thinking and technical range without publishing private client names, unfinished products or confidential project details." /><div className="project-list">{buildDomains.map((item, index) => <BuildCard key={item.id} item={item} index={index} />)}</div></div></section>;
}

function Approach() {
  return <section className="section lab" id="approach"><div className="page-shell"><SectionHeading kicker="04 / APPROACH" title="Build. Test. Improve. Repeat." copy="The tools change. The method stays simple: understand the problem deeply, make the architecture clear and keep moving until the system works." /><div className="lab-grid">{principles.map((item, index) => <article className={`lab-card lab-card-${index + 1}`} key={item.title} data-reveal><div className="lab-index">0{index + 1}</div><h3>{item.title}</h3><p>{item.description}</p><span>{item.stack}</span><ArrowUpRight size={20} /></article>)}<article className="lab-card lab-manifesto" data-reveal><Sparkles size={30} /><p>Nothing is impossible. Some things just need a better first prototype.</p></article></div></div></section>;
}

function Contact() {
  return <section className="contact section" id="contact"><div className="page-shell contact-panel" data-reveal><div className="contact-orb" aria-hidden="true" /><p className="eyebrow">05 / LET&apos;S BUILD</p><h2>Have an idea that feels<span> too ambitious?</span></h2><p className="contact-copy">Good. Those are the interesting ones. Tell me what you&apos;re trying to create and we&apos;ll turn it into a system we can actually ship.</p><div className="contact-actions"><ExternalLink href={profile.whatsapp} className="button button-primary button-large">WhatsApp me <ArrowUpRight size={20} /></ExternalLink><ExternalLink href={profile.github} className="button button-ghost button-large"><Github size={19} /> GitHub</ExternalLink><ExternalLink href={profile.instagram} className="button button-ghost button-large">Instagram <ArrowUpRight size={18} /></ExternalLink></div><div className="contact-meta"><span>Based in Kampala · building for anywhere</span><span>{profile.whatsappDisplay}</span></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="page-shell footer-inner"><a className="brand footer-brand" href="#home"><span className="brand-mark">LX</span><span className="brand-copy">Lumu Xavier</span></a><p>Designing possibility through code, systems and curiosity.</p><span>© {new Date().getFullYear()}</span></div></footer>;
}

export default function App() {
  useEffect(() => {
    const root = document.documentElement;
    const onPointerMove = (event) => { root.style.setProperty("--cursor-x", `${event.clientX}px`); root.style.setProperty("--cursor-y", `${event.clientY}px`); };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => { window.removeEventListener("pointermove", onPointerMove); observer.disconnect(); };
  }, []);
  return <div className="site-wrap"><div className="cursor-glow" aria-hidden="true" /><Header /><main><Hero /><Marquee /><About /><Capabilities /><Systems /><Approach /><Contact /></main><Footer /></div>;
}
