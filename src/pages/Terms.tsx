import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service — VargaFlow</title>
        <meta name="description" content="Terms of Service for VargaFlow LLC." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="border-b border-border bg-muted/40 px-4 py-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">VargaFlow LLC Terms of Service</h1>
          <p className="mt-3 text-muted-foreground"><span className="font-semibold text-foreground">Effective Date:</span> April 27, 2026</p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-14 pb-20">
          <div className="prose-custom space-y-10 text-sm leading-relaxed text-foreground/80">

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">1. Introduction</h2>
              <p>
                These Terms of Service ("Terms") govern your use of the services provided by VargaFlow LLC ("we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">2. Services</h2>
              <p>
                We provide done-for-you marketing automation services for home service businesses, including but not limited to SMS automation, customer relationship management, lead capture, review management, and related software services ("Services"). We reserve the right to modify or discontinue the Services at any time without notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">3. Account Registration</h2>
              <p>
                To use our Services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">4. Acceptable Use</h2>
              <p>You agree to use our Services in compliance with all applicable laws and regulations. You must not:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Use the Services for any unlawful purpose.</li>
                <li>Send unsolicited messages or messages in violation of the Telephone Consumer Protection Act (TCPA), CAN-SPAM Act, CTIA messaging principles, or other applicable laws and carrier requirements.</li>
                <li>Interfere with or disrupt the Services or servers/networks connected to the Services.</li>
                <li>Attempt to gain unauthorized access to our systems or to other users' accounts.</li>
                <li>Use the Services to send spam, phishing messages, or any content that is fraudulent, deceptive, harassing, or harmful.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">5. Fees and Payment</h2>
              <p>
                You agree to pay all applicable fees for the Services as outlined in your service agreement. Fees are non-refundable except as required by law or as expressly stated in your service agreement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">6. Intellectual Property</h2>
              <p>
                We own all rights, title, and interest in and to the Services, including all intellectual property rights. You are granted a limited, non-exclusive, non-transferable, and revocable license to use the Services for your internal business purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">7. Confidentiality</h2>
              <p>
                You agree to maintain the confidentiality of any non-public information disclosed to you by us, including business, technical, and financial information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">8. Privacy</h2>
              <p>
                Your use of the Services is also governed by our{" "}
                <a href="/privacy-policy" className="font-semibold text-primary hover:underline">
                  Privacy Policy
                </a>
                , which is incorporated by reference into these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, VargaFlow LLC will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Your use or inability to use the Services.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from the Services.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">10. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless VargaFlow LLC, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Services at our sole discretion, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">12. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of Wyoming, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">13. Links to Other Websites</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled by VargaFlow LLC.
              </p>
              <p>
                VargaFlow LLC has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that VargaFlow LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
              <p>
                We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">14. Dispute Resolution</h2>
              <p>
                Any disputes arising out of or in connection with these Terms or the Services shall be resolved through binding arbitration in the State of Wyoming, in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">15. Changes to the Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">16. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  <a href="mailto:kornel@vargaflow.com" className="font-semibold text-primary hover:underline">kornel@vargaflow.com</a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Phone:</span> +1 307 374 9123
                </li>
                <li>
                  <span className="font-semibold text-foreground">Mailing Address:</span> VargaFlow LLC, 30 N Gould St Ste N, Sheridan, WY 82801, USA
                </li>
              </ul>
              <p className="pt-2">
                By using our Services, you agree to be bound by these Terms.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
