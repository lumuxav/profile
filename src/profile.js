export const profile = {
  name: "Lumu Francis Xavier",
  location: "Kampala, Uganda",
  github: "https://github.com/lumuxav",
  whatsapp: "https://wa.me/256757742177",
  whatsappDisplay: "0757 742 177",
  instagram: "https://www.instagram.com/_l.u.m.u_/",
  portrait: "./images/xavier-portrait.png",
};

export const projects = [
  {
    id: "intelligent-systems",
    number: "01",
    title: "Intelligent systems",
    category: "AI & computer vision",
    filter: "AI & data",
    status: "Data → useful decisions",
    summary: "Intelligence with a purpose.",
    description:
      "Computer vision, sequence models, and AI-assisted workflows that turn data into something people can act on.",
    challenge:
      "A model only becomes useful when its output can support a real decision. I think about the data, the interface, and the people using both.",
    detail:
      "I connect detection, object tracking, sequence classification, and model evaluation into usable software. The work extends beyond training: inspecting failure cases, handling multi-label predictions, and building interfaces that make model behaviour clear.",
    result:
      "An engineering approach to AI: clear data flows, deliberate model choices, honest evaluation, and useful ways for people to interact with the results.",
    role: "Vision pipelines · Model evaluation · Application integration",
    stack: ["Python", "PyTorch", "OpenCV", "YOLO"],
    highlights: [
      "Computer-vision detection and tracking",
      "Sequence-aware classification",
      "Interactive model interfaces",
    ],
  },
  {
    id: "web-platforms",
    number: "02",
    title: "Web platforms",
    category: "Full-stack development",
    filter: "Applications",
    status: "Interface → deployment",
    summary: "Digital experiences that feel considered.",
    description:
      "Responsive applications that connect thoughtful interfaces, useful APIs, and clear user journeys.",
    challenge:
      "Good software makes a complicated task feel natural. I start with what a person needs to do, then shape the screens and application flow around that.",
    detail:
      "I build with React, Vite, JavaScript, and Node.js, connecting interfaces to APIs and taking applications through deployment. Component structure, responsive behaviour, and useful interactions are part of the same design problem.",
    result:
      "My experience spans role-based interfaces, API integrations, and deployed web applications. I care about the details that make a product easy to use and straightforward to maintain.",
    role: "Front-end · APIs · Product structure · Deployment",
    stack: ["React", "Vite", "Node.js", "REST APIs"],
    highlights: [
      "Responsive, motion-led interfaces",
      "Role-aware application journeys",
      "API integrations and deployment",
    ],
  },
  {
    id: "business-systems",
    number: "03",
    title: "Business systems",
    category: "Systems & digital presence",
    filter: "Applications",
    status: "Workflows → software",
    summary: "Built around how a business works.",
    description:
      "Business platforms, connected workflows, and automation shaped around the people who use them.",
    challenge:
      "Every organisation has its own processes, vocabulary, and constraints. Useful software begins by listening closely enough to understand them.",
    detail:
      "I translate requirements into clear service structures, data models, interfaces, and connected workflows. My client-facing development experience includes revising content, navigation, and contact journeys in response to real feedback.",
    result:
      "I bring a practical delivery mindset: understand the need, build something tangible, listen to feedback, and refine it. The goal is software that earns its place in a working day.",
    role: "Requirements · Interface development · Client collaboration",
    stack: ["JavaScript", "SQL", "Web interfaces", "Automation"],
    highlights: [
      "Service-focused business websites",
      "Structured records and workflows",
      "Direct, useful customer contact journeys",
    ],
  },
  {
    id: "network-infrastructure",
    number: "04",
    title: "Connected by design",
    category: "Infrastructure & operations",
    filter: "Networks",
    status: "Architecture → operations",
    summary: "The intelligence beneath the interface.",
    description:
      "Network architecture, service delivery, access design, and infrastructure automation—considered as one connected system.",
    challenge:
      "Connectivity is an operational system. Applications need clear traffic paths, dependable services, deliberate access boundaries, and a way to diagnose failure.",
    detail:
      "I approach networks from topology and addressing through routing, service configuration, segmentation, and fault isolation. Linux administration and scripting make configuration repeatable, while application requirements guide how the pieces fit together.",
    result:
      "A view across the network lifecycle: design the connections, configure the services, investigate the behaviour, and automate recurring work. My focus is infrastructure that is understandable, maintainable, and useful to the business above it.",
    role: "Network architecture · Service operations · Automation",
    stack: ["Network design", "Linux", "Service operations", "Automation"],
    highlights: [
      "Topology, traffic flow, and access boundaries",
      "Service delivery and connectivity troubleshooting",
      "Repeatable provisioning and operational workflows",
    ],
  },
];

export const experiments = [
  {
    title: "Conversational AI systems",
    description:
      "Messaging experiences that connect application backends, language models, and external services. I shape the complete interaction—from incoming request to a useful, clearly presented response.",
    stack: "Node.js · Express · API integration",
    icon: "message",
  },
  {
    title: "Mobile product experiences",
    description:
      "Touch-friendly interfaces, clear navigation, and API-connected journeys that work across screen sizes. My approach carries product logic and design consistency from the desktop into the way people use their phones.",
    stack: "Responsive UI · APIs · Mobile UX",
    icon: "window",
  },
  {
    title: "Interactive experiences",
    description:
      "Browser graphics, real-time interaction, and state-driven experiences. I work through the details of input, timing, game logic, and visual feedback to make the experience feel responsive.",
    stack: "JavaScript · HTML5 Canvas",
    icon: "game",
  },
  {
    title: "Local AI & developer tools",
    description:
      "Self-hosted language models, local coding assistants, and Linux workflows that put the development environment under direct control. Practical tooling for a more independent engineering process.",
    stack: "Ollama · Linux · Developer tools",
    icon: "terminal",
  },
];

export const skills = [
  {
    id: "web",
    number: "01",
    title: "Full-stack applications",
    short: "Web",
    icon: "code",
    description:
      "Digital products built as a complete experience: expressive interfaces, connected services, clear application logic, and a deliberate path to deployment.",
    items: [
      "Product interfaces",
      "Application architecture",
      "API integration",
      "Responsive systems",
      "Web deployment",
    ],
    proof: "From product concept to working application",
  },
  {
    id: "ai",
    number: "02",
    title: "AI & machine learning",
    short: "AI / ML",
    icon: "brain",
    description:
      "Intelligence engineered into the product. I connect computer vision, sequence modelling, and evaluation to software people can actually use.",
    items: [
      "Computer vision",
      "Detection & tracking",
      "Sequence modelling",
      "Model evaluation",
      "Inference interfaces",
    ],
    proof: "From raw inputs to actionable intelligence",
  },
  {
    id: "networks",
    number: "03",
    title: "Network & infrastructure",
    short: "Networks",
    icon: "network",
    description:
      "The complete connectivity picture: network architecture, traffic flow, access boundaries, service operations, and automation that makes change repeatable.",
    items: [
      "Network architecture",
      "Service operations",
      "Access & segmentation",
      "Fault isolation",
      "Infrastructure automation",
    ],
    proof: "From network design to connected operations",
  },
  {
    id: "systems",
    number: "04",
    title: "Systems engineering",
    short: "Systems",
    icon: "cpu",
    description:
      "Turning complex workflows into coherent software. I connect interfaces, services, and operating environments around clear responsibilities and practical automation.",
    items: [
      "Systems integration",
      "Workflow automation",
      "Linux environments",
      "API-driven services",
      "Developer tooling",
    ],
    proof: "Connected components. Considered behaviour.",
  },
  {
    id: "mobile",
    number: "05",
    title: "Mobile experiences",
    short: "Mobile",
    icon: "phone",
    description:
      "Product experiences designed around real movement: fast interactions, intuitive navigation, touch-friendly interfaces, and connected application journeys.",
    items: [
      "Mobile product UX",
      "Touch interactions",
      "Adaptive interfaces",
      "Connected workflows",
    ],
    proof: "One product vision, across every screen",
  },
  {
    id: "data",
    number: "06",
    title: "Data architecture",
    short: "Databases",
    icon: "database",
    description:
      "Data structures that support the product above them. I connect relational modelling, integrity, transactions, and query design to the way an application works.",
    items: [
      "Relational modelling",
      "Data integrity",
      "Transactional workflows",
      "Query design",
      "Application data layers",
    ],
    proof: "Structured for clarity. Built around the product.",
  },
];

export const toolbelt = [
  "Python",
  "React",
  "JavaScript",
  "Java",
  "PyTorch",
  "SQL",
  "Linux",
  "Cisco",
  "Git",
  "C / C++",
];
