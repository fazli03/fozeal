import type { AboutContent } from "./schema";
import { image } from "./_helpers";

/**
 * SOURCE OF TRUTH: the latest approved About design file.
 * Every field below is transcribed from it — nothing here is invented.
 *
 * The design file itself is not shown on the page. It is a picture of text,
 * which a visitor cannot select or search, a screen reader cannot read, and a
 * phone renders too small to follow. Its contents live below as real content
 * instead, and the page sets them in the site's own type.
 */
export const about: AboutContent = {
  biography: [
    "Saya Fazli Maulana, seorang lulusan Program Studi Sistem Informasi dari Universitas Dinamika Bangsa Jambi. Saya memiliki kemampuan dalam mendesain antarmuka aplikasi dalam bentuk website maupun mobile dengan pemahaman terhadap prinsip desain UI/UX.",
    "Dengan semangat dan ambisi yang tinggi, saya berkomitmen untuk terus mengembangkan pengetahuan desain secara kreatif dengan mengikuti trend, teknologi, dan mempraktikannya pada tiap project, demi menciptakan product digital yang relevan dengan kebutuhan pengguna di era yang terus berkembang.",
  ],
  // 801×836 are the file's real pixels. They set the aspect ratio of the box
  // the browser reserves, so a wrong pair here squashes the photograph.
  portrait: image("Hero/fzl.png", "plate", "Portrait photograph", 801, 836),
  decor: [],
  uiuxSkills: [
    "Research",
    "Mobile App Design",
    "Interactive Prototyping",
    "Wireframe Design",
    "Website Design",
    "Design System",
  ],
  languages: [
    { name: "English", level: "Intermediate" },
    { name: "Bahasa Indonesia", level: "Native" },
  ],
  // In the order the design lays the logos out.
  software: [
    { src: "/assets/About/Figma.webp", label: "Figma", width: 80, height: 80 },
    {
      src: "/assets/About/ChatGPT.svg",
      label: "ChatGPT",
      width: 24,
      height: 24,
    },
    { src: "/assets/About/Claude.svg", label: "Claude", width: 24, height: 24 },
    { src: "/assets/About/Gemini.svg", label: "Gemini", width: 24, height: 24 },
    { src: "/assets/About/Canva.svg", label: "Canva", width: 24, height: 24 },
    { src: "/assets/About/Notion.svg", label: "Notion", width: 24, height: 24 },
  ],
};
