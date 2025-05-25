"use client";
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { sendMailAction } from '@/app/actions/sendMail';
import { NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY } from '@/constants/Constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const PUBLIC_KEY: string = NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recaptchaToken = await captchaRef.current?.executeAsync();
      captchaRef.current?.reset();

      if (!recaptchaToken) {
        toast.error('reCAPTCHA failed. Please try again.');
        setLoading(false);
        return;
      }

      await sendMailAction({
        ...formData,
        recaptchaToken,
      });

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: unknown) {
      console.error(err);
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">Get In Touch</h2>
          <div className="w-16 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out if you&apos;re interested in working together or just want to connect.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Information */}
          <div className="space-y-10 md:w-1/3">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I&apos;m currently available for freelance work or full-time positions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <Mail size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Email</h4>
                  <a href="mailto:me.sanjeevks@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    me.sanjeevks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <Phone size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Phone</h4>
                  <a href="tel:+917482912775" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    +91 7482912775
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <MapPin size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bhopal, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Connect</h3>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/sanjeevnode"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjeevnode"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:me.sanjeevks@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:p-10 md:w-2/3 bg-white dark:bg-gray-800  p-4 border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    maxLength={10}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <ReCAPTCHA
                sitekey={PUBLIC_KEY}
                size='invisible'
                ref={captchaRef}
              />
              <button
                type="submit"
                className="px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Contact;