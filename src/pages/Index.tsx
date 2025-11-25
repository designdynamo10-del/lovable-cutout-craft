import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BgRemover - Remove Background from Images in 1 Click | Free AI Tool</title>
        <meta
          name="description"
          content="Remove background from any image instantly with AI. Free, fast, and works entirely in your browser. No sign-up required. Perfect for e-commerce, profile photos, and marketing."
        />
        <meta name="keywords" content="remove background, background remover, AI image editing, transparent background, free tool" />
        <link rel="canonical" href="https://bgremover.app" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <UseCases />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
