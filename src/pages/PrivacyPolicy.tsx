
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center font-cursive text-4xl font-bold text-meow-black">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              At Meowmart, we value your privacy and are committed to protecting your personal information. This Privacy Policy
              explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
            </p>
            
            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              When you visit our site, we may collect certain personally identifiable information, including but not limited to:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Postal address</li>
              <li>Phone number</li>
              <li>Payment information</li>
            </ul>
            
            <h3>Non-Personal Information</h3>
            <p>
              We may also collect non-personal information about your interaction with our website, including:
            </p>
            <ul>
              <li>Browser type</li>
              <li>IP address</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
            </ul>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and updates</li>
              <li>Responding to your inquiries</li>
              <li>Providing customer support</li>
              <li>Improving our website and products</li>
              <li>Sending promotional emails (if you've opted in)</li>
              <li>Preventing fraud and enhancing security</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without
              your consent, except in the following circumstances:
            </p>
            <ul>
              <li>With trusted third parties who assist us in operating our website or servicing you (e.g., shipping carriers, payment processors)</li>
              <li>When required by law or valid legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>In connection with a business transfer, such as a merger or acquisition</li>
            </ul>
            
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our website and store certain information.
              Cookies are files with a small amount of data which may include an anonymous unique identifier. You can
              instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot
              guarantee the security of your information.
            </p>
            
            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over and assume no responsibility for
              the content, privacy policies, or practices of any third-party sites or services.
            </p>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for use by children under the age of 13. We do not knowingly collect personally
              identifiable information from children under 13. If you are a parent or guardian and believe we may have
              collected information about a child, please contact us.
            </p>
            
            <h2>8. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your data</li>
              <li>The right to opt-out of marketing communications</li>
            </ul>
            
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
              Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-meow-purple">contact us</Link>.
            </p>
            
            <p className="text-sm italic">Last updated: April 19, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
