import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sanjeev Singh",
  description: "Privacy policy for the portfolio website of Sanjeev Singh (sanjeevnode.in). Learn about how your data is handled.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans flex flex-col justify-between">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-16 flex-grow max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-black dark:border-white text-black dark:text-white text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white flex items-center gap-3">
            <Shield className="text-black dark:text-white" size={36} />
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last Updated: July 4, 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="border-2 border-black dark:border-white p-8 md:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-gray-900 transition-all duration-300">
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">1</span>
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to my portfolio website (<strong>sanjeevnode.in</strong>). I respect your privacy and am committed to protecting any personal data you share. This Privacy Policy details how information is collected, protected, and used when you visit this website.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">2</span>
                Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This website is structured to minimize data collection. The only circumstances under which personal data is collected are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Contact Form:</strong> When you send a message through the contact form, I collect the details you fill out—typically your <em>Name</em>, <em>Email Address</em>, and <em>Message Content</em>. This is used solely to respond to your inquiries.
                </li>
                <li>
                  <strong>Server Logs:</strong> Standard server logs are maintained by our hosting provider. This includes IP addresses, browser types, referring pages, and access times, which are standard for server operations and diagnostics.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">3</span>
                How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The information collected is used in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>To reply directly to your contact requests or professional inquiries.</li>
                <li>To secure the website against spam, unauthorized access, and malicious behavior.</li>
                <li>To analyze general, aggregated traffic data to help optimize website presentation and usability.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">4</span>
                Cookies and Tracking
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may use basic cookies or local storage to preserve your preferences (such as maintaining your selected theme preference, e.g., dark or light mode). These cookies do not track your activity on other sites or collect personally identifiable information.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">5</span>
                Third-Party Services & Integrations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                This website integrates certain third-party components to ensure safety and standard functionality:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Google reCAPTCHA:</strong> We may use reCAPTCHA to shield the contact form from bots and automated spam. The usage of reCAPTCHA is subject to Google&apos;s Privacy Policy and Terms of Use.
                </li>
                <li>
                  <strong>Hosting & Deployment:</strong> The site is deployed and hosted on cloud infrastructure which collects standard technical telemetry.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">6</span>
                Security of Data
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your data security is critical to me. We implement standard encryption (HTTPS) protocols for all data transmitted to and from this site. However, please remember that no transmission method over the Internet or electronic storage is 100% secure.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-none border border-black dark:border-white text-sm">7</span>
                Your Rights & Contact Details
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can inquire about the personal details you submitted at any time. If you wish to review, update, or delete any messages or contact details you sent, please contact me directly at: <a href="mailto:contact@sanjeevnode.in" className="underline hover:text-black dark:hover:text-white transition-colors">contact@sanjeevnode.in</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
