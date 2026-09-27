import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource-variable/manrope/wght.css";
import "./styles.css";

const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
