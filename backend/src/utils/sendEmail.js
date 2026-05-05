import nodemailer from "nodemailer";

const requiredEnv = (name) => {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value.trim();
};

const getMailConfig = () => {
  const gmailUser = requiredEnv("GMAIL_USER");
  const gmailAppPassword = requiredEnv("GMAIL_APP_PASSWORD").replace(/\s/g, "");
  const adminEmail = requiredEnv("ADMIN_EMAIL");

  return {
    gmailUser,
    gmailAppPassword,
    adminEmail,
  };
};

const createTransporter = () => {
  const { gmailUser, gmailAppPassword } = getMailConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },

    connectionTimeout: 60000,
    greetingTimeout: 60000,
    socketTimeout: 60000,

    tls: {
      rejectUnauthorized: true,
    },
  });
};

export const verifyEmailTransporter = async () => {
  const transporter = createTransporter();

  try {
    await transporter.verify();
    console.log("Gmail SMTP transporter verified successfully.");
    return true;
  } catch (error) {
    console.error("Gmail SMTP transporter verification failed:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    return false;
  }
};

export const sendAdminAppointmentEmail = async (appointment) => {
  const transporter = createTransporter();
  const { gmailUser, adminEmail } = getMailConfig();

  const {
    fullName,
    email,
    phone,
    patientType,
    service,
    preferredDate,
    preferredTime,
    message,
    intent,
  } = appointment;

  console.log("Sending admin email to:", adminEmail);

  const info = await transporter.sendMail({
    from: `"Vithara Care Clinic" <${gmailUser}>`,
    to: adminEmail,
    replyTo: email || gmailUser,
    subject: `New Appointment Request — ${fullName || "Patient"}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #faf7f2; padding: 24px;">
        <div style="max-width: 620px; margin: auto; background: #ffffff; padding: 32px; border-radius: 16px; border-top: 4px solid #4E7A54;">
          <h2 style="color: #4E7A54; margin-top: 0;">New Appointment Request</h2>

          <p style="color: #555; line-height: 1.6;">
            A new appointment request has been submitted through the Vithara Care Clinic website.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Full Name</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${fullName || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Email</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${email || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Phone</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${phone || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Patient Type</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${patientType || "Not specified"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Service</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${service || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Intent</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${intent || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Preferred Date</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${preferredDate || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Preferred Time</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${preferredTime || "Not provided"}</td>
            </tr>

            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; font-weight: 600; color: #333;">Message</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f0ebe3; color: #555;">${message || "No message provided"}</td>
            </tr>
          </table>

          <p style="margin-top: 24px; color: #555;">
            Please log in to the admin dashboard to update the appointment status.
          </p>

          <p style="color: #888; font-size: 12px; margin-top: 32px;">
            Vithara Care Clinic · ${gmailUser}
          </p>
        </div>
      </div>
    `,
  });

  console.log("Admin email sent:", info.messageId);
  return info;
};

export const sendPatientConfirmationEmail = async (appointment) => {
  const transporter = createTransporter();
  const { gmailUser, adminEmail } = getMailConfig();

  const {
    fullName,
    email,
    service,
    preferredDate,
    preferredTime,
  } = appointment;

  if (!email) {
    console.warn("Patient email not sent because patient email is missing.");
    return null;
  }

  console.log("Sending patient email to:", email);

  const info = await transporter.sendMail({
    from: `"Vithara Care Clinic" <${gmailUser}>`,
    to: email,
    replyTo: adminEmail,
    subject: "Thank You for Booking with Vithara Care Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; background: #faf7f2; padding: 24px;">
        <div style="max-width: 620px; margin: auto; background: #ffffff; padding: 32px; border-radius: 16px; border-top: 4px solid #4E7A54;">
          <h2 style="color: #4E7A54; margin-top: 0;">Thank you, ${fullName || "there"}</h2>

          <p style="color: #555; line-height: 1.6;">
            We have received your appointment request at <strong>Vithara Care Clinic</strong>.
            Our team will review your request and contact you shortly to confirm your appointment.
          </p>

          <div style="background: #f2ede4; padding: 20px; border-radius: 12px; margin: 24px 0;">
            <p style="margin: 0 0 8px;"><strong>Requested Service:</strong> ${service || "Not provided"}</p>
            <p style="margin: 0 0 8px;"><strong>Preferred Date:</strong> ${preferredDate || "Not provided"}</p>
            <p style="margin: 0;"><strong>Preferred Time:</strong> ${preferredTime || "Not provided"}</p>
          </div>

          <p style="color: #555; line-height: 1.6;">
            At Vithara Care Clinic, we believe healthcare should feel calm, personal, and reassuring.
          </p>

          <p style="margin-top: 28px; color: #555; line-height: 1.6;">
            Warm regards,<br />
            <strong>Vithara Care Clinic Team</strong><br />
            <a href="mailto:${gmailUser}" style="color: #4E7A54;">${gmailUser}</a>
          </p>
        </div>
      </div>
    `,
  });

  console.log("Patient email sent:", info.messageId);
  return info;
};