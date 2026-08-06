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
  url: "https://example.com",

  /** The thesis line in the hero. Rewritten for clarity, meaning preserved. */
  thesis:
    "I design digital products end to end — research, structure, interface, and the small decisions in between that make a thing feel considered.",

  availability: "Open to UI/UX design roles and freelance work",

  nav: [
    { href: "/#work", label: "Work" },
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
      href: "/assets/cv/CV_FAZLI MAULANA.pdf",
      /** The name the browser saves it under, whatever the file is called. */
      fileName: "CV_FAZLI MAULANA.pdf",
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
} as const;

export type Site = typeof site;
