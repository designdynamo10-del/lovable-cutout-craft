import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

const ImageUploader = ({ onImageSelect, isProcessing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG, JPG, or WebP image.",
        variant: "destructive",
      });
      return false;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 20MB.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onImageSelect(file);
      }
    },
    [onImageSelect, toast]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onImageSelect(file);
      }
    },
    [onImageSelect, toast]
  );

  return (
    <div
      className={`upload-zone relative ${isDragging ? "drag-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isProcessing}
      />

      <div className="flex flex-col items-center justify-center py-12">
        {isProcessing ? (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium mb-2">Processing your image...</p>
            <p className="text-sm text-muted-foreground">This may take a few seconds</p>
          </>
        ) : (
          <>
            <div className="feature-icon w-16 h-16 mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2">Drop your image here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <Button variant="gradient">Select Image</Button>
            <p className="text-xs text-muted-foreground mt-4">
              Supports PNG, JPG, WebP • Max 20MB
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
