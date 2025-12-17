import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Grid, List, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Sample product data
const products = [
  { id: "1", partNumber: "4WE6-D62/OFEG24N9K4", name: "Directional Control Valve 6 Size", brand: "Rexroth", category: "Hydraulics", type: "valves", inStock: true },
  { id: "2", partNumber: "4WE10-D33/CG24N9K4", name: "Directional Control Valve 10 Size", brand: "Rexroth", category: "Hydraulics", type: "valves", inStock: true },
  { id: "3", partNumber: "DBDS6K1X/315", name: "Pressure Relief Valve", brand: "Rexroth", category: "Hydraulics", type: "valves", inStock: true },
  { id: "4", partNumber: "A10VSO28DFR1/31R", name: "Axial Piston Variable Pump", brand: "Rexroth", category: "Hydraulics", type: "pumps", inStock: false },
  { id: "5", partNumber: "A10VSO45DFR1/31R", name: "Axial Piston Variable Pump 45cc", brand: "Rexroth", category: "Hydraulics", type: "pumps", inStock: true },
  { id: "6", partNumber: "SY3140-5LZ-01", name: "5-Port Solenoid Valve", brand: "SMC", category: "Pneumatics", type: "valves", inStock: true },
  { id: "7", partNumber: "CDQ2B32-50DZ", name: "Compact Cylinder 32mm Bore", brand: "SMC", category: "Pneumatics", type: "cylinders", inStock: true },
  { id: "8", partNumber: "VQ1101N-5", name: "Direct Operated Solenoid Valve", brand: "SMC", category: "Pneumatics", type: "valves", inStock: true },
  { id: "9", partNumber: "MXS16-50AS", name: "Slide Table Cylinder", brand: "SMC", category: "Pneumatics", type: "cylinders", inStock: true },
  { id: "10", partNumber: "CDQ2A50-100DZ", name: "Compact Cylinder 50mm Bore", brand: "SMC", category: "Pneumatics", type: "cylinders", inStock: false },
  { id: "11", partNumber: "D1VW020BNJW", name: "Directional Control Valve", brand: "Parker", category: "Hydraulics", type: "valves", inStock: true },
  { id: "12", partNumber: "PGP511A0110CS1D4NJ7J5B1B1", name: "Gear Pump", brand: "Parker", category: "Hydraulics", type: "pumps", inStock: true },
];

const categories = ["All", "Hydraulics", "Pneumatics"];
const brands = ["Rexroth", "SMC", "Parker", "Eaton", "Danfoss"];
const types = ["valves", "pumps", "cylinders", "motors"];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const selectedTypes = searchParams.get("types")?.split(",").filter(Boolean) || [];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (categoryParam !== "all" && product.category.toLowerCase() !== categoryParam.toLowerCase()) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.partNumber.toLowerCase().includes(query) ||
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [categoryParam, searchQuery, selectedBrands, selectedTypes]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.get(key)?.split(",").filter(Boolean) || [];
    
    if (current.includes(value)) {
      const newValue = current.filter((v) => v !== value);
      if (newValue.length > 0) {
        params.set(key, newValue.join(","));
      } else {
        params.delete(key);
      }
    } else {
      params.set(key, [...current, value].join(","));
    }
    setSearchParams(params);
  };

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? "" : "sticky top-24"}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h3>
        {mobile && (
          <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-foreground mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateFilter("category", cat.toLowerCase())}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                (cat.toLowerCase() === categoryParam) || (cat === "All" && categoryParam === "all")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-foreground mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleArrayFilter("brands", brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Types */}
      <div className="mb-6">
        <h4 className="font-medium text-sm text-foreground mb-3">Product Type</h4>
        <div className="space-y-2">
          {types.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter("types", type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer capitalize">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {(selectedBrands.length > 0 || selectedTypes.length > 0 || searchQuery) && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setSearchParams({})}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Product Catalog</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {categoryParam === "all" ? "All Products" : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredProducts.length} products found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                {/* View mode */}
                <div className="flex items-center border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-secondary"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} {...product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={() => setSearchParams({})}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-industrial-dark/50 z-50 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="absolute top-0 left-0 bottom-0 w-80 bg-card p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSidebar mobile />
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
