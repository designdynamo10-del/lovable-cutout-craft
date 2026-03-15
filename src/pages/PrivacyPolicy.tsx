import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | BgRemover</title>
        <meta name="description" content="BgRemover privacy policy. Learn how we handle your data and protect your privacy." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="text-muted-foreground mb-8">Last updated: March 15, 2026</p>

              <div className="space-y-8 text-muted-foreground">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
                  <p>
                    BgRemover ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our background removal service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
                  <p className="mb-2"><strong className="text-foreground">Images:</strong> All image processing occurs locally in your browser. We do not upload, store, or access your images unless you explicitly save them to your account.</p>
                  <p className="mb-2"><strong className="text-foreground">Account Data:</strong> If you create an account, we collect your email address and display name. This data is stored securely and used solely for authentication and account management.</p>
                  <p><strong className="text-foreground">Usage Data:</strong> We may collect anonymous usage statistics such as page views and feature usage to improve our service. No personally identifiable information is included.</p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To provide and maintain our service</li>
                    <li>To manage your account and saved images</li>
                    <li>To improve our AI models and user experience</li>
                    <li>To send service-related notifications (e.g., password reset emails)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage & Security</h2>
                  <p>
                    We use industry-standard security measures to protect your data. Account information and saved images are stored on secure, encrypted servers. We never sell your personal data to third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies</h2>
                  <p>
                    We use essential cookies for authentication and session management. We do not use third-party tracking cookies or advertising cookies.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Access, update, or delete your personal data</li>
                    <li>Delete your account and all associated data</li>
                    <li>Request a copy of your stored data</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:privacy@bgremover.app" className="text-primary hover:underline">
                      privacy@bgremover.app
                    </a>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
