import { Resend } from "resend";
import type { ContactFormData } from "@/lib/validations/contact";
import { logger } from "@/lib/logger";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Stiamond <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@stiamond.net";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("Email: RESEND_API_KEY not set, skipping email");
    return null;
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendContactNotification(data: ContactFormData) {
  const resend = getResend();
  if (!resend) {
    return { skipped: true as const };
  }

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
    <p><strong>Project type:</strong> ${data.projectType}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br />")}</p>
  `;

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: data.email,
    subject: `New contact form submission from ${data.firstName} ${data.lastName}`,
    html,
  });

  if (error) {
    logger.error("Email: Resend API returned error", new Error(error.message), {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
    });
    throw new Error(error.message);
  }

  logger.info("Email: contact notification sent", { id: result?.id, to: TO_EMAIL });
  return { skipped: false as const, id: result?.id };
}

type ReplyEmailParams = {
  to: string;
  recipientName: string;
  senderName: string;
  message: string;
  conversationUrl: string;
  isClientEmail: boolean;
};

export async function sendReplyEmail({
  to,
  recipientName,
  senderName,
  message,
  conversationUrl,
  isClientEmail,
}: ReplyEmailParams) {
  const resend = getResend();
  if (!resend) {
    return { skipped: true as const };
  }

  const subject = isClientEmail
    ? `Re: Your message to Stiamond — ${senderName}`
    : `New reply from ${senderName}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${isClientEmail ? "Stiamond Team replied to your message" : `New reply from ${senderName}`}</h2>
      <p>Hi ${recipientName},</p>
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0; white-space: pre-wrap;">${message.replace(/\n/g, "<br />")}</p>
      </div>
      ${isClientEmail ? `
      <p style="color: #555; font-size: 14px; margin: 16px 0;">
        You can reply directly to this email, or use the link below to view the full conversation and reply online.
      </p>
      ` : ""}
      <p>
        <a href="${conversationUrl}" style="display: inline-block; background: #1a4d8f; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">
          View conversation & reply
        </a>
      </p>
      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        Stiamond — Intelligent software for ambitious teams
      </p>
    </div>
  `;

  const { data: result, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    replyTo: isClientEmail ? TO_EMAIL : undefined,
    subject,
    html,
  });

  if (error) {
    logger.error("Email: reply email failed", new Error(error.message), { to, subject });
    throw new Error(error.message);
  }

  logger.info("Email: reply notification sent", { id: result?.id, to });
  return { skipped: false as const, id: result?.id };
}
