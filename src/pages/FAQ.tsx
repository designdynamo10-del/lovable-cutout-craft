import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is BgRemover really free?",
    a: "Yes! BgRemover is completely free to use with no limits. There are no hidden charges, watermarks, or usage caps.",
  },
  {
    q: "How does the background removal work?",
    a: "We use an advanced AI model (RMBG-1.4) that runs entirely in your browser. The model detects the foreground subject and creates a precise transparency mask — no server upload needed.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All image processing happens locally in your browser using WebGPU or WebAssembly. Your images never leave your device unless you choose to save them to your account.",
  },
  {
    q: "What image formats are supported?",
    a: "BgRemover supports PNG, JPG/JPEG, and WebP images up to 20 MB. The output is always a high-quality transparent PNG.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to remove backgrounds. However, creating a free account lets you save your processed images and access them from any device.",
  },
  {
    q: "Can I use BgRemover for commercial projects?",
    a: "Absolutely. You're free to use any images processed with BgRemover for personal or commercial purposes — e-commerce, marketing, social media, and more.",
  },
  {
    q: "What browsers are supported?",
    a: "BgRemover works best in modern browsers like Chrome, Edge, and Firefox. For the fastest processing, we recommend a browser with WebGPU support (Chrome 113+).",
  },
  {
    q: "Why is the first image slower to process?",
    a: "On your first use, the AI model needs to be downloaded and cached in your browser (~40 MB). Subsequent images process much faster since the model is already cached.",
  },
  {
    q: "Can I change the background after removal?",
    a: "Yes! After removing the background, you can add a solid color, gradient, or custom image as a new background using our built-in background editor.",
  },
  {
    q: "Is there an API available?",
    a: "We're working on a public API for developers. Check our API page for updates and early access.",
  },
];

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | BgRemover - Frequently Asked Questions</title>
        <meta
          name="description"
          content="Find answers to common questions about BgRemover's free AI background removal tool. Learn about privacy, supported formats, and more."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Everything you need to know about BgRemover
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="glass-card rounded-xl px-6 border"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
