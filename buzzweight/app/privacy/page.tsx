import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="shadow-lg rounded-lg p-4 mt-5">
      <h1 className="text-center font-bold text-xl mb-4">Privacy Policy</h1>
      <p>
        This Privacy Policy outlines how we collect, use, and protect your
        personal information in compliance with the General Data Protection
        Regulation (GDPR).
      </p>

      <h2 className="font-bold text-lg mt-4">1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="list-disc ml-5">
        <li>Personal details: name, email address, contact details.</li>
        <li>Technical data: IP address, browser type, and operating system.</li>
        <li>Cookies for authentication.</li>
      </ul>

      <h2 className="font-bold text-lg mt-4">2. Legal Basis for Processing</h2>
      <p>We process your data based on one or more of the following:</p>
      <ul className="list-disc ml-5">
        <li>Your consent (e.g., for marketing communications).</li>
        <li>Performance of a contract (e.g., providing our services).</li>
        <li>Compliance with legal obligations.</li>
      </ul>

      <h2 className="font-bold text-lg mt-4">3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-5">
        <li>Provide and improve our services.</li>
        <li>Communicate with you about your account or inquiries.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2 className="font-bold text-lg mt-4">4. Retention Period</h2>
      <p>
        We retain your personal information for as long as necessary to fulfill
        the purposes outlined in this policy unless a longer retention period is
        required by law.
      </p>

      <h2 className="font-bold text-lg mt-4">5. Data Sharing</h2>
      <p>
        We do not share your personal information with third parties under any
        circumstances.
      </p>

      <h2 className="font-bold text-lg mt-4">6. Your Rights</h2>
      <p>Under GDPR, you have the following rights:</p>
      <ul className="list-disc ml-5">
        <li>Access, correct, or delete your data.</li>
        <li>Restrict or object to processing.</li>
        <li>Data portability.</li>
        <li>Withdraw consent at any time.</li>
        <li>File a complaint with a supervisory authority.</li>
      </ul>

      <h2 className="font-bold text-lg mt-4">7. Security Measures</h2>
      <p>
        We use encryption, access controls, and regular security audits to
        safeguard your data.
      </p>

      <h2 className="font-bold text-lg mt-4">8. Contact Information</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at
        i.ivanov@airsofia.com or use our contact form.
      </p>

      <h2 className="font-bold text-lg mt-4">9. Updates to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on
        this page with the revision date.
      </p>
    </div>
  );
}
