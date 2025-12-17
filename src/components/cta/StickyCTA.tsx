import { Link } from "react-router-dom";
import { Phone, FileText } from "lucide-react";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary p-3 shadow-lg z-40 md:hidden">
      <div className="flex items-center gap-3">
        <a
          href="tel:+18005550123"
          className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 rounded-md font-semibold text-sm uppercase tracking-wide"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          to="/rfq"
          className="flex-1 flex items-center justify-center gap-2 bg-primary-foreground text-primary py-3 rounded-md font-semibold text-sm uppercase tracking-wide"
        >
          <FileText className="w-4 h-4" />
          Get Quote
        </Link>
      </div>
    </div>
  );
}
