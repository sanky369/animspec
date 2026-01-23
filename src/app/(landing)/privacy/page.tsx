import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AnimSpec.ai',
  description: 'Privacy Policy for AnimSpec.ai - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: January 23, 2025</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to AnimSpec.ai ("we," "our," or "us"). We are committed to protecting your
              personal data and respecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our video animation analysis
              service (the "Service").
            </p>
            <p>
              This policy complies with the General Data Protection Regulation (GDPR) and other
              applicable data protection laws. By using our Service, you agree to the collection
              and use of information in accordance with this policy.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Data Controller</h2>
            <p>
              AnimSpec.ai is the data controller responsible for your personal data. If you have
              any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="legal-contact">
              Email: team@tinkerbrains.com<br />
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Information We Collect</h2>

            <h3>3.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> When you create an account, we collect your email address, name, and authentication credentials.</li>
              <li><strong>Payment Information:</strong> When you purchase credits, payment processing is handled by Lemon Squeezy. We do not store your full credit card details.</li>
              <li><strong>Video Content:</strong> Videos you upload for analysis are temporarily processed but not permanently stored on our servers.</li>
              <li><strong>Analysis History:</strong> We store your analysis results (output specifications, not the original videos) to provide history functionality.</li>
            </ul>

            <h3>3.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> Information about how you use our Service, including features accessed and actions taken.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
              <li><strong>Log Data:</strong> IP address, access times, and pages viewed.</li>
              <li><strong>Cookies:</strong> We use essential cookies for authentication and session management.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul>
              <li><strong>Contract Performance:</strong> Processing necessary to provide our Service to you.</li>
              <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests, such as improving our Service and preventing fraud.</li>
              <li><strong>Consent:</strong> Where you have given explicit consent for specific processing activities.</li>
              <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal requirements.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process your video analyses and deliver results</li>
              <li>Manage your account and credit balance</li>
              <li>Process payments and transactions</li>
              <li>Send service-related communications</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties that help us operate our Service:
                <ul>
                  <li>Google (Gemini AI for video analysis)</li>
                  <li>Firebase (authentication and database)</li>
                  <li>Lemon Squeezy (payment processing)</li>
                  <li>Vercel (hosting)</li>
                </ul>
              </li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
            <p>We do not sell your personal data to third parties.</p>
          </section>

          <section className="legal-section">
            <h2>7. International Data Transfers</h2>
            <p>
              Your data may be transferred to and processed in countries outside the European Economic
              Area (EEA), including the United States. When we transfer data internationally, we ensure
              appropriate safeguards are in place, such as Standard Contractual Clauses approved by
              the European Commission.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Data Retention</h2>
            <p>We retain your data as follows:</p>
            <ul>
              <li><strong>Account Data:</strong> Retained while your account is active and for 30 days after deletion request.</li>
              <li><strong>Analysis History:</strong> Last 50 analyses are retained; older analyses are automatically deleted.</li>
              <li><strong>Video Content:</strong> Videos are processed in memory and not permanently stored.</li>
              <li><strong>Transaction Records:</strong> Retained for 7 years for legal and tax compliance.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the following rights:</p>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten").</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data.</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format.</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at team@tinkerbrains.com. We will respond
              within 30 days. You also have the right to lodge a complaint with your local data
              protection authority.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Cookies and Tracking</h2>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality. These cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our Service. You can opt out of these.</li>
            </ul>
            <p>
              You can manage cookie preferences through your browser settings. Note that disabling
              essential cookies may affect Service functionality.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data,
              including:
            </p>
            <ul>
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Encryption at rest for stored data</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              While we strive to protect your data, no method of transmission over the Internet
              is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 16 years of age. We do not knowingly
              collect personal data from children under 16. If you believe we have collected data
              from a child under 16, please contact us immediately.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by posting the new policy on this page and updating the "Last
              updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please
              contact us:
            </p>
            <p className="legal-contact">
              Email: team@tinkerbrains.com<br />
              Subject: Privacy Inquiry
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
