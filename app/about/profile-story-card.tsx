"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";

import {
    LayoutDashboard,
    Palette,
    Bot,
    PenTool,
    type LucideIcon,
} from "lucide-react";

// Replace with your actual image import / public path
import myProfilePhoto from "@/public/assets/Hero/fzl.png";

// ... (editable content block unchanged) ...

/* ------------------------------------------------------------------ */
/*  Lanyard physics config                                             */
/* ------------------------------------------------------------------ */

const CARD_W = 272;
const CARD_H = 392;
const CLIP_H = 52; // metal clip length above the card
const STICK = CLIP_H + CARD_H / 2; // clip ring -> card centre (rigid)
const SEGMENTS = 12; // points per strap
const MIN_SEG = 10; // shortest allowed segment length
const SLACK = 1.03; // rope is slightly longer than the straight distance
const GAP = 64; // distance between the two strap anchors
const ANCHOR_Y = -90; // anchor offset from the very top of the page
const CARD_DROP = 110; // clip ring rest position below the placeholder top

const GRAVITY = 0.62;
const DAMP = 0.988;
const MAX_V = 38;
const ITER = 20;
const STEP_MS = 1000 / 60;

// ... (Pt, mk, clamp, smoothPath, BARS unchanged) ...

const DISPLAY_NAME = "Your Name";
const ROLE = "Product Designer";
const LOCATION = "Depok, West Java, ID";
const BADGE_ID = "UX-2026-001";
const STRAP_TEXT = "PRODUCT DESIGNER  •  UI/UX  •  AI WORKFLOWS  •  ";

const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
    {
        icon: LayoutDashboard,
        title: "UI/UX architecture",
        desc: "Complex workflows turned into clear structure and flow.",
    },
    {
        icon: Palette,
        title: "Design tokens & systems",
        desc: "Consistent foundations that scale across screens and teams.",
    },
    {
        icon: Bot,
        title: "AI product workflows",
        desc: "AI-first layouts that feel natural instead of bolted on.",
    },
    {
        icon: PenTool,
        title: "Prototyping & craft",
        desc: "Polished, interactive prototypes you can test early.",
    },
];

/* ------------------------------------------------------------------ */
/*  Lanyard physics config                                             */
/* ------------------------------------------------------------------ */


type Pt = { x: number; y: number; px: number; py: number; w: number };
const mk = (x: number, y: number, w = 1): Pt => ({ x, y, px: x, py: y, w });
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function smoothPath(pts: Pt[]) {
    let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    const l = pts[pts.length - 1];
    return `${d} L${l.x.toFixed(1)} ${l.y.toFixed(1)}`;
}

const BARS = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 3, 1, 1, 2];

/* ------------------------------------------------------------------ */
/*  Lanyard (Verlet rope + rigid hanging card)                         */
/* ------------------------------------------------------------------ */

export function Lanyard() {
    const slotRef = useRef<HTMLDivElement>(null); // layout placeholder
    const overlayRef = useRef<HTMLDivElement>(null); // full-page layer

    const svgRef = useRef<SVGSVGElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [touched, setTouched] = useState(false);
    const uid = useId().replace(/:/g, "");

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const slot = slotRef.current;
        const overlay = overlayRef.current;

        const svg = svgRef.current;
        const card = cardRef.current;
        if (!slot || !overlay || !svg || !card) return;

        let width = 0;
        let height = 0;
        const rest = { x: 0, y: 0 };
        let segTarget = 24;
        let segLen = 24;

        // --- measure page + placeholder (page coordinates) --------------
        const measureBase = () => {
            width = document.documentElement.clientWidth;
            height = Math.max(
                document.body.getBoundingClientRect().height,
                window.innerHeight
            );
            overlay.style.width = `${width}px`;
            overlay.style.height = `${height}px`;
            const o = overlay.getBoundingClientRect();
            const s = slot.getBoundingClientRect();
            rest.x = s.left - o.left + s.width / 2;
            rest.y = s.top - o.top + CARD_DROP;
            segTarget = Math.max(MIN_SEG, ((rest.y - ANCHOR_Y) / SEGMENTS) * SLACK);

        };
        measureBase();
        segLen = segTarget;

        // --- bodies -----------------------------------------------------
        const aL = mk(rest.x - GAP / 2, ANCHOR_Y, 0); // pinned
        const aR = mk(rest.x + GAP / 2, ANCHOR_Y, 0); // pinned
        const C = mk(rest.x, rest.y, 1); // clip ring (strap junction)
        const B = mk(rest.x, rest.y + STICK, 0.35); // card centre (heavy)

        const left: Pt[] = [];
        const right: Pt[] = [];
        for (let i = 0; i <= SEGMENTS; i++) {
            const t = i / SEGMENTS;
            left.push(
                i === 0 ? aL : i === SEGMENTS ? C : mk(aL.x + (C.x - aL.x) * t, aL.y + (C.y - aL.y) * t)
            );
            right.push(
                i === 0 ? aR : i === SEGMENTS ? C : mk(aR.x + (C.x - aR.x) * t, aR.y + (C.y - aR.y) * t)
            );
        }
        const movers = [...left.slice(1, -1), ...right.slice(1, -1), C, B];

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduceMotion) B.px = B.x - 3.2; // gentle intro swing

        const drag = { active: false, tx: 0, ty: 0, ox: 0, oy: 0 };
        let sway = 0;

        const pathsL = svg.querySelectorAll("[data-l]");
        const pathsR = svg.querySelectorAll("[data-r]");

        // --- constraints ------------------------------------------------
        const solve = (a: Pt, b: Pt, len: number, wa: number, wb: number, rigid: boolean) => {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 0.0001;
            if (!rigid && dist <= len) return; // fabric can slacken but not stretch
            const s = wa + wb;
            if (!s) return;
            const diff = (dist - len) / dist;
            a.x += (dx * diff * wa) / s;
            a.y += (dy * diff * wa) / s;
            b.x -= (dx * diff * wb) / s;
            b.y -= (dy * diff * wb) / s;
        };

        const simulate = () => {
            // elastic rope: grows while you pull, recoils slowly after release
            let target = segTarget;
            if (drag.active) {
                const mx = (aL.x + aR.x) / 2;
                const d = Math.hypot(B.x - mx, B.y - ANCHOR_Y);
                target = Math.max(segTarget, ((d - STICK) / SEGMENTS) * 1.02);
            }
            segLen += (target - segLen) * (target > segLen ? 0.4 : 0.05);

            for (const p of movers) {
                if (drag.active && p === B) continue;
                let vx = (p.x - p.px) * DAMP;
                let vy = (p.y - p.py) * DAMP;
                const sp = Math.hypot(vx, vy);
                if (sp > MAX_V) {
                    vx *= MAX_V / sp;
                    vy *= MAX_V / sp;
                }
                p.px = p.x;
                p.py = p.y;
                p.x += vx;
                p.y += vy + GRAVITY;
            }

            if (drag.active) {
                // follow the pointer with a little lag so the card feels heavy;
                // prev = last position preserves throw velocity on release
                B.px = B.x;
                B.py = B.y;
                B.x += (drag.tx - B.x) * 0.5;
                B.y += (drag.ty - B.y) * 0.5;
            }

            const wB = drag.active ? 0 : B.w;
            for (let k = 0; k < ITER; k++) {
                for (let i = 0; i < SEGMENTS; i++) {
                    solve(left[i], left[i + 1], segLen, left[i].w, left[i + 1].w, false);
                    solve(right[i], right[i + 1], segLen, right[i].w, right[i + 1].w, false);
                }
                solve(C, B, STICK, C.w, wB, true);
            }

            // only the page edges limit it
            const m = Math.min(CARD_W / 2, width / 2);
            B.x = clamp(B.x, m, width - m);
            B.y = clamp(B.y, 40, height - CARD_H / 2 - 4);
            C.x = clamp(C.x, 0, width);
        };

        const render = () => {
            const ang = Math.atan2(-(B.x - C.x), B.y - C.y);
            sway += (clamp((B.x - B.px) * 2.2, -22, 22) - sway) * 0.12;

            card.style.transform = `translate3d(${C.x.toFixed(2)}px, ${C.y.toFixed(
                2
            )}px, 0) perspective(1100px) rotate(${ang.toFixed(4)}rad) rotateY(${sway.toFixed(2)}deg)`;
            card.style.setProperty("--sheen", `${(50 + ang * 140 + sway * 1.5).toFixed(1)}%`);

            const dL = smoothPath(left);
            const dR = smoothPath([...right].reverse()); // reversed so text reads upright
            pathsL.forEach((el) => el.setAttribute("d", dL));
            pathsR.forEach((el) => el.setAttribute("d", dR));
        };

        // --- pointer interaction (page coordinates, no drag limit) ------
        const local = (e: PointerEvent) => {
            const r = overlay.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        };

        const onDown = (e: PointerEvent) => {
            e.preventDefault();
            const p = local(e);
            drag.active = true;
            drag.ox = B.x - p.x;
            drag.oy = B.y - p.y;
            drag.tx = B.x;
            drag.ty = B.y;
            card.setPointerCapture(e.pointerId);
            setTouched(true);
        };

        const onMove = (e: PointerEvent) => {
            if (!drag.active) return;
            const p = local(e);
            const m = Math.min(CARD_W / 2, width / 2);
            drag.tx = clamp(p.x + drag.ox, m, width - m);
            drag.ty = clamp(p.y + drag.oy, 120, height - CARD_H / 2 - 4);
        };

        const onUp = (e: PointerEvent) => {
            drag.active = false;
            if (card.hasPointerCapture(e.pointerId)) card.releasePointerCapture(e.pointerId);
        };

        card.addEventListener("pointerdown", onDown);
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerup", onUp);
        card.addEventListener("pointercancel", onUp);

        // --- loop (fixed 60Hz step) -------------------------------------
        let raf = 0;
        let last = performance.now();
        let acc = 0;

        const loop = (now: number) => {
            raf = requestAnimationFrame(loop);
            acc += Math.min(now - last, 50);
            last = now;
            let n = 0;
            while (acc >= STEP_MS && n < 4) {
                simulate();
                acc -= STEP_MS;
                n++;
            }
            render();
        };

        render();
        raf = requestAnimationFrame(loop);

        // keep anchors / rope length in sync with layout changes
        const onLayout = () => {
            measureBase();
            aL.x = rest.x - GAP / 2;
            aR.x = rest.x + GAP / 2;
        };
        const ro = new ResizeObserver(onLayout);
        ro.observe(document.body);
        ro.observe(slot);
        window.addEventListener("resize", onLayout);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener("resize", onLayout);
            card.removeEventListener("pointerdown", onDown);
            card.removeEventListener("pointermove", onMove);
            card.removeEventListener("pointerup", onUp);
            card.removeEventListener("pointercancel", onUp);
        };
    }, [mounted]);

    const textL = `${uid}-tl`;
    const textR = `${uid}-tr`;

    const overlay = (
        <div
            ref={overlayRef}
            className="pointer-events-none absolute left-0 top-0 z-[70] overflow-hidden"
        >
            {/* mounting bracket at the very top of the page */}


            {/* strap (updated every frame from the physics) */}
            <svg
                ref={svgRef}
                aria-hidden
                className="absolute inset-0 h-full w-full overflow-visible text-accent"
                fill="none"
            >
                <defs>
                    <path id={textL} data-l />
                    <path id={textR} data-r />
                </defs>

                {/* drop shadow */}
                <g transform="translate(0 7)" stroke="#000" strokeOpacity="0.18" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round">
                    <path data-l />
                    <path data-r />
                </g>
                {/* lighter edge so the black strap stays readable */}
                <g stroke="rgba(255,255,255,0.14)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round">
                    <path data-l />
                    <path data-r />
                </g>
                {/* black fabric body */}
                <g stroke="#0a0a0a" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                    <path data-l />
                    <path data-r />
                </g>
                {/* printed text */}
                <g fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="700" letterSpacing="2.2" fontFamily="ui-sans-serif, system-ui, sans-serif">
                    <text dy="3.2">
                        <textPath href={`#${textL}`}>{STRAP_TEXT.repeat(8)}</textPath>
                    </text>
                    <text dy="3.2">
                        <textPath href={`#${textR}`}>{STRAP_TEXT.repeat(8)}</textPath>
                    </text>
                </g>
            </svg>

            {/* hanging badge: origin (0,0) = clip ring, moved/rotated by physics */}
            <div
                ref={cardRef}
                role="img"
                aria-label="Draggable ID badge. Drag it anywhere on the page and let go to watch it swing."
                className="pointer-events-auto absolute left-0 top-0 h-0 w-0 cursor-grab touch-none select-none will-change-transform active:cursor-grabbing"
                style={{ transformOrigin: "0 0" }}
            >
                {/* realistic hardware: crimp -> split ring -> swivel barrel -> lobster clasp */}
                <svg
                    aria-hidden
                    className="pointer-events-none absolute overflow-visible"
                    style={{
                        left: -30,
                        top: -20,
                        filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.35))",
                    }}
                    width="60"
                    height="100"
                    viewBox="-30 -20 60 100"
                >
                    <defs>
                        <linearGradient id={`${uid}-mv`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#f6f6f3" />
                            <stop offset="0.45" stopColor="#c4c4bf" />
                            <stop offset="1" stopColor="#85857f" />
                        </linearGradient>
                        <linearGradient id={`${uid}-mh`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#6d6d68" />
                            <stop offset="0.3" stopColor="#f4f4f0" />
                            <stop offset="0.65" stopColor="#b2b2ac" />
                            <stop offset="1" stopColor="#5f5f5a" />
                        </linearGradient>
                    </defs>

                    {/* metal crimp sleeve where the straps are sewn in */}
                    <rect x="-17" y="-14" width="34" height="24" rx="4" fill={`url(#${uid}-mv)`} stroke="#6b6b66" strokeWidth="0.8" />
                    <path d="M-15 -7H15" stroke="#000" strokeOpacity="0.22" strokeWidth="1" />
                    <path d="M-15 -6H15" stroke="#fff" strokeOpacity="0.65" strokeWidth="0.8" />
                    <ellipse cx="0" cy="5" rx="4.5" ry="2.4" fill="#2b2b28" />

                    {/* split ring through the crimp eyelet */}
                    <ellipse cx="0" cy="14" rx="7" ry="9.5" fill="none" stroke="#8d8d88" strokeWidth="2.6" />
                    <ellipse cx="-0.4" cy="14" rx="7" ry="9.5" fill="none" stroke="#ecece8" strokeWidth="1.1" />

                    {/* oval lobster clasp (opening shows the card slot behind it) */}
                    <path
                        fillRule="evenodd"
                        fill={`url(#${uid}-mh)`}
                        stroke="#5f5f5a"
                        strokeWidth="0.6"
                        d="M-11 43a11 11 0 0 1 22 0V65a11 11 0 0 1-22 0Z M-6.5 43.5a6.5 6.5 0 0 1 13 0V64.5a6.5 6.5 0 0 1-13 0Z"
                    />
                    <path d="M-8.7 45V62" stroke="#fff" strokeOpacity="0.55" strokeWidth="1" strokeLinecap="round" />

                    {/* spring gate + thumb tab */}
                    <path d="M6.5 45H11M6.5 62H11" stroke="#2b2b28" strokeWidth="0.9" />
                    <rect x="8" y="46" width="6" height="15" rx="3" fill={`url(#${uid}-mv)`} stroke="#5f5f5a" strokeWidth="0.6" />

                    {/* swivel barrel joining ring and clasp */}
                    <rect x="-5" y="19" width="10" height="14" rx="2" fill={`url(#${uid}-mh)`} stroke="#5f5f5a" strokeWidth="0.6" />
                    <path d="M-5 24H5M-5 28H5" stroke="#000" strokeOpacity="0.28" strokeWidth="0.8" />
                </svg>

                {/* card */}
                <div
                    className="absolute flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-stone-800 to-stone-950 p-4 pt-9 text-stone-100 shadow-[0_40px_70px_-20px_rgba(0,0,0,0.6)]"
                    style={{ left: -CARD_W / 2, top: CLIP_H, width: CARD_W, height: CARD_H }}
                >
                    {/* clip slot */}
                    <div className="absolute left-1/2 top-3 flex h-3.5 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-stone-700 bg-stone-950 shadow-inner">
                        <div className="h-1 w-7 rounded-full bg-stone-800" />
                    </div>

                    <div className="mb-2.5 flex items-center justify-between text-[10px] font-medium tracking-wide text-stone-400">
                        <span>Access pass</span>
                        <span className="font-mono text-accent">{BADGE_ID}</span>
                    </div>

                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-stone-800">
                        <Image
                            src={myProfilePhoto}
                            alt="Profile photo"
                            fill
                            sizes="272px"
                            className="pointer-events-none object-cover object-top"
                            draggable={false}
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </div>

                    <div className="mt-3.5">
                        <h3 className="font-display text-xl font-bold leading-tight text-stone-50">
                            {DISPLAY_NAME}
                        </h3>
                        <p className="mt-0.5 text-sm text-stone-300">{ROLE}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-stone-500">{LOCATION}</p>
                    </div>

                    <div className="mt-3 flex items-end justify-between border-t border-white/10 pt-3">
                        <div className="flex h-6 items-end gap-[1.5px] opacity-70">
                            {BARS.map((w, i) => (
                                <span key={i} className="h-full bg-stone-200" style={{ width: w }} />
                            ))}
                        </div>
                        <span className="h-2 w-2 rounded-full bg-accent" />
                    </div>

                    {/* moving glare, driven by swing angle */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 mix-blend-overlay"
                        style={{
                            background:
                                "linear-gradient(115deg, transparent calc(var(--sheen, 50%) - 22%), rgba(255,255,255,0.28) var(--sheen, 50%), transparent calc(var(--sheen, 50%) + 22%))",
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* layout placeholder: keeps the column height, the badge hangs here at rest */}
            <div
                ref={slotRef}
                className="relative mx-auto h-[680px] w-full max-w-[460px] select-none lg:max-w-none"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
                />
                <p
                    className={`pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-graphite/70 transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"
                        }`}
                >

                </p>
            </div>

            {/* full-page physics layer, rendered above the navbar */}
            {mounted && createPortal(overlay, document.body)}
        </>
    );
}
export function ProfileStoryCard() {
    return (
        <section className="relative overflow-hidden pb-section pt-0 mt-[30px] border-b border-hairline">
            <div className="shell">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-gutter">
                    {/* LEFT: story */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >


                        <h2
                            className="mt-8 font-display text-h1 uppercase"
                            style={{ fontVariationSettings: "'wdth' 122" }}
                        >
                            Fazli maulana
                        </h2>

                        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-hairline pt-6">
                            <span className="bg-accent px-1.5 py-0.5 font-mono text-micro uppercase text-white">
                                UI / UX
                            </span>
                            <span className="font-mono text-micro uppercase text-graphite">
                                {DISPLAY_NAME}
                            </span>
                            <span className="hidden h-3 w-px bg-hairline sm:block" aria-hidden />
                            <span className="font-mono text-micro uppercase text-graphite">
                                {LOCATION}
                            </span>
                        </div>

                        <p className="mt-8 max-w-measure text-lead text-graphite">
                            Every interface tells a human story.
                        </p>
                        <p className="mt-4 max-w-measure font-display text-body leading-relaxed text-graphite/80">
                            My approach connects product architecture with empathetic design
                            systems. Whether I&apos;m structuring a complex workflow or exploring
                            AI-first layouts, I build experiences that feel intuitive, seamless
                            and alive.
                        </p>

                        {/* ...CAPABILITIES list, sama seperti sebelumnya... */}
                    </motion.div>

                    {/* RIGHT: lanyard */}
                    <div className="lg:col-span-5">
                        <Lanyard />
                    </div>
                </div>
            </div>

        </section>
    );
}