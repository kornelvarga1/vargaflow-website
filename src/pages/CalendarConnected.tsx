import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import vfIcon from "@/assets/vf-icon.png";

// Landing page for voice-calendar-oauth-callback. That edge function does the
// token exchange and then redirects here — it can't render this itself because
// Supabase forces Content-Type: text/plain on function responses served from
// *.supabase.co, so any HTML it returns shows up as raw markup.
//
// The contractor sees this page seconds after clicking through Google's
// "hasn't verified this app" warning, so the copy's job is to tell them the
// warning was expected and that they're done.

type Status =
  | "connected"
  | "cancelled"
  | "already_connected"
  | "exchange_failed"
  | "save_failed"
  | "invalid";

const KNOWN_STATUSES: Status[] = [
  "connected",
  "cancelled",
  "already_connected",
  "exchange_failed",
  "save_failed",
  "invalid",
];

const CalendarConnected = () => {
  const [params] = useSearchParams();
  const raw = params.get("status") ?? "connected";
  const status: Status = KNOWN_STATUSES.includes(raw as Status)
    ? (raw as Status)
    : "exchange_failed";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Calendar Connected — VargaFlow</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center gap-2.5">
          <img src={vfIcon} alt="VargaFlow" className="h-8 w-8 rounded-md" />
          <span className="text-lg font-bold tracking-tight text-foreground">VargaFlow</span>
        </div>
      </header>

      <main className="bg-background py-10 md:py-16">
        <div className="container max-w-xl px-3 md:px-6">
          {status === "connected" ? <Connected /> : <Problem status={status} />}
        </div>
      </main>
    </div>
  );
};

const Connected = () => (
  <>
    <div className="flex justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>
      </span>
    </div>

    <h1 className="mt-5 text-center text-2xl font-extrabold text-foreground">
      Your calendar is connected
    </h1>
    <p className="mt-3 text-center text-muted-foreground">
      That's the last thing I needed from you. Your receptionist can now see when you're open and
      put booked jobs straight on your calendar.
    </p>

    <div className="mt-8 rounded-md border border-border bg-muted/40 p-5">
      <h2 className="text-sm font-semibold text-foreground">About that Google warning</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        If Google told you the app "isn't verified," that's expected. It shows that on any app
        that hasn't gone through Google's public review — which is a process built for consumer
        apps with thousands of users, not a tool I set up for your shop. Your login stayed with
        Google the whole time. I never see your password.
      </p>
    </div>

    <div className="mt-4 rounded-md border border-border bg-muted/40 p-5">
      <h2 className="text-sm font-semibold text-foreground">What this connection is used for</h2>
      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
        <li>
          Checking your free and busy times, so the receptionist only offers slots you can
          actually make.
        </li>
        <li>Adding a calendar event when a caller books a job, with their name and address on it.</li>
        <li>
          Nothing else. Your calendar isn't copied anywhere, and it isn't shared with anyone
          outside your business.
        </li>
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">
        You can cut off this access whenever you want at{" "}
        <a
          href="https://myaccount.google.com/permissions"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-2"
        >
          myaccount.google.com/permissions
        </a>
        . If you do, the receptionist stops booking and takes messages instead.
      </p>
    </div>

    <p className="mt-8 text-center text-sm text-muted-foreground">
      You can close this tab — I'll take it from here. Anything looks off, text or email me at{" "}
      <a
        href="mailto:kornel@vargaflow.com"
        className="font-medium text-foreground underline underline-offset-2"
      >
        kornel@vargaflow.com
      </a>
      .
    </p>
  </>
);

const PROBLEM_COPY: Record<Exclude<Status, "connected">, { title: string; body: string }> = {
  cancelled: {
    title: "Calendar not connected",
    body: "Looks like the connection was cancelled before Google finished. Nothing was changed on your account. Open the link I sent you again and click through to the end, and you'll be set.",
  },
  already_connected: {
    title: "Google didn't send a new key",
    body: "This happens when the account already approved access once. Go to myaccount.google.com/permissions, remove VargaFlow from the list, then open my link again — it'll go through the second time.",
  },
  exchange_failed: {
    title: "Google didn't finish the handshake",
    body: "Something broke on the way back from Google, so the connection didn't save. Nothing was changed on your account. Open the link again — if it fails twice, send me a message and I'll sort it out on my end.",
  },
  save_failed: {
    title: "Almost — one step didn't save",
    body: "Google approved the access, but I couldn't finish storing it. Don't redo anything yet. Send me a message and I'll finish this from my side, usually within a few minutes.",
  },
  invalid: {
    title: "That link is incomplete",
    body: "This page was opened without the details Google sends back, usually from a bookmarked or half-copied link. Use the original link I sent you and it'll work.",
  },
};

const Problem = ({ status }: { status: Exclude<Status, "connected"> }) => {
  const copy = PROBLEM_COPY[status];

  return (
    <>
      <h1 className="text-center text-2xl font-extrabold text-foreground">{copy.title}</h1>
      <p className="mt-3 text-center text-muted-foreground">{copy.body}</p>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Reach me at{" "}
        <a
          href="mailto:kornel@vargaflow.com"
          className="font-medium text-foreground underline underline-offset-2"
        >
          kornel@vargaflow.com
        </a>
        .
      </p>
    </>
  );
};

export default CalendarConnected;
