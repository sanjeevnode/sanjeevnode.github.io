// app/api/mail/route.ts
import { NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";

const mailtrap = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN! });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    if (!name || !email || !phone || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: "All fields and reCAPTCHA token are required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaToken}`,
      { method: "POST" }
    );
    const captchaJson = await captchaRes.json();

    if (!captchaJson.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed." },
        { status: 403 }
      );
    }

    const htmlMessage = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
    `;

    const mailData = {
      from: {
        name: "Contact Form",
        email: process.env.SENDER_EMAIL!,
      },
      to: [{ email: process.env.RECIVER_EMAIL! }],
      subject: "New Contact Form Submission",
      text: `${name} (${email}, ${phone}): ${message}`,
      html: htmlMessage,
    };

    const response = await mailtrap.send(mailData);

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
