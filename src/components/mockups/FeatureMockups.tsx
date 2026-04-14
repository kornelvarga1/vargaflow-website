import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentType,
} from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, PhoneMissed, MousePointer2 } from "lucide-react";

/* ========================================================================== */
/*  Shared utilities                                                          */
/* ========================================================================== */

/**
 * Pure-CSS proportional scaler: renders children at fixed design
 * dimensions and scales them down uniformly when the parent is
 * narrower than the design width. Uses `container-type: inline-size`
 * and the `cqi` unit so there is zero JavaScript, no SSR/hydration
 * flash, and no layout shift — the outer box maintains aspect ratio,
 * and the inner content (designWidth x designHeight pixels) scales
 * via a CSS transform derived from the container's current width.
 */
const ScaledMockup = ({
  designWidth,
  designHeight,
  children,
}: {
  designWidth: number;
  designHeight: number;
  children: ReactNode;
}) => (
  <div
    className="relative mx-auto w-full overflow-hidden"
    style={{
      maxWidth: `${designWidth}px`,
      aspectRatio: `${designWidth} / ${designHeight}`,
      containerType: "inline-size",
    }}
  >
    <div
      className="absolute left-0 top-0"
      style={{
        width: `${designWidth}px`,
        height: `${designHeight}px`,
        transformOrigin: "top left",
        transform: `scale(min(1, calc(100cqi / ${designWidth}px)))`,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Visibility-aware loop: only runs the animation cycle while the mockup
 * is on screen. Each time the element scrolls into view the key resets,
 * so the visitor always sees the demo from the very first frame.
 * When the element leaves the viewport the interval is cleared.
 */
const useLoopKey = (intervalMs: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset to first frame every time the element enters the viewport
  useEffect(() => {
    if (visible) setKey((k) => k + 1);
  }, [visible]);

  // Only loop while visible
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setKey((k) => k + 1), intervalMs);
    return () => clearInterval(id);
  }, [visible, intervalMs]);

  return { key, ref };
};

/** Outer iPhone-style chrome every mockup sits inside. */
const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[260px] aspect-[260/563] rounded-[2.25rem] border border-white/10 bg-neutral-900">
    <div className="absolute inset-[5px] overflow-hidden rounded-[1.9rem] bg-neutral-950">
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-[7px] z-30 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
      {/* Status bar */}
      <div className="relative z-20 flex h-[30px] items-end justify-between px-4 pb-1.5 text-[8px] font-semibold text-white/80">
        <span className="tabular-nums">9:41</span>
        <span className="tracking-[1px]">●●●●</span>
      </div>
      {/* Screen content — stops above the home indicator area */}
      <div className="absolute inset-x-0 bottom-[14px] top-[30px] overflow-hidden">{children}</div>
      {/* Home indicator */}
      <div className="absolute bottom-[5px] left-1/2 z-40 h-[3px] w-[38%] -translate-x-1/2 rounded-full bg-white/70" />
    </div>
  </div>
);

/** Conversation header shared by SMS-based mockups. */
const SmsHeader = ({ name, status }: { name: string; status?: string }) => (
  <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-3 py-2">
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
      {name.charAt(0)}
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-[10px] font-semibold text-white/95">{name}</p>
      {status && <p className="truncate text-[8px] text-white/40">{status}</p>}
    </div>
    <Phone className="h-3 w-3 text-white/50" />
  </div>
);

/** Three-dot typing indicator. */
const TypingDots = () => (
  <div className="flex gap-[3px] self-start rounded-full bg-white/10 px-2.5 py-1.5">
    {[0, 0.2, 0.4].map((d) => (
      <motion.span
        key={d}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: d }}
        className="h-[3px] w-[3px] rounded-full bg-white/80"
      />
    ))}
  </div>
);

/* ========================================================================== */
/*  1. MissedCallMockup — full arc: incoming call → missed → SMS → reply      */
/* ========================================================================== */

export const MissedCallMockup = () => {
  const { key: loopKey, ref: loopRef } = useLoopKey(18000);
  const [scene, setScene] = useState<"call" | "lock" | "messages">("call");

  useEffect(() => {
    setScene("call");
    const t1 = setTimeout(() => setScene("lock"), 2500);
    const t2 = setTimeout(() => setScene("messages"), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loopKey]);

  return (
    <div ref={loopRef}>
    <ScaledMockup designWidth={260} designHeight={563}>
    <PhoneFrame>
      <div className="relative h-full w-full overflow-hidden">
        {/* ── Scene 1 : Incoming call screen ─────────────────────────── */}
        {scene === "call" && (
          <div className="absolute inset-0 flex flex-col items-center justify-between bg-gradient-to-b from-neutral-900 via-neutral-950 to-black pt-7 pb-8">
            <p className="text-[8px] font-semibold uppercase tracking-[2.5px] text-white/55">
              Incoming call
            </p>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-gradient-to-br from-neutral-600 to-neutral-800 text-[26px] font-bold text-white/70 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
              >
                ?
              </motion.div>
              <p className="mt-4 text-[13px] font-semibold text-white/95">
                Unknown Caller
              </p>
              <p className="mt-0.5 text-[9px] text-white/50">+1 (555) 123-4567</p>
              <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mt-2 text-[8px] uppercase tracking-widest text-white/50"
              >
                ringing…
              </motion.p>
            </div>

            <div className="flex w-full items-center justify-between px-10">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                <Phone className="h-4 w-4 text-white" />
              </motion.div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                <Phone className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* ── Scene 2 : Lockscreen with missed call notification ──────── */}
        {scene === "lock" && (
          <div className="absolute inset-0 flex flex-col items-center bg-gradient-to-b from-neutral-900 via-black to-neutral-950">
            <p className="mt-4 text-[9px] font-medium text-white/80">Friday, April 11</p>
            <p className="mt-0.5 text-[46px] font-thin leading-none tracking-tight text-white">
              9:41
            </p>

            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
              className="mt-6 w-[88%] rounded-xl bg-white/[0.09] p-2 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-500/20">
                  <PhoneMissed className="h-3.5 w-3.5 text-red-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold text-white/95">Missed Call</p>
                  <p className="text-[7px] text-white/60">Unknown · +1 (555) 123-4567</p>
                </div>
                <p className="text-[7px] text-white/40">now</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── Scene 3 : SMS conversation ─────────────────────────────── */}
        {scene === "messages" && (
          <div className="absolute inset-0 flex flex-col bg-neutral-950">
            <SmsHeader name="+1 (555) 123-4567" status="Auto-reply · Arizona Roofing Pro" />

            <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-3 py-3">
              {/* Outgoing #1 — enters 1s after scene mount (= 5s total) */}
              <motion.div
                initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.45, ease: "easeOut" }}
                className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
              >
                <p className="text-[8px] leading-snug text-black">
                  Hey, sorry I missed you. I'll get back to you as soon as possible. If you want to give me a few details about the job, that would be great. You can click this link for a free quote:{" "}
                  <span className="underline">vargaflow.co/quote</span> — Mike, Arizona Roofing Pro
                </p>
              </motion.div>

              {/* Outgoing #2 — enters 4s after scene mount (= 8s total) */}
              <motion.div
                initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ delay: 4, duration: 0.45, ease: "easeOut" }}
                className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
              >
                <p className="text-[8px] leading-snug text-black">
                  Look forward to hearing from you. In the meantime, are there any questions I can answer here for you?
                </p>
              </motion.div>

              {/* Typing — enters 6.8s after scene mount (= 10.8s total) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 6.8, duration: 0.3 }}
                className="self-start"
              >
                <TypingDots />
              </motion.div>

              {/* Reply — enters 8.5s after scene mount (= 12.5s total) */}
              <motion.div
                initial={{ opacity: 0, x: -12, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ delay: 8.5, duration: 0.45, ease: "easeOut" }}
                className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2"
              >
                <p className="text-[8px] leading-snug text-white/95">
                  Thanks for the fast response! I just filled out your quote form — looking forward to hearing from you!
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
    </ScaledMockup>
    </div>
  );
};

/* ========================================================================== */
/*  2. ReviewFunnelMockup — faithful to contractor-website-template           */
/*     Scenes: card → rate (click 1★) → feedback → rate (click 5★) → Google  */
/* ========================================================================== */

/* Google G logo (pulled from ReviewsSection.tsx in contractor-website-template) */
const GoogleG = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/* Inline gold star character */
const GoldStar = ({ size = 12 }: { size?: number }) => (
  <span style={{ color: "#FBBC05", fontSize: `${size}px`, lineHeight: 1 }}>★</span>
);

/* Cursor that slides from → to, then does a click "press" near the end */
const SceneCursor = ({
  from,
  to,
  duration = 3,
  delay = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  duration?: number;
  delay?: number;
}) => (
  <motion.div
    initial={{ x: from.x, y: from.y, scale: 1 }}
    animate={{
      x: [from.x, to.x, to.x, to.x],
      y: [from.y, to.y, to.y, to.y],
      scale: [1, 1, 0.65, 1],
    }}
    transition={{
      delay,
      duration,
      times: [0, 0.58, 0.68, 0.78],
      ease: [0.4, 0, 0.2, 1],
    }}
    className="pointer-events-none absolute left-0 top-0 z-50"
  >
    <MousePointer2
      className="h-[15px] w-[15px] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
      fill="white"
      strokeWidth={1.5}
    />
  </motion.div>
);

/* ── Scene: Review Us on Google card (on the website) ─────────────── */
const ReviewCardScene = () => (
  <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black">
    <div className="pt-5 text-center">
      <p className="text-[7px] font-bold uppercase tracking-widest text-white/55">Reviews</p>
      <p className="mt-1 text-[11px] font-bold text-white">
        See What Our Customers Say
      </p>
      <div className="mt-1.5 flex items-center justify-center gap-1">
        <GoogleG size={9} />
        <div className="flex gap-[1px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <GoldStar key={i} size={8} />
          ))}
        </div>
        <span className="text-[7px] font-bold text-white">5.0</span>
        <span className="text-[7px] text-white/55">· 247 reviews</span>
      </div>
    </div>

    {/* Faint carousel hint */}
    <div className="mt-3 flex justify-center gap-1.5 px-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-10 flex-1 rounded border border-white/10 bg-white/[0.04] p-1">
          <div className="space-y-0.5">
            <div className="h-[2px] w-full rounded-full bg-white/15" />
            <div className="h-[2px] w-[70%] rounded-full bg-white/15" />
            <div className="h-[2px] w-[85%] rounded-full bg-white/15" />
          </div>
        </div>
      ))}
    </div>

    {/* The Review Us on Google card */}
    <div className="mt-5 flex justify-center">
      <div className="w-[84%] rounded-md border border-white/15 bg-white/[0.06] p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        <p className="flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-widest text-white/70">
          <GoogleG size={9} />
          Review Us on Google
        </p>
        <div className="mt-2.5 flex justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <GoldStar key={i} size={17} />
          ))}
        </div>
        <div className="mt-3 rounded-sm bg-amber-500 py-2 text-[9px] font-extrabold uppercase tracking-wide text-black">
          Leave Us a Review
        </div>
      </div>
    </div>

    <SceneCursor from={{ x: 190, y: 400 }} to={{ x: 175, y: 211 }} />
  </div>
);

/* ── Scene: Funnel rate page (cursor clicks a specific star row) ──── */
const RateScene = ({ targetStar }: { targetStar: 1 | 5 }) => {
  // y-coordinate of each star row's center in the phone frame content area
  const rowY: Record<1 | 5, number> = { 5: 112, 1: 224 };

  return (
    <div className="relative h-full w-full bg-[#111] px-3 pt-4">
      <p className="text-center text-[8px] font-extrabold uppercase tracking-wider text-amber-500">
        Arizona Roofing Pro
      </p>

      {/* Funnel container */}
      <div className="mt-2.5 overflow-hidden rounded-xl border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        {/* Dark header */}
        <div className="bg-[#1a1a1a] px-3 py-2.5 text-center">
          <p className="text-[10px] font-bold text-white">How would you rate us?</p>
        </div>

        {/* White card with rating rows */}
        <div className="bg-white px-3 py-3">
          <p className="mb-2 text-[8px] font-bold text-neutral-900">
            Please Rate Us <span className="text-amber-500">*</span>
          </p>
          <div className="space-y-[5px]">
            {[5, 4, 3, 2, 1].map((n) => (
              <div
                key={n}
                className="flex items-center gap-1.5 rounded border border-neutral-200 px-2 py-[5px]"
              >
                <div className="h-[8px] w-[8px] shrink-0 rounded-full border border-neutral-400" />
                <span className="text-[9px] leading-none">
                  {Array.from({ length: n }, () => "⭐").join("")}
                </span>
                <span className="text-[7px] font-bold text-neutral-900">
                  ({n} Star{n > 1 ? "s" : ""})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 px-1">
        <div className="flex justify-between">
          <span className="text-[6px] uppercase tracking-widest text-white/30">Progress</span>
          <span className="text-[6px] font-semibold text-amber-500">0%</span>
        </div>
        <div className="mt-0.5 h-[3px] w-full rounded-full bg-white/10">
          <div className="h-full w-[2%] rounded-full bg-amber-500" />
        </div>
      </div>

      <SceneCursor from={{ x: 190, y: 380 }} to={{ x: 36, y: rowY[targetStar] }} />
    </div>
  );
};

/* ── Scene: Private feedback form (after 1★) ──────────────────────── */
const FeedbackScene = () => (
  <div className="relative h-full w-full bg-[#111] px-3 pt-4">
    <p className="text-center text-[8px] font-extrabold uppercase tracking-wider text-amber-500">
      Arizona Roofing Pro
    </p>

    <div className="mt-2.5 overflow-hidden rounded-xl border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
      {/* Dark header */}
      <div className="bg-[#1a1a1a] px-3 py-3 text-center">
        <p className="text-[10px] font-bold leading-tight text-white">
          Sorry to hear that you're
          <br />
          not satisfied.
        </p>
        <p className="mt-1 text-[7px] leading-snug text-white/60">
          Please provide us with your feedback and we'll do our best to improve.
        </p>
      </div>

      {/* White card with form fields */}
      <div className="space-y-1.5 bg-white px-3 py-3">
        <div className="flex h-6 items-center rounded border border-neutral-200 px-2 text-[7px] text-neutral-400">
          Name (optional)
        </div>
        <div className="flex h-6 items-center rounded border border-neutral-200 px-2 text-[7px] text-neutral-400">
          Email (optional)
        </div>
        <div className="h-12 rounded border border-neutral-200 px-2 py-1.5 text-[7px] leading-snug text-neutral-400">
          Your Feedback (Please let us know what we can do to improve?)
        </div>
      </div>

      {/* Dark footer with Submit */}
      <div className="flex justify-end bg-[#1a1a1a] px-3 py-2">
        <span className="text-[8px] font-bold text-white">Submit ▶</span>
      </div>
    </div>

    {/* Progress bar 50% */}
    <div className="mt-3 px-1">
      <div className="flex justify-between">
        <span className="text-[6px] uppercase tracking-widest text-white/30">Progress</span>
        <span className="text-[6px] font-semibold text-amber-500">50%</span>
      </div>
      <div className="mt-0.5 h-[3px] w-full rounded-full bg-white/10">
        <div className="h-full w-[50%] rounded-full bg-amber-500" />
      </div>
    </div>
  </div>
);

/* ── Scene: Google's "Write a review" page (after 5★) ─────────────── */
const GoogleReviewScene = () => (
  <div className="relative h-full w-full bg-white">
    {/* Top bar */}
    <div className="flex items-center gap-3 border-b border-neutral-200 px-3 py-2.5">
      <span className="text-[13px] text-neutral-700">✕</span>
      <p className="text-[10px] font-medium text-neutral-900">Write a review</p>
    </div>

    {/* Business card */}
    <div className="flex items-center gap-2 border-b border-neutral-100 px-3 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
        <span className="text-[12px]">🏠</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-bold text-neutral-900">Arizona Roofing Pro</p>
        <p className="truncate text-[7px] text-neutral-500">Roofing contractor</p>
      </div>
    </div>

    {/* Rate your experience */}
    <div className="px-3 py-4 text-center">
      <p className="text-[9px] font-semibold text-neutral-900">Rate your experience</p>
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <GoldStar key={i} size={22} />
        ))}
      </div>
    </div>

    {/* Textarea */}
    <div className="px-3">
      <div className="h-14 rounded-md border border-neutral-200 p-2 text-[7px] leading-snug text-neutral-400">
        Share details of your own experience at this place
      </div>
    </div>

    {/* Attachment row */}
    <div className="mt-2 flex gap-1.5 border-t border-neutral-100 px-3 py-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-[9px]">
        📷
      </div>
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-[9px]">
        #
      </div>
    </div>

    {/* Post button fixed at bottom */}
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-neutral-200 bg-white px-3 py-2">
      <span className="text-[8px] text-neutral-400">Posting publicly</span>
      <span className="rounded-full bg-[#1a73e8] px-4 py-1 text-[9px] font-semibold text-white">
        Post
      </span>
    </div>
  </div>
);

export const ReviewFunnelMockup = () => {
  const { key: loopKey, ref: loopRef } = useLoopKey(15000);
  const [scene, setScene] = useState<"card" | "rate-1" | "feedback" | "rate-5" | "google">(
    "card"
  );

  useEffect(() => {
    setScene("card");
    const t1 = setTimeout(() => setScene("rate-1"), 3000);
    const t2 = setTimeout(() => setScene("feedback"), 6000);
    const t3 = setTimeout(() => setScene("rate-5"), 9000);
    const t4 = setTimeout(() => setScene("google"), 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [loopKey]);

  return (
    <div ref={loopRef}>
    <ScaledMockup designWidth={260} designHeight={563}>
      <PhoneFrame>
        <div className="relative h-full w-full overflow-hidden">
          {scene === "card" && <ReviewCardScene />}
          {scene === "rate-1" && <RateScene targetStar={1} />}
          {scene === "feedback" && <FeedbackScene />}
          {scene === "rate-5" && <RateScene targetStar={5} />}
          {scene === "google" && <GoogleReviewScene />}
        </div>
      </PhoneFrame>
    </ScaledMockup>
    </div>
  );
};

/* ========================================================================== */
/*  3. WebsiteMockup — Mac browser → quote form fill → iPhone SMS response    */
/* ========================================================================== */

/* Mac browser frame (chrome + content area) */
const MacFrame = ({
  children,
  url = "phoenixroofingandrepair.com",
}: {
  children: ReactNode;
  url?: string;
}) => (
  <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
    {/* Browser chrome */}
    <div className="flex items-center gap-2 bg-neutral-800 px-3 py-1.5">
      <div className="flex gap-[5px]">
        <div className="h-[9px] w-[9px] rounded-full bg-[#ff5f56]" />
        <div className="h-[9px] w-[9px] rounded-full bg-[#ffbd2e]" />
        <div className="h-[9px] w-[9px] rounded-full bg-[#27c93f]" />
      </div>
      <div className="mx-auto flex h-4 w-[60%] items-center justify-center gap-1 rounded-sm bg-neutral-700 px-2 text-[8px] text-white/60">
        <span className="text-[7px]">🔒</span>
        <span>{url}</span>
      </div>
      <div className="w-5" />
    </div>
    {/* Content area (16:10 aspect) */}
    <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">{children}</div>
  </div>
);

/* Exact brand logo from contractor-website-template/src/components/shared/Logo.tsx */
const BrandLogo = ({
  size = "md",
  variant = "light",
}: {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}) => {
  const dims =
    size === "sm" ? { w: 18, h: 15, main: 8, sub: 5 } :
    size === "lg" ? { w: 32, h: 27, main: 13, sub: 8 } :
    { w: 22, h: 18, main: 10, sub: 6 };
  const isDark = variant === "dark";
  const bodyFill = isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.12)";
  const roofFill = isDark ? "#1a1a1a" : "#f59e0b";
  const mainClass = isDark ? "text-black" : "text-white";
  const subClass = isDark ? "text-black/75" : "text-amber-500";
  return (
    <div className="flex items-center gap-1.5">
      <svg
        width={dims.w}
        height={dims.h}
        viewBox="0 0 38 32"
        fill="none"
        className="shrink-0"
      >
        <rect x="3" y="17" width="32" height="15" rx="1.5" fill={bodyFill} />
        <path d="M0 18.5L19 1L38 18.5H0Z" fill={roofFill} />
        <rect x="25" y="2.5" width="5" height="10" rx="1" fill={roofFill} />
        <rect x="13.5" y="22" width="11" height="10" rx="1" fill={roofFill} fillOpacity="0.35" />
      </svg>
      <div className="flex flex-col gap-[1px] leading-none">
        <span
          className={`font-extrabold tracking-tight leading-none ${mainClass}`}
          style={{ fontSize: `${dims.main}px` }}
        >
          Phoenix Roofing
        </span>
        <span
          className={`font-bold uppercase leading-none ${subClass}`}
          style={{ fontSize: `${dims.sub}px`, letterSpacing: "0.18em" }}
        >
          &amp; Repair
        </span>
      </div>
    </div>
  );
};

/* Hero background image (same URL as contractor-website-template/src/config/client.ts) */
const HERO_IMG =
  "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80')";

/* ── Scene: Website hero (exact HeroSection.tsx look) ─────────────────── */
const MacHeroContent = ({ chatWidget }: { chatWidget?: ReactNode } = {}) => (
  <div
    className="relative h-full w-full"
    style={{ backgroundImage: HERO_IMG, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    {/* Dark scrim over image */}
    <div className="absolute inset-0 bg-black/65" />
    <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-black/70 to-transparent" />

    {/* Header bar */}
    <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
      <BrandLogo size="sm" />
      <div className="flex items-center gap-2 text-[6px] font-semibold text-white/80">
        <span>SERVICES</span>
        <span>AREAS</span>
        <span>REVIEWS</span>
        <span>ABOUT</span>
        <span className="rounded-sm bg-amber-500 px-2 py-[2px] text-[6px] font-extrabold uppercase tracking-wide text-black">
          Get Quote
        </span>
      </div>
    </div>

    {/* Main hero content */}
    <div className="relative z-10 grid h-[calc(100%-26px)] grid-cols-5 gap-3 px-4 py-3">
      {/* Left: headline + trust */}
      <div className="col-span-3 flex flex-col justify-center">
        <p className="text-[16px] font-extrabold leading-[1.03] tracking-tight text-white">
          Phoenix's Trusted<br />Roofing Contractor
        </p>
        <p className="mt-1.5 text-[8px] text-white/80">
          Serving Phoenix homeowners for 15+ years
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex items-center gap-1 text-[7px] font-semibold text-white">
            🛡 Licensed &amp; Insured
          </span>
          <span className="flex items-center gap-1 text-[8px] font-bold text-amber-500">
            📞 (602) 497-0154
          </span>
        </div>
      </div>

      {/* Right: quote form widget (matches QuoteForm.tsx) */}
      <div className="col-span-2 flex items-center">
        <div className="w-full rounded border border-white/10 bg-neutral-900 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)] ring-1 ring-amber-500/25">
          <div className="flex justify-center">
            <BrandLogo size="sm" />
          </div>
          <p className="mt-1.5 text-center text-[7px] font-extrabold uppercase tracking-wide text-white">
            Get a Free Quote
          </p>
          <div className="mt-1.5 space-y-1">
            <div className="h-[10px] rounded-sm bg-white" />
            <div className="h-[10px] rounded-sm bg-white" />
            <div className="h-[16px] rounded-sm bg-white" />
          </div>
          <div className="mt-1.5 rounded-sm bg-amber-500 py-[3px] text-center text-[7px] font-extrabold uppercase text-black">
            SEND
          </div>
        </div>
      </div>
    </div>

    {/* Chat widget slot (overridable per scene) */}
    {chatWidget ?? (
      <div className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 shadow-[0_4px_14px_rgba(245,158,11,0.45),0_2px_6px_rgba(0,0,0,0.35)]">
        <MessageCircle className="h-[14px] w-[14px] text-black" strokeWidth={2.5} />
      </div>
    )}
  </div>
);

/* ── Scene: Zoomed quote form (exact QuoteForm.tsx widget look) ────── */
const MacFormContent = () => (
  <div
    className="relative h-full w-full"
    style={{ backgroundImage: HERO_IMG, backgroundSize: "cover", backgroundPosition: "center" }}
  >
    {/* Darker scrim to focus on form */}
    <div className="absolute inset-0 bg-black/80" />

    <div className="relative z-10 flex h-full items-center justify-center px-6">
      <div className="w-full max-w-[240px] rounded border border-white/10 bg-neutral-900 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_80px_rgba(245,158,11,0.08)] ring-1 ring-amber-500/25">
        {/* Logo centered */}
        <div className="flex justify-center">
          <BrandLogo size="md" />
        </div>

        {/* Heading */}
        <p className="mt-2 text-center text-[11px] font-extrabold uppercase tracking-wide text-white">
          Get a Free Quote
        </p>

        {/* Name field */}
        <div className="mt-2.5">
          <p className="text-[7px] font-medium text-white/75">
            Full Name <span className="text-amber-500">*</span>
          </p>
          <div className="mt-0.5 flex h-[17px] items-center rounded-sm border border-white/15 bg-white px-2 text-[8px] text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.12 }}
            >
              John Smith
            </motion.span>
          </div>
        </div>

        {/* Phone field */}
        <div className="mt-1.5">
          <p className="text-[7px] font-medium text-white/75">
            Phone <span className="text-amber-500">*</span>
          </p>
          <div className="mt-0.5 flex h-[17px] items-center rounded-sm border border-white/15 bg-white px-2 text-[8px] text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.12 }}
            >
              (602) 555-0143
            </motion.span>
          </div>
        </div>

        {/* Message field */}
        <div className="mt-1.5">
          <p className="text-[7px] font-medium text-white/75">
            Short message about your needs <span className="text-amber-500">*</span>
          </p>
          <div className="mt-0.5 h-[30px] rounded-sm border border-white/15 bg-white px-2 py-1 text-[7px] leading-snug text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.15 }}
            >
              Leaking roof after last night's storm — need a fast quote please!
            </motion.span>
          </div>
        </div>

        {/* Consent row */}
        <div className="mt-1.5 flex items-start gap-1.5">
          <motion.div
            initial={{ backgroundColor: "rgba(255,255,255,0)" }}
            animate={{ backgroundColor: "#f59e0b" }}
            transition={{ delay: 3.4, duration: 0.1 }}
            className="mt-[1px] flex h-[9px] w-[9px] shrink-0 items-center justify-center rounded-[1px] border border-white/30"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.1 }}
              className="text-[7px] font-extrabold leading-none text-black"
            >
              ✓
            </motion.span>
          </motion.div>
          <p className="text-[6px] leading-snug text-white/55">
            I agree to the{" "}
            <span className="text-amber-500 underline">terms &amp; conditions</span>.
          </p>
        </div>

        {/* SEND button */}
        <div className="mt-2 rounded-sm bg-amber-500 py-[7px] text-center text-[11px] font-extrabold uppercase tracking-wide text-black shadow-md">
          SEND
        </div>
      </div>
    </div>

    {/* Cursor: waits for form to fill, then slides to SEND and clicks */}
    <SceneCursor
      from={{ x: 440, y: 30 }}
      to={{ x: 200, y: 224 }}
      duration={2.2}
      delay={4.2}
    />
  </div>
);

/* ── Scene: iPhone showing SMS conversation after form submission ───── */
const WebsitePhoneSmsContent = () => (
  <div className="flex h-full flex-col">
    <SmsHeader name="John Smith" status="Just submitted quote form" />
    <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-3 py-3">
      {/* Outgoing #1 — with typo */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-black">
          Hey John, just got your quote form. I will be in touchh shortly — Mike, Phoenix Roofing &amp; Repair
        </p>
      </motion.div>

      {/* Outgoing #2 — typo correction */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 3, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-black">
          *I will be in touch shortly. Sorry I haven't had enough coffee today haha. Talk soon.
        </p>
      </motion.div>

      {/* Typing dots from customer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5.5, duration: 0.3 }}
        className="self-start"
      >
        <TypingDots />
      </motion.div>

      {/* Incoming reply */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 7, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-white/95">
          Wow, thanks for the quick response. No more questions, look forward to talking to you!
        </p>
      </motion.div>
    </div>
  </div>
);

export const WebsiteMockup = () => {
  const { key: loopKey, ref: loopRef } = useLoopKey(22000);
  const [scene, setScene] = useState<"mac-hero" | "mac-form" | "phone-sms">("mac-hero");

  useEffect(() => {
    setScene("mac-hero");
    const t1 = setTimeout(() => setScene("mac-form"), 3500);
    const t2 = setTimeout(() => setScene("phone-sms"), 10500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loopKey]);

  return (
    <div ref={loopRef}>
    <ScaledMockup designWidth={420} designHeight={580}>
      <div className="flex h-full w-full items-center justify-center">
        {(scene === "mac-hero" || scene === "mac-form") && (
          <div className="w-[420px]">
            <MacFrame>
              {scene === "mac-hero" && <MacHeroContent />}
              {scene === "mac-form" && <MacFormContent />}
            </MacFrame>
          </div>
        )}
        {scene === "phone-sms" && (
          <div className="w-[260px]">
            <PhoneFrame>
              <WebsitePhoneSmsContent />
            </PhoneFrame>
          </div>
        )}
      </div>
    </ScaledMockup>
    </div>
  );
};

/* ========================================================================== */
/*  4. CampaignMockup — job-complete form → success → text campaign → reply  */
/* ========================================================================== */

/* ── Shared card structure used by both form and success scenes ────── */
const JobCompleteCardShell = ({ children }: { children: ReactNode }) => (
  <div className="relative flex h-full w-full flex-col items-center overflow-hidden bg-[#1c1c1e] px-3 pt-4 pb-2">
    <div className="w-full rounded-2xl border border-[#3a3a3c] bg-[#2c2c2e] p-3">
      {/* Company heading */}
      <h1 className="mb-2 text-center text-[12px] font-bold text-white">
        Phoenix Roofing &amp; Repair
      </h1>

      {/* Info box — borderLeft amber */}
      <div className="mb-2 rounded-md border-l-[3px] border-[#D4860A] bg-[#1c1c1e] px-2 py-1.5 text-[7px] leading-[1.5] text-[#8e8e93]">
        <p className="font-semibold text-white">
          1. ⭐ This will send out your 5 star review request funnel
        </p>
        <p className="mt-0.5">— Customer will be reminded to leave a 5★ review 4 times over 4 weeks</p>
        <p className="italic text-[#8e8e93]">(*stops if they leave a review*)</p>
        <p className="my-0.5 text-center text-[10px]">👇</p>
        <p className="font-semibold text-white">
          2. 🗓️ Customer goes into your 1-year follow up
        </p>
        <p className="mt-0.5">— Texted every 2–3 months with return-customer + referral discount offers</p>
        <p className="mt-1 font-semibold text-white">Fill in below 👇👇👇</p>
      </div>

      {children}
    </div>

    <p className="mt-2 text-[6px] text-[#3a3a3c]">Powered by VargaFlow</p>
  </div>
);

/* ── Scene: Job-complete form with animated fill + cursor click Submit ── */
const JobCompleteFormContent = () => (
  <JobCompleteCardShell>
    {/* First name field */}
    <div className="mb-2">
      <label className="text-[6px] font-bold uppercase tracking-[0.05em] text-[#8e8e93]">
        Customer First Name
      </label>
      <div className="mt-0.5 flex h-[20px] items-center rounded-md border border-[#3a3a3c] bg-[#3a3a3c] px-2 text-[9px] text-white">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.12 }}
        >
          Sarah
        </motion.span>
      </div>
    </div>

    {/* Phone field */}
    <div className="mb-2.5">
      <label className="text-[6px] font-bold uppercase tracking-[0.05em] text-[#8e8e93]">
        Phone
      </label>
      <div className="mt-0.5 flex h-[20px] items-center rounded-md border border-[#3a3a3c] bg-[#3a3a3c] px-2 text-[9px] text-white">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.12 }}
        >
          6025550143
        </motion.span>
      </div>
    </div>

    {/* Submit button */}
    <div className="rounded-xl bg-[#D4860A] py-2 text-center text-[12px] font-extrabold text-white">
      Submit!
    </div>

    {/* Cursor: waits for fills then slides to Submit button and clicks */}
    <SceneCursor
      from={{ x: 220, y: 460 }}
      to={{ x: 175, y: 318 }}
      duration={2.2}
      delay={2.8}
    />
  </JobCompleteCardShell>
);

/* ── Scene: Success state (after cursor clicks Submit) ───────────────── */
const JobCompleteSuccessContent = () => (
  <JobCompleteCardShell>
    <p className="px-1 py-3 text-center text-[9px] leading-snug text-[#86efac]">
      ✅ Done! <span className="font-bold text-[#bbf7d0]">Sarah</span> has been added to your review + follow-up sequence. They will receive a review request shortly.
    </p>
  </JobCompleteCardShell>
);

/* ── Scene: SMS campaign going out + customer reply ──────────────────── */
const CampaignPhoneSmsContent = () => (
  <div className="flex h-full flex-col">
    <SmsHeader name="Sarah" status="Seasonal campaign · Phoenix Roofing" />
    <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-3 py-3">
      {/* Outgoing campaign message */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-black">
          Hey Sarah, I'm running a seasonal special this week and giving 10% off. It's only for the first 3 people — so if you're interested or know someone who might be, just tap the link:{" "}
          <span className="underline">phoenixroofingandrepair.com/getyourdiscount</span> — Mike from Phoenix Roofing &amp; Repair
        </p>
      </motion.div>

      {/* Typing dots from customer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4, duration: 0.3 }}
        className="self-start"
      >
        <TypingDots />
      </motion.div>

      {/* Customer reply */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 5.5, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-white/95">
          Thanks Mike, I will definitely send this over to some of my friends!
        </p>
      </motion.div>
    </div>
  </div>
);

export const CampaignMockup = () => {
  const { key: loopKey, ref: loopRef } = useLoopKey(20000);
  const [scene, setScene] = useState<"form" | "success" | "sms">("form");

  useEffect(() => {
    setScene("form");
    const t1 = setTimeout(() => setScene("success"), 5500);
    const t2 = setTimeout(() => setScene("sms"), 8500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loopKey]);

  return (
    <div ref={loopRef}>
    <ScaledMockup designWidth={260} designHeight={563}>
      <PhoneFrame>
        <div className="relative h-full w-full overflow-hidden">
          {scene === "form" && <JobCompleteFormContent />}
          {scene === "success" && <JobCompleteSuccessContent />}
          {scene === "sms" && <CampaignPhoneSmsContent />}
        </div>
      </PhoneFrame>
    </ScaledMockup>
    </div>
  );
};

/* ========================================================================== */
/*  5. ChatWidgetMockup — real ChatWidget.tsx flow: closed → form → success  */
/* ========================================================================== */

/* Miniature house mark used inside the chat widget greeting bubble */
const MiniHouseMark = () => (
  <svg width="12" height="10" viewBox="0 0 38 32" fill="none" className="shrink-0">
    <rect x="3" y="17" width="32" height="15" rx="1.5" fill="rgba(26,26,26,0.15)" />
    <path d="M0 18.5L19 1L38 18.5H0Z" fill="#f59e0b" />
    <rect x="25" y="2.5" width="5" height="10" rx="1" fill="#f59e0b" />
    <rect x="13.5" y="22" width="11" height="10" rx="1" fill="#f59e0b" fillOpacity="0.3" />
  </svg>
);

/* Scene 1 overlay: teaser popup + floating button + cursor moving to button */
const ChatClosedOverlay = () => (
  <>
    {/* Teaser popup */}
    <div className="absolute bottom-[38px] right-2 z-20 max-w-[150px] rounded-xl rounded-br-sm border border-white/10 bg-neutral-900 px-2 py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.45)] ring-1 ring-amber-500/25">
      <p className="text-[6px] leading-snug text-white/90">
        Shoot me any questions and I'll get back to you as soon as I'm free!{" "}
        <span className="text-white/60">(I promise)</span>
      </p>
    </div>
    {/* Floating button */}
    <div className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 shadow-[0_4px_14px_rgba(245,158,11,0.45),0_2px_6px_rgba(0,0,0,0.35)]">
      <MessageCircle className="h-[14px] w-[14px] text-black" strokeWidth={2.5} />
    </div>
    {/* Cursor slides to the chat button and clicks */}
    <SceneCursor from={{ x: 440, y: 30 }} to={{ x: 384, y: 232 }} duration={2.4} delay={0.4} />
  </>
);

/* Scene 2 overlay: open chat widget modal, fields fill in, cursor clicks Send */
const ChatFormOverlay = () => (
  <>
    <div className="absolute bottom-2 right-2 z-30 w-[178px] overflow-hidden rounded-md shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(245,158,11,0.12)] ring-1 ring-amber-500/25">
      {/* Modal header (amber) */}
      <div className="flex items-center justify-between bg-amber-500 px-2 py-[5px]">
        <BrandLogo size="sm" variant="dark" />
        <span className="text-[10px] leading-none text-black/70">⌄</span>
      </div>

      {/* Modal body (white) */}
      <div className="bg-white p-1.5">
        {/* Greeting bubble */}
        <div className="flex items-start gap-1 rounded-md bg-neutral-100 p-1.5">
          <MiniHouseMark />
          <p className="text-[6px] leading-snug text-neutral-700">
            This text goes straight to my personal phone. I'll make sure to get back to you the second I'm free!
          </p>
        </div>

        {/* Form fields */}
        <div className="mt-1.5 space-y-1">
          <div className="flex h-[13px] items-center rounded border border-neutral-200 px-1.5 text-[7px] text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.12 }}
            >
              John
            </motion.span>
          </div>
          <div className="flex h-[13px] items-center rounded border border-neutral-200 px-1.5 text-[7px] text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.12 }}
            >
              (602) 555-0143
            </motion.span>
          </div>
          <div className="h-[24px] rounded border border-neutral-200 px-1.5 py-1 text-[6px] leading-snug text-neutral-900">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.15 }}
            >
              Got a question about my roof repair costs
            </motion.span>
          </div>
        </div>

        {/* Consent */}
        <div className="mt-1.5 flex items-start gap-1">
          <motion.div
            initial={{ backgroundColor: "rgba(255,255,255,0)" }}
            animate={{ backgroundColor: "#f59e0b" }}
            transition={{ delay: 3.3, duration: 0.1 }}
            className="mt-[1px] flex h-[8px] w-[8px] shrink-0 items-center justify-center rounded-[1px] border border-neutral-300"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.1 }}
              className="text-[6px] font-extrabold leading-none text-black"
            >
              ✓
            </motion.span>
          </motion.div>
          <p className="text-[5px] leading-snug text-neutral-500">
            By submitting you agree to receive texts/e-mails. Rates may apply.
          </p>
        </div>

        {/* Send button */}
        <div className="mt-1.5 flex items-center justify-center gap-1 rounded bg-amber-500 py-1.5 text-[8px] font-bold text-black">
          Send :) <span className="text-[9px]">→</span>
        </div>

        {/* Footer */}
        <p className="mt-1 text-center text-[5px] text-neutral-400">
          Powered by <span className="font-medium text-amber-600">VargaFlow</span>
        </p>
      </div>
    </div>

    {/* Cursor: waits for fields to fill, moves to Send button, clicks */}
    <SceneCursor from={{ x: 440, y: 30 }} to={{ x: 325, y: 226 }} duration={2.0} delay={4.0} />
  </>
);

/* Scene 3 overlay: success state ("Thanks! We'll be in touch soon.") */
const ChatSuccessOverlay = () => (
  <div className="absolute bottom-2 right-2 z-30 w-[178px] overflow-hidden rounded-md shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(245,158,11,0.12)] ring-1 ring-amber-500/25">
    <div className="flex items-center justify-between bg-amber-500 px-2 py-[5px]">
      <BrandLogo size="sm" variant="dark" />
      <span className="text-[10px] leading-none text-black/70">⌄</span>
    </div>
    <div className="bg-white px-3 py-5 text-center">
      <p className="text-[9px] font-medium text-neutral-700">
        Thanks! We'll be in touch soon.
      </p>
    </div>
    <p className="bg-white pb-1 text-center text-[5px] text-neutral-400">
      Powered by <span className="font-medium text-amber-600">VargaFlow</span>
    </p>
  </div>
);

/* Scene 4: iPhone SMS conversation after chat widget form submission */
const ChatWidgetPhoneSmsContent = () => (
  <div className="flex h-full flex-col">
    <SmsHeader name="John" status="Web chat · Phoenix Roofing" />
    <div className="flex flex-1 flex-col gap-1.5 overflow-hidden px-3 py-3">
      {/* Outgoing #1 — with "Thankzs" typo */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-black">
          Hey John, just got your text through my web chat. Thankzs for reaching out 😊 I will be in touch as soon as I am free. — Mike, Phoenix Roofing &amp; Repair
        </p>
      </motion.div>

      {/* Outgoing #2 — typo correction */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 3, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-black">
          *thanks for reaching out. Sorry I haven't had enough coffee today haha. By the way, if you have any other questions in the meantime, feel free to message me here.
        </p>
      </motion.div>

      {/* Typing dots from customer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 6, duration: 0.3 }}
        className="self-start"
      >
        <TypingDots />
      </motion.div>

      {/* Incoming reply */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ delay: 7.5, duration: 0.45, ease: "easeOut" }}
        className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2"
      >
        <p className="text-[8px] leading-snug text-white/95">
          Wow, thanks for the quick response. No more questions, look forward to talking to you!
        </p>
      </motion.div>
    </div>
  </div>
);

export const ChatWidgetMockup = () => {
  const { key: loopKey, ref: loopRef } = useLoopKey(24000);
  const [scene, setScene] = useState<"web-closed" | "web-form" | "web-success" | "phone-sms">(
    "web-closed"
  );

  useEffect(() => {
    setScene("web-closed");
    const t1 = setTimeout(() => setScene("web-form"), 3000);
    const t2 = setTimeout(() => setScene("web-success"), 9500);
    const t3 = setTimeout(() => setScene("phone-sms"), 11500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loopKey]);

  return (
    <div ref={loopRef}>
    <ScaledMockup designWidth={420} designHeight={580}>
      <div className="flex h-full w-full items-center justify-center">
        {scene !== "phone-sms" && (
          <div className="w-[420px]">
            <MacFrame url="phoenixroofingandrepair.com">
              <MacHeroContent
                chatWidget={
                  scene === "web-closed" ? <ChatClosedOverlay /> :
                  scene === "web-form" ? <ChatFormOverlay /> :
                  <ChatSuccessOverlay />
                }
              />
            </MacFrame>
          </div>
        )}
        {scene === "phone-sms" && (
          <div className="w-[260px]">
            <PhoneFrame>
              <ChatWidgetPhoneSmsContent />
            </PhoneFrame>
          </div>
        )}
      </div>
    </ScaledMockup>
    </div>
  );
};

/* ========================================================================== */
/*  Lookup map — slug → mockup component                                       */
/* ========================================================================== */

export const MOCKUP_BY_SLUG: Record<string, ComponentType> = {
  "missed-call-text-back": MissedCallMockup,
  "review-funnel": ReviewFunnelMockup,
  "functional-website": WebsiteMockup,
  "one-click-campaigns": CampaignMockup,
  "chat-widget": ChatWidgetMockup,
};
