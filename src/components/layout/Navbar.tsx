import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap } from "lucide-react";
import { SERVICES, NAV_LINKS } from "@/config/constants";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const SERVICE_ICONS = [Globe, MessageSquare, Inbox, Phone, Search, Star, Megaphone, Zap];
const SERVICE_DESCRIPTIONS = [
  "High-converting sites built for leads",
  "Auto-reply when you can't pick up",
  "Every message in one place",
  "One number, every device",
  "Rank higher on Google Maps",
  "Get 5-star reviews on autopilot",
  "Email & SMS in one click",
  "Never let a lead go cold",
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Varga Flow" className="h-8 w-auto lg:h-12" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          <Link
            to="/pricing"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors hover:text-primary",
              isActive("/pricing") ? "text-primary" : "text-foreground/70",
            )}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={cn(
              "px-4 py-2 text-base font-semibold transition-colors hover:text-primary",
              isActive("/about") ? "text-primary" : "text-foreground/70",
            )}
          >
            About
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-base font-semibold transition-colors hover:text-primary",
                location.pathname.startsWith("/services") ? "text-primary" : "text-foreground/70",
              )}
            >
              Services <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="absolute -left-4 top-full pt-2">
                <div className="w-[420px] rounded-xl border border-border bg-background p-3 shadow-2xl shadow-foreground/5">
                  <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Our Services
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
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden rounded-md bg-primary px-7 py-3 text-base font-bold text-primary-foreground transition-colors hover:bg-gold-dark lg:inline-block"
        >
          Book A Call
        </Link>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background lg:hidden">
          <nav className="flex flex-col p-6">
            {/* Mobile Services */}
            <div className="border-b border-border py-4">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex w-full items-center justify-between text-xl font-semibold text-foreground/70"
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
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/60 hover:bg-muted hover:text-primary"
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
              to="/pricing"
              className={cn(
                "border-b border-border py-4 text-xl font-semibold transition-colors",
                isActive("/pricing") ? "text-primary" : "text-foreground/70",
              )}
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            <Link
              to="/about"
              className={cn(
                "border-b border-border py-4 text-xl font-semibold transition-colors",
                isActive("/about") ? "text-primary" : "text-foreground/70",
              )}
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            <Link
              to="/contact"
              className="mt-6 block rounded-md bg-primary py-3.5 text-center text-lg font-bold text-primary-foreground hover:bg-gold-dark"
              onClick={() => setMobileOpen(false)}
            >
              Book A Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
