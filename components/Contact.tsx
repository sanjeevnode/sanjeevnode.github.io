"use client";
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";
import { sendMailAction } from '@/app/actions/sendMail';
import { getCaptchaPublicKey } from '@/constants/Constants';
import Magnetic from './fx/Magnetic';
import Reveal from './fx/Reveal';
import TitleReveal from './fx/TitleReveal';

const inputClass =
  "w-full bg-transparent text-pf-text px-0 py-3 border-0 border-b border-pf-line/15 focus:border-pf-accent focus:outline-none focus:ring-0 transition-colors placeholder:text-pf-dim/50";
const labelClass = "block mb-1 font-mono text-xs uppercase tracking-widest text-pf-dim";

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
    <section id="contact" className="relative py-28 bg-pf-bg overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-pf-accent/8 blur-[120px]" />

      <div className="container mx-auto px-6 relative">
        <p className="font-mono text-pf-accent text-sm mb-4">06. what&apos;s next?</p>
        <h2 className="font-display font-semibold uppercase tracking-tight leading-[0.95] text-pf-text text-5xl md:text-7xl lg:text-8xl">
          <TitleReveal text="Let's build" /><br />
          <span className="text-pf-dim"><TitleReveal text="something great." /></span>
        </h2>
        <p className="mt-6 text-pf-dim max-w-xl">
          Have a project in mind, a role to fill, or just want to say hi?
          My inbox is always open — I&apos;ll get back to you as soon as I can.
        </p>

        <div className="mt-20 grid lg:grid-cols-12 gap-14">
          {/* contact details */}
          <Reveal className="lg:col-span-5 space-y-9" stagger={0.1}>
            <div>
              <p className={labelClass}>Email</p>
              <a href="mailto:me.sanjeevks@gmail.com" className="link-underline font-display text-xl md:text-2xl text-pf-text hover:text-pf-accent transition-colors">
                me.sanjeevks@gmail.com
              </a>
            </div>

            <div>
              <p className={labelClass}>Phone</p>
              <a href="tel:+917987914125" className="link-underline font-display text-xl text-pf-text hover:text-pf-accent transition-colors">
                +91 7987914125
              </a>
            </div>

            <div>
              <p className={labelClass}>Location</p>
              <p className="font-display text-xl text-pf-text flex items-center gap-2">
                <MapPin size={18} className="text-pf-accent" /> Bhopal, India
              </p>
            </div>

            <div>
              <p className={labelClass}>Socials</p>
              <div className="mt-2 flex gap-5">
                <a href="https://github.com/sanjeevnode" target="_blank" rel="noopener noreferrer" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="GitHub">
                  <Github size={22} />
                </a>
                <a href="https://www.linkedin.com/in/sanjeevnode" target="_blank" rel="noopener noreferrer" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="LinkedIn">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:me.sanjeevks@gmail.com" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="Email">
                  <Mail size={22} />
                </a>
                <a href="tel:+917987914125" className="text-pf-dim hover:text-pf-accent transition-colors" aria-label="Phone">
                  <Phone size={22} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal className="lg:col-span-7" stagger={0.08}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className={labelClass}>Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input
                  type="number"
                  id="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  maxLength={1000}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass}
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <ReCAPTCHA
                sitekey={PUBLIC_KEY}
                size='invisible'
                ref={captchaRef}
              />

              <Magnetic>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-pf-accent text-pf-bg font-semibold transition-opacity duration-300 hover:opacity-90 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
