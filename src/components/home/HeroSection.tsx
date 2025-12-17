import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartNumberSearch } from "@/components/search/PartNumberSearch";

export function HeroSection() {
  return (
    <section className="relative bg-industrial-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-industrial-dark via-primary to-industrial-dark opacity-90" />
      
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-8"
          >
            <Shield className="w-4 h-4" />
            Authorized Rexroth & SMC Dealer
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Precision Hydraulic &{" "}
            <span className="text-accent">Pneumatic Components</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto"
          >
            Your trusted technical partner for industrial fluid power solutions. 
            Expert support, extensive inventory, and fast delivery.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <PartNumberSearch variant="hero" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/catalog">
              <Button className="btn-industrial bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-md w-full sm:w-auto">
                Browse Catalog
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/rfq">
              <Button className="btn-industrial-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-md w-full sm:w-auto">
                Request Quote
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-primary-foreground/10"
          >
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mx-auto mb-3">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">25+</div>
              <div className="text-sm text-primary-foreground/60">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mx-auto mb-3">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">24h</div>
              <div className="text-sm text-primary-foreground/60">Quote Response</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mx-auto mb-3">
                <Wrench className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">50k+</div>
              <div className="text-sm text-primary-foreground/60">Parts in Stock</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
