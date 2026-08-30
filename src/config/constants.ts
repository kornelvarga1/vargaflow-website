export const SITE_NAME = "VargaFlow";
export const SITE_EMAIL = "kornel@vargaflow.com";

export const WALKTHROUGH_VIDEO_URL =
  "https://zfmchywjmgykmlhjihls.supabase.co/storage/v1/object/public/public-assets/vargaflow-walkthrough.mp4";
export const WALKTHROUGH_POSTER_URL =
  "https://zfmchywjmgykmlhjihls.supabase.co/storage/v1/object/public/public-assets/vargaflow-walkthrough-poster.jpg";

export const SERVICES = [
  { slug: "functional-website", title: "Functional Website", shortTitle: "Website" },
  { slug: "missed-call-text-back", title: "Missed Call Text Back", shortTitle: "Missed Call Text Back" },
  { slug: "business-phone", title: "Business Line", shortTitle: "Business Line" },
  { slug: "local-seo", title: "Local SEO", shortTitle: "Local SEO" },
  { slug: "review-funnel", title: "5-Star Magic Review Funnel", shortTitle: "Review Funnel" },
  { slug: "one-click-campaigns", title: "One-Click Marketing Campaigns", shortTitle: "Campaigns" },
  { slug: "automated-follow-up", title: "Automated Lead Follow Up", shortTitle: "Lead Follow Up" },
  { slug: "ai-receptionist", title: "AI Receptionist", shortTitle: "AI Receptionist" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;
