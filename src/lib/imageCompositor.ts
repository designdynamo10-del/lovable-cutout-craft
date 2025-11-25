import type { BackgroundConfig } from "@/components/BackgroundEditor";

export const compositeWithBackground = async (
  processedImageUrl: string,
  background: BackgroundConfig
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw background based on type
      if (background.type === "transparent") {
        // Keep transparent - just draw the image
        ctx.drawImage(img, 0, 0);
      } else if (background.type === "solid") {
        ctx.fillStyle = background.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      } else if (background.type === "gradient") {
        // Parse gradient and apply
        const gradient = parseGradient(ctx, background.value, canvas.width, canvas.height);
        if (gradient) {
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
      } else if (background.type === "image") {
        // Load background image first
        const bgImg = new Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.onload = () => {
          // Draw background image to cover canvas
          const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height);
          const scaledWidth = bgImg.width * scale;
          const scaledHeight = bgImg.height * scale;
          const x = (canvas.width - scaledWidth) / 2;
          const y = (canvas.height - scaledHeight) / 2;
          
          ctx.drawImage(bgImg, x, y, scaledWidth, scaledHeight);
          ctx.drawImage(img, 0, 0);
          
          resolve(canvas.toDataURL("image/png"));
        };
        bgImg.onerror = () => reject(new Error("Failed to load background image"));
        bgImg.src = background.value;
        return;
      }

      resolve(canvas.toDataURL("image/png"));
    };
    
    img.onerror = () => reject(new Error("Failed to load processed image"));
    img.src = processedImageUrl;
  });
};

function parseGradient(
  ctx: CanvasRenderingContext2D,
  gradientString: string,
  width: number,
  height: number
): CanvasGradient | null {
  // Parse CSS linear-gradient
  const match = gradientString.match(/linear-gradient\((\d+)deg,\s*(.+)\)/);
  if (!match) return null;

  const angle = parseInt(match[1], 10);
  const colorStops = match[2].split(/,(?![^(]*\))/);

  // Calculate gradient start and end points based on angle
  const angleRad = (angle - 90) * (Math.PI / 180);
  const centerX = width / 2;
  const centerY = height / 2;
  const diagonal = Math.sqrt(width * width + height * height) / 2;

  const startX = centerX - Math.cos(angleRad) * diagonal;
  const startY = centerY - Math.sin(angleRad) * diagonal;
  const endX = centerX + Math.cos(angleRad) * diagonal;
  const endY = centerY + Math.sin(angleRad) * diagonal;

  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

  colorStops.forEach((stop, index) => {
    const trimmed = stop.trim();
    const colorMatch = trimmed.match(/(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgba?\([^)]+\))\s*(\d+%)?/);
    
    if (colorMatch) {
      const color = colorMatch[1];
      const position = colorMatch[2] 
        ? parseInt(colorMatch[2], 10) / 100 
        : index / (colorStops.length - 1);
      gradient.addColorStop(position, color);
    }
  });

  return gradient;
}

export const downloadImage = (dataUrl: string, filename: string = "image.png") => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
