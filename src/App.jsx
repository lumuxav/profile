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
import { experiments, profile, projects } from "./profile";

const navItems = [
  ["about", "About"],
  ["capabilities", "Capabilities"],
  ["work", "Projects"],
  ["lab", "Lab"],
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
    stage.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    stage.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
    stage.style.setProperty("--shift-x", `${(x * 18).toFixed(2)}px`);
    stage.style.setProperty("--shift-y", `${(y * 18).toFixed(2)}px`);
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
        <img src={profile.portrait} alt="Stylized portrait of Lumu Francis Xavier" width="360" height="360" fetchPriority="high" />
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
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore projects <ArrowRight size={18} /></a><ExternalLink className="button button-ghost" href={profile.whatsapp}>Let&apos;s build <ArrowUpRight size={18} /></ExternalLink></div>
          <div className="hero-proof"><div><strong>06</strong><span>capability lanes</span></div><div><strong>{projects.length.toString().padStart(2, "0")}</strong><span>featured builds</span></div><div><strong>∞</strong><span>room to build</span></div></div>
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
      <div className="about-copy" data-reveal><p className="about-lead">I&apos;m Lumu Francis Xavier — a software engineering student and hands-on builder working across product, infrastructure and intelligent systems.</p><p>My work moves between interfaces people touch and the deeper layers they depend on: APIs, databases, Linux services, networks, automation and machine learning. That range lets me think beyond a single page and design the whole experience around the problem.</p><p>I&apos;m still learning aggressively, but I build like the answer is discoverable: research it, prototype it, break it, improve it, ship it.</p></div>
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

function ProjectCard({ project, index }) {
  const icons = [Layers3, BrainCircuit, Cpu, Code2, Terminal, Network, Database]; const Icon = icons[index % icons.length];
  return <article className="project-card" data-reveal><div className={`project-visual project-tone-${(index % 4) + 1}`}><div className="project-visual-grid" aria-hidden="true" /><div className="project-visual-top"><span>{project.number}</span><span>{project.category}</span></div><div className="project-symbol" aria-hidden="true"><div className="project-symbol-ring" /><Icon size={56} /></div><div className="project-visual-title">{project.title}</div><div className="project-status">{project.status}</div></div><div className="project-copy"><div className="project-copy-top"><span>{project.role}</span><ArrowUpRight size={20} /></div><h3>{project.summary}</h3><p>{project.detail}</p><div className="tag-row project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><ul className="project-points">{project.highlights.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></div></article>;
}

function Work() {
  return <section className="section work" id="work"><div className="page-shell"><SectionHeading kicker="03 / SELECTED WORK" title="Proof lives in the build." copy="A mix of client work, product experiments, infrastructure labs and applied AI — each one teaching a different layer of engineering." /><div className="project-list">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></div></section>;
}

function Lab() {
  return <section className="section lab" id="lab"><div className="page-shell"><SectionHeading kicker="04 / EXPERIMENTS" title="The lab is always open." copy="Small builds are where I test new tools, architectures and ideas before they become bigger systems." /><div className="lab-grid">{experiments.map((item, index) => <article className={`lab-card lab-card-${index + 1}`} key={item.title} data-reveal><div className="lab-index">0{index + 1}</div><h3>{item.title}</h3><p>{item.description}</p><span>{item.stack}</span><ArrowUpRight size={20} /></article>)}<article className="lab-card lab-manifesto" data-reveal><Sparkles size={30} /><p>Nothing is impossible. Some things just need a better first prototype.</p></article></div></div></section>;
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
  return <div className="site-wrap"><div className="cursor-glow" aria-hidden="true" /><Header /><main><Hero /><Marquee /><About /><Capabilities /><Work /><Lab /><Contact /></main><Footer /></div>;
}
