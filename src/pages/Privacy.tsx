import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — VargaFlow</title>
        <meta name="description" content="Privacy policy for VargaFlow marketing services." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="border-b border-border bg-muted/40 px-4 py-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">Last updated: March 2025</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-14 pb-20">
          <div className="space-y-10 text-sm leading-relaxed text-foreground/80">

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">1. Overview</h2>
              <p>
                VargaFlow ("we", "us", or "our") operates vargaflow.com. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your information. By using our website or submitting any form, you agree to the collection and use of information as described in this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">2. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li><span className="font-semibold text-foreground">Contact & lead forms:</span> name, phone number, email address, and business details submitted through our website forms.</li>
                <li><span className="font-semibold text-foreground">Onboarding forms:</span> business information, service details, social media links, photos, and other content submitted during client onboarding.</li>
                <li><span className="font-semibold text-foreground">Calendly bookings:</span> scheduling information when you book a call through our calendar links.</li>
                <li><span className="font-semibold text-foreground">Communications:</span> any messages you send us via email or contact forms.</li>
              </ul>
              <p className="mt-2">
                We may also automatically collect certain usage data when you visit our site, such as IP address, browser type, pages visited, and referring URLs, through standard web analytics tools.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Respond to your inquiries and provide the services you requested.</li>
                <li>Build and manage your marketing assets (website, listings, campaigns).</li>
                <li>Send you updates, invoices, and communications related to your engagement with us.</li>
                <li>Follow up with leads who express interest in our services.</li>
                <li>Improve our website and service offerings.</li>
              </ul>
              <p className="mt-2">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">4. How We Share Your Information</h2>
              <p>
                We may share your information with trusted third-party tools and platforms that help us deliver our services, including CRM software, email/SMS platforms, website hosting providers, and analytics tools. These partners are contractually obligated to keep your data secure and may only use it to provide services on our behalf.
              </p>
              <p>
                We may also disclose your information if required by law or to protect the rights and safety of VargaFlow or others.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. If you wish to have your data deleted, please contact us at{" "}
                <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">
                  kornel@vargaflow.com
                </a>{" "}
                and we will process your request within a reasonable timeframe.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">6. Cookies</h2>
              <p>
                Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser. Disabling cookies may affect some functionality of the site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">7. Security</h2>
              <p>
                We take reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your personal information.</li>
                <li>Opt out of marketing communications at any time by contacting us or using the unsubscribe link in any email.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">9. Children's Privacy</h2>
              <p>
                Our services are intended for business owners and are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Your continued use of our site after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">11. Contact</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please reach out at{" "}
                <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">
                  kornel@vargaflow.com
                </a>
                .
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
