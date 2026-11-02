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
  role: "Product Digital Designer",
  location: "Depok, West Java, Indonesia",
  email: EMAIL as Sourced<string>,
  composeUrl: gmailComposeUrl(EMAIL),
  url: "https://fozeal.com",

  thesis:
    "The best interfaces are the ones people never have to think about.",

  availability: "Open to Product Digital Designer roles and freelance work",

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
        category: "UX Research ",
        tag: "UNDERSTAND & STRUCTURE",
        description:
          "Understanding user needs, identifying pain points, and structuring digital experiences before moving into interface design.",
        items: [
          {
            name: "User Persona",
            desc: "Representing user characteristics, goals, and pain points.",
          },
          {
            name: "User Journey Mapping",
            desc: "Mapping user experiences, needs, and challenges across key stages.",
          },
          {
            name: "User Flow",
            desc: "Defining clear navigation paths and task completion steps.",
          },
          {
            name: "Problem Definition",
            desc: "Translating user problems into design opportunities.",
          },
          {
            name: "Design Thinking",
            desc: "Applying a structured process to understand problems, explore ideas, and test solutions.",
          },
          {
            name: "Design Iteration",
            desc: "Refining interface concepts through feedback and usability findings.",
          },
          {
            name: "Usability Testing",
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

            desc: "Exploring screen layouts and content hierarchy from low to high fidelity.",
          },
          {
            name: "High-Fidelity UI Design",
            desc: "Creating detailed interfaces with considered typography, color, and layout.",
          },
          {
            name: "Interactive Prototyping",
            desc: "Connecting screens and interactions to communicate product behavior.",
          },
          {
            name: "Visual Hierarchy",
            desc: "Using layout, typography, and contrast to guide user attention.",
          },
          {
            name: "Responsive Web Design",
            desc: "Designing web experiences that adapt to different screen sizes.",
          },
          {
            name: "Design Systems",
            desc: "Applying reusable components and consistent styles across interfaces.",
          },
        ],
      },
    ],

    tools: [
      {
        category: "UI Design & Prototyping",
        description:
          "My Design Tools",
        items: [
          {
            name: "Figma",
            role: "UI Design, Wireframing & Prototyping",
            icon: mark("/assets/About/Figma.png", 24, 24),
            badge: "Primary Tool",
          },
          {
            name: "Emergent",
            role: "Early UI Concepts & interaction Exploration",
            icon: mark("/assets/About/emergent.jpg", 24, 24),
            badge: "AI UI Design",
          },
          {
            name: "Stitch",
            role: "Early UI Concepts",
            icon: mark("/assets/About/Stitch.jpeg", 24, 24),
            badge: "AI UI Design",
          },
        ],
      },
      {
        category: "Web Development",
        description:
          "Tech stack that I use in web development",
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
        description:
          "My AI assistants in design and development",
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

