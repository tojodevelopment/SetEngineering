import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { RFQForm } from "@/components/forms/RFQForm";
import { Phone, Mail, Clock, MapPin, Shield, CheckCircle } from "lucide-react";

export default function RFQPage() {
  const [searchParams] = useSearchParams();
  const prefilledPartNumber = searchParams.get("partNumber") || "";
  const prefilledProduct = searchParams.get("product") || "";

  return (
    <Layout>
      <div className="bg-primary">
        <div className="container py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Request for Quote
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Submit your parts requirements and our technical team will provide 
              a detailed quote within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
              <RFQForm
                prefilledPartNumber={prefilledPartNumber}
                prefilledProductName={prefilledProduct}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Why choose us */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg text-foreground mb-4">
                  Why Request a Quote?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Competitive pricing on all orders",
                    "Volume discounts available",
                    "Expert technical consultation",
                    "Fast 24-hour response time",
                    "Genuine OEM parts guaranteed",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-industrial-success mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg text-foreground mb-4">
                  Contact Us Directly
                </h3>
                <div className="space-y-4">
                  <a href="tel:+18005550123" className="flex items-center gap-3 text-sm text-foreground hover:text-primary">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">+1 (800) 555-0123</div>
                      <div className="text-muted-foreground text-xs">Toll-free</div>
                    </div>
                  </a>
                  <a href="mailto:sales@setengineering.com" className="flex items-center gap-3 text-sm text-foreground hover:text-primary">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">sales@setengineering.com</div>
                      <div className="text-muted-foreground text-xs">Email us</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Mon-Fri: 7AM - 6PM CST</div>
                      <div className="text-muted-foreground text-xs">Business hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Houston, TX 77001</div>
                      <div className="text-muted-foreground text-xs">Headquarters</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary text-primary-foreground rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-accent" />
                  <span className="font-semibold">Authorized Dealer</span>
                </div>
                <p className="text-sm text-primary-foreground/70">
                  We are an authorized dealer for Bosch Rexroth, SMC, Parker, and other 
                  leading manufacturers. All products come with full warranty.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
