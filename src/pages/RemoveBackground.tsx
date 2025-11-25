import { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import { removeBackground, loadImage } from "@/lib/backgroundRemoval";
import { useToast } from "@/hooks/use-toast";

const getStageMessage = (progress: number): string => {
  if (progress < 10) return "Preparing image...";
  if (progress < 30) return "Loading AI model (first time may take longer)...";
  if (progress < 50) return "Model ready, processing image...";
  if (progress < 80) return "Running background detection...";
  if (progress < 95) return "Applying transparency mask...";
  return "Finalizing...";
};

const RemoveBackground = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const { toast } = useToast();

  const handleImageSelect = useCallback(
    async (file: File) => {
      try {
        setIsProcessing(true);
        setProgress(0);
        setStage(getStageMessage(0));
        setProcessedImage(null);

        // Create URL for original image preview
        const originalUrl = URL.createObjectURL(file);
        setOriginalImage(originalUrl);

        // Load and process image
        const img = await loadImage(file);
        setProgress(5);
        setStage(getStageMessage(5));

        const resultBlob = await removeBackground(img, (p) => {
          setProgress(p);
          setStage(getStageMessage(p));
        });
        const resultUrl = URL.createObjectURL(resultBlob);
        setProcessedImage(resultUrl);

        toast({
          title: "Background removed!",
          description: "Your image is ready to download.",
        });
      } catch (error) {
        console.error("Error processing image:", error);
        toast({
          title: "Processing failed",
          description: "There was an error removing the background. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setProcessedImage(null);
    setProgress(0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Remove Background from Image | Free AI Background Remover</title>
        <meta
          name="description"
          content="Upload your image and instantly remove the background with AI. Download transparent PNG for free. Works with photos, products, and more."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Remove <span className="gradient-text">Background</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Upload any image and get a transparent PNG in seconds.
                </p>
              </div>

              {/* Upload or Preview */}
              {!originalImage ? (
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  isProcessing={isProcessing}
                  progress={progress}
                  stage={stage}
                />
              ) : (
                <ImagePreview
                  originalImage={originalImage}
                  processedImage={processedImage}
                  onReset={handleReset}
                  progress={progress}
                  stage={stage}
                />
              )}

              {/* Info cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-12">
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Browser-based</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">Free</div>
                  <div className="text-sm text-muted-foreground">No limits</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">Private</div>
                  <div className="text-sm text-muted-foreground">Images stay local</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RemoveBackground;
