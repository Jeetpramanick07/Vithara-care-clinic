"use client";

import { useState } from "react";

// Backend API base URL — set NEXT_PUBLIC_API_URL in .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    patientType: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      setStatus({
        loading: false,
        success: result.message || "Thank you! Your appointment request has been submitted. Please check your email.",
        error: "",
      });

      setFormData({ fullName: "", email: "", phone: "", patientType: "", service: "", preferredDate: "", preferredTime: "", message: "" });
    } catch (error) {
      setStatus({ loading: false, success: "", error: error.message });
    }
  };

  return (
    <section className="appointment-section" id="appointment">
      <div className="section-header centered">
        <div className="section-label">Book Appointment</div>
        <h2 className="section-title">Schedule Your Family Visit</h2>
        <p className="section-sub">
          Share a few details and our clinic team will contact you to confirm your appointment.
        </p>
      </div>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input id="fullName" type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input id="email" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input id="phone" type="tel" name="phone" placeholder="Enter 10-digit phone number" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="patientType">Patient Type</label>
            <select id="patientType" name="patientType" value={formData.patientType} onChange={handleChange}>
              <option value="">Select patient type</option>
              <option value="Child">Child</option>
              <option value="Adult">Adult</option>
              <option value="Elderly Patient">Elderly Patient</option>
              <option value="Family Consultation">Family Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Needed *</label>
            <select id="service" name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select a service</option>
              <option value="Family Consultation">Family Consultation</option>
              <option value="Preventive Health Checkup">Preventive Health Checkup</option>
              <option value="Pediatric Care">Pediatric Care</option>
              <option value="Routine Wellness Support">Routine Wellness Support</option>
              <option value="Follow-up Consultation">Follow-up Consultation</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preferredDate">Preferred Date *</label>
            <input id="preferredDate" type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="preferredTime">Preferred Time *</label>
            <input id="preferredTime" type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} required />
          </div>

          <div className="form-group form-full">
            <label htmlFor="message">Additional Message</label>
            <textarea id="message" name="message" placeholder="Tell us anything we should know before your visit" rows="5" value={formData.message} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn-primary appointment-submit" disabled={status.loading}>
          {status.loading ? "Submitting..." : "Submit Appointment Request"}
        </button>

        {status.success && <p className="form-success">{status.success}</p>}
        {status.error && <p className="form-error">{status.error}</p>}
      </form>
    </section>
  );
}
