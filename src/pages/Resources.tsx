import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Download, Lock, ChevronRight, Search, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const resources = [
  { id: 1, name: "Rexroth Hydraulic Valve Catalog", brand: "Rexroth", type: "catalog", size: "45 MB", gated: true },
  { id: 2, name: "SMC Pneumatic Cylinder Series", brand: "SMC", type: "catalog", size: "32 MB", gated: true },
  { id: 3, name: "Parker Hydraulic Pump Guide", brand: "Parker", type: "catalog", size: "28 MB", gated: true },
  { id: 4, name: "4WE6 Valve 2D CAD Drawing", brand: "Rexroth", type: "cad", size: "450 KB", gated: false },
  { id: 5, name: "CDQ2B Cylinder 3D Model", brand: "SMC", type: "cad", size: "2.1 MB", gated: false },
  { id: 6, name: "Hydraulic System Design Guide", brand: "SET Engineering", type: "guide", size: "8.5 MB", gated: true },
  { id: 7, name: "Pneumatic Sizing Calculator", brand: "SET Engineering", type: "tool", size: "1.2 MB", gated: true },
  { id: 8, name: "Eaton Vickers Valve Catalog", brand: "Eaton", type: "catalog", size: "38 MB", gated: true },
  { id: 9, name: "Danfoss Motor Selection Guide", brand: "Danfoss", type: "catalog", size: "22 MB", gated: true },
  { id: 10, name: "A10VSO Pump 3D Model", brand: "Rexroth", type: "cad", size: "3.8 MB", gated: false },
];

const types = [
  { value: "all", label: "All Resources" },
  { value: "catalog", label: "Product Catalogs" },
  { value: "cad", label: "CAD Files" },
  { value: "guide", label: "Technical Guides" },
  { value: "tool", label: "Tools & Calculators" },
];

const brands = ["All", "Rexroth", "SMC", "Parker", "Eaton", "Danfoss", "SET Engineering"];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [gateDialogOpen, setGateDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredResources = resources.filter((resource) => {
    if (selectedType !== "all" && resource.type !== selectedType) return false;
    if (selectedBrand !== "All" && resource.brand !== selectedBrand) return false;
    if (searchQuery && !resource.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleDownload = (resource: typeof resources[0]) => {
    if (resource.gated) {
      setSelectedResource(resource);
      setGateDialogOpen(true);
    } else {
      toast({
        title: "Download Started",
        description: `${resource.name} is downloading...`,
      });
    }
  };

  const handleGatedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Download Ready",
      description: `${selectedResource?.name} download link has been sent to your email.`,
    });
    
    setIsSubmitting(false);
    setGateDialogOpen(false);
    setSelectedResource(null);
  };

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
              Resource Center
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Technical Downloads
            </h1>
            <p className="text-lg text-primary-foreground/70">
              Access manufacturer catalogs, CAD files, and technical documentation 
              for hydraulic and pneumatic components.
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
            <span className="text-foreground font-medium">Resources</span>
          </div>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-border rounded-md bg-card text-foreground text-sm"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-border rounded-md bg-card text-foreground text-sm"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredResources.length} resources found
        </div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-accent uppercase">
                      {resource.brand}
                    </span>
                    {resource.gated && (
                      <Lock className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                    {resource.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className="capitalize">{resource.type}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                  </div>
                  <Button
                    variant={resource.gated ? "outline" : "default"}
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {resource.gated ? "Get Access" : "Download"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No resources found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Gated content dialog */}
      <Dialog open={gateDialogOpen} onOpenChange={setGateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Technical Resource</DialogTitle>
            <DialogDescription>
              Enter your details to download "{selectedResource?.name}". We'll also send you a copy via email.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGatedSubmit} className="space-y-4">
            <div>
              <Label htmlFor="gate-name">Full Name *</Label>
              <Input id="gate-name" name="name" required placeholder="John Smith" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="gate-company">Company *</Label>
              <Input id="gate-company" name="company" required placeholder="Acme Manufacturing" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="gate-email">Business Email *</Label>
              <Input id="gate-email" name="email" type="email" required placeholder="john@acme.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="gate-phone">Phone Number</Label>
              <Input id="gate-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
            </div>
            <Button type="submit" className="w-full btn-industrial-accent rounded-md" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Get Download Link
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to receive technical communications from SET Engineering.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
