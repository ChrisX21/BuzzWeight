import Link from "next/link";

export const metadata = { title: "Terms of Service — BuzzWeight" };

export default function TermsOfService() {
  return (
    <div className="container-page max-w-3xl py-16">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-muted-foreground">
        Welcome to BuzzWeight. By accessing or using our services, you agree to
        be bound by these Terms of Service. If you do not agree, please{" "}
        <strong className="text-foreground">do not</strong> use our services.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
          <p className="mt-2 text-muted-foreground">
            By using BuzzWeight, you confirm that you have read, understood, and
            agree to these terms. If you are using our services on behalf of an
            organization, you represent that you have the authority to bind that
            organization.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">2. User Responsibilities</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Provide accurate information when creating an account.</li>
            <li>Keep your account credentials secure and confidential.</li>
            <li>Use our services in compliance with applicable laws.</li>
            <li>Refrain from using our services for unlawful actions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold">3. Intellectual Property</h2>
          <p className="mt-2 text-muted-foreground">
            All content, trademarks, and logos are the property of BuzzWeight.
            Users are granted a limited license to access and use our services
            for personal or organizational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">4. Termination</h2>
          <p className="mt-2 text-muted-foreground">
            We reserve the right to terminate or suspend your access to our
            services for violating these terms or engaging in unlawful
            activities.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">5. Limitation of Liability</h2>
          <p className="mt-2 text-muted-foreground">
            BuzzWeight is not liable for any direct, indirect, or consequential
            damages resulting from your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">6. Governing Law</h2>
          <p className="mt-2 text-muted-foreground">
            These terms are governed by the laws of the European Union and the
            Republic of Bulgaria.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">7. Changes to Terms</h2>
          <p className="mt-2 text-muted-foreground">
            We may update these terms from time to time. Changes will be
            effective upon posting on this page. Continued use of our services
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold">8. Contact Us</h2>
          <p className="mt-2 text-muted-foreground">
            If you have any questions about these terms, please reach us through
            our{" "}
            <Link href="/contact" className="font-medium text-amber-600 hover:underline">
              contact form
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
