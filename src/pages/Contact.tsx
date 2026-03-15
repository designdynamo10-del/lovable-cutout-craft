import { useState } from "react";
import { Helmet } from "react-helmet";
import { Mail, MessageSquare, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    // Simulate sending — replace with real endpoint later
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | BgRemover</title>
        <meta name="description" content="Get in touch with the BgRemover team. We'd love to hear from you — questions, feedback, or partnership inquiries." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  Get in <span className="gradient-text">Touch</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Have a question or feedback? We'd love to hear from you.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-8">
                {/* Contact info */}
                <div className="md:col-span-2 space-y-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="feature-icon w-10 h-10 mb-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:hello@bgremover.app" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      hello@bgremover.app
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="feature-icon w-10 h-10 mb-4">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold mb-1">Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="feature-icon w-10 h-10 mb-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Remote-first, worldwide
                    </p>
                  </div>
                </div>

                {/* Contact form */}
                <div className="md:col-span-3">
                  <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 sm:p-8 space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help?"
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" variant="gradient" className="w-full" disabled={sending}>
                      {sending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
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

export default Contact;
