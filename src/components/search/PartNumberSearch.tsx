import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Sample product data for search
const sampleProducts = [
  { id: "1", partNumber: "4WE6-D62/OFEG24N9K4", name: "Directional Control Valve", brand: "Rexroth", category: "Hydraulics" },
  { id: "2", partNumber: "4WE10-D33/CG24N9K4", name: "Directional Control Valve", brand: "Rexroth", category: "Hydraulics" },
  { id: "3", partNumber: "DBDS6K1X/315", name: "Pressure Relief Valve", brand: "Rexroth", category: "Hydraulics" },
  { id: "4", partNumber: "A10VSO28DFR1/31R", name: "Axial Piston Pump", brand: "Rexroth", category: "Hydraulics" },
  { id: "5", partNumber: "SY3140-5LZ-01", name: "Solenoid Valve", brand: "SMC", category: "Pneumatics" },
  { id: "6", partNumber: "CDQ2B32-50DZ", name: "Compact Cylinder", brand: "SMC", category: "Pneumatics" },
  { id: "7", partNumber: "VQ1101N-5", name: "Solenoid Valve", brand: "SMC", category: "Pneumatics" },
  { id: "8", partNumber: "MXS16-50AS", name: "Slide Table Cylinder", brand: "SMC", category: "Pneumatics" },
];

interface PartNumberSearchProps {
  onClose?: () => void;
  variant?: "default" | "hero";
}

export function PartNumberSearch({ onClose, variant = "default" }: PartNumberSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof sampleProducts>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      // Prioritize exact part number matches
      const searchQuery = query.toUpperCase();
      const filtered = sampleProducts.filter(
        (product) =>
          product.partNumber.toUpperCase().includes(searchQuery) ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      );
      
      // Sort: exact part number matches first
      filtered.sort((a, b) => {
        const aExact = a.partNumber.toUpperCase().startsWith(searchQuery);
        const bExact = b.partNumber.toUpperCase().startsWith(searchQuery);
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return 0;
      });
      
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (product: typeof sampleProducts[0]) => {
    navigate(`/product/${product.id}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/catalog?search=${encodeURIComponent(query)}`);
      setQuery("");
      setIsOpen(false);
      onClose?.();
    }
  };

  const isHero = variant === "hero";

  return (
    <div className="relative w-full">
      <div className={`relative flex items-center gap-2 ${isHero ? "max-w-2xl mx-auto" : ""}`}>
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search by part number (e.g., 4WE6-D62/OFEG24N9K4)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className={`pl-12 pr-10 font-mono ${
              isHero
                ? "h-14 text-base rounded-md border-2 border-border focus:border-accent bg-card"
                : "h-11 text-sm rounded-md"
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          className={`btn-industrial-primary rounded-md ${isHero ? "h-14 px-8" : "h-11"}`}
        >
          Search
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden ${
              isHero ? "max-w-2xl mx-auto" : ""
            }`}
          >
            <div className="p-2 border-b border-border bg-secondary">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </span>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => handleSelect(product)}
                    className="w-full flex items-start gap-4 p-4 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm font-medium text-primary">
                        {product.partNumber}
                      </div>
                      <div className="text-sm text-foreground mt-1">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {product.brand}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-1" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-3 border-t border-border bg-secondary">
              <button
                onClick={handleSearch}
                className="text-sm text-primary hover:text-accent transition-colors font-medium"
              >
                View all results for "{query}"
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && results.length === 0 && query.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-full left-0 right-0 mt-2 p-6 bg-card border border-border rounded-md shadow-lg z-50 text-center ${
            isHero ? "max-w-2xl mx-auto" : ""
          }`}
        >
          <p className="text-muted-foreground">No products found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try searching with a different part number or{" "}
            <button
              onClick={() => navigate("/rfq")}
              className="text-primary hover:text-accent underline"
            >
              request a quote
            </button>
          </p>
        </motion.div>
      )}
    </div>
  );
}
