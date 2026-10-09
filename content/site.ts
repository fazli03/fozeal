import type { Icon, Sourced } from "./schema";
import { gmailComposeUrl } from "@/lib/mail";

const EMAIL = "fozeal313@gmail.com";

/** A footer mark, drawn from /public/assets/Footer at its exported 30×30. */
const mark = (path: string, width = 30, height = 30): Icon => ({
  src: encodeURI(path),
  label: "",
  width,
  height,
});

export const site = {
  /** The brand. Set as type, never as an image — see components/site/wordmark. */
  name: "FOZEAL" as Sourced<string>,
  /** Fallback used for <title> and the wordmark until the name is sourced. */
  nameFallback: "FOZEAL",
  /** The person behind the brand, credited in the hero and the footer. */
  author: "Fazli Maulana",
  role: "UI/UX Designer",
  location: "Depok, West Java, Indonesia",
  /** Printed as selectable text wherever a compose link appears. */
  email: EMAIL as Sourced<string>,
  /** Where every "write to me" link goes. See lib/mail.ts for why not mailto. */
  composeUrl: gmailComposeUrl(EMAIL),
  url: "https://fozeal.com",

  /** The thesis line in the hero. Rewritten for clarity, meaning preserved. */
  thesis: "The best interfaces are the ones people never have to think about.",

  availability: "Open to UI/UX design roles and freelance work",

  nav: [
    { href: "/#work", label: "Work" },
    { href: "/#skills-tools", label: "Skills & Tools" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ],

  /**
   * Marks are the ones exported into /public/assets/Footer.
   *
   * `kind` is what components/site/social-link.tsx reads to decide how the
   * anchor behaves — mailto, tel, a new tab, or a saved file. An entry whose
   * href is still null renders as inert text rather than as a dead link, so
   * filling one in is the only step needed to switch it on.
   *
   * TO FINISH:
   *   LinkedIn   href: 'https://www.linkedin.com/in/<your-handle>'
   *   Instagram  href: 'https://www.instagram.com/<your-handle>'
   *   Phone      href: 'tel:+628…'  (no spaces — the dialler needs it raw)
   *   CV         drop the PDF at  public/cv/fazli-maulana-cv.pdf
   */
  social: [
    {
      /* `external`, not `email`: this is a Gmail URL, so it belongs in a new
         tab rather than being handed to the OS. */
      label: "Email",
      kind: "external",
      href: gmailComposeUrl(EMAIL) as Sourced<string>,
      icon: mark("/assets/Footer/mail.svg"),
    },
    {
      label: "LinkedIn",
      kind: "external",
      href: "https://www.linkedin.com/in/fazli-maulana-787b86405?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      icon: mark("/assets/Footer/LinkedIn.svg"),
    },
    {
      label: "Instagram",
      kind: "external",
      href: "https://www.instagram.com/fazli_354/",
      icon: mark("/assets/Footer/Instagram.svg"),
    },
    {
      label: "+62 896 7349 4419",
      kind: "phone",
      href: "https://wa.me/6289673494419?text=Hello%20Fazli,%20I%20came%20across%20your%20UI/UX%20portfolio%20and%20was%20impressed%20by%20your%20work.%20I'd%20love%20to%20connect%20and%20discuss%20a%20potential%20opportunity%20with%20you." as Sourced<string>,
      icon: mark("/assets/Footer/Phone.svg"),
    },
    {
      label: "CV",
      kind: "download",
      /* One CV, one path. It lives in public/cv rather than public/assets,
         which holds design exports — and there is deliberately no second copy
         anywhere, because the moment there are two the wrong one gets served. */
      /* Lowercase and hyphenated on purpose. Windows treats filenames as
         case-insensitive and Vercel's Linux hosts do not, so a name whose
         capitals drift — "CV FAZLI MAULANA.pdf" in git against "CV Fazli
         Maulana.pdf" on disk — resolves locally and 404s in production. */
      href: "/cv/cv-fazli-maulana.pdf",
      /** The name the browser saves it under, whatever the file is called. */
      fileName: "CV Fazli Maulana.pdf",
      icon: mark("/assets/Footer/file-cv 1.svg"),
    },
  ],

  /**
   * The footer's decorative layer — the glyphs a designer leaves on a canvas.
   * Positioned as percentages of the footer box so they stay put across
   * breakpoints, and dropped entirely below `lg` where there is no room.
   */
  footerGlyphs: [
    {
      icon: mark("/assets/About/Pen.webp", 80, 80),
      top: "14%",
      left: "6%",
      size: 34,
      rotate: -12,
    },
    {
      icon: mark("/assets/About/Selection Block.webp", 80, 80),
      top: "62%",
      left: "17%",
      size: 30,
      rotate: 8,
    },
    {
      icon: mark("/assets/About/Color Pallete.webp", 80, 80),
      top: "22%",
      left: "78%",
      size: 32,
      rotate: 14,
    },
    {
      icon: mark("/assets/About/Typography.webp", 50, 50),
      top: "70%",
      left: "88%",
      size: 28,
      rotate: -8,
    },
    {
      icon: mark("/assets/About/Blink.webp", 56, 60),
      top: "46%",
      left: "48%",
      size: 24,
      rotate: 0,
    },
  ],

  /**
   * How the work is actually done. Phrased as practice, not as a skills
   * shopping list — the detailed skill inventory lives on the About page and
   * comes from the About design file.
   */
  capabilities: [
    {
      no: "01",
      title: "Understand the problem",
      body: "I starts with understanding its goals. I explore similar products, identify user needs, and form informed assumptions when research opportunities are limited.",
    },
    {
      no: "02",
      title: "Create the Solution",
      body: "Based on the insights gathered, I organize the information architecture, create user flows, develop wireframes, define the visual direction, and build a simple design system to ensure consistency.",
    },
    {
      no: "03",
      title: "Build The Prototype",
      body: "I turn ideas into high-fidelity designs and interactive prototypes that bring the user journey to life.",
    },
    {
      no: "04",
      title: "Test & Refine",
      body: "I conduct simple usability testing, collect feedback, and iterate on the design to improve both the user experience and visual quality.",
    },
  ],

  /**
   * Skills and Tools for UI/UX & Product Designer.
   * You can easily update these dummy values with your own details!
   */
  skillsAndTools: {
    skills: [
      {
        no: "01",
        category: "UX Research & Strategy",
        tag: "DISCOVERY & IA",
        description: "Uncovering user needs, mapping workflows, and establishing structural foundations before visual execution.",
        items: [
          { name: "User Research & Interviews", level: "Advanced", desc: "Qualitative research & user insights gathering" },
          { name: "Information Architecture (IA)", level: "Advanced", desc: "Sitemaps, navigation models & content hierarchy" },
          { name: "User Journey Mapping & Flows", level: "Advanced", desc: "End-to-end task flows & scenario mapping" },
          { name: "Usability Testing & Audits", level: "Intermediate", desc: "Heuristic evaluation & feedback iteration" },
          { name: "Product Discovery & Strategy", level: "Advanced", desc: "Problem definition & business value alignment" },
          { name: "Competitor & Market Analysis", level: "Advanced", desc: "Benchmarking UI patterns & market positioning" },
        ],
      },
      {
        no: "02",
        category: "UI & Interaction Design",
        tag: "INTERFACE SYSTEMS",
        description: "Crafting modern, accessible, and responsive user interfaces powered by unified design tokens.",
        items: [
          { name: "Design Systems & Tokens", level: "Expert", desc: "Scalable component libraries & style guides" },
          { name: "High-Fidelity Wireframing", level: "Expert", desc: "Pixel-perfect screen layouts & component design" },
          { name: "Interactive Prototyping", level: "Advanced", desc: "Clickable prototypes & realistic user flows" },
          { name: "Mobile App UI Design (iOS / Android)", level: "Expert", desc: "Native design guidelines & touch ergonomics" },
          { name: "Responsive Web Design", level: "Expert", desc: "Fluid layouts across desktop, tablet & mobile" },
          { name: "Micro-Interactions & Motion", level: "Intermediate", desc: "Subtle animations for UX feedback & polish" },
        ],
      },
      {
        no: "03",
        category: "Product Thinking & Handoff",
        tag: "EXECUTION & QA",
        description: "Bridging business goals, user satisfaction, and technical feasibility through clean developer handoffs.",
        items: [
          { name: "Feature Prioritization", level: "Advanced", desc: "MVP scoping & MoSCoW prioritization" },
          { name: "Developer Specs & Handoff", level: "Expert", desc: "Figma specs, token mapping & redlines" },
          { name: "Design QA & Visual Reviews", level: "Advanced", desc: "Ensuring implementation matches design intent" },
          { name: "Agile & Design Sprints", level: "Intermediate", desc: "Cross-functional team collaboration & iteration" },
        ],
      },
    ],
    tools: [
      {
        category: "Core Design & Prototyping",
        items: [
          { name: "Figma", role: "Primary UI/UX & Design Systems", icon: mark("/assets/About/Figma.webp", 24, 24), badge: "Daily Tool" },
          { name: "FigJam", role: "Brainstorming & User Flows", badge: "Workshops" },
          { name: "Framer", role: "Interactive Web & Portfolios", badge: "Prototyping" },
          { name: "Canva & Adobe CC", role: "Graphic Assets & Brand Design", icon: mark("/assets/About/Canva.svg", 24, 24), badge: "Visual Assets" },
          { name: "ProtoPie", role: "Advanced Micro-Interactions", badge: "Motion" },
        ],
      },
      {
        category: "Productivity & Collaboration",
        items: [
          { name: "Notion", role: "Documentation & Research Notes", icon: mark("/assets/About/Notion.svg", 24, 24), badge: "Daily Tool" },
          { name: "Miro", role: "Collaborative Whiteboarding", badge: "Ideation" },
          { name: "Loom", role: "Asynchronous Design Reviews", badge: "Handoff" },
          { name: "Jira / Linear", role: "Sprint Tracking & Design QA", badge: "Management" },
        ],
      },
      {
        category: "AI & UX Workflow",
        items: [
          { name: "ChatGPT", role: "UX Copywriting & Research Synthesis", icon: mark("/assets/About/ChatGPT.svg", 24, 24), badge: "AI Assistant" },
          { name: "Claude", role: "UX Logic & Structural Content", icon: mark("/assets/About/Claude.svg", 24, 24), badge: "AI Assistant" },
          { name: "Gemini", role: "Multimodal Research & Ideation", icon: mark("/assets/About/Gemini.svg", 24, 24), badge: "AI Assistant" },
          { name: "Midjourney & Relume", role: "AI Wireframing & Moodboards", badge: "Ideation" },
        ],
      },
    ],
  },
} as const;

export type Site = typeof site;
