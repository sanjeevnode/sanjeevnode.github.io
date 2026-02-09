"use server";

import {
  MAILTRAP_TOKEN,
  RECIVER_EMAIL,
  SENDER_EMAIL,
} from "@/constants/Constants";
import { MailtrapClient } from "mailtrap";
import { google } from "googleapis";

const sendToSheet = async (
  name: string,
  email: string,
  phone: string,
  message: string,
): Promise<void> => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL as string,
      private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID as string,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, phone, message, new Date().toLocaleString()]],
    },
  });
};

const sendTemplateEmail = async (
  client: MailtrapClient,
  sender: { email: string; name: string },
  recipientEmail: string,
  templateUuid: string,
  variables: Record<string, string>
) => {
  return client.send({
    from: sender,
    to: [{ email: recipientEmail }],
    template_uuid: templateUuid,
    template_variables: variables,
  });
};

const verifyCaptcha = async (recaptchaToken: string): Promise<void> => {
  const captchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.CAPTCHA_SECRET}&response=${recaptchaToken}`,
    }
  );

  const captchaJson = await captchaRes.json();
  if (!captchaJson.success) {
    throw new Error("reCAPTCHA verification failed.");
  }
};


export async function sendMailAction(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken: string;
}) {
  try {
    const { name, email, phone, message, recaptchaToken } = formData;

    if (!name || !email || !phone || !message || !recaptchaToken) {
      throw new Error("All fields and reCAPTCHA token are required.");
    }

    if (!process.env.CAPTCHA_SECRET) {
      throw new Error("Server configuration error: CAPTCHA_SECRET missing");
    }

    if (!MAILTRAP_TOKEN || !SENDER_EMAIL || !RECIVER_EMAIL) {
      throw new Error("Server configuration error: Email service not configured");
    }

    await verifyCaptcha(recaptchaToken);

    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });
    const sender = { email: SENDER_EMAIL, name: "sanjeevnode.in" };

    const templateVars = {
      next_step_link: "https://sanjeevnode.in",
      get_started_link: "https://sanjeevnode.in",
      onboarding_video_link: "https://sanjeevnode.in"
    };

    const [userEmailResponse, adminEmailResponse] = await Promise.all([
      sendTemplateEmail(
        client,
        sender,
        email,
        "61b25511-86a7-4f6b-ae1d-a7b7b1484a02",
        { user_name: name, user_message: message, ...templateVars }
      ),
      sendTemplateEmail(
        client,
        sender,
        RECIVER_EMAIL,
        "b2042f38-0121-4dd6-be09-217350e2feac",
        { user_name: name, user_phone: phone, user_email: email, user_message: message, ...templateVars }
      ),
      sendToSheet(name, email, phone, message),
    ]);

    return { success: true, userEmailResponse, adminEmailResponse };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to send email. Please try again later.");
  }
}
