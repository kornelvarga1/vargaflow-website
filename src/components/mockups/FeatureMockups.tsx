import { useEffect, useState, type ReactNode, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Phone, Star, MessageCircle, PhoneMissed } from "lucide-react";

/* ========================================================================== */
/*  Shared utilities                                                          */
/* ========================================================================== */

/** Re-mounts animated children every N ms so delay-based sequences loop. */
const useLoopKey = (intervalMs: number) => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setKey((k) => k + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return key;
};

/** Outer iPhone-style chrome every mockup sits inside. */
const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[260px] aspect-[9/19.5] rounded-[2.25rem] border border-white/10 bg-neutral-900 p-[5px] shadow-[0_0_60px_rgba(0,0,0,0.55)]">
    <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-neutral-950">
      {/* Dynamic island */}
      <div className="absolute left-1/2 top-[7px] z-30 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
      {/* Status bar */}
      <div className="relative z-20 flex h-[30px] items-end justify-between px-4 pb-1.5 text-[8px] font-semibold text-white/80">
        <span className="tabular-nums">9:41</span>
        <span className="tracking-[1px]">●●●●</span>
      </div>
      {/* Screen content */}
      <div className="absolute inset-x-0 bottom-0 top-[30px] overflow-hidden">{children}</div>
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
  const loopKey = useLoopKey(18000);
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
  );
};

/* ========================================================================== */
/*  2. ReviewFunnelMockup — review screen with stars filling                  */
/* ========================================================================== */

export const ReviewFunnelMockup = () => {
  const loopKey = useLoopKey(8000);
  return (
    <PhoneFrame>
      <div
        key={loopKey}
        className="relative flex h-full flex-col items-center bg-gradient-to-b from-primary/12 via-transparent to-transparent px-4 pt-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20"
        >
          <Star className="h-5 w-5 fill-primary text-primary" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-3 text-[11px] font-bold leading-tight text-white/95"
        >
          How was your experience?
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-1 text-[8px] text-white/50"
        >
          Arizona Roofing Pro
        </motion.p>

        <div className="mt-5 flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.15, scale: 0.9 }}
              animate={{ opacity: 1, scale: [0.9, 1.25, 1] }}
              transition={{ delay: 1.6 + i * 0.25, duration: 0.45, ease: "backOut" }}
            >
              <Star className="h-5 w-5 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.4 }}
          className="mt-6 rounded-md bg-primary px-4 py-1.5 text-[9px] font-extrabold text-black shadow-lg shadow-primary/20"
        >
          Post to Google →
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3, duration: 0.4 }}
          className="mt-3 text-[8px] text-white/50"
        >
          ✓ Thanks for your feedback!
        </motion.p>
      </div>
    </PhoneFrame>
  );
};

/* ========================================================================== */
/*  3. WebsiteMockup — mini contractor site with pulsing click-to-call        */
/* ========================================================================== */

export const WebsiteMockup = () => {
  const loopKey = useLoopKey(8000);
  return (
    <PhoneFrame>
      <div key={loopKey} className="relative h-full w-full bg-white">
        {/* Header */}
        <div className="border-b border-neutral-200 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm bg-primary" />
            <p className="text-[8px] font-extrabold tracking-wider text-neutral-900">ARIZONA ROOFING PRO</p>
          </div>
          <p className="mt-0.5 text-[6px] text-neutral-500">Licensed · Insured · Phoenix, AZ</p>
        </div>

        {/* Hero */}
        <div className="relative h-[148px] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black px-3 py-3">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[11px] font-extrabold leading-[1.1] text-white"
          >
            Roof Repair<br />Done Right.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-1.5 text-[7px] leading-snug text-white/70"
          >
            Same-day quotes. No BS.<br />
            Family-owned since 2008.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="absolute inset-x-3 bottom-3"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(232,148,26,0.55)",
                  "0 0 0 10px rgba(232,148,26,0)",
                  "0 0 0 0 rgba(232,148,26,0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 2, ease: "easeOut" }}
              className="flex items-center justify-center gap-1.5 rounded-md bg-primary py-1.5 text-[9px] font-extrabold text-black"
            >
              <Phone className="h-2.5 w-2.5" />
              Tap to Call
            </motion.div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex items-center justify-around px-3 py-2 text-center"
        >
          <div>
            <p className="text-[10px] font-extrabold text-primary">5.0</p>
            <p className="text-[6px] text-neutral-500">★★★★★</p>
          </div>
          <div className="h-5 w-px bg-neutral-200" />
          <div>
            <p className="text-[10px] font-extrabold text-neutral-900">500+</p>
            <p className="text-[6px] text-neutral-500">Jobs</p>
          </div>
          <div className="h-5 w-px bg-neutral-200" />
          <div>
            <p className="text-[10px] font-extrabold text-neutral-900">15y</p>
            <p className="text-[6px] text-neutral-500">Exp.</p>
          </div>
        </motion.div>

        {/* Body lines */}
        <div className="space-y-1 px-3 pt-1">
          <div className="h-1.5 w-[85%] rounded bg-neutral-200" />
          <div className="h-1.5 w-full rounded bg-neutral-200" />
          <div className="h-1.5 w-[70%] rounded bg-neutral-200" />
          <div className="h-1.5 w-[90%] rounded bg-neutral-200" />
        </div>
      </div>
    </PhoneFrame>
  );
};

/* ========================================================================== */
/*  4. CampaignMockup — 1-year follow-up turns into a new lead                */
/* ========================================================================== */

export const CampaignMockup = () => {
  const loopKey = useLoopKey(8500);
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <SmsHeader name="Susan D." status="Last job: 1 year ago" />
        <div key={loopKey} className="flex flex-1 flex-col gap-2 px-3 py-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mx-auto rounded-full bg-white/5 px-2 py-0.5 text-[7px] text-white/40"
          >
            1-Year Follow-Up · Sent automatically
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.45, ease: "easeOut" }}
            className="max-w-[82%] self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2"
          >
            <p className="text-[9px] leading-snug text-black">
              Hey Susan, Mike from Arizona Roofing. Been a year since your install — everything holding up? 🏠
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.3 }}
          >
            <TypingDots />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 4.5, duration: 0.45, ease: "easeOut" }}
            className="max-w-[82%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2"
          >
            <p className="text-[9px] leading-snug text-white/95">
              Actually yes! Noticed a small leak near the chimney last week. Can you come take a look?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 6, duration: 0.4, ease: "backOut" }}
            className="mx-auto flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-0.5 text-[8px] font-bold text-primary"
          >
            ✓ New lead · $0 spent
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
};

/* ========================================================================== */
/*  5. ChatWidgetMockup — chat widget expands on a contractor site            */
/* ========================================================================== */

export const ChatWidgetMockup = () => {
  const loopKey = useLoopKey(9000);
  return (
    <PhoneFrame>
      <div key={loopKey} className="relative h-full w-full bg-white">
        {/* Header */}
        <div className="border-b border-neutral-200 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-sm bg-primary" />
            <p className="text-[8px] font-extrabold tracking-wider text-neutral-900">ARIZONA ROOFING PRO</p>
          </div>
        </div>

        {/* Hero strip */}
        <div className="h-[88px] bg-gradient-to-br from-neutral-800 to-neutral-900 px-3 py-3">
          <p className="text-[10px] font-extrabold leading-tight text-white">Need a Quote?</p>
          <p className="mt-1 text-[7px] text-white/60">We respond in minutes.</p>
        </div>

        {/* Body lines */}
        <div className="space-y-1 px-3 py-2">
          <div className="h-1.5 w-[85%] rounded bg-neutral-200" />
          <div className="h-1.5 w-full rounded bg-neutral-200" />
          <div className="h-1.5 w-[60%] rounded bg-neutral-200" />
          <div className="h-1.5 w-[75%] rounded bg-neutral-200" />
        </div>

        {/* Closed chat bubble (visible 0-1.5s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.6] }}
          transition={{ duration: 9, times: [0, 0.06, 0.18, 0.22] }}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          <MessageCircle className="h-4 w-4 fill-black text-black" />
        </motion.div>

        {/* Expanded chat widget (visible from ~2s) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, duration: 0.45, ease: "backOut" }}
          className="absolute bottom-2 right-2 w-[178px] origin-bottom-right rounded-xl bg-primary p-2 shadow-[0_6px_20px_rgba(0,0,0,0.35)]"
        >
          <p className="text-[8px] font-extrabold text-black">Get a free quote</p>
          <p className="mt-0.5 text-[6px] leading-snug text-black/60">We'll text you back in minutes.</p>

          <div className="mt-1.5 space-y-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.3 }}
              className="flex h-[14px] items-center rounded bg-white/85 px-1.5 text-[7px] font-semibold text-black"
            >
              John
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.7, duration: 0.3 }}
              className="flex h-[14px] items-center rounded bg-white/85 px-1.5 text-[7px] font-semibold text-black"
            >
              (555) 012-3456
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.4, duration: 0.3 }}
              className="flex h-[26px] items-start rounded bg-white/85 px-1.5 py-1 text-[7px] leading-tight text-black"
            >
              Noticed a leak after last night's storm — need a fast quote.
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.3, duration: 0.3 }}
            className="mt-1.5 rounded bg-black py-1 text-center text-[7px] font-extrabold text-primary"
          >
            Send →
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.2, duration: 0.4 }}
            className="mt-1.5 text-center text-[6px] font-semibold text-black/70"
          >
            ✓ Mike will text you now
          </motion.p>
        </motion.div>
      </div>
    </PhoneFrame>
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
