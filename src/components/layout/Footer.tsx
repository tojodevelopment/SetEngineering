import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Hydraulic Valves", href: "/catalog?category=hydraulics&type=valves" },
    { name: "Hydraulic Pumps", href: "/catalog?category=hydraulics&type=pumps" },
    { name: "Pneumatic Cylinders", href: "/catalog?category=pneumatics&type=cylinders" },
    { name: "Pneumatic Valves", href: "/catalog?category=pneumatics&type=valves" },
    { name: "View All Products", href: "/catalog" },
  ],
  services: [
    { name: "Repair & Maintenance", href: "/services/repair" },
    { name: "Custom HPU Manufacturing", href: "/services/hpu" },
    { name: "System Modernization", href: "/services/modernization" },
    { name: "Technical Consultation", href: "/services" },
  ],
  resources: [
    { name: "Technical Downloads", href: "/resources" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Product Catalogs", href: "/resources?type=catalogs" },
    { name: "CAD Files", href: "/resources?type=cad" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Request Quote", href: "/rfq" },
    { name: "Careers", href: "/careers" },
  ],
};

const partners = [
  "Bosch Rexroth",
  "SMC Corporation",
  "Parker Hannifin",
  "Eaton",
  "Danfoss",
];

export function Footer() {
  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      {/* Main footer */}
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">OT</span>
              </div>
              <div>
                <div className="font-bold text-xl">SET Engineering</div>
                <div className="text-xs text-primary-foreground/60 uppercase tracking-wider">
                  Industrial Solutions
                </div>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs">
              Your trusted partner for high-precision hydraulic and pneumatic
              components. Authorized dealer for leading manufacturers.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-4 h-4 text-accent" />
                +1 (800) 555-0123
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-4 h-4 text-accent" />
                sales@setengineering.com
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-4 h-4 text-accent" />
                Houston, TX 77001
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <Clock className="w-4 h-4 text-accent" />
                Mon-Fri: 7AM - 6PM CST
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-primary-foreground/50">
              Authorized Dealer For
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-sm font-medium text-primary-foreground/40"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
          <div>© {new Date().getFullYear()} SET Engineering Industrial Solutions. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
