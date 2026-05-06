import Appointment from "../models/Appointment.js";
import getAppointmentIntent from "../utils/appointmentIntent.js";

// POST /api/appointments  (public)
export const createAppointment = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    patientType,
    service,
    preferredDate,
    preferredTime,
    message,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !service ||
    !preferredDate ||
    !preferredTime
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  const cleanPhone = String(phone).replace(/\s/g, "");

  if (!/^[0-9]{10}$/.test(cleanPhone)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid 10-digit phone number.",
    });
  }

  const intent = getAppointmentIntent(service);

  const appointment = await Appointment.create({
    fullName,
    email,
    phone: cleanPhone,
    patientType: patientType || "",
    service,
    preferredDate,
    preferredTime,
    message: message || "",
    intent,
    status: "pending",
  });

  res.status(201).json({
    success: true,
    message:
      "Thank you! Your appointment request has been submitted successfully.",
    appointment,
  });
};

// GET /api/appointments  (admin only)
export const getAppointments = async (req, res) => {
  const { status, service, limit = 50, page = 1 } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (service) filter.service = service;

  const total = await Appointment.countDocuments(filter);

  const appointments = await Appointment.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

  res.json({
    success: true,
    total,
    page: Number(page),
    appointments,
  });
};

// PATCH /api/appointments/:id/status  (admin only)
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
    });
  }

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: "Appointment not found.",
    });
  }

  res.json({
    success: true,
    message: "Appointment status updated.",
    appointment,
  });
};