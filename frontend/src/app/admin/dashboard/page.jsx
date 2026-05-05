"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminSidebar from "@/components/AdminSidebar";
import { apiRequest } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState({
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiRequest("/admin/stats");

        setStats(data);
        setStatus({
          loading: false,
          error: "",
        });
      } catch (error) {
        setStatus({
          loading: false,
          error:
            error.response?.data?.message ||
            error.message ||
            "Unable to load dashboard statistics.",
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <div className="admin-page-label">Care Pulse Dashboard</div>
              <h1 className="admin-page-title">Clinic Activity Overview</h1>
              <p className="admin-page-subtitle">
                Track content performance and appointment interest from one
                place.
              </p>
            </div>

            <Link
              href="/admin/dashboard/blogs/new"
              className="admin-primary-btn"
            >
              Create Journal Post
            </Link>
          </div>

          {status.loading && (
            <div className="admin-loading">Loading dashboard...</div>
          )}

          {status.error && <div className="admin-error">{status.error}</div>}

          {stats && (
            <>
              <div className="admin-card-grid">
                <div className="admin-stat-card">
                  <span>Total Blogs</span>
                  <strong>{stats.totalBlogs || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Published</span>
                  <strong>{stats.publishedBlogs || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Drafts</span>
                  <strong>{stats.draftBlogs || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Featured</span>
                  <strong>{stats.featuredBlogs || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Appointments</span>
                  <strong>{stats.totalAppointments || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Pending</span>
                  <strong>{stats.pendingAppointments || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Confirmed</span>
                  <strong>{stats.confirmedAppointments || 0}</strong>
                </div>

                <div className="admin-stat-card">
                  <span>Completed</span>
                  <strong>{stats.completedAppointments || 0}</strong>
                </div>
              </div>

              <section className="admin-insight-grid">
                <div className="admin-section-card">
                  <h3>Care Insights</h3>

                  <div className="admin-insight-list">
                    <div>
                      <span>Most Requested Service</span>
                      <strong>{stats.mostRequestedService || "—"}</strong>
                    </div>

                    <div>
                      <span>Most Used Blog Category</span>
                      <strong>{stats.mostUsedBlogCategory || "—"}</strong>
                    </div>

                    <div>
                      <span>Cancelled Appointments</span>
                      <strong>{stats.cancelledAppointments || 0}</strong>
                    </div>
                  </div>
                </div>

                <div className="admin-section-card">
                  <h3>Quick Actions</h3>

                  <div className="admin-action-grid">
                    <Link
                      href="/admin/dashboard/blogs/new"
                      className="admin-action-card"
                    >
                      <strong>New Article</strong>
                      <span>Create a Care Journal post</span>
                    </Link>

                    <Link
                      href="/admin/dashboard/appointments"
                      className="admin-action-card"
                    >
                      <strong>View Appointments</strong>
                      <span>Manage patient requests</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="admin-section-card">
                <div className="admin-section-header">
                  <h3>Recent Appointments</h3>
                  <Link href="/admin/dashboard/appointments">View all</Link>
                </div>

                {stats.recentAppointments?.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stats.recentAppointments.map((appointment) => (
                        <tr key={appointment._id}>
                          <td>
                            <strong>{appointment.fullName}</strong>
                            <small>{appointment.email}</small>
                          </td>
                          <td>{appointment.service}</td>
                          <td>{appointment.preferredDate}</td>
                          <td>
                            <span
                              className={`appointment-status-pill ${
                                appointment.status || "pending"
                              }`}
                            >
                              {appointment.status || "pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No appointment requests yet.</p>
                )}
              </section>

              <section className="admin-section-card">
                <div className="admin-section-header">
                  <h3>Recent Care Journal Posts</h3>
                  <Link href="/admin/dashboard/blogs">View all</Link>
                </div>

                {stats.recentBlogs?.length > 0 ? (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Featured</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stats.recentBlogs.map((blog) => (
                        <tr key={blog._id}>
                          <td>
                            <strong>{blog.title}</strong>
                            <small>{blog.readTime || 1} min read</small>
                          </td>
                          <td>{blog.category}</td>
                          <td>
                            <span className="journal-status-pill">
                              {blog.status}
                            </span>
                          </td>
                          <td>{blog.featured ? "Yes" : "No"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No Care Journal posts yet.</p>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}