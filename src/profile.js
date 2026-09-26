export const profile = {
  name: "Lumu Francis Xavier",
  location: "Kampala, Uganda",
  university: "International University of East Africa",
  degree: "B.Sc. Software Engineering",
  github: "https://github.com/lumu-xavier",
  email: "",
  linkedin: "",
  portrait: "",
};

export const projects = [
  {
    id: "rentalhub",
    number: "01",
    title: "RentalHub",
    category: "Full-stack development",
    status: "Deployed project",
    summary:
      "A rental marketplace built around the way Uganda finds a place to call home.",
    detail:
      "A dual-role marketplace that gives hosts and guests their own paths through the rental experience. Built with React and Vite, with a dark visual identity and layouts adapted for mobile.",
    role: "Application development & interface design",
    stack: ["React", "Vite", "Vercel"],
    highlights: [
      "Separate host and guest experiences",
      "Responsive layouts for phones and desktop",
      "Deployed on Vercel",
    ],
    liveUrl: "",
    codeUrl: "",
    image: "",
  },
  {
    id: "aquasentinel",
    number: "02",
    title: "AquaSentinel-ML",
    category: "Machine learning & computer vision",
    status: "Team project · IUEA-Labs",
    summary:
      "From video to insight. Computer vision for healthier aquaculture.",
    detail:
      "An aquaculture monitoring project built with the IUEA-Labs AI Team. YOLO26 detects fish, ByteTrack maintains identities, and a BiLSTM with attention classifies sequences. Independent sigmoid outputs allow multiple disease flags for the same fish.",
    role: "Junior AI team member · applied ML development",
    stack: ["Python", "YOLO", "ByteTrack", "BiLSTM", "Streamlit"],
    highlights: [
      "Webcam, IP camera, and uploaded-video inputs",
      "Live detection boxes and per-fish disease gauges",
      "Investigated tracking stability and a synthetic-data issue that suppressed one class",
    ],
    metrics: [
      { value: "89.2%", label: "mAP50" },
      { value: "87.8%", label: "Precision" },
      { value: "81.4%", label: "Recall" },
    ],
    note: "Reported detector results from a 50-epoch YOLO26 run; these are not end-to-end disease-classification scores. The water-quality panel uses simulated data, and dashboard authentication is a prototype.",
    liveUrl: "",
    codeUrl: "",
    image: "",
  },
  {
    id: "sm-engineering",
    number: "03",
    title: "SM Engineering Works",
    category: "Client website",
    status: "Real client work",
    summary: "A digital front door for a hands-on engineering business.",
    detail:
      "A business website covering industrial motor repair, metal fabrication, and electronics repair. Iterated against the client’s requirements, from service categories and contact details to WhatsApp lead capture.",
    role: "Website development & client iteration",
    stack: ["HTML", "CSS", "JavaScript", "WhatsApp"],
    highlights: [
      "Service-led information architecture",
      "Responsive design and animated interactions",
      "WhatsApp contact flow",
    ],
    liveUrl: "",
    codeUrl: "",
    image: "",
  },
  {
    id: "network-labs",
    number: "04",
    title: "Networks that work",
    category: "Networking & automation",
    status: "Hands-on labs",
    summary: "Routing, naming, and automation beneath the applications.",
    detail:
      "Built and configured Linux network environments in GNS3, with Bash automation for DHCP and DNS using dnsmasq on Ubuntu Server. Earlier work used Alpine Linux, dnsmasq, and lighttpd. Cisco labs cover multi-switch VLAN/VTP and inter-VLAN routing.",
    role: "Network configuration & Linux automation",
    stack: ["GNS3", "Cisco IOS", "Linux", "Bash", "dnsmasq"],
    highlights: [
      "DHCP and DNS provisioning with Bash",
      "VLAN segmentation and inter-VLAN routing",
      "Ubuntu Server and Alpine Linux administration",
    ],
    liveUrl: "",
    codeUrl: "",
    image: "",
  },
];

export const experiments = [
  {
    title: "WhatsApp AI assistant",
    description:
      "A class project connecting WhatsApp conversations to Gemini through a Node.js and Express backend.",
    stack: "Node.js / Express / Meta API / Gemini",
    icon: "message",
  },
  {
    title: "Browser battle royale",
    description:
      "Canvas-based gameplay with work on zone timing, damage registration, and spawn logic.",
    stack: "JavaScript / HTML5 Canvas",
    icon: "game",
  },
  {
    title: "Elevation Academy",
    description:
      "A seven-page coaching and mentorship website, built around responsive React components.",
    stack: "React / Vite / Client website",
    icon: "window",
  },
  {
    title: "Local AI workspace",
    description:
      "An offline coding setup on Fedora, bringing an Ollama model into VS Code with Continue.",
    stack: "Ollama / Linux / VS Code",
    icon: "terminal",
  },
];

export const skills = [
  {
    id: "web",
    number: "01",
    title: "Web & applications",
    description: "Interfaces people can use. Services that connect them.",
    icon: "code",
    items: [
      "React & Vite",
      "JavaScript",
      "Node.js & Express",
      "REST APIs",
      "HTML & CSS",
      "SQL & MySQL",
      "Java · Swing/AWT",
    ],
  },
  {
    id: "ai",
    number: "02",
    title: "AI & machine learning",
    description: "Detection, tracking, and learning from sequences.",
    icon: "brain",
    items: [
      "Python & PyTorch",
      "YOLO & OpenCV",
      "ByteTrack",
      "CNNs & RNNs",
      "BiLSTM & attention",
      "Streamlit",
      "Classical AI fundamentals",
    ],
  },
  {
    id: "systems",
    number: "03",
    title: "Networks & cloud",
    description: "The infrastructure that keeps applications useful.",
    icon: "network",
    items: [
      "Linux · Fedora / Ubuntu / Alpine",
      "Cisco IOS & GNS3",
      "IPv4 / IPv6 & VLANs",
      "Bash automation",
      "DHCP & DNS",
      "Cloudflare Pages & Netlify",
      "Git & GitHub",
    ],
  },
  {
    id: "security",
    number: "04",
    title: "Security & hardware",
    description: "A grounding in how systems behave, fail, and recover.",
    icon: "shield",
    items: [
      "SIEM & IDS/IPS fundamentals",
      "Incident response concepts",
      "SonarQube & Linux security",
      "C & C++",
      "Arduino",
      "Proteus simulation",
      "Embedded systems fundamentals",
    ],
  },
];
