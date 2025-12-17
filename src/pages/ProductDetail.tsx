import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Download, Shield, Truck, Phone, ArrowRight, Plus, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TechnicalSpecTable, Specification } from "@/components/products/TechnicalSpecTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample product data with full specifications
const productData: Record<string, {
  id: string;
  partNumber: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  inStock: boolean;
  leadTime: string;
  specifications: Specification[];
  features: string[];
  downloads: { name: string; type: string; size: string }[];
}> = {
  "1": {
    id: "1",
    partNumber: "4WE6-D62/OFEG24N9K4",
    name: "Directional Control Valve 6 Size",
    brand: "Rexroth",
    category: "Hydraulics",
    description: "4/2 and 4/3 directional spool valves with wet-pin DC or AC solenoid actuation. Size 6, compatible with CETOP 03 interface. Suitable for industrial hydraulic systems requiring precise directional control.",
    inStock: true,
    leadTime: "In Stock - Ships Same Day",
    specifications: [
      { label: "Maximum Operating Pressure", value: "315", unit: "bar" },
      { label: "Maximum Flow Rate", value: "80", unit: "L/min" },
      { label: "Solenoid Voltage", value: "24", unit: "V DC" },
      { label: "Solenoid Power", value: "20", unit: "W" },
      { label: "Valve Size", value: "NG6 / CETOP 03", unit: "" },
      { label: "Spool Type", value: "D (all ports blocked)", unit: "" },
      { label: "Mounting Pattern", value: "ISO 4401-03", unit: "" },
      { label: "Port Size", value: "G 3/8", unit: "" },
      { label: "Weight", value: "2.2", unit: "kg" },
      { label: "Operating Temperature", value: "-20 to +70", unit: "°C" },
      { label: "Ambient Temperature", value: "-40 to +50", unit: "°C" },
      { label: "Fluid Type", value: "Mineral oil, HFC, HFD", unit: "" },
      { label: "Viscosity Range", value: "2.8 to 500", unit: "mm²/s" },
      { label: "Protection Class", value: "IP65", unit: "" },
    ],
    features: [
      "High-performance wet-pin solenoid",
      "Low power consumption",
      "Fast response time",
      "Low pressure drop characteristics",
      "Interchangeable with standard CETOP valves",
      "CE certified for European markets",
    ],
    downloads: [
      { name: "Technical Datasheet", type: "PDF", size: "1.2 MB" },
      { name: "CAD Drawing (2D)", type: "DWG", size: "450 KB" },
      { name: "3D Model", type: "STEP", size: "3.8 MB" },
      { name: "Installation Manual", type: "PDF", size: "2.1 MB" },
    ],
  },
  "6": {
    id: "6",
    partNumber: "SY3140-5LZ-01",
    name: "5-Port Solenoid Valve",
    brand: "SMC",
    category: "Pneumatics",
    description: "Compact 5-port solenoid valve for pneumatic applications. Features high flow capacity in a space-saving design, ideal for automation and assembly line applications.",
    inStock: true,
    leadTime: "In Stock - Ships Same Day",
    specifications: [
      { label: "Operating Pressure Range", value: "0.15 to 0.7", unit: "MPa" },
      { label: "Port Size", value: "Rc 1/4", unit: "" },
      { label: "Effective Area", value: "20", unit: "mm²" },
      { label: "Rated Voltage", value: "24", unit: "V DC" },
      { label: "Power Consumption", value: "0.35", unit: "W" },
      { label: "Response Time (ON)", value: "18", unit: "ms" },
      { label: "Response Time (OFF)", value: "16", unit: "ms" },
      { label: "Operating Frequency", value: "10", unit: "Hz max" },
      { label: "Ambient Temperature", value: "-10 to +50", unit: "°C" },
      { label: "Fluid", value: "Air", unit: "" },
      { label: "Lubrication", value: "Not required", unit: "" },
      { label: "Protection Class", value: "IP40 equivalent", unit: "" },
      { label: "Weight", value: "90", unit: "g" },
    ],
    features: [
      "Ultra-compact design",
      "Low power consumption for energy savings",
      "Quick response time",
      "DIN rail mounting option",
      "LED indicator for operation status",
      "Manifold mounting capable",
    ],
    downloads: [
      { name: "Technical Datasheet", type: "PDF", size: "890 KB" },
      { name: "CAD Drawing", type: "DWG", size: "320 KB" },
      { name: "3D Model", type: "STEP", size: "2.1 MB" },
    ],
  },
};

// Default product for other IDs
const defaultProduct = {
  id: "default",
  partNumber: "SAMPLE-001",
  name: "Sample Industrial Component",
  brand: "Generic",
  category: "Industrial",
  description: "High-quality industrial component for various applications.",
  inStock: true,
  leadTime: "2-3 Business Days",
  specifications: [
    { label: "Maximum Pressure", value: "250", unit: "bar" },
    { label: "Flow Rate", value: "60", unit: "L/min" },
    { label: "Voltage", value: "24", unit: "V DC" },
    { label: "Operating Temperature", value: "-20 to +60", unit: "°C" },
  ],
  features: ["High reliability", "Industry standard mounting", "CE certified"],
  downloads: [{ name: "Technical Datasheet", type: "PDF", size: "1.0 MB" }],
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  
  const product = productData[id || ""] || { ...defaultProduct, id: id || "default" };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/catalog" className="text-muted-foreground hover:text-foreground">Catalog</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to={`/catalog?category=${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-foreground">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">{product.partNumber}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase rounded">
                  {product.brand}
                </span>
                <span className="text-sm text-muted-foreground">{product.category}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="font-mono text-lg text-primary font-medium mb-4">
                {product.partNumber}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </motion.div>

            {/* Product image placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-border"
            >
              <div className="text-center">
                <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Product Image</p>
              </div>
            </motion.div>

            {/* Technical Specifications Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <TechnicalSpecTable specifications={product.specifications} />
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold text-lg text-foreground mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-industrial-success mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Downloads */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold text-lg text-foreground mb-4">Technical Downloads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.downloads.map((download, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors text-left"
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {download.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {download.type} • {download.size}
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - RFQ Conversion Block */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {/* Stock status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  {product.inStock ? (
                    <>
                      <span className="w-3 h-3 rounded-full bg-industrial-success animate-pulse" />
                      <span className="font-semibold text-industrial-success">In Stock</span>
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 rounded-full bg-industrial-warning" />
                      <span className="font-semibold text-industrial-warning">Available on Order</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.leadTime}</p>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border border-border rounded-md bg-background"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* RFQ Button */}
                <Link
                  to={`/rfq?partNumber=${encodeURIComponent(product.partNumber)}&product=${encodeURIComponent(product.name)}&qty=${quantity}`}
                >
                  <Button className="w-full btn-industrial-accent rounded-md mb-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                </Link>

                <Link to="/rfq">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Multiple Parts
                  </Button>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm text-foreground">Authorized Dealer</div>
                    <div className="text-xs text-muted-foreground">Genuine {product.brand} products with warranty</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm text-foreground">Fast Shipping</div>
                    <div className="text-xs text-muted-foreground">Same-day shipping for in-stock items</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm text-foreground">Expert Support</div>
                    <div className="text-xs text-muted-foreground">Technical assistance available</div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className="text-sm text-primary-foreground/70 mb-4">
                  Our technical team is ready to assist with product selection and specifications.
                </p>
                <a href="tel:+18005550123" className="flex items-center gap-2 text-accent font-medium text-sm hover:underline">
                  <Phone className="w-4 h-4" />
                  (800) 555-0123
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
