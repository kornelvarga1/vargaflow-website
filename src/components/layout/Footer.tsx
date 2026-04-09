import { Link } from "react-router-dom";
import { SERVICES, SITE_EMAIL } from "@/config/constants";
import vfIcon from "@/assets/vf-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-primary/40 bg-foreground">
      <div className="container py-12 pb-28 lg:py-16 lg:pb-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={vfIcon} alt="VF" className="h-9 w-9 rounded-md" />
              <span className="text-xl font-bold tracking-tight text-white/90">VargaFlow</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              Done-for-you marketing systems for contractors. Built lean, run personally, no contracts ever.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm text-background/60 transition-colors hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-background/60 hover:text-primary">About</Link></li>
              <li><Link to="/pricing" className="text-sm text-background/60 hover:text-primary">Pricing</Link></li>
              <li><Link to="/contact" className="text-sm text-background/60 hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Get In Touch</h4>
            <a href={`mailto:${SITE_EMAIL}`} className="text-sm text-background/60 hover:text-primary">
              {SITE_EMAIL}
            </a>
            <p className="mt-3 text-xs text-background/40">First clients get free setup.<br />Pay only if you're satisfied.</p>
            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
              >
                Get a Free Strategy Call
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-6 flex flex-col items-center gap-2 text-center text-sm text-background/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Varga Flow. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
