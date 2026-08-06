"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Magnetic } from "@/components/system/magnetic";
import { FrameLabel } from "@/components/system/frame";
import { SocialLink } from "./social-link";
import { motion } from "framer-motion";

export function Contact() {
  const email = site.email;

  return (
    <section
      id="contact"
      className="border-t border-hairline"
      style={{
        paddingTop: "80px",
        paddingBottom: "56px",
      }}
    >
      <div className="shell">
        <FrameLabel meta="Contact" className="mb-4">
          Get in touch
        </FrameLabel>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display text-h1"
          style={{
            // Wide enough for the longest line to sit whole, so the explicit
            // <br /> is what breaks the statement rather than the box width.
            maxWidth: "22ch",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Have a product
          <br />
          that needs designing?
        </motion.h2>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "32px",
            // --hairline holds raw channels (214 216 221), not a colour, so it
            // has to be wrapped in rgb() to be a valid border value.
            borderTop: "1px solid rgb(var(--hairline))",
          }}
        >
          <p className="font-mono text-micro uppercase text-graphite">Email</p>

          {email ? (
            <Magnetic>
              <a
                href={site.composeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline inline-flex items-center gap-3 font-display text-h3"
                style={{
                  marginTop: "12px",
                }}
              >
                {email}
                <span className="sr-only">(opens a Gmail compose window)</span>
                <ArrowUpRight size={20} className="text-accent" aria-hidden />
              </a>
            </Magnetic>
          ) : (
            <p
              style={{
                marginTop: "12px",
              }}
              className="font-mono text-caption text-graphite/70"
            >
              Email address not available.
            </p>
          )}

          <p
            className="text-body text-graphite"
            style={{
              marginTop: "18px",
              maxWidth: "620px",
            }}
          >
            {site.availability}
          </p>

          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 28px",
              marginTop: "28px",
            }}
          >
            {site.social.map((s) => (
              <li key={s.label}>
                <SocialLink
                  entry={s}
                  iconSize={16}
                  className="font-mono text-micro uppercase text-graphite hover:text-ink"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
