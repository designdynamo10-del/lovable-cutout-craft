import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | BgRemover</title>
        <meta name="description" content="BgRemover terms of service. Read about the terms and conditions for using our background removal tool." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Terms of <span className="gradient-text">Service</span>
              </h1>
              <p className="text-muted-foreground mb-8">Last updated: March 15, 2026</p>

              <div className="space-y-8 text-muted-foreground">
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using BgRemover, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
                  <p>
                    BgRemover provides an AI-powered background removal tool that processes images directly in your browser. The service includes optional account creation for saving processed images.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>You must own or have rights to the images you process</li>
                    <li>You must not use the service for illegal purposes</li>
                    <li>You are responsible for maintaining the security of your account</li>
                    <li>You must not attempt to reverse-engineer or misuse the service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
                  <p>
                    You retain full ownership of all images you upload and process. BgRemover does not claim any rights over your content. Our service, branding, and AI models remain our intellectual property.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
                  <p>
                    BgRemover is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our service, including but not limited to data loss, image quality issues, or service interruptions.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">6. Account Termination</h2>
                  <p>
                    We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time, which will remove all your saved data from our servers.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes to Terms</h2>
                  <p>
                    We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify registered users of significant changes via email.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact</h2>
                  <p>
                    For questions about these Terms of Service, contact us at{" "}
                    <a href="mailto:legal@bgremover.app" className="text-primary hover:underline">
                      legal@bgremover.app
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

export default TermsOfService;
