import type { Project } from "./schema";
import { image, meta, problem, screenGroup, solution } from "./_helpers";

/**
 * COVER vs PREVIEW
 *
 * `cover`   opens the case study, full page width.
 * `preview` is what the work index shows under the cursor, 400px wide.
 *
 * They are separate because they are read at completely different sizes. Drop
 * a file into the project's folder and point `preview` at it:
 *
 *   preview: image('SantrendCode/preview.png', 'bleed', 'alt text', W, H),
 *
 * Leave `preview` out and the index falls back to the cover, which is what
 * every project does today.
 */

export const projects: Project[] = [
  /* ===================================================================== 01 */
  {
    slug: "santrendcode",
    index: "01",
    title: "Santrendcode",
    category: "Education Platform",
    accent: "23 107 74",
    cover: image(
      "SantrendCode/mockup sc.png",
      "bleed",
      "Santrendcode learning platform shown across desktop and mobile mockups",
      1209,
      880,
    ),
    meta: {
      ...meta("Education Platform"),
      platform: "Web application",
      role: ["Product Designer"],
      tools: ["Figma"],
      prototypeUrl:
        "https://www.figma.com/proto/UxkiQDzOUEYMeDK6bowJ69/SantrendCode?node-id=171-2287&p=f&viewport=712%2C1164%2C0.02&t=lWJgwtYMuupdCq3g-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=171%3A2287&page-id=171%3A2146",
      duration: "2 weeks",
    },

    problems: [
      problem("p1", {
        statement:
          "Learning programming as a beginner often feels overwhelming due to scattered resources and the absence of a clear learning path",
        detail: [
          "Many beginners struggle to start learning programming because educational resources are spread across multiple platforms, making it difficult to determine where to begin or what to learn next. This fragmented experience often leads to confusion, inconsistent progress, and reduced motivation throughout the learning journey.",
        ],
      }),
    ],
    solutions: [
      solution("s1", "p1", [], {
        title:
          "Structured learning platform that brings roadmap, trusted resources, and technology insights into one place.",
        detail: [
          "SantrendCode was designed to simplify the learning experience by providing structured learning roadmaps, curated educational content, trusted creator recommendations, and up-to-date technology insights within a single platform. This enables beginners to learn more efficiently with clear guidance and a focused learning path.",
        ],
      }),
    ],
    screens: [
      screenGroup("landing", "Landing", [
        image(
          "SantrendCode/Landing Page (Santrend Code.webp",
          "browser",
          "Full landing page, top to bottom",
          1728,
          7551,
        ),
      ]),
      screenGroup("home page", "Home Page", [
        image(
          "SantrendCode/Home search 6.webp",
          "browser",
          "Full landing page, top to bottom",
          1728,
          4208,
        ),
      ]),

      screenGroup("we roadmap", "We Roadmap Page", [
        image(
          "SantrendCode/We Roadmap Page utama.png",
          "browser",
          "Full landing page, top to bottom",
          1728,
          6505,
        ),
      ]),
      screenGroup("detail course", "Detail Course Page", [
        image(
          "SantrendCode/Detail Materi.webp",
          "browser",
          "Full landing page, top to bottom",
          1728,
          1117,
        ),
      ]),
      screenGroup("learning progres", "Learning Progress Page", [
        image(
          "SantrendCode/Proges Pembelajaran.webp",
          "browser",
          "Full landing page, top to bottom",
          1728,
          2006,
        ),
      ]),
      screenGroup("devtalks page", "Devtalks Page", [
        image(
          "SantrendCode/Devtalks Page new.png",
          "browser",
          "Full landing page, top to bottom",
          1728,
          3887,
        ),
      ]),
    ],
  },

  /* ===================================================================== 02 */
  {
    slug: "pandu-divisi",
    index: "02",
    title: "Pandu Divisi",
    category: "Recommendation Platform",
    accent: "91 52 232",
    cover: image(
      "Pandu Divisi/mockup PD.png",
      "bleed",
      "Pandu Divisi recommendation platform shown in a device mockup",
      553,
      451,
    ),

    meta: {
      ...meta("Recommendation Platform"),
      platform: "Web application",
      role: ["Product Designer"],
      tools: ["Figma"],
      prototypeUrl:
        "https://www.figma.com/proto/odlhKhLM0KZ5mthwWu3sob/Pandu-DIvisi?node-id=341-3826&p=f&viewport=127%2C247%2C0.02&t=c0b2JM49vBiOaFJ0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=510%3A12283&page-id=0%3A1",
      duration: "2 weeks",
    },
    problems: [
      problem("p1", {
        statement:
          "Choosing the right internship division becomes difficult when decisions are based on assumptions rather than personal strengths.",
        detail: [
          "Prospective participants of the MSIB Program at PT Vinix 7 often face uncertainty when selecting a division. Without sufficient guidance, many rely on personal assumptions or recommendations from others instead of evaluating their own interests and competencies. This increases the risk of entering a division that does not match their potential and learning goals.",
        ],
      }),
    ],
    solutions: [
      solution("s1", "p1", [], {
        title:
          "A recommendation platform that helps participants discover the division best suited to their interests and abilities.",
        detail: [
          "Pandu Divisi was designed as a user-centered recommendation platform that guides prospective participants through a simple assessment process before registration. By combining personalized recommendations with an integrated registration flow, the platform helps users make more confident decisions while creating a smoother and more structured application experience.",
        ],
      }),
    ],
    screens: [
      screenGroup("home page", "Home Page", [
        image(
          "Pandu Divisi/Landing Page (Pandu Divisi).webp",
          "browser",
          "Introduction screen",
          1728,
          5842,
        ),
      ]),
      screenGroup(" assesment screen", "Assesment Screen", [
        image(
          "Pandu Divisi/Start Assesment Screen.webp",
          "browser",
          "Start Assesment Screen",
          1728,
          1117,
        ),
        image(
          "Pandu Divisi/Intro Screnn.webp",
          "browser",
          "Introduction screen",
          1728,
          1117,
        ),
        image(
          "Pandu Divisi/Assesmen Screen.webp",
          "browser",
          "Assesmen Screen",
          1728,
          1117,
        ),
        image(
          "Pandu Divisi/Recommendation Results.webp",
          "browser",
          "Recommendation Results",
          1731,
          2051,
        ),
      ]),
      screenGroup("detail division", "Detail Division Page", [
        image(
          "Pandu Divisi/Detail Education Technology 2.png",
          "browser",
          "Introduction screen",
          1728,
          3162,
        ),
      ]),
      screenGroup("catalog division", "Catalog Division Page", [
        image(
          "Pandu Divisi/Katalog halaman divisi.png",
          "browser",
          "Introduction screen",
          1728,
          3818,
        ),
      ]),
    ],
  },

  /* ===================================================================== 03 */
  {
    slug: "mm-auto-variasi",
    index: "03",
    title: "MM Auto Variasi",
    category: "Company Profile Website",
    accent: "184 50 42",
    cover: image(
      "Mayang Mangurai Auto Variasi/Mockup Mayang Mangurai Auto Variasi.webp",
      "bleed",
      "Mayang Mangurai Auto Variasi website shown in a device mockup",
      1195,
      896,
    ),

    meta: {
      ...meta("Company Profile Website"),
      platform: "Web application",
      role: ["UI/UX Designer"],
      tools: ["Figma"],
      prototypeUrl:
        "https://www.figma.com/proto/A5y9pXevqh1nl9HekP6Sw5/MM-Auto-Variasi?team_id=1638080154240541053&node-id=6-473&page-id=6%3A472&starting-point-node-id=6%3A473&t=f5HjFCSeuPj9CEjT-1",
      duration: "2 weeks",
    },
    problems: [
      problem("p1", {
        statement:
          "Limited online information makes it difficult for potential customers to trust the quality of automotive customization services.",
        detail: [
          "Potential customers often struggle to understand the workshop's services, product quality, and previous work because the available information is incomplete and poorly presented. This lack of transparency makes it harder for the business to build credibility and encourages fewer customers to proceed with consultations or bookings.",
        ],
      }),
    ],
    solutions: [
      solution(
        "s1",
        "p1",
        [
          image(
            "Mayang Mangurai Auto Variasi/Home Mayang Mangurai Auto Variasi.webp",
            "browser",
            "Full home page, top to bottom",
            1728,
            4993,
          ),
        ],
        {
          title:
            "A business profile website that showcases services, portfolio, and product quality with clarity and credibility.",
          detail: [
            "The website was designed to present the company's services, completed projects, and automotive products through a clear and structured digital experience. By highlighting real project results and simplifying access to consultation and booking, the platform strengthens customer trust while improving the overall decision-making process.",
          ],
        },
      ),
      solution(
        "s2",
        "p2",
        [
          image(
            "Mayang Mangurai Auto Variasi/Sevice Detail Screen.webp",
            "browser",
            "Service detail page",
            1728,
            2189,
          ),
        ],
        { title: null, detail: null },
      ),
    ],
    screens: [
      screenGroup("work", "Projects & gallery", [
        image(
          "Mayang Mangurai Auto Variasi/detail project 1.webp",
          "browser",
          "Project detail page",
          1728,
          2085,
        ),
        image(
          "Mayang Mangurai Auto Variasi/galery.webp",
          "browser",
          "Gallery of completed work",
          1728,
          4327,
        ),
      ]),
    ],
  },

  /* ===================================================================== 04 */
  {
    slug: "jalankita",
    index: "04",
    title: "JalanKita",
    category: "Smart Mobility Application",
    accent: "11 124 140",
    cover: image(
      "Jalan Kita/Mockup Jalan Kita.webp",
      "bleed",
      "JalanKita mobility app shown in a phone mockup",
      1169,
      1345,
    ),
    meta: {
      ...meta("Smart Mobility Application"),
      platform: "Mobile application",
      role: ["UI/UX Designer"],
      tools: ["Figma"],
      prototypeUrl:
        "https://www.figma.com/proto/CkXBX91r00RTERfNSoKc8T/Jalan-Kita?node-id=233-2795&viewport=-322%2C-616%2C0.1&t=aG5vhCxVwSCR2TGq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=233%3A2795&page-id=5%3A3",
      duration: "2 weeks",
    },
    problems: [
      problem("p1", {
        statement:
          "Planning a journey with public transportation remains challenging because essential travel information is scattered across multiple applications.",
        detail: [
          "Public transport users often need to switch between different apps to search for routes, compare fares, check schedules, and monitor their journey in real time. This fragmented experience makes trip planning less efficient, increases cognitive load, and creates confusion, especially when transferring between different modes of transportation.",
        ],
      }),
    ],
    solutions: [
      solution(
        "s1",
        "p1",
        [
          image(
            "Jalan Kita/Opsi Rute.webp",
            "phone",
            "Route options for a journey",
            402,
            874,
          ),
        ],
        {
          title:
            "A multimodal navigation platform that brings every stage of the journey into one seamless experience.",
          detail: [
            "JalanKita was designed as a multimodal navigation application that integrates various public transportation services into a single platform. By providing personalized route recommendations, transparent fare information, real-time journey guidance, and an AI travel assistant, the app enables users to plan, navigate, and complete their trips more efficiently, confidently, and with fewer disruptions.",
          ],
        },
      ),
    ],
    screens: [
      screenGroup("plan", "Plan a trip", [
        image(
          "Jalan Kita/Home.webp",
          "phone",
          "Home with nearby routes",
          402,
          962,
        ),
      ]),
      screenGroup("option", "Option Route", [
        image(
          "Jalan Kita/Opsi Rute.webp",
          "phone",
          "Home with nearby routes",
          402,
          874,
        ),
      ]),
      screenGroup("detail", "Detail Route", [
        image(
          "Jalan Kita/Detail Route.png",
          "phone",
          "Home with nearby routes",
          395,
          1579,
        ),
      ]),
      screenGroup("live", "Live Tracking", [
        image(
          "Jalan Kita/Live Tracking.webp",
          "phone",
          "Home with nearby routes",
          395,
          1010,
        ),
      ]),
      screenGroup("Finish", "Finish Page", [
        image(
          "Jalan Kita/Finish Page.webp",
          "phone",
          "Trip completed screen",
          395,
          852,
        ),
      ]),
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
