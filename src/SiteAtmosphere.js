import { createSectionScene } from "./createSectionScene";

const initialized = new WeakMap();
const mounted = new Set();
let observer;
let scrollFrame = 0;
let active = true;
let reduced = false;
let viewport = 0;
let pointerX = 0;
let pointerY = 0;
const sections = [
  {selector:".expertise-section",kind:"network",cls:"fx-expertise"},
  {selector:".work-section",kind:"flow",cls:"fx-work"},
  {selector:".about-section",kind:"crystal",cls:"fx-about"},
  {selector:".philosophy",kind:"rings",cls:"fx-philosophy"},
  {selector:".contact-section",kind:"network",cls:"fx-contact"}
];

function useMotion() {
  const root = document.querySelector(".portfolio");
  reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  active = !!root && root.dataset.motion !== "paused" && !reduced;
  return active;
}

function mount(element, kind, cls) {
  if (initialized.has(element)) return;
  const host = document.createElement("div");
  host.className = "fx-stage " + cls;
  host.setAttribute("aria-hidden", "true");
  const halo = document.createElement("div");
  halo.className = "fx-glow";
  const canvasHost = document.createElement("div");
  canvasHost.className = "fx-scene";
  host.append(halo, canvasHost);
  element.prepend(host);
  const entry = {element,host,canvasHost,kind,controller:null};
  initialized.set(element,entry);
  mounted.add(entry);
  observer.observe(element);
}

function visibility(entries) {
  for (const item of entries) {
    const entry = initialized.get(item.target);
    if (!entry) continue;
    if (item.isIntersecting && active && !entry.controller && window.innerWidth >= 860 && !navigator.connection?.saveData) {
      try {entry.controller = createSectionScene(entry.canvasHost,entry.kind,true);}
      catch {entry.controller=null;}
    }
    entry.controller?.setMotion(active && item.isIntersecting);
  }
}

function frame() {
  scrollFrame=0;
  if (!useMotion()) return;
  const center=window.innerHeight*.5;
  for (const entry of mounted) {
    const rect=entry.element.getBoundingClientRect();
    if(rect.bottom<0||rect.top>window.innerHeight)continue;
    const move=Math.max(-28,Math.min(28,(center-(rect.top+rect.height*.5))*.045));
    entry.host.style.setProperty("--fx-scroll",move+"px");
    entry.host.style.setProperty("--fx-pointer-x",pointerX+"px");
    entry.host.style.setProperty("--fx-pointer-y",pointerY+"px");
  }
}
function schedule(){if(!scrollFrame)scrollFrame=requestAnimationFrame(frame);}

function init() {
  if (!document.querySelector(".portfolio") || observer) return;
  observer=new IntersectionObserver(visibility,{rootMargin:"140px"});
  for(const cfg of sections){
    const element=document.querySelector(cfg.selector);
    if(element)mount(element,cfg.kind,cfg.cls);
  }
  for(const node of document.querySelectorAll('a[href="#lab"]')) {
    if(node.closest(".navigation"))node.remove();
  }
  const lab=document.querySelector(".immersive-lab");
  if(lab)lab.setAttribute("hidden","");
  useMotion();
  schedule();
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  document.addEventListener("pointermove",event=>{
    if(event.pointerType!=="mouse")return;
    pointerX=(event.clientX/window.innerWidth-.5)*16;
    pointerY=(event.clientY/window.innerHeight-.5)*16;
    schedule();
  },{passive:true});
  const mutation=new MutationObserver(()=>{
    const moving=useMotion();
    for(const entry of mounted)entry.controller?.setMotion(moving);
    schedule();
  });
  mutation.observe(document.querySelector(".portfolio"),{attributes:true,attributeFilter:["data-motion"]});
}
if(typeof window!=="undefined"){
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else queueMicrotask(init);
}
