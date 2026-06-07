
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-center font-cursive text-4xl font-bold text-meow-black">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              These Terms of Service ("Terms") govern your access to and use of Meowmart's website, services, and products.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2>1. Use of Our Services</h2>
            <p>
              You must follow any policies made available to you within the Services. You may use our Services only as
              permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or
              policies or if we are investigating suspected misconduct.
            </p>
            
            <h2>2. Account Registration</h2>
            <p>
              To access certain features of our Services, you may be required to register for an account. You must provide
              accurate and complete information and keep your account information updated. You are responsible for
              safeguarding the password you use to access the Services and for any activities or actions under your account.
            </p>
            
            <h2>3. Privacy</h2>
            <p>
              Our <Link to="/privacy-policy" className="text-meow-purple">Privacy Policy</Link> explains how we treat your personal data and protect your
              privacy when you use our Services. By using our Services, you agree that we can use such data in accordance
              with our Privacy Policy.
            </p>
            
            <h2>4. Content</h2>
            <p>
              Our Services display content that is not owned by Meowmart. This content is the sole responsibility of the
              entity that makes it available. We may review content to determine whether it is illegal or violates our
              policies, and we may remove or refuse to display content that we reasonably believe violates our policies or
              the law.
            </p>
            
            <h2>5. Purchases</h2>
            <p>
              If you make a purchase through our Services, you agree to provide accurate and current information about
              yourself as required by the order process. You represent and warrant that you have legal right to use any
              credit card(s) or other payment method(s) used to complete any transaction.
            </p>
            
            <h2>6. Returns and Refunds</h2>
            <p>
              Our return and refund policies are detailed in our Shipping & Returns section. Please refer to it for
              information about how to return products and receive refunds.
            </p>
            
            <h2>7. Intellectual Property</h2>
            <p>
              The Services and their original content, features, and functionality are owned by Meowmart and are protected
              by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary
              rights laws.
            </p>
            
            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Services immediately, without prior notice or
              liability, under our sole discretion, for any reason whatsoever and without limitation, including but not
              limited to a breach of the Terms.
            </p>
            
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall Meowmart, nor its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or
              inability to access or use the Services.
            </p>
            
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your
              responsibility to check these Terms periodically for changes. Your continued use of the Services following the
              posting of any changes to these Terms constitutes acceptance of those changes.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please <Link to="/contact" className="text-meow-purple">contact us</Link>.
            </p>
            
            <p className="text-sm italic">Last updated: April 19, 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
