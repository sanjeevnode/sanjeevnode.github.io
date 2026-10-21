'use client';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { sendMailAction } from '@/app/actions/sendMail';
import { getCaptchaPublicKey } from '@/constants/Constants';

const EMPTY = { name: '', email: '', phone: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  // reCAPTCHA pulls a large Google script: load it once someone starts filling the form, not with the page.
  const [armed, setArmed] = useState(false);
  const captcha = useRef<ReCAPTCHA>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recaptchaToken = await captcha.current?.executeAsync();
      captcha.current?.reset();
      if (!recaptchaToken) {
        toast.error('reCAPTCHA failed. Please try again.');
        return;
      }
      await sendMailAction({ ...form, recaptchaToken });
      toast.success('Message sent. I will reply soon.');
      setForm(EMPTY);
    } catch (err: unknown) {
      console.error('Send mail error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={submit} onFocusCapture={() => setArmed(true)} data-reveal="up" data-delay="0.1">
      <Toaster position="bottom-right" toastOptions={{ style: { borderRadius: 0, background: '#0C0D10', color: '#E9EBEE' } }} />
      <div className="form__pair">
        <label className="field">
          <span className="field__label">Name</span>
          <input name="name" autoComplete="name" value={form.name} onChange={change} placeholder="Your name" required />
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={change} placeholder="you@example.com" required />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Phone</span>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          pattern="[0-9]{10}"
          maxLength={10}
          title="10 digit phone number"
          value={form.phone}
          onChange={change}
          placeholder="10 digit number"
          required
        />
      </label>
      <label className="field">
        <span className="field__label">Message</span>
        <textarea name="message" rows={4} maxLength={1000} value={form.message} onChange={change} placeholder="Tell me about your project" required />
      </label>

      {armed && <ReCAPTCHA sitekey={getCaptchaPublicKey()} size="invisible" ref={captcha} />}

      <div className="form__send">
        <button type="submit" className="btn btn--signal" disabled={loading}>
          <span className="btn__fill" aria-hidden="true" />
          <span className="btn__label">{loading ? 'Sending' : 'Send message'}</span>
          <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
        <span className="form__node" aria-hidden="true" />
      </div>
      <p className="form__legal">
        Protected by reCAPTCHA. Google&apos;s{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.
      </p>
    </form>
  );
}
