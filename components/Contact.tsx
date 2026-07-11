"use client";
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { sendMailAction } from '@/app/actions/sendMail';
import { getCaptchaPublicKey } from '@/constants/Constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const PUBLIC_KEY: string = getCaptchaPublicKey();

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
      console.error("Send mail error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-pf-bg">
      <div className="container mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-4">
            <span className="font-mono text-pf-accent text-lg">06.</span>
            <h2 className="font-display font-semibold uppercase tracking-tight text-3xl md:text-5xl text-pf-text whitespace-nowrap">Get In Touch</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-pf-line/20 to-transparent" />
          </div>
          <p className="mt-4 text-pf-dim max-w-2xl">
            Feel free to reach out if you&apos;re interested in working together or just want to connect.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Information */}
          <div className="space-y-10 md:w-1/3">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-6 text-pf-text">Contact Information</h3>
              <p className="text-pf-dim mb-8">
                I&apos;m currently available for freelance work or full-time positions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex items-center justify-center text-pf-dim">
                  <Mail size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="font-display text-lg font-medium text-pf-text mb-1">Email</h4>
                  <a href="mailto:me.sanjeevks@gmail.com" className="text-pf-dim hover:text-pf-accent transition-colors">
                    me.sanjeevks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center text-pf-dim">
                  <Phone size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="font-display text-lg font-medium text-pf-text mb-1">Phone</h4>
                  <a href="tel:+917987914125" className="text-pf-dim hover:text-pf-accent transition-colors">
                    +91 7987914125
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center text-pf-dim">
                  <MapPin size={20} />
                </div>
                <div className="ml-6">
                  <h4 className="font-display text-lg font-medium text-pf-text mb-1">Location</h4>
                  <p className="text-pf-dim">
                    Bhopal, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="font-display text-2xl font-semibold mb-6 text-pf-text">Connect</h3>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/sanjeevnode"
                  target="_blank"
                  className="text-pf-dim hover:text-pf-accent transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjeevnode"
                  target="_blank"
                  className="text-pf-dim hover:text-pf-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:me.sanjeevks@gmail.com"
                  className="text-pf-dim hover:text-pf-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:p-10 md:w-2/3 p-4 border-pf-line/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-pf-text">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pf-bg text-pf-text border border-pf-line/15 focus:border-pf-accent focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-pf-text">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-pf-bg text-pf-text border border-pf-line/15 focus:border-pf-accent focus:outline-none transition-colors"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-pf-text">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-pf-bg text-pf-text border border-pf-line/15 focus:border-pf-accent focus:outline-none transition-colors"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-pf-text">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  maxLength={1000}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-pf-bg text-pf-text border border-pf-line/15 focus:border-pf-accent focus:outline-none transition-colors"
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
                className="px-6 py-4 bg-pf-accent text-pf-bg font-semibold transition-transform duration-300 hover:-translate-y-1 disabled:opacity-60"
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
