export const profile = {
  name: "Lumu Francis Xavier",
  location: "Kampala, Uganda",
  university: "International University of East Africa",
  degree: "B.Sc. Software Engineering",
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
      "My applied ML work brings together detection, tracking, sequence classification, and interactive dashboards. I explore how models connect to software, how errors surface, and how an interface can make complex output understandable.",
    result:
      "I bring hands-on Python and computer-vision foundations, an appetite for experimentation, and the patience to investigate what a model is actually learning.",
    role: "Applied ML · Prototyping · Integration",
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
      "Clear websites, operational interfaces, and automation that connect a business with the people it serves.",
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
    category: "Networks & automation",
    filter: "Networks",
    status: "Below the interface",
    summary: "The intelligence beneath the interface.",
    description:
      "Segmented networks, Linux services, and repeatable automation—the foundations that keep applications connected.",
    challenge:
      "Reliable applications depend on reliable infrastructure. I want to understand how devices communicate, how services are reached, and where that chain can break.",
    detail:
      "My hands-on networking experience covers Cisco configuration, VLANs and inter-VLAN routing, Linux environments in GNS3, and DHCP/DNS automation with Bash. I use labs to test ideas and make setup repeatable.",
    result:
      "I connect application development with an understanding of routing, segmentation, and Linux service administration. It is a foundation for exploring useful connectivity products for local businesses.",
    role: "Network configuration · Linux services · Automation",
    stack: ["Cisco IOS", "GNS3", "Linux", "Bash"],
    highlights: [
      "Routing, switching, and segmentation",
      "DHCP and DNS service configuration",
      "Linux administration and automation",
    ],
  },
];

export const experiments = [
  {
    title: "Conversational interfaces",
    description:
      "Connecting application backends to messaging and language-model APIs, with an emphasis on the interaction from request to response.",
    stack: "Node.js · Express · API integration",
    icon: "message",
  },
  {
    title: "Mobile-ready experiences",
    description:
      "Responsive product interfaces and API-first foundations, while extending my web development experience toward dedicated mobile applications.",
    stack: "Responsive UI · APIs · Mobile UX",
    icon: "window",
  },
  {
    title: "Interactive experiences",
    description:
      "Exploring real-time interaction, browser graphics, and the logic behind responsive game systems using JavaScript and HTML5 Canvas.",
    stack: "JavaScript · HTML5 Canvas",
    icon: "game",
  },
  {
    title: "Local AI & developer tools",
    description:
      "Experimenting with self-hosted language models, local coding assistants, and Linux-based workflows that make development more independent.",
    stack: "Ollama · Linux · Developer tools",
    icon: "terminal",
  },
];

export const skills = [
  {
    id: "web",
    number: "01",
    title: "Web applications",
    short: "Web",
    icon: "code",
    description:
      "Thoughtful interfaces. Connected services. From the first interaction to the API behind it, I build web experiences with purpose.",
    items: [
      "React & Vite",
      "JavaScript",
      "Node.js & Express",
      "REST APIs",
      "HTML / CSS",
    ],
    proof: "Responsive interfaces · APIs · Deployment",
  },
  {
    id: "ai",
    number: "02",
    title: "AI & machine learning",
    short: "AI / ML",
    icon: "brain",
    description:
      "Turning data into useful intelligence through computer vision, deep learning, and systems that make model outputs usable.",
    items: [
      "Python & PyTorch",
      "YOLO & OpenCV",
      "CNNs / RNNs",
      "BiLSTM & attention",
      "Streamlit",
    ],
    proof: "Applied vision · Sequence models · Dashboards",
  },
  {
    id: "networks",
    number: "03",
    title: "Network engineering",
    short: "Networks",
    icon: "network",
    description:
      "Thinking beyond the screen: routing, segmentation, Linux services, and the infrastructure that keeps everything connected.",
    items: [
      "Cisco IOS & GNS3",
      "VLAN / VTP",
      "IPv4 / IPv6",
      "DHCP & DNS",
      "Bash automation",
    ],
    proof: "Applied in Cisco and Linux network labs",
  },
  {
    id: "systems",
    number: "04",
    title: "System development",
    short: "Systems",
    icon: "cpu",
    description:
      "Breaking complex problems into connected parts—from API integrations and desktop interfaces to automation and embedded fundamentals.",
    items: [
      "Java · Swing / AWT",
      "C / C++",
      "Linux administration",
      "Arduino & Proteus",
      "Git / GitHub",
    ],
    proof: "Built: API integrations · Linux automation",
  },
  {
    id: "mobile",
    number: "05",
    title: "Mobile applications",
    short: "Mobile",
    icon: "phone",
    description:
      "Small screens, big possibilities. I'm extending my React and API foundations into mobile application development, with intuitive journeys at the centre.",
    items: [
      "Mobile-first UX",
      "Responsive interfaces",
      "API integration",
      "Cross-platform exploration",
    ],
    proof: "Next frontier: dedicated mobile applications",
  },
  {
    id: "data",
    number: "06",
    title: "Database management",
    short: "Databases",
    icon: "database",
    description:
      "Good software starts with trustworthy data. I work with relational structures, clear relationships, and queries that make information useful.",
    items: [
      "SQL & MySQL",
      "Schema design",
      "Normalization to 3NF",
      "ACID & transactions",
      "Foreign keys",
    ],
    proof: "Applied database coursework & debugging",
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
