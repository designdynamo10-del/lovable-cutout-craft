import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Image, Trash2, Download, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SavedImage {
  id: string;
  original_url: string;
  processed_url: string;
  background_type: string;
  title: string | null;
  created_at: string;
}

const Dashboard = () => {
  const [images, setImages] = useState<SavedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchImages();
    }
  }, [user]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_images")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast({
        title: "Error",
        description: "Failed to load your images.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    setDeleting(imageId);
    try {
      const { error } = await supabase
        .from("saved_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      setImages(images.filter((img) => img.id !== imageId));
      toast({
        title: "Image deleted",
        description: "The image has been removed from your collection.",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (url: string, title: string | null) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = title || "processed-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Images | BgRemover</title>
        <meta name="description" content="View and manage your saved background-removed images." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Images</h1>
                  <p className="text-muted-foreground">
                    {images.length} saved {images.length === 1 ? "image" : "images"}
                  </p>
                </div>
                <Button variant="gradient" onClick={() => navigate("/remove")}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Image
                </Button>
              </div>

              {/* Images Grid */}
              {images.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-medium mb-2">No images yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Start by removing backgrounds from your images
                  </p>
                  <Button variant="gradient" onClick={() => navigate("/remove")}>
                    Remove Background
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="glass-card rounded-xl overflow-hidden group"
                    >
                      {/* Image Preview */}
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={image.processed_url}
                          alt={image.title || "Processed image"}
                          className="w-full h-full object-contain"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                              linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                              linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                              linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
                            `,
                            backgroundSize: "16px 16px",
                            backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                          }}
                        />
                        
                        {/* Overlay actions */}
                        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleDownload(image.processed_url, image.title)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image.id)}
                            disabled={deleting === image.id}
                          >
                            {deleting === image.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Image Info */}
                      <div className="p-4">
                        <p className="text-sm font-medium truncate">
                          {image.title || "Untitled"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(image.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
