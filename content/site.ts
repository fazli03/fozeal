import type { Icon, Sourced } from "./schema";
import { gmailComposeUrl } from "@/lib/mail";

const EMAIL = "fozeal313@gmail.com";

/** Creates an icon reference from a public asset path. */
const mark = (path: string, width = 30, height = 30): Icon => ({
  src: encodeURI(path),
  label: "",
  width,
  height,
});

export const site = {
  name: "FOZEAL" as Sourced<string>,
  nameFallback: "FOZEAL",
  author: "Fazli Maulana",
  role: "UI/UX Designer",
  location: "Depok, West Java, Indonesia",
  email: EMAIL as Sourced<string>,
  composeUrl: gmailComposeUrl(EMAIL),
  url: "https://fozeal.com",

  thesis:
    "The best interfaces are the ones people never have to think about.",

  availability: "Open to UI/UX design roles and freelance work",

  nav: [
    { href: "/about", label: "About" },
    { href: "/#work", label: "Project" },
    { href: "/#skills-tools", label: "Skills & Tools" },
    { href: "/#contact", label: "Contact" },
  ],

  social: [
    {
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
      href: "https://wa.me/6289673494419?text=Hello%20Fazli,%20I%20came%20across%20your%20UI/UX%20portfolio%20and%20was%20impressed%20by%20your%20work.%20I'd%20love%20to%20connect%20and%20discuss%20a%20potential%20opportunity%20with%20you.",
      icon: mark("/assets/Footer/Phone.svg"),
    },
    {
      label: "CV",
      kind: "download",
      href: "/cv/cv-fazli-maulana.pdf",
      fileName: "CV Fazli Maulana.pdf",
      icon: mark("/assets/Footer/file-cv 1.svg"),
    },
  ],

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

  capabilities: [
    {
      no: "01",
      title: "Understand the Problem",
      body: "I start by understanding the problem and its goals. I explore similar products, identify user needs, and form informed assumptions when research opportunities are limited.",
    },
    {
      no: "02",
      title: "Create the Solution",
      body: "Based on the insights gathered, I organize the information architecture, create user flows, develop wireframes, define the visual direction, and build reusable components to support design consistency.",
    },
    {
      no: "03",
      title: "Build the Prototype",
      body: "I turn ideas into high-fidelity designs and interactive prototypes that bring the intended user journey to life.",
    },
    {
      no: "04",
      title: "Test & Refine",
      body: "I conduct usability testing, gather feedback, and refine the design to improve usability and visual clarity.",
    },
  ],

  /**
   * Skills and tools based on practical project and learning experience.
   * Skill levels are data labels; the About page component must render them.
   * 
   * 
   */


  skillsAndTools: {
    skills: [
      {
        no: "01",
        category: "UX Research & Information Architecture",
        tag: "UNDERSTAND & STRUCTURE",
        description:
          "Understanding user needs, identifying pain points, and structuring digital experiences before moving into interface design.",
        items: [
          {
            name: "User Persona",
            level: "Practiced",
            desc: "Representing user characteristics, goals, and pain points.",
          },
          {
            name: "User Journey Mapping",
            level: "Practiced",
            desc: "Mapping user experiences, needs, and challenges across key stages.",
          },
          {
            name: "User Flow",
            level: "Confident",
            desc: "Defining clear navigation paths and task completion steps.",
          },
          {
            name: "Information Architecture",
            level: "Practiced",
            desc: "Organizing content and navigation into understandable structures.",
          },
          {
            name: "Problem Definition",
            level: "Practiced",
            desc: "Translating user problems into design opportunities.",
          },
          {
            name: "Usability Testing",
            level: "Confident",
            desc: "Using Think Aloud testing to observe interactions and identify usability issues.",
          },
        ],
      },
      {
        no: "02",
        category: "UI & Interaction Design",
        tag: "DESIGN & PROTOTYPE",
        description:
          "Translating user needs into structured interfaces and interactive prototypes with a focus on clarity, usability, and consistency.",
        items: [
          {
            name: "Wireframing",
            level: "Confident",
            desc: "Exploring screen layouts and content hierarchy from low to high fidelity.",
          },
          {
            name: "High-Fidelity UI Design",
            level: "Confident",
            desc: "Creating detailed interfaces with considered typography, color, and layout.",
          },
          {
            name: "Interactive Prototyping",
            level: "Confident",
            desc: "Connecting screens and interactions to communicate product behavior.",
          },
          {
            name: "Visual Hierarchy",
            level: "Practiced",
            desc: "Using layout, typography, and contrast to guide user attention.",
          },
          {
            name: "Responsive Web Design",
            level: "Confident",
            desc: "Designing web experiences that adapt to different screen sizes.",
          },
          {
            name: "Design Systems",
            level: "Practiced",
            desc: "Applying reusable components and consistent styles across interfaces.",
          },
        ],
      },
      {
        no: "03",
        category: "Product Design & Collaboration",
        tag: "THINK & DELIVER",
        description:
          "Connecting design decisions with user goals while considering implementation constraints and collaborating across disciplines.",
        items: [
          {
            name: "Design Thinking",
            level: "Practiced",
            desc: "Applying a structured process to understand problems, explore ideas, and test solutions.",
          },
          {
            name: "Design Iteration",
            level: "Practiced",
            desc: "Refining interface concepts through feedback and usability findings.",
          },
          {
            name: "Developer Collaboration",
            level: "Practiced",
            desc: "Working across UI/UX and web development tasks to bring concepts closer to implementation.",
          },
          {
            name: "Design-to-Code",
            level: "Practiced",
            desc: "Translating interface designs into web layouts using HTML, CSS, and Webflow.",
          },
        ],
      },
    ],

    tools: [
      {
        category: "UI Design & Prototyping",
        items: [
          {
            name: "Figma",
            role: "UI Design, Wireframing & Prototyping",
            icon: mark("/assets/About/Figma.png", 24, 24),
            badge: "Primary Tool",
          },
          {
            name: "Stitch",
            role: "Early UI Concepts & Interface Exploration",
            icon: mark("/assets/About/Stitch.jpeg", 24, 24),
            badge: "AI UI Design",
          },
        ],
      },
      {
        category: "Web Development",
        items: [
          {
            name: "HTML & CSS",
            role: "Web Interface Implementation",
            icon: mark("/assets/About/htmlcss.png", 24, 24),
            badge: "Frontend",
          },
          {
            name: "PHP",
            role: "Server Programming Language",
            icon: mark("/assets/About/php.png", 24, 24),
            badge: "Backend",
          },
          {
            name: "Laravel",
            role: "Backend Framework Development",
            icon: mark("/assets/About/Laravel.png", 24, 24),
            badge: "Backend",
          },
          {
            name: "Filament",
            role: "Admin Panel & Dashboard Development",
            icon: mark("/assets/About/Filament.webp", 24, 24),
            badge: "Laravel",
          },
          {
            name: "MySQL",
            role: "Relational Database Management",
            icon: mark("/assets/About/MySQL.png", 24, 24),
            badge: "Database",
          },
        ],
      },
      {
        category: "AI-Assisted Workflow",
        items: [
          {
            name: "ChatGPT",
            role: "Design Exploration, Brainstorming & Feedback",
            icon: mark("/assets/About/ChatGPT.svg", 24, 24),
            badge: "AI Assistant",
          },
          {
            name: "Claude",
            role: "Design Workflow Support & Code Assistance",
            icon: mark("/assets/About/Claude.svg", 24, 24),
            badge: "AI Assistant",
          },
          {
            name: "Gemini",
            role: "AI-Generated Illustrations & Visual Assets",
            icon: mark("/assets/About/Gemini.webp", 24, 24),
            badge: "Asset Generation",
          },
        ],
      },
    ],
  },
} as const;

export type Site = typeof site;

