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
