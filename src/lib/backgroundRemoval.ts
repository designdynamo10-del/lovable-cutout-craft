import { AutoModel, AutoProcessor, RawImage, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

let modelPromise: Promise<any> | null = null;
let processorPromise: Promise<any> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = AutoModel.from_pretrained('briaai/RMBG-1.4', {
      device: 'webgpu',
    }).catch(() => {
      console.log('WebGPU not available, falling back to WASM');
      modelPromise = null;
      return AutoModel.from_pretrained('briaai/RMBG-1.4');
    });
  }
  return modelPromise;
}

async function getProcessor() {
  if (!processorPromise) {
    processorPromise = AutoProcessor.from_pretrained('briaai/RMBG-1.4');
  }
  return processorPromise;
}

export const removeBackground = async (
  imageElement: HTMLImageElement,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  try {
    onProgress?.(5);
    console.log('Starting background removal process...');

    // Load model and processor
    onProgress?.(10);
    const [model, processor] = await Promise.all([getModel(), getProcessor()]);
    onProgress?.(30);

    // Load image using RawImage
    const image = await RawImage.fromURL(imageElement.src);
    onProgress?.(40);

    // Resize if needed
    let processedImage = image;
    if (image.width > MAX_IMAGE_DIMENSION || image.height > MAX_IMAGE_DIMENSION) {
      const scale = MAX_IMAGE_DIMENSION / Math.max(image.width, image.height);
      const newWidth = Math.round(image.width * scale);
      const newHeight = Math.round(image.height * scale);
      processedImage = await image.resize(newWidth, newHeight);
      console.log(`Image resized to ${newWidth}x${newHeight}`);
    }

    // Process the image
    onProgress?.(50);
    console.log('Processing with background removal model...');
    const { pixel_values } = await processor(processedImage);
    
    onProgress?.(60);
    const { output } = await model({ input: pixel_values });
    
    onProgress?.(80);
    
    // Post-process the mask
    const maskData = output[0][0].data;
    const maskWidth = output[0][0].dims[1];
    const maskHeight = output[0][0].dims[0];

    // Create canvas for output
    const canvas = document.createElement('canvas');
    canvas.width = processedImage.width;
    canvas.height = processedImage.height;
    const ctx = canvas.getContext('2d')!;

    // Draw original image
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Resize mask to match image dimensions if needed
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        // Map coordinates to mask
        const maskX = Math.floor((x / canvas.width) * maskWidth);
        const maskY = Math.floor((y / canvas.height) * maskHeight);
        const maskIndex = maskY * maskWidth + maskX;
        
        // Get mask value and apply to alpha
        const maskValue = maskData[maskIndex];
        const pixelIndex = (y * canvas.width + x) * 4;
        data[pixelIndex + 3] = Math.round(maskValue * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);
    onProgress?.(95);

    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log('Background removed successfully');
            onProgress?.(100);
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/png',
        1.0
      );
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
