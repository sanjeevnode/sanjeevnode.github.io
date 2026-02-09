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
  try {
    const { name, email, phone, message, recaptchaToken } = formData;

    // Validate input fields
    if (!name || !email || !phone || !message || !recaptchaToken) {
      console.error("Missing required fields");
      throw new Error("All fields and reCAPTCHA token are required.");
    }

    // Validate environment variables
    if (!process.env.CAPTCHA_SECRET) {
      console.error("CAPTCHA_SECRET is not configured");
      throw new Error("Server configuration error: CAPTCHA_SECRET missing");
    }

    if (!MAILTRAP_TOKEN || !SENDER_EMAIL || !RECIVER_EMAIL) {
      console.error("Mailtrap configuration missing:", {
        hasToken: !!MAILTRAP_TOKEN,
        hasSender: !!SENDER_EMAIL,
        hasReceiver: !!RECIVER_EMAIL,
      });
      throw new Error("Server configuration error: Email service not configured");
    }

    // Verify reCAPTCHA
    console.log("Verifying reCAPTCHA...");
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaToken}`,
      }
    );

    const captchaJson = await captchaRes.json();
    console.log("reCAPTCHA verification result:", captchaJson);

    if (!captchaJson.success) {
      console.error("reCAPTCHA verification failed:", captchaJson);
      throw new Error("reCAPTCHA verification failed.");
    }

    // Prepare email content
    const htmlMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
    `;

    // Initialize Mailtrap client
    console.log("Initializing Mailtrap client...");
    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

    const sender = {
      email: SENDER_EMAIL,
      name: "Contact Form",
    };

    const recipients = [
      {
        email: RECIVER_EMAIL,
      }
    ];

    console.log("Sending email via Mailtrap...");
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Contact Form Submission",
      text: `${name} (${email}, ${phone}): ${message}`,
      html: htmlMessage,
      category: "Contact Form",
    });
    console.log("Email sent successfully:", response);

    return { success: true, response };
  } catch (error) {
    console.error("Error in sendMailAction:", error);
    
    // Return a user-friendly error message
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to send email. Please try again later.");
  }
}
