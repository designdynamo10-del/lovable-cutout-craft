import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 hero-gradient overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered • Instant Results
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Remove Background{" "}
            <span className="gradient-text">in 1 Click</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
            Upload any photo and our AI instantly removes the background.
            Get professional cutouts in seconds — no design skills needed.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
            <Link to="/remove">
              <Button variant="hero" size="xl" className="group">
                <Upload className="w-5 h-5" />
                Upload Image
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Preview image */}
          <div className="relative max-w-3xl mx-auto animate-slide-up">
            <div className="glass-card rounded-2xl p-4 shadow-2xl">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                {/* Before/After preview mockup */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-muted-foreground/20" />
                        <div className="text-sm font-medium text-muted-foreground">Original</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
                          linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
                          linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
                        `,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    >
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/30" />
                        <div className="text-sm font-medium text-muted-foreground">Background Removed</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Slider indicator */}
                <div className="absolute inset-y-0 left-1/2 w-1 bg-primary/50 -translate-x-1/2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full gradient-bg shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 border-l-2 border-r-2 border-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-muted-foreground">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5s</div>
                <div className="text-sm text-muted-foreground">Avg. Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">HD</div>
                <div className="text-sm text-muted-foreground">Quality Output</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
