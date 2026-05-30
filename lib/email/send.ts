import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from,
}: SendEmailParams): Promise<void> {
  const fromAddress =
    from ?? process.env.RESEND_FROM_EMAIL ?? "hello@draftpilot.dev";

  await resend.emails.send({
    from: `draftpilot <${fromAddress}>`,
    to,
    subject,
    html,
  });
}
