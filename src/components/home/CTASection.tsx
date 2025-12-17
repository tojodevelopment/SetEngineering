import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 gradient-industrial">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Need a Quote? We Respond in 24 Hours.
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              Submit your requirements and our technical team will provide a detailed 
              quote with availability, pricing, and lead times.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/rfq">
              <Button className="btn-industrial-accent rounded-md w-full sm:w-auto">
                <FileText className="w-4 h-4 mr-2" />
                Request Quote
              </Button>
            </Link>
            <a href="tel:+18005550123">
              <Button className="btn-industrial bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary rounded-md w-full sm:w-auto">
                <Phone className="w-4 h-4 mr-2" />
                Call (800) 555-0123
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-primary-foreground/60 text-sm"
          >
            <Clock className="w-4 h-4" />
            Mon-Fri: 7:00 AM - 6:00 PM CST • Emergency Support Available
          </motion.div>
        </div>
      </div>
    </section>
  );
}
