import {
  Home,
  Droplets,
  Wind,
  Zap,
  TreePine,
  Paintbrush,
  Fence,
  Bug,
  DoorOpen,
  Hammer,
  PanelTop,
  Droplet,
  type LucideIcon,
} from "lucide-react";

export type NicheService = {
  name: string;
  image: string;
};

export type NicheConfig = {
  slug: string;
  label: string;
  icon: LucideIcon;
  defaultCompanyName: string;
  headline: string;
  heroImage: string;
  services: NicheService[];
};

export const NICHES: Record<string, NicheConfig> = {
  plumbing: {
    slug: "plumbing",
    label: "Plumbing",
    icon: Droplets,
    defaultCompanyName: "Elite Plumbing Solutions",
    headline: "Fast, Reliable Plumbing You Can Trust",
    heroImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80",
    services: [
      {
        name: "Drain Cleaning",
        image:
          "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
      },
      {
        name: "Water Heater Install",
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
      },
      {
        name: "Pipe Repair",
        image:
          "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80",
      },
    ],
  },
  roofing: {
    slug: "roofing",
    label: "Roofing",
    icon: Home,
    defaultCompanyName: "Summit Roofing & Repair",
    headline: "Your City's Trusted Roofing Contractor",
    heroImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
    services: [
      {
        name: "Roof Replacement",
        image:
          "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&q=80",
      },
      {
        name: "Roof Repair",
        image:
          "https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=600&q=80",
      },
      {
        name: "Storm Damage",
        image:
          "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=600&q=80",
      },
    ],
  },
  hvac: {
    slug: "hvac",
    label: "HVAC",
    icon: Wind,
    defaultCompanyName: "Comfort Air Pros",
    headline: "Year-Round Comfort, One Call Away",
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    services: [
      {
        name: "AC Installation",
        image:
          "https://images.unsplash.com/photo-1631545806609-13a14e04ac4e?w=600&q=80",
      },
      {
        name: "Furnace Repair",
        image:
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
      },
      {
        name: "Duct Cleaning",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
      },
    ],
  },
  electrical: {
    slug: "electrical",
    label: "Electrical",
    icon: Zap,
    defaultCompanyName: "Bright Spark Electric",
    headline: "Licensed Electricians, Quality Guaranteed",
    heroImage:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&q=80",
    services: [
      {
        name: "Panel Upgrades",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
      },
      {
        name: "Rewiring",
        image:
          "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=600&q=80",
      },
      {
        name: "Lighting Install",
        image:
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80",
      },
    ],
  },
  landscaping: {
    slug: "landscaping",
    label: "Landscaping",
    icon: TreePine,
    defaultCompanyName: "GreenScape Outdoors",
    headline: "Transform Your Yard, Love Your Home",
    heroImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    services: [
      {
        name: "Lawn Maintenance",
        image:
          "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80",
      },
      {
        name: "Hardscaping",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      },
      {
        name: "Tree Service",
        image:
          "https://images.unsplash.com/photo-1598902108854-d1446db71788?w=600&q=80",
      },
    ],
  },
  painting: {
    slug: "painting",
    label: "Painting",
    icon: Paintbrush,
    defaultCompanyName: "ProCoat Painting",
    headline: "Professional Painters, Flawless Results",
    heroImage:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1600&q=80",
    services: [
      {
        name: "Interior Painting",
        image:
          "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
      },
      {
        name: "Exterior Painting",
        image:
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      },
      {
        name: "Cabinet Refinishing",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      },
    ],
  },
  fencing: {
    slug: "fencing",
    label: "Fencing",
    icon: Fence,
    defaultCompanyName: "Ironclad Fence Co.",
    headline: "Quality Fencing Built to Last",
    heroImage:
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1600&q=80",
    services: [
      {
        name: "Wood Fencing",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
      },
      {
        name: "Vinyl Fencing",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
      },
      {
        name: "Chain Link",
        image:
          "https://images.unsplash.com/photo-1583805978188-fdb876dff3a5?w=600&q=80",
      },
    ],
  },
  "pest-control": {
    slug: "pest-control",
    label: "Pest Control",
    icon: Bug,
    defaultCompanyName: "Shield Pest Solutions",
    headline: "Keep Your Home Pest-Free, Guaranteed",
    heroImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    services: [
      {
        name: "Termite Treatment",
        image:
          "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80",
      },
      {
        name: "Rodent Control",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      },
      {
        name: "Mosquito Treatment",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
      },
    ],
  },
  "garage-doors": {
    slug: "garage-doors",
    label: "Garage Doors",
    icon: DoorOpen,
    defaultCompanyName: "Premier Garage Doors",
    headline: "Expert Garage Door Service, Same Day",
    heroImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=80",
    services: [
      {
        name: "Door Installation",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      },
      {
        name: "Spring Repair",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
      },
      {
        name: "Opener Install",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
      },
    ],
  },
  concrete: {
    slug: "concrete",
    label: "Concrete",
    icon: Hammer,
    defaultCompanyName: "Solid Ground Concrete",
    headline: "Driveways, Patios & Foundations Done Right",
    heroImage:
      "https://images.unsplash.com/photo-1430285561322-7808604715df?w=1600&q=80",
    services: [
      {
        name: "Driveways",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      },
      {
        name: "Patios & Walkways",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      },
      {
        name: "Foundations",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
      },
    ],
  },
  "windows-doors": {
    slug: "windows-doors",
    label: "Windows & Doors",
    icon: PanelTop,
    defaultCompanyName: "ClearView Windows & Doors",
    headline: "Premium Windows & Doors, Expert Install",
    heroImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    services: [
      {
        name: "Window Replacement",
        image:
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
      },
      {
        name: "Entry Doors",
        image:
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
      },
      {
        name: "Patio Doors",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      },
    ],
  },
  gutters: {
    slug: "gutters",
    label: "Gutters",
    icon: Droplet,
    defaultCompanyName: "FlowGuard Gutters",
    headline: "Protect Your Home with Pro Gutters",
    heroImage:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80",
    services: [
      {
        name: "Gutter Installation",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
      },
      {
        name: "Gutter Cleaning",
        image:
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      },
      {
        name: "Gutter Guards",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      },
    ],
  },
};

export const NICHE_LIST = Object.values(NICHES);
export const DEFAULT_NICHE = "plumbing";
