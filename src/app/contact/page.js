import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiMail, FiMessageCircle, FiHelpCircle } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Get in touch with our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-2">Send us an email</p>
            <a
              href="mailto:support@ideasparkinglot.com"
              className="text-blue-600 hover:text-blue-700"
            >
              support@ideasparkinglot.com
            </a>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiMessageCircle className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600 mb-2">Get help with your account</p>
            <a
              href="mailto:help@ideasparkinglot.com"
              className="text-blue-600 hover:text-blue-700"
            >
              help@ideasparkinglot.com
            </a>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiHelpCircle className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">FAQ</h3>
            <p className="text-gray-600 mb-2">Find answers to common questions</p>
            <a
              href="/faq"
              className="text-blue-600 hover:text-blue-700"
            >
              Visit FAQ
            </a>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have a Question?</h2>
          <p className="text-gray-700 mb-6">
            We're here to help! Whether you have a question about features, need technical support, or want to share feedback, we'd love to hear from you.
          </p>
          <p className="text-gray-700">
            Our team typically responds within 24 hours. For urgent matters, please include "URGENT" in your subject line.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

