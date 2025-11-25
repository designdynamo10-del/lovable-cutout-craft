import { useState, useRef, useEffect } from "react";
import { Download, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  originalImage: string;
  processedImage: string | null;
  onReset: () => void;
  progress: number;
  stage?: string;
}

const ImagePreview = ({
  originalImage,
  processedImage,
  onReset,
  progress,
  stage = "Processing...",
}: ImagePreviewProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "background-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const transparentBg = `
    linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
    linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
    linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
  `;

  return (
    <div className="space-y-6">
      {/* Image comparison container */}
      <div
        ref={containerRef}
        className="relative aspect-video rounded-2xl overflow-hidden glass-card cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Original image (background) */}
        <div className="absolute inset-0">
          <img
            src={originalImage}
            alt="Original"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Processed image (foreground with clip) */}
        {processedImage && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              backgroundImage: transparentBg,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          >
            <img
              src={processedImage}
              alt="Processed"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Loading overlay */}
        {!processedImage && progress > 0 && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="glass-card rounded-2xl p-6 flex flex-col items-center">
              {/* Animated progress ring */}
              <div className="relative w-20 h-20 mb-4">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.26} 226`}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">{progress}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">{stage}</p>
              <p className="text-xs text-muted-foreground">Please wait...</p>
            </div>
          </div>
        )}

        {/* Slider handle */}
        {processedImage && (
          <div
            className="absolute inset-y-0 w-1 bg-primary shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full gradient-bg shadow-xl flex items-center justify-center">
              <div className="w-4 h-4 border-l-2 border-r-2 border-primary-foreground" />
            </div>
          </div>
        )}

        {/* Labels */}
        <div className="absolute bottom-4 left-4 glass-card rounded-full px-3 py-1 text-xs font-medium">
          Original
        </div>
        {processedImage && (
          <div className="absolute bottom-4 right-4 glass-card rounded-full px-3 py-1 text-xs font-medium">
            No Background
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-16 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            New Image
          </Button>
          {processedImage && (
            <Button variant="gradient" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PNG
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
