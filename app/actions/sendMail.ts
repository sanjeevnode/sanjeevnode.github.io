"use server";

import {
  MAILTRAP_TOKEN,
  RECIVER_EMAIL,
  SENDER_EMAIL,
} from "@/constants/Constants";
import { MailtrapClient } from "mailtrap";
import { google } from "googleapis";




export async function sendToSheet(
  name: string,
  email: string,
  phone: string,
  message: string,
): Promise<void> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL as string,
      private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n",
      ),
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
}


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

    // Initialize Mailtrap client
    console.log("Initializing Mailtrap client...");
    const client = new MailtrapClient({ token: MAILTRAP_TOKEN });

    const sender = {
      email: SENDER_EMAIL,
      name: "sanjeevnode.in",
    };

    const recipients = [
      {
        email: RECIVER_EMAIL, // Send to the site owner
      }
    ];

    const userRecipients = [
      {
        email: email, // Send to the user who filled the form
      }
    ];

    const templateResponse = await client.send({
      from: sender,
      to: userRecipients,
      template_uuid: "61b25511-86a7-4f6b-ae1d-a7b7b1484a02",
      template_variables: {
        "user_name": name,
        "user_message": message,
        "next_step_link": "https://sanjeevnode.in",
        "get_started_link": "https://sanjeevnode.in",
        "onboarding_video_link": "https://sanjeevnode.in"
      }
    });

    await sendToSheet(name, email, phone, message);


    const toReciver = await client.send({
      from: sender,
      to: recipients,
      template_uuid: "b2042f38-0121-4dd6-be09-217350e2feac",
      template_variables: {
        user_name: name,
        user_phone: phone,
        user_email: email,
        user_message: message,
        next_step_link: "https://sanjeevnode.in",
        get_started_link: "https://sanjeevnode.in",
        onboarding_video_link: "https://sanjeevnode.in"
      },
    });

    return { success: true, templateResponse, toReciver };
  } catch (error) {
    console.error("Error in sendMailAction:", error);
    
    // Return a user-friendly error message
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to send email. Please try again later.");
  }
}
