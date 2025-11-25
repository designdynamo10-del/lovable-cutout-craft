import { Sparkles, Zap, Shield, ImageIcon, Download, Palette } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "1-Click Removal",
    description: "Upload your image and get instant results. No manual editing required.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Advanced machine learning precisely detects and removes backgrounds.",
  },
  {
    icon: ImageIcon,
    title: "Multiple Formats",
    description: "Supports PNG, JPG, and WebP. Download with transparent background.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your images are processed locally in your browser. Nothing is uploaded.",
  },
  {
    icon: Download,
    title: "High Quality",
    description: "Get crisp, clean cutouts perfect for professional use.",
  },
  {
    icon: Palette,
    title: "Any Subject",
    description: "Works with people, products, animals, and more.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to remove backgrounds from your images quickly and professionally.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="feature-icon mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
