import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AnimSpec.ai',
  description: 'Terms of Service for AnimSpec.ai - Read our terms and conditions for using the service.',
};

export default function TermsOfServicePage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: January 23, 2025</p>

        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using AnimSpec.ai (the "Service"), you agree to be bound by these
              Terms of Service ("Terms"). If you disagree with any part of these terms, you do
              not have permission to access the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Description of Service</h2>
            <p>
              AnimSpec.ai is a video animation analysis service that converts video animations
              into structured text instructions and code specifications. The Service uses
              artificial intelligence, powered by Google Gemini, to analyze video content and
              generate output in various formats including natural language, CSS keyframes,
              GSAP, and Framer Motion.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Account Registration</h2>
            <p>To use certain features of the Service, you must register for an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms
              or engage in fraudulent or abusive behavior.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Credits and Payments</h2>

            <h3>4.1 Credit System</h3>
            <p>
              The Service operates on a credit-based system. Different analysis quality levels
              consume different amounts of credits:
            </p>
            <ul>
              <li><strong>Fast (Gemini 2.5 Flash):</strong> 1 credit per analysis</li>
              <li><strong>Balanced (Gemini 3 Flash):</strong> 3 credits per analysis</li>
              <li><strong>Precise (Gemini 3 Pro):</strong> 20 credits per analysis</li>
            </ul>

            <h3>4.2 Free Credits</h3>
            <p>
              New users receive 20 free credits upon registration. Free users cannot access
              the Precise quality mode.
            </p>

            <h3>4.3 Purchasing Credits</h3>
            <p>
              Additional credits can be purchased through our payment provider, Lemon Squeezy.
              Available packages:
            </p>
            <ul>
              <li><strong>Creator Pack:</strong> 200 credits for $24 USD</li>
              <li><strong>Pro Pack:</strong> 600 credits for $59 USD</li>
            </ul>

            <h3>4.4 Refund Policy</h3>
            <p>
              Credit purchases are non-refundable except where required by law. If you experience
              technical issues that result in lost credits, please contact support for evaluation.
            </p>

            <h3>4.5 Credit Expiration</h3>
            <p>
              Purchased credits do not expire. We reserve the right to modify pricing and credit
              packages with reasonable notice.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Upload, transmit, or distribute content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
              <li>Upload content that infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party</li>
              <li>Upload videos containing explicit, adult, or NSFW content</li>
              <li>Attempt to gain unauthorized access to the Service or its related systems</li>
              <li>Use the Service to transmit viruses, malware, or other malicious code</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to reverse engineer, decompile, or disassemble any portion of the Service</li>
              <li>Use automated systems, bots, or scrapers to access the Service</li>
              <li>Resell, redistribute, or commercially exploit the Service without authorization</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Content and Intellectual Property</h2>

            <h3>6.1 Your Content</h3>
            <p>
              You retain all rights to the videos you upload to the Service. By uploading content,
              you grant us a limited, non-exclusive license to process and analyze the content
              solely for the purpose of providing the Service.
            </p>

            <h3>6.2 Generated Output</h3>
            <p>
              The analysis output generated by the Service (specifications, code snippets, etc.)
              is provided for your use. You may use this output for any lawful purpose, including
              commercial projects.
            </p>

            <h3>6.3 Our Intellectual Property</h3>
            <p>
              The Service, including its original content, features, and functionality, is owned
              by AnimSpec.ai and is protected by international copyright, trademark, patent,
              trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Third-Party Services</h2>
            <p>
              The Service integrates with third-party services that are subject to their own
              terms and conditions:
            </p>
            <ul>
              <li><strong>Google Gemini:</strong> Video analysis is powered by Google's Gemini AI models. Use of this feature is subject to Google's Terms of Service and AI Principles.</li>
              <li><strong>Firebase (Google):</strong> Authentication and data storage provided by Google Firebase.</li>
              <li><strong>Lemon Squeezy:</strong> Payment processing is handled by Lemon Squeezy and subject to their terms.</li>
            </ul>
            <p>
              We are not responsible for the content, privacy policies, or practices of any
              third-party services.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Disclaimers</h2>

            <h3>8.1 Service Provided "As Is"</h3>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES
              OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3>8.2 AI-Generated Content</h3>
            <p>
              The Service uses artificial intelligence to analyze videos and generate output.
              While we strive for accuracy, AI-generated content may contain errors or
              inaccuracies. You should review and verify all output before use in production
              environments.
            </p>

            <h3>8.3 No Guarantee of Availability</h3>
            <p>
              We do not guarantee that the Service will be available at all times. The Service
              may be subject to limitations, delays, and other problems inherent in the use
              of the internet and electronic communications.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL ANIMSPEC.AI, ITS
              DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
              WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
              LOSSES, RESULTING FROM:
            </p>
            <ul>
              <li>Your access to or use of (or inability to access or use) the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p>
              Our total liability shall not exceed the amount you have paid us in the twelve
              (12) months preceding the claim.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless AnimSpec.ai and its officers,
              directors, employees, and agents from and against any claims, liabilities,
              damages, losses, and expenses, including reasonable attorneys' fees, arising
              out of or in any way connected with:
            </p>
            <ul>
              <li>Your access to or use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights, including intellectual property rights</li>
              <li>Any content you upload or submit to the Service</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Service immediately,
              without prior notice or liability, for any reason, including if you breach these
              Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you
              wish to terminate your account, you may do so by contacting us or using the
              account deletion feature in your settings.
            </p>
            <p>
              All provisions of these Terms that by their nature should survive termination
              shall survive, including ownership provisions, warranty disclaimers, indemnity,
              and limitations of liability.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              the jurisdiction in which AnimSpec.ai operates, without regard to its conflict
              of law provisions.
            </p>
            <p>
              For users in the European Union, nothing in these Terms affects your rights
              under mandatory consumer protection laws in your country of residence.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall first
              be attempted to be resolved through good-faith negotiation. If negotiation
              fails, disputes shall be resolved through binding arbitration or in the courts
              of competent jurisdiction.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days' notice prior to any new terms
              taking effect. What constitutes a material change will be determined at our
              sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective,
              you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, such
              provision will be changed and interpreted to accomplish the objectives of such
              provision to the greatest extent possible under applicable law, and the remaining
              provisions will continue in full force and effect.
            </p>
          </section>

          <section className="legal-section">
            <h2>15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <p className="legal-contact">
              Email: legal@animspec.ai<br />
              Subject: Terms of Service Inquiry
            </p>
          </section>

          <section className="legal-section">
            <h2>16. Acknowledgments</h2>
            <p>
              AnimSpec.ai is built with the following technologies and services:
            </p>
            <ul>
              <li><strong>Google Gemini:</strong> AI video analysis powered by Google's Gemini models, a product of Google LLC.</li>
              <li><strong>Firebase:</strong> Authentication and database services provided by Google Firebase.</li>
              <li><strong>Lemon Squeezy:</strong> Payment processing by Lemon Squeezy.</li>
              <li><strong>Vercel:</strong> Hosting and deployment by Vercel Inc.</li>
              <li><strong>Next.js:</strong> React framework by Vercel.</li>
            </ul>
            <p>
              All trademarks, service marks, and company names are the property of their
              respective owners.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
