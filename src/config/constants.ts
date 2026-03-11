// Webhook URL for form submissions — swap this when the real endpoint is ready
export const WEBHOOK_URL = "https://placeholder-webhook.example.com/form";

export const SITE_NAME = "Varga Flow";
export const SITE_EMAIL = "kornel@vargaflow.com";

export const SERVICES = [
  { slug: "functional-website", title: "Functional Website", shortTitle: "Website" },
  { slug: "missed-call-text-back", title: "Missed Call Text Back", shortTitle: "Missed Call Text Back" },
  { slug: "all-in-one-inbox", title: "All-In-One Inbox", shortTitle: "Unified Inbox" },
  { slug: "business-phone", title: "Business Phone", shortTitle: "Business Phone" },
  { slug: "local-seo", title: "Local SEO", shortTitle: "Local SEO" },
  { slug: "review-funnel", title: "5-Star Magic Review Funnel", shortTitle: "Review Funnel" },
  { slug: "one-click-campaigns", title: "One-Click Marketing Campaigns", shortTitle: "Campaigns" },
  { slug: "automated-follow-up", title: "Automated Lead Follow Up", shortTitle: "Lead Follow Up" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;
