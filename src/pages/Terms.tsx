import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — VargaFlow</title>
        <meta name="description" content="Terms and conditions for VargaFlow marketing services." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="border-b border-border bg-muted/40 px-4 py-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Terms & Conditions</h1>
          <p className="mt-3 text-muted-foreground">Last updated: March 2025</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-14 pb-20">
          <div className="prose-custom space-y-10 text-sm leading-relaxed text-foreground/80">

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">1. Agreement to Terms</h2>
              <p>
                By accessing this website or submitting any form on vargaflow.com, you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all visitors, clients, and anyone who engages with VargaFlow's services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">2. Services</h2>
              <p>
                VargaFlow provides done-for-you digital marketing services for home service contractors, including but not limited to: website design and development, local SEO, reputation management, lead follow-up automation, email and SMS marketing, and social media advertising. The specific services rendered to each client are defined at the time of engagement.
              </p>
              <p>
                VargaFlow reserves the right to modify, suspend, or discontinue any service at any time with reasonable notice to the client.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">3. Client Responsibilities</h2>
              <p>By engaging VargaFlow's services, you agree to:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Provide accurate and complete information in all onboarding forms and communications.</li>
                <li>Respond to requests for content, approvals, or feedback within a reasonable timeframe.</li>
                <li>Ensure that all materials you provide (photos, logos, copy) are owned by you or that you have the right to use them.</li>
                <li>Not use VargaFlow's deliverables for any unlawful purpose.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">4. Payment Terms</h2>
              <p>
                Payment terms are agreed upon at the start of each engagement. VargaFlow may offer a free setup period for initial clients as a promotional arrangement; this is subject to change and does not constitute a permanent commitment. All ongoing service fees are due as specified in the service agreement. Late or missed payments may result in suspension of services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">5. No Contract Policy</h2>
              <p>
                VargaFlow operates on a month-to-month basis unless otherwise specified in writing. Either party may terminate the engagement with reasonable written notice. Upon termination, VargaFlow will transfer ownership of any completed website assets and deliverables that were fully paid for.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">6. Results Disclaimer</h2>
              <p>
                VargaFlow makes no guarantee of specific results including lead volume, revenue, rankings, or ROI. Digital marketing outcomes depend on many factors outside of VargaFlow's control, including market conditions, competition, client responsiveness, and ad spend. VargaFlow will make commercially reasonable efforts to achieve the goals outlined during onboarding.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">7. Intellectual Property</h2>
              <p>
                Upon full payment, clients own the final website, copy, and creative assets created specifically for them. VargaFlow retains the right to display completed work in its portfolio unless the client requests otherwise in writing. All proprietary systems, templates, workflows, and tools used to build and operate client campaigns remain the property of VargaFlow.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, VargaFlow shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of its services or website. VargaFlow's total liability to any client shall not exceed the total fees paid by that client in the three months prior to the claim.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">9. Privacy</h2>
              <p>
                VargaFlow is committed to protecting your personal information. Please review our{" "}
                <a href="/privacy" className="font-semibold text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                to understand how we collect, use, and protect your data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">10. Changes to Terms</h2>
              <p>
                VargaFlow reserves the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated date. Continued use of the site or services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">11. Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
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

export default Terms;
