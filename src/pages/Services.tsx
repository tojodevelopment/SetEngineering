import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, Factory, RefreshCcw, ArrowRight, Phone, CheckCircle, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "repair",
    name: "Repair & Maintenance",
    description: "Expert diagnostic and repair services for hydraulic and pneumatic components.",
    longDescription: "Our factory-certified technicians provide comprehensive repair and maintenance services for all major brands of hydraulic and pneumatic equipment. From emergency breakdowns to scheduled maintenance, we ensure your systems operate at peak efficiency.",
    icon: Wrench,
    features: [
      "24-48 hour diagnostic turnaround",
      "OEM replacement parts",
      "Full warranty on all repairs",
      "Preventive maintenance programs",
      "On-site service available",
      "Emergency repair hotline",
    ],
    image: "/placeholder.svg",
  },
  {
    id: "hpu",
    name: "Custom HPU Manufacturing",
    description: "Design and build custom Hydraulic Power Units tailored to your specifications.",
    longDescription: "We design and manufacture custom Hydraulic Power Units (HPUs) for industrial, mobile, and marine applications. Our engineering team works with you from concept through commissioning to deliver systems that meet your exact requirements.",
    icon: Factory,
    features: [
      "Custom engineering design",
      "Premium component selection",
      "Complete system integration",
      "Testing and certification",
      "Installation support",
      "Ongoing maintenance programs",
    ],
    image: "/placeholder.svg",
  },
  {
    id: "modernization",
    name: "System Modernization",
    description: "Upgrade aging systems with modern, efficient components.",
    longDescription: "Transform your legacy hydraulic and pneumatic systems with modern technology. Our modernization services improve efficiency, reduce energy consumption, and extend equipment life while minimizing downtime.",
    icon: RefreshCcw,
    features: [
      "System efficiency audit",
      "Component upgrade planning",
      "Energy savings analysis",
      "Phased implementation",
      "Operator training included",
      "Performance guarantees",
    ],
    image: "/placeholder.svg",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary">
        <div className="container py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="text-accent text-sm font-semibold uppercase tracking-wider mb-4 block">
              Technical Services
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Beyond Parts Supply
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Complete technical services from factory-trained engineers. 
              From emergency repairs to custom system design.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Services</span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container py-12 lg:py-16">
        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {service.name}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {service.longDescription}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-industrial-success mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/rfq">
                    <Button className="btn-industrial-accent rounded-md">
                      Request Service Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <a href="tel:+18005550123">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call for Emergency
                    </Button>
                  </a>
                </div>
              </div>

              {/* Image placeholder */}
              <div className={`aspect-video bg-secondary rounded-lg border border-border flex items-center justify-center ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}>
                <div className="text-center">
                  <service.icon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">{service.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-secondary">
        <div className="container py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Technical Support?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our team of certified engineers is available to help with your hydraulic 
              and pneumatic system needs. Contact us for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/rfq">
                <Button className="btn-industrial-primary rounded-md">
                  Request Consultation
                </Button>
              </Link>
              <a href="tel:+18005550123">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  (800) 555-0123
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
