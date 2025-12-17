import { motion } from "framer-motion";

export interface Specification {
  label: string;
  value: string;
  unit?: string;
}

interface TechnicalSpecTableProps {
  specifications: Specification[];
  title?: string;
}

export function TechnicalSpecTable({ specifications, title = "Technical Specifications" }: TechnicalSpecTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg overflow-hidden border border-border"
    >
      <div className="bg-primary px-4 py-3">
        <h3 className="text-primary-foreground font-semibold text-sm uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={spec.label}
                className={`border-b border-spec-border last:border-0 ${
                  index % 2 === 1 ? "bg-spec-row-alt" : "bg-card"
                } hover:bg-accent/5 transition-colors`}
              >
                <td className="py-3 px-4 text-sm font-medium text-foreground w-1/2">
                  {spec.label}
                </td>
                <td className="py-3 px-4 text-sm font-mono text-muted-foreground">
                  {spec.value}
                  {spec.unit && <span className="text-muted-foreground/60 ml-1">{spec.unit}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
