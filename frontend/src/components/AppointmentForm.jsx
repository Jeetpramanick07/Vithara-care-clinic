"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { apiRequest } from "@/lib/api";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  patientType: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export default function AppointmentForm() {
  const [formData, setFormData] = useState(initialFormData);

  const [status, setStatus] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmailNotifications = async (appointmentData) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const adminTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID;
    const patientTemplateId =
      process.env.NEXT_PUBLIC_EMAILJS_PATIENT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !adminTemplateId || !patientTemplateId || !publicKey) {
      throw new Error("EmailJS environment variables are missing.");
    }

    const templateParams = {
      clinic_email: "vitharacareclinic@gmail.com",

      full_name: appointmentData.fullName,
      patient_email: appointmentData.email,
      phone: appointmentData.phone,
      patient_type: appointmentData.patientType || "Not specified",
      service: appointmentData.service,
      preferred_date: appointmentData.preferredDate,
      preferred_time: appointmentData.preferredTime,
      message:
        appointmentData.message || "No additional message provided.",
    };

    await emailjs.send(serviceId, adminTemplateId, templateParams, publicKey);

    await emailjs.send(serviceId, patientTemplateId, templateParams, publicKey);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({
      loading: true,
      type: "",
      message: "",
    });

    try {
      await apiRequest("/appointments", {
        method: "POST",
        body: formData,
      });

      try {
        await sendEmailNotifications(formData);

        setStatus({
          loading: false,
          type: "success",
          message:
            "Appointment request submitted successfully. A confirmation email has been sent.",
        });
      } catch (emailError) {
        console.error("EmailJS sending failed:", emailError);

        setStatus({
          loading: false,
          type: "warning",
          message:
            "Appointment request saved successfully. Email notification could not be sent, but the clinic can still view your request.",
        });
      }

      setFormData(initialFormData);
    } catch (error) {
      setStatus({
        loading: false,
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Unable to submit appointment request. Please try again.",
      });
    }
  };

  return (
    <section className="appointment-section" id="appointment">
      <div className="section-header centered">
        <div className="section-label">Book a Visit</div>
        <h2 className="section-title">Request an Appointment</h2>
        <p className="section-sub">
          Share your preferred visit details and our care team will review your
          request.
        </p>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientType">Patient Type</label>
            <select
              id="patientType"
              name="patientType"
              value={formData.patientType}
              onChange={handleChange}
            >
              <option value="">Select patient type</option>
              <option value="Child">Child</option>
              <option value="Adult">Adult</option>
              <option value="Senior Citizen">Senior Citizen</option>
              <option value="Family">Family</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Needed *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select service</option>
              <option value="Family Consultation">Family Consultation</option>
              <option value="Preventive Health Checkup">
                Preventive Health Checkup
              </option>
              <option value="Pediatric Care">Pediatric Care</option>
              <option value="Routine Wellness Support">
                Routine Wellness Support
              </option>
              <option value="Follow-up Consultation">
                Follow-up Consultation
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preferredDate">Preferred Date *</label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Time *</label>
            <input
              id="preferredTime"
              name="preferredTime"
              type="time"
              value={formData.preferredTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group form-full">
          <label htmlFor="message">Additional Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us anything we should know before your visit"
            rows={5}
          />
        </div>

        <button
          type="submit"
          className="btn-primary appointment-submit"
          disabled={status.loading}
        >
          {status.loading
            ? "Submitting Appointment..."
            : "Submit Appointment Request"}
        </button>

        {status.message && (
          <div className={`appointment-status ${status.type}`}>
            {status.message}
          </div>
        )}

        <p className="form-note">
          Your request will be stored securely and reviewed by the clinic team.
        </p>
      </form>
    </section>
  );
}