import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICES, NAV_LINKS } from "@/config/constants";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-navy-deep">
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="text-xl font-extrabold tracking-tight text-foreground lg:text-2xl">
            VARGA <span className="text-primary">FLOW</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-semibold transition-colors hover:text-primary",
                isActive(link.href) ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors hover:text-primary",
                location.pathname.startsWith("/services") ? "text-primary" : "text-foreground/80"
              )}
            >
              Services <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 rounded-md border border-border bg-navy-deep py-2 shadow-xl">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="block px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                    onClick={() => setServicesOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold-dark lg:inline-block"
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
        <div className="fixed inset-0 top-16 z-40 bg-navy-deep lg:hidden">
          <nav className="flex flex-col p-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "border-b border-border py-4 text-lg font-semibold transition-colors",
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Services */}
            <div className="border-b border-border py-4">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex w-full items-center justify-between text-lg font-semibold text-foreground/80"
              >
                Services <ChevronDown className={cn("h-5 w-5 transition-transform", servicesOpen && "rotate-180")} />
              </button>
              {servicesOpen && (
                <div className="mt-3 flex flex-col gap-1 pl-4">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="py-2 text-base font-medium text-foreground/70 hover:text-primary"
                      onClick={() => { setMobileOpen(false); setServicesOpen(false); }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
