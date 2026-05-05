"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import { apiRequest } from "@/lib/api";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState({
    loading: true,
    error: "",
    success: "",
  });

  const fetchAppointments = async () => {
    try {
      setStatus({
        loading: true,
        error: "",
        success: "",
      });

      const data = await apiRequest("/appointments");

      const appointmentList =
        data.appointments || data.data || data.requests || [];

      setAppointments(appointmentList);

      if (appointmentList.length > 0 && !selectedAppointment) {
        setSelectedAppointment(appointmentList[0]);
      }

      setStatus({
        loading: false,
        error: "",
        success: "",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Unable to load appointment requests.",
        success: "",
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const data = await apiRequest(`/appointments/${appointmentId}/status`, {
        method: "PATCH",
        body: {
          status: newStatus,
        },
      });

      const updatedAppointment =
        data.appointment || data.updatedAppointment || data.data;

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointmentId
            ? { ...item, status: newStatus, ...(updatedAppointment || {}) }
            : item
        )
      );

      setSelectedAppointment((prev) =>
        prev && prev._id === appointmentId
          ? { ...prev, status: newStatus, ...(updatedAppointment || {}) }
          : prev
      );

      setStatus({
        loading: false,
        error: "",
        success: "Appointment status updated successfully.",
      });
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Unable to update appointment status.",
        success: "",
      });
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not provided";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (value) => {
    return `appointment-status-pill ${value || "pending"}`;
  };

  return (
    <ProtectedRoute>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <div className="admin-page-label">Appointment Status Board</div>
              <h1 className="admin-page-title">
                Manage Appointment Requests
              </h1>
              <p className="admin-page-subtitle">
                View patient requests, understand appointment intent, and update
                booking status.
              </p>
            </div>

            <button
              type="button"
              className="admin-primary-btn"
              onClick={fetchAppointments}
            >
              Refresh
            </button>
          </div>

          {status.error && <div className="admin-error">{status.error}</div>}

          {status.success && (
            <div className="admin-success">{status.success}</div>
          )}

          {status.loading ? (
            <div className="admin-loading">Loading appointment requests...</div>
          ) : appointments.length === 0 ? (
            <div className="admin-section-card">
              <h3>No appointment requests yet</h3>
              <p>
                Once patients submit the appointment form, their requests will
                appear here.
              </p>
            </div>
          ) : (
            <div className="appointments-panel">
              <section className="admin-section-card appointments-table-card">
                <div className="appointments-table-header">
                  <h3>Appointment Requests</h3>
                  <span>{appointments.length} total</span>
                </div>

                <div className="appointments-table-wrap">
                  <table className="admin-table appointments-table">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments.map((appointment) => (
                        <tr
                          key={appointment._id}
                          className={
                            selectedAppointment?._id === appointment._id
                              ? "selected-row"
                              : ""
                          }
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <td>
                            <strong>{appointment.fullName}</strong>
                            <small>{appointment.email}</small>
                          </td>

                          <td>{appointment.service}</td>

                          <td>{formatDate(appointment.preferredDate)}</td>

                          <td>{appointment.preferredTime || "Not provided"}</td>

                          <td>
                            <span
                              className={getStatusClass(appointment.status)}
                            >
                              {appointment.status || "pending"}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="table-view-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppointment(appointment);
                              }}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {selectedAppointment && (
                <aside className="appointment-details-card">
                  <div className="appointment-details-header">
                    <div>
                      <p className="admin-page-label">Selected Request</p>
                      <h3>{selectedAppointment.fullName}</h3>
                    </div>

                    <span
                      className={getStatusClass(selectedAppointment.status)}
                    >
                      {selectedAppointment.status || "pending"}
                    </span>
                  </div>

                  <div className="appointment-detail-grid">
                    <div className="appointment-detail-item">
                      <span>Email</span>
                      <strong>{selectedAppointment.email}</strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Phone</span>
                      <strong>{selectedAppointment.phone}</strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Patient Type</span>
                      <strong>
                        {selectedAppointment.patientType || "Not specified"}
                      </strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Service Needed</span>
                      <strong>{selectedAppointment.service}</strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Appointment Intent</span>
                      <strong>
                        {selectedAppointment.intent || "Not assigned"}
                      </strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Preferred Date</span>
                      <strong>
                        {formatDate(selectedAppointment.preferredDate)}
                      </strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Preferred Time</span>
                      <strong>
                        {selectedAppointment.preferredTime || "Not provided"}
                      </strong>
                    </div>

                    <div className="appointment-detail-item">
                      <span>Requested On</span>
                      <strong>{formatDate(selectedAppointment.createdAt)}</strong>
                    </div>
                  </div>

                  <div className="appointment-message-box">
                    <span>Additional Message</span>
                    <p>
                      {selectedAppointment.message ||
                        "No additional message provided."}
                    </p>
                  </div>

                  <div className="appointment-status-update">
                    <label htmlFor="appointment-status">Update Status</label>
                    <select
                      id="appointment-status"
                      value={selectedAppointment.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedAppointment._id,
                          e.target.value
                        )
                      }
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <a
                    className="appointment-mail-link"
                    href={`mailto:${selectedAppointment.email}`}
                  >
                    Reply to Patient
                  </a>
                </aside>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}