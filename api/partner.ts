/// <reference types="node" />
import nodemailer from "nodemailer";

type PartnerPayload = {
  fullName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

type VercelRequestLike = {
  method?: string;
  body?: PartnerPayload;
};

type VercelResponseLike = {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(
  req: VercelRequestLike,
  res: VercelResponseLike,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactToEmail = process.env.CONTACT_TO_EMAIL || smtpUser;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
    const secure = smtpPort === 465;

    if (!smtpHost || !smtpUser || !smtpPass || !contactToEmail || !contactFromEmail) {
      console.error("Partner enquiry config validation failed", {
        smtpConfig: {
          hostPresent: Boolean(smtpHost),
          port: smtpPort,
          secure,
          userPresent: Boolean(smtpUser),
          passPresent: Boolean(smtpPass),
          fromPresent: Boolean(contactFromEmail),
          toPresent: Boolean(contactToEmail),
        },
      });
      return res.status(500).json({ error: "Email service is not configured." });
    }

    const { fullName, companyName, email, phone, message } = req.body ?? {};

    console.log("Partner enquiry request received", {
      fields: {
        fullNamePresent: Boolean(fullName),
        companyNamePresent: Boolean(companyName),
        emailPresent: Boolean(email),
        phonePresent: Boolean(phone),
        messagePresent: Boolean(message),
      },
      smtpConfig: {
        host: smtpHost,
        port: smtpPort,
        secure,
        user: smtpUser,
        from: contactFromEmail,
        to: contactToEmail,
      },
    });

    if (!fullName || !companyName || !email || !message) {
      return res.status(400).json({
        error: "Full name, company name, email, and business requirement are required.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Partner Enquiry from ${fullName}`,
      html: `
        <h2>New Partner Enquiry</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Company Name:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Business Requirement:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Partner enquiry email error", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send enquiry.",
    });
  }
}
