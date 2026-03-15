import { Helmet } from "react-helmet";
import { Code, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: "You're on the list!", description: "We'll notify you when the API launches." });
    setEmail("");
  };

  return (
    <>
      <Helmet>
        <title>API | BgRemover - Background Removal API (Coming Soon)</title>
        <meta name="description" content="BgRemover API for developers. Integrate AI background removal into your apps. Coming soon — sign up for early access." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Coming Soon
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                Background Removal <span className="gradient-text">API</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Integrate AI-powered background removal directly into your apps, workflows, and products. Simple REST API with lightning-fast response times.
              </p>

              {/* Features preview */}
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="feature-icon w-12 h-12 mx-auto mb-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Fast</h3>
                  <p className="text-sm text-muted-foreground">Sub-second processing for most images</p>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="feature-icon w-12 h-12 mx-auto mb-3">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Simple</h3>
                  <p className="text-sm text-muted-foreground">One endpoint, one API call, done</p>
                </div>
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="feature-icon w-12 h-12 mx-auto mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">Secure</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade security & encryption</p>
                </div>
              </div>

              {/* Code preview */}
              <div className="glass-card rounded-xl p-6 text-left mb-12 overflow-x-auto">
                <p className="text-xs text-muted-foreground mb-3 font-mono">// Example request</p>
                <pre className="text-sm font-mono text-foreground leading-relaxed">
{`curl -X POST https://api.bgremover.app/v1/remove \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg" \\
  -o result.png`}
                </pre>
              </div>

              {/* Waitlist */}
              <div className="glass-card rounded-xl p-8">
                <h2 className="text-xl font-bold mb-2">Get early access</h2>
                <p className="text-muted-foreground mb-6">
                  Be the first to know when the API launches.
                </p>
                <form onSubmit={handleNotify} className="flex gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="flex-1"
                  />
                  <Button type="submit" variant="gradient">Notify Me</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default API;
