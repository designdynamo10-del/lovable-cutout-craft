import { Upload, Cpu, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Image",
    description: "Drag & drop or click to upload any JPG, PNG, or WebP image.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Processes",
    description: "Our AI analyzes your image and precisely removes the background.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download Result",
    description: "Get your transparent PNG instantly. Ready for any project.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to remove any background from your photos.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/30" />

            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-bg mb-6 relative z-10 shadow-xl">
                  <step.icon className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="glass-card rounded-full px-3 py-1 inline-block mb-4">
                  <span className="text-sm font-bold gradient-text">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
