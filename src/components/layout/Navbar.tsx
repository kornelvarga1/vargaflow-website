import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap, Building2, Wrench, Calendar } from "lucide-react";
import { SERVICES, NAV_LINKS } from "@/config/constants";
import { cn } from "@/lib/utils";
import vfIcon from "@/assets/vf-icon.png";

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="relative h-5 w-5" aria-hidden="true">
    <span
      className={cn(
        "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ease-out",
        open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1",
      )}
    />
    <span
      className={cn(
        "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ease-out",
        open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-3",
      )}
    />
  </div>
);

const PlusIcon = ({ open, size = "sm" }: { open: boolean; size?: "sm" | "md" }) => (
  <div
    className={cn("relative shrink-0", size === "md" ? "h-4 w-4" : "h-3.5 w-3.5")}
    aria-hidden="true"
  >
    <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
    <span
      className={cn(
        "absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-300 ease-out",
        open ? "rotate-90" : "rotate-0",
      )}
    />
  </div>
);

const SERVICE_ICONS = [Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap];
const SERVICE_DESCRIPTIONS = [
  "High-converting sites built for leads",
  "Auto-reply when you can't pick up",
  "A public number that's not your cell",
  "Rank higher on Google Maps",
  "Get 5-star reviews on autopilot",
  "Email & SMS in one click",
  "Never let a lead go cold",
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  // Pages whose hero is dark — transparent header needs white text on these
  const hasDarkHero = isHomePage || location.pathname === "/trades";
  const isTransparent = !scrolled && !mobileOpen;
  // Transparent over a white bg — use dark text so it's readable
  const needsDarkText = isTransparent && !hasDarkHero;

  useEffect(() => {
    setScrolled(window.scrollY > 0);
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isTransparent ? "" : "bg-foreground [box-shadow:0_1px_0_0_hsl(var(--background)/0.1),0_4px_24px_rgba(0,0,0,0.3)]",
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <img src={vfIcon} alt="VF" className="h-8 w-8 rounded-md lg:h-9 lg:w-9" />
          <span className={`text-lg font-bold tracking-tight transition-colors duration-300 lg:text-xl ${needsDarkText ? "text-foreground" : "text-white/90"}`}>VargaFlow</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-base font-semibold transition-colors duration-300",
                needsDarkText
                  ? location.pathname.startsWith("/services") ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                  : location.pathname.startsWith("/services") ? "text-white" : "text-white/80 hover:text-white",
              )}
            >
              Services <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="absolute -left-4 top-full pt-2">
                <div className="w-[420px] rounded-xl border border-border bg-background p-3 shadow-2xl shadow-foreground/5">
                  <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Choose a Service
                  </p>
                  <div className="grid grid-cols-1 gap-0.5">
                    {SERVICES.map((service, i) => {
                      const Icon = SERVICE_ICONS[i];
                      const isServiceActive = location.pathname === `/services/${service.slug}`;
                      return (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className={cn(
                            "group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-150",
                            isServiceActive ? "bg-secondary" : "hover:bg-muted",
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          <div
                            className={cn(
                              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                              isServiceActive
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-foreground",
                            )}
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={cn(
                                "text-sm font-semibold transition-colors",
                                isServiceActive ? "text-foreground" : "text-foreground group-hover:text-foreground/70",
                              )}
                            >
                              {service.title}
                            </p>
                            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                              {SERVICE_DESCRIPTIONS[i]}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/demo"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors duration-300",
              isActive("/demo") ? (needsDarkText ? "text-foreground" : "text-white") : needsDarkText ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
            )}
          >
            Demo
          </Link>
          <Link
            to="/how-it-works"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors duration-300",
              isActive("/how-it-works") ? (needsDarkText ? "text-foreground" : "text-white") : needsDarkText ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
            )}
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors duration-300",
              isActive("/pricing") ? (needsDarkText ? "text-foreground" : "text-white") : needsDarkText ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
            )}
          >
            Pricing
          </Link>
          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-base font-semibold transition-colors duration-300",
                needsDarkText
                  ? (isActive("/about") || isActive("/trades") || isActive("/contact")) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                  : (isActive("/about") || isActive("/trades") || isActive("/contact")) ? "text-white" : "text-white/80 hover:text-white",
              )}
            >
              About <ChevronDown className={cn("h-4 w-4 transition-transform", aboutOpen && "rotate-180")} />
            </button>
            {aboutOpen && (
              <div className="absolute -left-4 top-full pt-2">
                <div className="w-[260px] rounded-xl border border-border bg-background p-3 shadow-2xl shadow-foreground/5">
                  {[
                    { to: "/about", label: "About VargaFlow", icon: Building2 },
                    { to: "/trades", label: "Trades I Serve", icon: Wrench },
                    { to: "/contact", label: "Contact", icon: Calendar },
                  ].map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150",
                        isActive(to) ? "bg-secondary" : "hover:bg-muted",
                      )}
                      onClick={() => setAboutOpen(false)}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                          isActive(to)
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground group-hover:bg-secondary group-hover:text-foreground",
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <p
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          isActive(to) ? "text-foreground" : "text-foreground hover:text-foreground/70",
                        )}
                      >
                        {label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://app.vargaflow.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "rounded-md border px-4 py-2.5 text-base font-semibold transition-colors duration-300",
              needsDarkText
                ? "border-border text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                : "border-white/30 text-white/80 hover:border-white/60 hover:text-white",
            )}
          >
            Log in
          </a>
          <Link
            to="/contact"
            className={cn(
              "rounded-md px-7 py-3 text-base font-bold transition-colors",
              needsDarkText
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-background text-foreground hover:bg-background/90",
            )}
          >
            Book Your Free Walkthrough
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden transition-colors duration-300", needsDarkText ? "text-foreground" : "text-white")}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-foreground lg:hidden">
          <nav className="flex flex-col p-6 pb-24">
            {/* Mobile Services */}
            <div className="border-b border-white/10 py-4">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex w-full items-center justify-between text-xl font-semibold text-white/80"
              >
                Services <PlusIcon open={servicesOpen} size="md" />
              </button>
              {servicesOpen && (
                <div className="mt-3 flex flex-col gap-1 pl-1">
                  {SERVICES.map((service, i) => {
                    const Icon = SERVICE_ICONS[i];
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/60 hover:bg-white/5 hover:text-white"
                        onClick={() => {
                          setMobileOpen(false);
                          setServicesOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 text-white/40" />
                        <span className="text-base font-medium">{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/demo"
              className={cn(
                "border-b border-white/10 py-4 text-xl font-semibold transition-colors",
                isActive("/demo") ? "text-white" : "text-white/80",
              )}
              onClick={() => setMobileOpen(false)}
            >
              Demo
            </Link>

            <Link
              to="/how-it-works"
              className={cn(
                "border-b border-white/10 py-4 text-xl font-semibold transition-colors",
                isActive("/how-it-works") ? "text-white" : "text-white/80",
              )}
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </Link>

            <Link
              to="/pricing"
              className={cn(
                "border-b border-white/10 py-4 text-xl font-semibold transition-colors",
                isActive("/pricing") ? "text-white" : "text-white/80",
              )}
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile About */}
            <div className="border-b border-white/10 py-4">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex w-full items-center justify-between text-xl font-semibold text-white/80"
              >
                About <PlusIcon open={aboutOpen} size="md" />
              </button>
              {aboutOpen && (
                <div className="mt-3 flex flex-col gap-1 pl-1">
                  {[
                    { to: "/about", label: "About VargaFlow", icon: Building2 },
                    { to: "/trades", label: "Trades I Serve", icon: Wrench },
                    { to: "/contact", label: "Contact", icon: Calendar },
                  ].map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/60 hover:bg-white/5 hover:text-white"
                      onClick={() => {
                        setMobileOpen(false);
                        setAboutOpen(false);
                      }}
                    >
                      <Icon className="h-4 w-4 text-white/40" />
                      <span className="text-base font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://app.vargaflow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-md border border-white/20 py-3.5 text-center text-lg font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </a>
            <Link
              to="/contact"
              className="mt-3 block rounded-md bg-background py-3.5 text-center text-lg font-bold text-foreground hover:bg-background/90"
              onClick={() => setMobileOpen(false)}
            >
              Book Your Free Walkthrough
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
