import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  image?: string;
  inStock?: boolean;
  index?: number;
}

export function ProductCard({
  id,
  partNumber,
  name,
  brand,
  category,
  image,
  inStock = true,
  index = 0,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-industrial group"
    >
      <Link to={`/product/${id}`} className="block">
        {/* Image */}
        <div className="aspect-square bg-secondary relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 bg-muted rounded-md" />
            </div>
          )}
          {inStock && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-industrial-success/10 text-industrial-success px-2 py-1 rounded text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              In Stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-accent uppercase tracking-wide">
              {brand}
            </span>
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>
          <div className="font-mono text-sm font-medium text-primary mb-1 truncate">
            {partNumber}
          </div>
          <h3 className="text-sm text-foreground line-clamp-2 mb-4">{name}</h3>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
