"use server";

import {
  MAILTRAP_TOKEN,
  RECIVER_EMAIL,
  SENDER_EMAIL,
} from "@/constants/Constants";
import { MailtrapClient } from "mailtrap";

export async function sendMailAction(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken: string;
}) {
  const { name, email, phone, message, recaptchaToken } = formData;

  if (!name || !email || !phone || !message || !recaptchaToken) {
    throw new Error("All fields and reCAPTCHA token are required.");
  }

  // Verify reCAPTCHA
  const captchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const captchaJson = await captchaRes.json();

  if (!captchaJson.success) {
    throw new Error("reCAPTCHA verification failed.");
  }

  const htmlMessage = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
  `;

  const mailtrap = new MailtrapClient({ token: MAILTRAP_TOKEN });

  const mailData = {
    from: {
      name: "Contact Form",
      email: SENDER_EMAIL,
    },
    to: [{ email: RECIVER_EMAIL }],
    subject: "Contact Form Submission",
    text: `${name} (${email}, ${phone}): ${message}`,
    html: htmlMessage,
  };

  const response = await mailtrap.send(mailData);

  return { success: true, response };
}
