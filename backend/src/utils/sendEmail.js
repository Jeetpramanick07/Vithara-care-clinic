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

  return { gmailUser, gmailAppPassword, adminEmail };
};

const createTransporter = () => {
  const { gmailUser, gmailAppPassword } = getMailConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });
};

export const sendAdminAppointmentEmail = async (appointment) => {
  const transporter = createTransporter();
  const { gmailUser, adminEmail } = getMailConfig();

  console.log("Sending admin email to:", adminEmail);

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

  const info = await transporter.sendMail({
    from: `"Vithara Care Clinic" <${gmailUser}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Appointment Request — ${fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#faf7f2;padding:24px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;padding:32px;border-radius:16px;border-top:4px solid #4E7A54;">
          <h2 style="color:#4E7A54;margin-top:0;">New Appointment Request</h2>
          <p style="color:#555;">A new appointment request has been submitted through the Vithara Care Clinic website.</p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            ${[
              ["Full Name", fullName],
              ["Email", email],
              ["Phone", phone],
              ["Patient Type", patientType || "Not specified"],
              ["Service", service],
              ["Intent", intent || "—"],
              ["Preferred Date", preferredDate],
              ["Preferred Time", preferredTime],
              ["Message", message || "No message provided"],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #f0ebe3;font-weight:600;color:#333;width:40%;">${label}</td>
                <td style="padding:10px 12px;border-bottom:1px solid #f0ebe3;color:#555;">${value}</td>
              </tr>`
              )
              .join("")}
          </table>
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

  const { fullName, email, service, preferredDate, preferredTime } = appointment;

  console.log("Sending patient email to:", email);

  const info = await transporter.sendMail({
    from: `"Vithara Care Clinic" <${gmailUser}>`,
    to: email,
    replyTo: adminEmail,
    subject: "Thank You for Booking with Vithara Care Clinic",
    html: `
      <div style="font-family:Arial,sans-serif;background:#faf7f2;padding:24px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;padding:32px;border-radius:16px;border-top:4px solid #4E7A54;">
          <h2 style="color:#4E7A54;margin-top:0;">Thank you, ${fullName}</h2>

          <p style="color:#555;">
            We have received your appointment request at <strong>Vithara Care Clinic</strong>.
            Our team will review your request and contact you shortly to confirm your appointment.
          </p>

          <div style="background:#f2ede4;padding:20px;border-radius:12px;margin:24px 0;">
            <p style="margin:0 0 8px;"><strong>Requested Service:</strong> ${service}</p>
            <p style="margin:0 0 8px;"><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p style="margin:0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
          </div>

          <p style="margin-top:28px;color:#555;">
            Warm regards,<br/>
            <strong>Vithara Care Clinic Team</strong><br/>
            <a href="mailto:${gmailUser}" style="color:#4E7A54;">${gmailUser}</a>
          </p>
        </div>
      </div>
    `,
  });

  console.log("Patient email sent:", info.messageId);
  return info;
};