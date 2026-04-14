import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap, Building2, Wrench, Calendar } from "lucide-react";
import { SERVICES, NAV_LINKS } from "@/config/constants";
import { cn } from "@/lib/utils";
import vfIcon from "@/assets/vf-icon.png";

const SERVICE_ICONS = [Globe, MessageSquare, Phone, Search, Star, Megaphone, Zap];
const SERVICE_DESCRIPTIONS = [
  "High-converting sites built for leads",
  "Auto-reply when you can't pick up",
  "One number, every device",
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
        isTransparent ? "" : "bg-foreground [box-shadow:0_1px_0_0_hsl(var(--primary)/0.4),0_4px_24px_rgba(0,0,0,0.3)]",
      )}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <img src={vfIcon} alt="VF" className="h-8 w-8 rounded-md lg:h-9 lg:w-9" />
          <span className={`text-lg font-bold tracking-tight transition-colors duration-300 lg:text-xl ${needsDarkText ? "text-foreground" : "text-white/90"}`}>VargaFlow</span>
        </Link>

        {/* Mobile CTA */}
        <Link
          to="/contact"
          className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold-dark lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          Free Call
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
                  ? location.pathname.startsWith("/services") ? "text-primary" : "text-foreground/70 hover:text-primary"
                  : location.pathname.startsWith("/services") ? "text-primary" : "text-white/80 hover:text-white",
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
                            isServiceActive ? "bg-primary/10" : "hover:bg-muted",
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          <div
                            className={cn(
                              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                              isServiceActive
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                            )}
                          >
                            <Icon className="h-[18px] w-[18px]" />
                          </div>
                          <div className="min-w-0">
                            <p
                              className={cn(
                                "text-sm font-semibold transition-colors",
                                isServiceActive ? "text-primary" : "text-foreground group-hover:text-primary",
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
              isActive("/demo") ? "text-primary" : needsDarkText ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white",
            )}
          >
            Demo
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors duration-300",
              isActive("/pricing") ? "text-primary" : needsDarkText ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white",
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
                  ? (isActive("/about") || isActive("/trades") || isActive("/contact")) ? "text-primary" : "text-foreground/70 hover:text-primary"
                  : (isActive("/about") || isActive("/trades") || isActive("/contact")) ? "text-primary" : "text-white/80 hover:text-white",
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
                        isActive(to) ? "bg-primary/10" : "hover:bg-muted",
                      )}
                      onClick={() => setAboutOpen(false)}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                          isActive(to)
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <p
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          isActive(to) ? "text-primary" : "text-foreground hover:text-primary",
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
            className="rounded-md bg-primary px-7 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
          >
            Get a Free Strategy Call
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden transition-colors duration-300", needsDarkText ? "text-foreground" : "text-white")}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                Services <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div className="mt-3 flex flex-col gap-1 pl-1">
                  {SERVICES.map((service, i) => {
                    const Icon = SERVICE_ICONS[i];
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/60 hover:bg-white/5 hover:text-primary"
                        onClick={() => {
                          setMobileOpen(false);
                          setServicesOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 text-primary/60" />
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
                isActive("/demo") ? "text-primary" : "text-white/80",
              )}
              onClick={() => setMobileOpen(false)}
            >
              Demo
            </Link>

            <Link
              to="/pricing"
              className={cn(
                "border-b border-white/10 py-4 text-xl font-semibold transition-colors",
                isActive("/pricing") ? "text-primary" : "text-white/80",
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
                About <ChevronDown className={cn("h-5 w-5 transition-transform", aboutOpen && "rotate-180")} />
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
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-white/60 hover:bg-white/5 hover:text-primary"
                      onClick={() => {
                        setMobileOpen(false);
                        setAboutOpen(false);
                      }}
                    >
                      <Icon className="h-4 w-4 text-primary/60" />
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
              className="mt-3 block rounded-md bg-primary py-3.5 text-center text-lg font-bold text-primary-foreground hover:bg-gold-dark"
              onClick={() => setMobileOpen(false)}
            >
              Get a Free Strategy Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
