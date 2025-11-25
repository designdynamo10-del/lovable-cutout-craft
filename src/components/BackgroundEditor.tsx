import { useState, useRef } from "react";
import { Palette, Image, Sparkles, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type BackgroundType = "transparent" | "solid" | "gradient" | "image";

export interface BackgroundConfig {
  type: BackgroundType;
  value: string;
}

interface BackgroundEditorProps {
  onBackgroundChange: (config: BackgroundConfig) => void;
  currentBackground: BackgroundConfig;
}

const SOLID_COLORS = [
  "#FFFFFF", "#000000", "#F8F9FA", "#E9ECEF", 
  "#DEE2E6", "#ADB5BD", "#6C757D", "#495057",
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899",
];

const GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
  "linear-gradient(180deg, #2af598 0%, #009efd 100%)",
  "linear-gradient(180deg, #ff0844 0%, #ffb199 100%)",
];

const BackgroundEditor = ({ onBackgroundChange, currentBackground }: BackgroundEditorProps) => {
  const [customColor, setCustomColor] = useState("#FFFFFF");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorSelect = (color: string) => {
    onBackgroundChange({ type: "solid", value: color });
  };

  const handleGradientSelect = (gradient: string) => {
    onBackgroundChange({ type: "gradient", value: gradient });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onBackgroundChange({ type: "image", value: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTransparent = () => {
    onBackgroundChange({ type: "transparent", value: "" });
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        Replace Background
      </h3>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="colors" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="gradients" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Gradients
          </TabsTrigger>
          <TabsTrigger value="image" className="text-xs">
            <Image className="w-3 h-3 mr-1" />
            Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-3">
          {/* Transparent option */}
          <button
            onClick={handleTransparent}
            className={`w-full flex items-center gap-2 p-2 rounded-lg border transition-all ${
              currentBackground.type === "transparent"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div 
              className="w-8 h-8 rounded border border-border"
              style={{
                backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              }}
            />
            <span className="text-sm">Transparent</span>
            {currentBackground.type === "transparent" && (
              <Check className="w-4 h-4 text-primary ml-auto" />
            )}
          </button>

          {/* Color grid */}
          <div className="grid grid-cols-8 gap-2">
            {SOLID_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                  currentBackground.type === "solid" && currentBackground.value === color
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {/* Custom color picker */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleColorSelect(customColor)}
              className="flex-1"
            >
              Use Custom Color
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="gradients" className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {GRADIENTS.map((gradient, index) => (
              <button
                key={index}
                onClick={() => handleGradientSelect(gradient)}
                className={`w-full h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                  currentBackground.type === "gradient" && currentBackground.value === gradient
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent"
                }`}
                style={{ backgroundImage: gradient }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            variant="outline"
            className="w-full h-24 border-dashed"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Upload background image
              </span>
            </div>
          </Button>

          {currentBackground.type === "image" && currentBackground.value && (
            <div className="relative rounded-lg overflow-hidden border border-primary">
              <img
                src={currentBackground.value}
                alt="Custom background"
                className="w-full h-20 object-cover"
              />
              <div className="absolute top-1 right-1">
                <Check className="w-4 h-4 text-primary bg-background rounded-full p-0.5" />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundEditor;
