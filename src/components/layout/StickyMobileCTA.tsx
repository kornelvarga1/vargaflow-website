import { Link } from "react-router-dom";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-navy-deep p-3 lg:hidden">
      <Link
        to="/contact"
        className="block w-full rounded-md bg-primary py-3 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-gold-dark"
      >
        Book A Call
      </Link>
    </div>
  );
};

export default StickyMobileCTA;
