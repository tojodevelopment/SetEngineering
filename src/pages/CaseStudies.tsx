import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Factory, Droplets, Gauge, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: "1",
    title: "Automotive Assembly Line Modernization",
    client: "Major Automotive OEM",
    industry: "Automotive Manufacturing",
    summary: "Upgraded legacy hydraulic press systems with modern Rexroth components, achieving 35% energy savings and 50% reduction in downtime.",
    challenge: "The client's 15-year-old hydraulic press line was experiencing frequent breakdowns and excessive energy consumption, impacting production targets.",
    solution: "We designed and implemented a comprehensive modernization program including new variable-speed pump drives, modern directional valves, and integrated control systems.",
    results: [
      "35% reduction in energy consumption",
      "50% decrease in unplanned downtime",
      "ROI achieved in 14 months",
      "Extended equipment life by 10+ years",
    ],
    icon: Factory,
    category: "Modernization",
  },
  {
    id: "2",
    title: "Custom HPU for Offshore Platform",
    client: "International Energy Company",
    industry: "Oil & Gas",
    summary: "Designed and manufactured a custom marine-grade HPU for harsh offshore conditions with redundant systems and remote monitoring.",
    challenge: "The client needed a highly reliable hydraulic power unit for a deep-water platform that could operate in extreme conditions with minimal maintenance.",
    solution: "We engineered a fully redundant HPU system with marine-grade components, corrosion-resistant materials, and integrated IoT monitoring for predictive maintenance.",
    results: [
      "99.8% system availability",
      "Zero unplanned shutdowns in first year",
      "Remote diagnostics capability",
      "DNV-GL certified",
    ],
    icon: Droplets,
    category: "Custom HPU",
  },
  {
    id: "3",
    title: "Pneumatic System Efficiency Upgrade",
    client: "Food & Beverage Manufacturer",
    industry: "Food Processing",
    summary: "Redesigned pneumatic conveying system with SMC components, reducing compressed air consumption by 40% and improving hygiene compliance.",
    challenge: "High compressed air costs and concerns about hygiene compliance in the existing pneumatic transfer system for food-grade products.",
    solution: "Complete system redesign with food-grade SMC components, optimized piping layout, and smart pressure regulation to minimize air consumption.",
    results: [
      "40% reduction in compressed air costs",
      "FDA compliance achieved",
      "Improved product quality",
      "Annual savings of $180,000",
    ],
    icon: Gauge,
    category: "System Optimization",
  },
];

export default function CaseStudiesPage() {
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
              Success Stories
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Case Studies
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Real-world examples of how we've helped our clients solve complex 
              hydraulic and pneumatic challenges.
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
            <span className="text-foreground font-medium">Case Studies</span>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="container py-12 lg:py-16">
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Image/Icon area */}
                <div className="bg-secondary p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <study.icon className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-accent uppercase tracking-wider">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 p-8 lg:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-sm text-muted-foreground">{study.industry}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{study.client}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {study.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6">
                    {study.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">
                        Challenge
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-2">
                        Solution
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold text-sm text-foreground uppercase tracking-wider mb-3">
                      Key Results
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-industrial-success flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/rfq">
                    <Button className="btn-industrial-primary rounded-md">
                      Discuss Your Project
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-secondary">
        <div className="container py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Have a Similar Challenge?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help you achieve similar results. 
              Our engineering team is ready to analyze your requirements.
            </p>
            <Link to="/rfq">
              <Button className="btn-industrial-accent rounded-md">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
