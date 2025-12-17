import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Wind, Settings, Gauge, Cylinder, CircuitBoard } from "lucide-react";

const categories = [
  {
    name: "Hydraulic Valves",
    description: "Directional, pressure, and flow control valves",
    icon: Droplets,
    href: "/catalog?category=hydraulics&type=valves",
    count: "2,500+",
  },
  {
    name: "Hydraulic Pumps",
    description: "Axial piston, gear, and vane pumps",
    icon: Settings,
    href: "/catalog?category=hydraulics&type=pumps",
    count: "800+",
  },
  {
    name: "Hydraulic Motors",
    description: "High-torque motors for heavy-duty applications",
    icon: Gauge,
    href: "/catalog?category=hydraulics&type=motors",
    count: "450+",
  },
  {
    name: "Pneumatic Cylinders",
    description: "Compact, standard, and guided cylinders",
    icon: Cylinder,
    href: "/catalog?category=pneumatics&type=cylinders",
    count: "3,200+",
  },
  {
    name: "Pneumatic Valves",
    description: "Solenoid, manual, and process valves",
    icon: Wind,
    href: "/catalog?category=pneumatics&type=valves",
    count: "4,100+",
  },
  {
    name: "Control Systems",
    description: "PLCs, HMIs, and motion controllers",
    icon: CircuitBoard,
    href: "/catalog?category=controls",
    count: "600+",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Product Categories
          </h2>
          <p className="text-muted-foreground">
            Extensive inventory of high-precision industrial components from leading manufacturers. 
            Find exactly what you need with our technical part number search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={category.href}
                className="block p-6 bg-card border border-border rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <category.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                    {category.count}
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
                  View Products
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
