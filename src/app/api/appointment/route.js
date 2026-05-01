import nodemailer from "nodemailer";

export async function GET() {
  return Response.json({
    success: true,
    message: "Appointment API is running.",
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      patientType,
      service,
      preferredDate,
      preferredTime,
      message,
    } = body;

    if (!fullName || !email || !phone || !service || !preferredDate || !preferredTime) {
      return Response.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid 10-digit phone number.",
        },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.ADMIN_EMAIL) {
      return Response.json(
        {
          success: false,
          message: "Missing Gmail environment variables.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Vithara Care Clinic" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Appointment Request - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background:#faf7f2; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:16px;">
            <h2 style="color:#4E7A54;">New Appointment Request</h2>
            <p>A new appointment request has been submitted through the Vithara Care Clinic website.</p>

            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Full Name</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Email</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Phone</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Patient Type</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${patientType || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Service</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${service}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Preferred Date</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${preferredDate}</td>
              </tr>
              <tr>
                <td style="padding:10px; border-bottom:1px solid #eee;"><strong>Preferred Time</strong></td>
                <td style="padding:10px; border-bottom:1px solid #eee;">${preferredTime}</td>
              </tr>
              <tr>
                <td style="padding:10px;"><strong>Message</strong></td>
                <td style="padding:10px;">${message || "No message provided"}</td>
              </tr>
            </table>

            <p style="margin-top:24px; color:#555;">
              Please contact the patient to confirm the appointment.
            </p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Vithara Care Clinic" <${process.env.GMAIL_USER}>`,
      to: email,
      replyTo: process.env.ADMIN_EMAIL,
      subject: "Thank you for booking with Vithara Care Clinic",
      html: `
        <div style="font-family: Arial, sans-serif; background:#faf7f2; padding:24px;">
          <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:16px;">
            <h2 style="color:#4E7A54;">Thank you, ${fullName}</h2>

            <p>
              We have received your appointment request at 
              <strong>Vithara Care Clinic</strong>.
            </p>

            <p>
              Our clinic team will review your request and contact you shortly to confirm your appointment.
            </p>

            <div style="background:#f2ede4; padding:16px; border-radius:12px; margin:20px 0;">
              <p style="margin:0;"><strong>Requested Service:</strong> ${service}</p>
              <p style="margin:6px 0 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>
              <p style="margin:6px 0 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>
            </div>

            <p>
              At Vithara Care Clinic, we believe healthcare should feel calm, personal, and reassuring.
            </p>

            <p style="margin-top:24px;">
              Warm regards,<br/>
              <strong>Vithara Care Clinic Team</strong><br/>
              ${process.env.GMAIL_USER}
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message:
        "Thank you! Your appointment request has been submitted. Please check your email.",
    });
  } catch (error) {
    console.error("Appointment email error:", error);

    return Response.json(
      {
        success: false,
        message: "Appointment request failed. Please check server logs.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}