import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartNumberSearch } from "@/components/search/PartNumberSearch";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/catalog",
    children: [
      { name: "Hydraulics", href: "/catalog?category=hydraulics" },
      { name: "Pneumatics", href: "/catalog?category=pneumatics" },
      { name: "All Products", href: "/catalog" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Repair & Maintenance", href: "/services/repair" },
      { name: "Custom HPU Manufacturing", href: "/services/hpu" },
      { name: "System Modernization", href: "/services/modernization" },
    ],
  },
  { name: "Resources", href: "/resources" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (800) 555-0123
            </span>
            <span className="text-primary-foreground/70">
              Mon-Fri: 7:00 AM - 6:00 PM CST
            </span>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs md:text-sm font-medium text-accent">
              Authorized Rexroth & SMC Dealer
            </span>
            <Link
              to="/rfq"
              className="hidden md:inline-flex text-xs uppercase tracking-wider hover:text-accent transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">OT</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg lg:text-xl text-foreground">OILTECH</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Industrial Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors underline-industrial ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-56 bg-card border border-border rounded-md shadow-lg py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-foreground"
            >
              <Search className="w-5 h-5" />
            </Button>

            <Link to="/rfq" className="hidden md:block">
              <Button className="btn-industrial-accent rounded-md">
                Get Quote
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="py-4">
                <PartNumberSearch onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-industrial-dark/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-card z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-bold text-lg">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="p-4">
                {navigation.map((item) => (
                  <div key={item.name} className="mb-2">
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-md font-medium ${
                        location.pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-border">
                <Link to="/rfq" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full btn-industrial-accent rounded-md">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
