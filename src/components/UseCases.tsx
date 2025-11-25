import { ShoppingBag, User, Megaphone, Share2, Camera } from "lucide-react";

const useCases = [
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Create clean product photos that sell more.",
  },
  {
    icon: User,
    title: "Profile Pictures",
    description: "Perfect headshots for LinkedIn and social media.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Design eye-catching ads and promotional content.",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Create engaging posts that stand out.",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photo editing made simple.",
  },
];

const UseCases = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Perfect For <span className="gradient-text">Every Use</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From personal projects to professional work, our tool fits all your needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-w-[280px]"
            >
              <div className="feature-icon flex-shrink-0">
                <useCase.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
