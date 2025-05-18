"use client";
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { sendMailAction } from '@/app/actions/sendMail';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const PUBLIC_KEY: string = process.env.NEXT_PUBLIC_PUBLIC_KEY ?? "";


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
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Feel free to reach out if you&apos;re interested in working together or just want to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10 max-w-4xl mx-auto">

          {/* Contact Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
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
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
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
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I&apos;m currently available for freelance work or full-time positions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Email</h4>
                  <a href="mailto:hello@example.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    me.sanjeevks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    +91 7482912775
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bhopal, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Connect</h3>
              <div className="flex gap-5">
                <a href="https://github.com/sanjeevnode" target='_blank' className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={22} />
                </a>
                <a href="https://www.linkedin.com/in/sanjeevnode" target='_blank' className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:me.sanjeevks@gmail.com" className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Email">
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
