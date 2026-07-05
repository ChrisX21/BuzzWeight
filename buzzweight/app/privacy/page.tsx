import Link from "next/link";

export const metadata = { title: "Privacy Policy — BuzzWeight" };

const sections = [
  {
    heading: "1. Information We Collect",
    body: (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Personal details: name, email address, contact details.</li>
        <li>Technical data: IP address, browser type, and operating system.</li>
        <li>Cookies for authentication.</li>
      </ul>
    ),
  },
  {
    heading: "2. Legal Basis for Processing",
    body: (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Your consent (e.g., for marketing communications).</li>
        <li>Performance of a contract (e.g., providing our services).</li>
        <li>Compliance with legal obligations.</li>
      </ul>
    ),
  },
  {
    heading: "3. How We Use Your Information",
    body: (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Provide and improve our services.</li>
        <li>Communicate with you about your account or inquiries.</li>
        <li>Comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    heading: "4. Retention Period",
    body: (
      <p className="mt-2 text-muted-foreground">
        We retain your personal information for as long as necessary to fulfil
        the purposes outlined in this policy unless a longer retention period is
        required by law.
      </p>
    ),
  },
  {
    heading: "5. Data Sharing",
    body: (
      <p className="mt-2 text-muted-foreground">
        We do not share your personal information with third parties under any
        circumstances.
      </p>
    ),
  },
  {
    heading: "6. Your Rights",
    body: (
      <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
        <li>Access, correct, or delete your data.</li>
        <li>Restrict or object to processing.</li>
        <li>Data portability.</li>
        <li>Withdraw consent at any time.</li>
        <li>File a complaint with a supervisory authority.</li>
      </ul>
    ),
  },
  {
    heading: "7. Security Measures",
    body: (
      <p className="mt-2 text-muted-foreground">
        We use encryption, access controls, and regular security audits to
        safeguard your data.
      </p>
    ),
  },
  {
    heading: "8. Contact Information",
    body: (
      <p className="mt-2 text-muted-foreground">
        If you have questions about this Privacy Policy, please reach us through
        our{" "}
        <Link href="/contact" className="font-medium text-amber-600 hover:underline">
          contact form
        </Link>
        .
      </p>
    ),
  },
  {
    heading: "9. Updates to This Policy",
    body: (
      <p className="mt-2 text-muted-foreground">
        We may update this policy from time to time. Changes will be posted on
        this page with the revision date.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="container-page max-w-3xl py-16">
      <span className="eyebrow">Legal</span>
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        This Privacy Policy outlines how we collect, use, and protect your
        personal information in compliance with the General Data Protection
        Regulation (GDPR).
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold">{s.heading}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </div>
  );
}
