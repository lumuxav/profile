import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  GitBranch as Github,
  Globe2,
  GraduationCap,
  Layers3,
  BriefcaseBusiness as Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Monitor,
  Network,
  ShieldCheck,
  Terminal,
  Workflow,
  X,
  Gamepad2,
} from "lucide-react";
import { experiments, profile, projects, skills } from "./profile";

const icons = {
  code: Code2,
  brain: BrainCircuit,
  network: Network,
  shield: ShieldCheck,
  message: MessageSquare,
  game: Gamepad2,
  window: Monitor,
  terminal: Terminal,
};
const navItems = [
  ["work", "Work"],
  ["expertise", "Expertise"],
  ["about", "About"],
];

function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -58% 0px" },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="wordmark"
          aria-label="Lumu Xavier, home"
          onClick={() => setOpen(false)}
        >
          lumu<span>.</span>
          <span className="wordmark-label">/ xavier</span>
        </a>
        <nav
          className={`navigation ${open ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          id="menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function StackDiagram() {
  return (
    <div
      className="stack-diagram"
      aria-label="My development stack: interfaces with React and JavaScript, intelligence with Python and PyTorch, and infrastructure with Linux and networks"
    >
      <div className="diagram-header">
        <span className="micro">FROM INTERFACE TO INFRASTRUCTURE</span>
        <Workflow size={18} aria-hidden="true" />
      </div>
      <div className="stack-layer layer-interface">
        <div className="layer-icon">
          <Braces size={22} aria-hidden="true" />
        </div>
        <div>
          <span className="micro">01 / INTERFACE</span>
          <h3>Make it intuitive.</h3>
          <p>
            React <span>·</span> JavaScript <span>·</span> APIs
          </p>
        </div>
      </div>
      <div className="stack-connector" aria-hidden="true">
        <span>connect</span>
      </div>
      <div className="stack-layer layer-intelligence">
        <div className="layer-icon">
          <BrainCircuit size={22} aria-hidden="true" />
        </div>
        <div>
          <span className="micro">02 / INTELLIGENCE</span>
          <h3>Make it intelligent.</h3>
          <p>
            Python <span>·</span> PyTorch <span>·</span> Vision
          </p>
        </div>
      </div>
      <div className="stack-connector" aria-hidden="true">
        <span>deploy</span>
      </div>
      <div className="stack-layer layer-infrastructure">
        <div className="layer-icon">
          <Network size={22} aria-hidden="true" />
        </div>
        <div>
          <span className="micro">03 / INFRASTRUCTURE</span>
          <h3>Make it work.</h3>
          <p>
            Linux <span>·</span> Networks <span>·</span> Cloud
          </p>
        </div>
      </div>
      <div className="diagram-footer">
        <span className="micro">ONE CURIOUS MIND. THE WHOLE STACK.</span>
        <span className="diagram-bracket" aria-hidden="true">
          {"</>"}
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            SOFTWARE ENGINEER · FULL-STACK & ML
          </p>
          <h1 id="hero-title">
            Lumu Francis
            <br />
            <span>Xavier.</span>
          </h1>
          <p className="hero-statement">
            I turn ideas into systems
            <br className="desktop-break" /> that{" "}
            <span>do something useful.</span>
          </p>
          <p className="hero-description">
            Building AI-powered systems, web applications, and connected
            hardware. Software engineering student at IUEA, based in Kampala,
            Uganda.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View projects <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contact">
              Get in touch <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <StackDiagram />
        </div>
      </div>
      <div className="hero-footer">
        <div>
          <Globe2 size={16} aria-hidden="true" />
          <span>KAMPALA, UGANDA</span>
        </div>
        <div>
          <span>DESIGN WITH INTENT. BUILD WITH CARE.</span>
        </div>
        <a href="#work" aria-label="Scroll to selected work">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function ProjectVisual({ project }) {
  if (project.image)
    return (
      <div className={`project-visual visual-${project.id}`}>
        <img
          src={project.image}
          alt={`${project.title} project interface`}
          loading="lazy"
          width="720"
          height="440"
        />
      </div>
    );
  if (project.id === "rentalhub")
    return (
      <div className="project-visual visual-rentalhub">
        <div className="visual-topline">
          <span>RENTAL EXPERIENCES, RECONSIDERED</span>
          <Layers3 size={19} aria-hidden="true" />
        </div>
        <div className="rental-wordmark">
          Rental<span>Hub</span>
          <span className="rental-period">.</span>
        </div>
        <div className="rental-roles">
          <span>FOR HOSTS</span>
          <span className="roles-rule" aria-hidden="true" />
          <span>FOR GUESTS</span>
        </div>
        <div className="visual-bottomline">
          <span>UGANDA</span>
          <span>A PLACE TO BELONG.</span>
        </div>
      </div>
    );
  if (project.id === "aquasentinel")
    return (
      <div className="project-visual visual-aquasentinel">
        <div className="visual-topline">
          <span>COMPUTER VISION / AQUACULTURE</span>
          <BrainCircuit size={19} aria-hidden="true" />
        </div>
        <div className="aqua-wordmark">
          Aqua<span>Sentinel</span>
          <span className="micro">_ML</span>
        </div>
        <div
          className="pipeline"
          aria-label="YOLO detection, ByteTrack tracking, BiLSTM classification"
        >
          <span>
            YOLO<small>DETECT</small>
          </span>
          <ChevronRight size={18} aria-hidden="true" />
          <span>
            ByteTrack<small>TRACK</small>
          </span>
          <ChevronRight size={18} aria-hidden="true" />
          <span>
            BiLSTM<small>CLASSIFY</small>
          </span>
        </div>
        <div className="visual-bottomline">
          <span>IUEA-LABS AI TEAM</span>
          <span>VIDEO → INSIGHT</span>
        </div>
      </div>
    );
  if (project.id === "sm-engineering")
    return (
      <div className="project-visual visual-sm-engineering">
        <div className="visual-topline">
          <span>INDUSTRIAL SERVICES / CLIENT WORK</span>
          <Cpu size={19} aria-hidden="true" />
        </div>
        <div className="sm-wordmark">
          SM
          <span>
            ENGINEERING
            <br />
            WORKS
          </span>
        </div>
        <div className="visual-bottomline">
          <span>FABRICATION / REPAIR / ELECTRONICS</span>
          <span>BUILT FOR BUSINESS.</span>
        </div>
      </div>
    );
  return (
    <div className="project-visual visual-network-labs">
      <div className="visual-topline">
        <span>NETWORK LABS / AUTOMATION</span>
        <Network size={19} aria-hidden="true" />
      </div>
      <div className="network-title">
        Connected.
        <br />
        <span>Configured.</span>
      </div>
      <div className="network-services">
        <span>DHCP</span>
        <span>DNS</span>
        <span>VLAN</span>
        <span>BASH</span>
      </div>
      <div className="visual-bottomline">
        <span>LINUX / CISCO / GNS3</span>
        <span>BELOW THE SURFACE.</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <ProjectVisual project={project} />
      <div className="project-content">
        <div className="project-meta">
          <span>
            {project.number} / {project.category}
          </span>
          <span className="project-status">{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card-footer">
          <ul className="tags" aria-label="Technologies">
            {project.stack.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <button
            type="button"
            className="project-open"
            onClick={() => onOpen(project)}
            aria-label={`Explore ${project.title}`}
          >
            <ArrowUpRight size={24} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-inner">
          <button
            type="button"
            className="dialog-close icon-button"
            aria-label="Close project details"
            onClick={onClose}
            autoFocus
          >
            <X size={22} aria-hidden="true" />
          </button>
          <p className="eyebrow">{project.category}</p>
          <h2 id="dialog-title">{project.title}</h2>
          <p className="dialog-role">{project.role}</p>
          <p className="dialog-description">{project.detail}</p>
          {project.metrics && (
            <>
              <div className="metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <p className="metric-caption">
                DETECTOR EVALUATION · 50-EPOCH RUN
              </p>
            </>
          )}
          <h3>Inside the project</h3>
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>
                <Check size={17} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {project.note && <p className="project-note">{project.note}</p>}
          <ul className="tags dialog-tags" aria-label="Technologies">
            {project.stack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {(project.liveUrl || project.codeUrl) && (
            <div className="dialog-actions">
              {project.liveUrl && (
                <ExternalLink
                  href={project.liveUrl}
                  className="button button-primary"
                >
                  Visit project <ArrowUpRight size={18} aria-hidden="true" />
                </ExternalLink>
              )}
              {project.codeUrl && (
                <ExternalLink
                  href={project.codeUrl}
                  className="button button-quiet"
                >
                  View source <Github size={18} aria-hidden="true" />
                </ExternalLink>
              )}
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}

function Work({ onOpen }) {
  return (
    <section
      className="work-section section container"
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        number="01"
        eyebrow="SELECTED WORK"
        title={
          <span id="work-title">
            Ideas, put to work<span className="accent">.</span>
          </span>
        }
      >
        Real projects. Different challenges.
        <br />
        The same drive to figure things out.
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
      </div>
      <div className="experiments">
        <div className="experiments-heading">
          <span className="micro">ALSO ON MY WORKBENCH</span>
          <span className="micro">SMALLER BUILDS. MORE EXPLORATION.</span>
        </div>
        <div className="experiments-grid">
          {experiments.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article className="experiment" key={item.title}>
                <Icon size={21} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.stack}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section
      className="expertise-section"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="container section">
        <SectionHeading
          number="02"
          eyebrow="TECHNICAL EXPERTISE"
          title={
            <span id="expertise-title">
              Curious across the stack<span className="accent">.</span>
            </span>
          }
        >
          I like understanding how the pieces fit—
          <br />
          from the interface down to the network.
        </SectionHeading>
        <div className="skills-grid">
          {skills.map((skill) => {
            const Icon = icons[skill.icon];
            return (
              <article className="skill-card" key={skill.id}>
                <div className="skill-topline">
                  <Icon size={25} aria-hidden="true" />
                  <span className="micro">/{skill.number}</span>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <ul>
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="about-section section container"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-heading">
        <p className="eyebrow">
          <span className="section-number">03</span>THE PERSON BEHIND THE CODE
        </p>
        <h2 id="about-title">
          Rooted in Kampala.
          <br />
          <span>Thinking beyond it.</span>
        </h2>
        {profile.portrait && (
          <img
            className="portrait"
            src={profile.portrait}
            alt="Lumu Francis Xavier"
            loading="lazy"
            width="480"
            height="560"
          />
        )}
        <div className="about-signature">
          Lumu Xavier<span>SOFTWARE ENGINEERING STUDENT</span>
        </div>
      </div>
      <div className="about-body">
        <p className="about-lead">
          I’m Lumu, a software engineering student who likes getting past the
          surface of how things work.
        </p>
        <p>
          That curiosity takes me from training computer vision models to
          building client websites, configuring Linux servers, and working out
          why a network isn’t behaving. I learn best by making something,
          testing it, and improving it.
        </p>
        <p>
          My long-term direction is building useful products for problems close
          to home. Right now, I’m exploring network access and bandwidth
          management for small businesses, hostels, and gaming lounges in
          Uganda.
        </p>
        <div className="milestones">
          <div className="milestone">
            <GraduationCap size={21} aria-hidden="true" />
            <div>
              <h3>B.Sc. Software Engineering</h3>
              <p>International University of East Africa</p>
              <span>Undergraduate · Kampala, Uganda</span>
            </div>
          </div>
          <div className="milestone">
            <BrainCircuit size={21} aria-hidden="true" />
            <div>
              <h3>IUEA-Labs AI Team</h3>
              <p>Junior team member</p>
              <span>Applied computer vision & aquaculture monitoring</span>
            </div>
          </div>
          <div className="milestone">
            <Code2 size={21} aria-hidden="true" />
            <div>
              <h3>Bank of Uganda Hackathon</h3>
              <p>Participant</p>
              <span>Exploring technology in a financial-services context</span>
            </div>
          </div>
        </div>
        <div className="setup-line">
          <Terminal size={16} aria-hidden="true" />
          <span>THINKPAD · FEDORA KDE · ALWAYS LEARNING</span>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");
  function compose(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const email = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();
    if (!name || !email || !message) {
      setStatus("Please complete all three fields.");
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus(
      "Your email app will open with this draft. Send it there to get in touch.",
    );
  }
  return (
    <form className="contact-form" onSubmit={compose}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            maxLength="120"
            required
            placeholder="Name"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength="254"
            required
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        What are you working on?
        <textarea
          name="message"
          rows="4"
          maxLength="2000"
          required
          placeholder="A little about your idea…"
        />
      </label>
      <div className="form-bottom">
        <span>Opens your email app.</span>
        <button className="button button-primary" type="submit">
          Compose email <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyStatus("Email address copied.");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
        setCopyStatus("");
      }, 2500);
    } catch {
      setCopyStatus(
        "Copy unavailable. Select the email address or open the email link.",
      );
    }
  }
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">
            <span className="section-number">04</span>LET’S CONNECT
          </p>
          <h2 id="contact-title">
            Have something
            <br />
            <span>in mind?</span>
          </h2>
          <p>
            A useful product. An interesting problem.
            <br />A chance to build something together.
          </p>
          <div className="contact-links">
            {profile.email && (
              <div className="email-row">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={19} aria-hidden="true" />
                  {profile.email}
                </a>
                <button
                  className="icon-button"
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check size={17} aria-hidden="true" />
                  ) : (
                    <Copy size={17} aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
            <div className="social-links">
              <ExternalLink href={profile.github}>
                <Github size={19} aria-hidden="true" />
                GitHub
                <ArrowUpRight size={15} aria-hidden="true" />
              </ExternalLink>
              {profile.linkedin && (
                <ExternalLink href={profile.linkedin}>
                  <Linkedin size={19} aria-hidden="true" />
                  LinkedIn
                  <ArrowUpRight size={15} aria-hidden="true" />
                </ExternalLink>
              )}
            </div>
            <span className="copy-status" role="status">
              {copyStatus}
            </span>
          </div>
        </div>
        {profile.email ? (
          <ContactForm />
        ) : (
          <div className="contact-note">
            <span className="micro">BUILT ON CURIOSITY</span>
            <p>
              Good things start
              <br />
              with a <em>conversation.</em>
            </p>
            <ExternalLink
              href={profile.github}
              className="button button-primary"
            >
              Explore my GitHub <ArrowUpRight size={18} aria-hidden="true" />
            </ExternalLink>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer container">
      <a href="#home" className="wordmark" aria-label="Back to top">
        lumu<span>.</span>
      </a>
      <p>© {new Date().getFullYear()} Lumu Francis Xavier</p>
      <a href="#home">
        BACK TO TOP <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </footer>
  );
}

export default function App() {
  const [project, setProject] = useState(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Work onOpen={setProject} />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog project={project} onClose={() => setProject(null)} />
    </>
  );
}
