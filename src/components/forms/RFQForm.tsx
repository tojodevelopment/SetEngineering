import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface PartLine {
  id: string;
  partNumber: string;
  quantity: string;
  notes: string;
}

interface RFQFormProps {
  prefilledPartNumber?: string;
  prefilledProductName?: string;
}

export function RFQForm({ prefilledPartNumber, prefilledProductName }: RFQFormProps) {
  const [partLines, setPartLines] = useState<PartLine[]>([
    { id: "1", partNumber: prefilledPartNumber || "", quantity: "1", notes: prefilledProductName || "" },
  ]);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addPartLine = () => {
    setPartLines([
      ...partLines,
      { id: Date.now().toString(), partNumber: "", quantity: "1", notes: "" },
    ]);
  };

  const removePartLine = (id: string) => {
    if (partLines.length > 1) {
      setPartLines(partLines.filter((line) => line.id !== id));
    }
  };

  const updatePartLine = (id: string, field: keyof PartLine, value: string) => {
    setPartLines(
      partLines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Quote Request Submitted",
      description: "Our team will review your request and respond within 24 hours.",
    });

    setIsSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            1
          </span>
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" required placeholder="John Smith" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="company">Company Name *</Label>
            <Input id="company" name="company" required placeholder="Acme Manufacturing" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required placeholder="john@acme.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" className="mt-1" />
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            2
          </span>
          Parts Required
        </h3>
        <div className="space-y-4">
          {partLines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-12 gap-3 items-start p-4 bg-secondary rounded-lg"
            >
              <div className="col-span-12 md:col-span-4">
                <Label className="text-xs text-muted-foreground">Part Number *</Label>
                <Input
                  value={line.partNumber}
                  onChange={(e) => updatePartLine(line.id, "partNumber", e.target.value)}
                  required
                  placeholder="4WE6-D62/OFEG24N9K4"
                  className="mt-1 font-mono text-sm"
                />
              </div>
              <div className="col-span-6 md:col-span-2">
                <Label className="text-xs text-muted-foreground">Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  value={line.quantity}
                  onChange={(e) => updatePartLine(line.id, "quantity", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div className="col-span-6 md:col-span-5">
                <Label className="text-xs text-muted-foreground">Notes (optional)</Label>
                <Input
                  value={line.notes}
                  onChange={(e) => updatePartLine(line.id, "notes", e.target.value)}
                  placeholder="Description or alternate part"
                  className="mt-1"
                />
              </div>
              <div className="col-span-12 md:col-span-1 flex md:justify-end md:pt-6">
                {partLines.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePartLine(line.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addPartLine} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Part
        </Button>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            3
          </span>
          Attachments (Optional)
        </h3>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.dwg,.dxf,.jpg,.jpeg,.png,.gif"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Drag & drop files or <span className="text-primary underline">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Schematics, photos, CAD files (PDF, DOC, DWG, DXF, JPG, PNG)
            </p>
          </label>
        </div>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 p-3 bg-secondary rounded-md"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="text-destructive hover:text-destructive flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            4
          </span>
          Project Details
        </h3>
        <div>
          <Label htmlFor="project-notes">Additional Information</Label>
          <Textarea
            id="project-notes"
            name="projectNotes"
            rows={4}
            placeholder="Please describe your project requirements, delivery timeline, or any other details that would help us provide an accurate quote..."
            className="mt-1"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            We typically respond within 24 hours. For urgent requests, please call us directly.
          </span>
        </div>
        <Button
          type="submit"
          className="btn-industrial-accent rounded-md w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Quote Request
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}
