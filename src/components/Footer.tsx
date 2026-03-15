import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="feature-icon w-9 h-9">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold gradient-text">BgRemover</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered background removal tool. Fast, free, and privacy-focused.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/remove" className="hover:text-foreground transition-colors">Remove Background</Link></li>
              <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/api" className="hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BgRemover. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
