import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Factory, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Repair & Maintenance",
    description:
      "Expert diagnostic and repair services for hydraulic and pneumatic components. Factory-certified technicians with fast turnaround times.",
    icon: Wrench,
    href: "/services/repair",
    features: ["24-48h Diagnostics", "OEM Parts", "Warranty Coverage"],
  },
  {
    name: "Custom HPU Manufacturing",
    description:
      "Design and build custom Hydraulic Power Units tailored to your exact specifications. From concept to commissioning.",
    icon: Factory,
    href: "/services/hpu",
    features: ["Custom Design", "Full Integration", "On-Site Support"],
  },
  {
    name: "System Modernization",
    description:
      "Upgrade aging hydraulic and pneumatic systems with modern, efficient components. Improve performance and reduce downtime.",
    icon: RefreshCcw,
    href: "/services/modernization",
    features: ["Efficiency Audit", "Component Upgrade", "Training Included"],
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
            Technical Services
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Beyond Parts Supply
          </h2>
          <p className="text-muted-foreground">
            Complete technical services from our factory-trained engineers. 
            From emergency repairs to custom system design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.href}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
