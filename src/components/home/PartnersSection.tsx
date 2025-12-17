import { motion } from "framer-motion";

const partners = [
  { name: "Bosch Rexroth", logo: "REXROTH" },
  { name: "SMC Corporation", logo: "SMC" },
  { name: "Parker Hannifin", logo: "PARKER" },
  { name: "Eaton", logo: "EATON" },
  { name: "Danfoss", logo: "DANFOSS" },
  { name: "Moog", logo: "MOOG" },
];

export function PartnersSection() {
  return (
    <section className="py-12 bg-secondary border-y border-border">
      <div className="container">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Authorized Dealer & Service Partner
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div className="px-6 py-3 bg-card rounded-md border border-border">
                <span className="text-lg font-bold tracking-wider text-muted-foreground/60 hover:text-primary transition-colors">
                  {partner.logo}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
