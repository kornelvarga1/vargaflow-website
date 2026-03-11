import { Link } from "react-router-dom";
import { SERVICES, SITE_EMAIL } from "@/config/constants";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-extrabold tracking-tight text-background">
              VARGA <span className="text-primary">FLOW</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              Done-for-you marketing systems for contractors and tradespeople. No fluff. Just systems that work.
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
              <li><Link to="/reviews" className="text-sm text-background/60 hover:text-primary">Reviews</Link></li>
              <li><Link to="/contact" className="text-sm text-background/60 hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">Get In Touch</h4>
            <a href={`mailto:${SITE_EMAIL}`} className="text-sm text-background/60 hover:text-primary">
              {SITE_EMAIL}
            </a>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
              >
                Book A Call
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-6 text-center text-sm text-background/50">
          © {new Date().getFullYear()} Varga Flow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
