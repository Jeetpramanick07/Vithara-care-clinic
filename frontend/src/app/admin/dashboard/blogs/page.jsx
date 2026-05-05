"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  const loadBlogs = async () => {
    try {
      const data = await apiRequest("/blogs/admin/all");
      setBlogs(data.blogs || []);
      setStatus({ loading: false, error: "" });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = async (id) => {
    if (!confirm("Delete this Care Journal post?")) return;
    try {
      await apiRequest(`/blogs/${id}`, { method: "DELETE" });
      await loadBlogs();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <main className="admin-layout">
        <AdminSidebar />
        <section className="admin-content">
          <div className="admin-page-head">
            <div>
              <div className="section-label">Care Journal Manager</div>
              <h1>Manage Health Articles</h1>
              <p>Create, edit, publish, feature, or delete patient-friendly care content.</p>
            </div>
            <Link href="/admin/dashboard/blogs/new" className="btn-primary">
              New Article
            </Link>
          </div>

          {status.error && <p className="form-error">{status.error}</p>}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {status.loading ? (
                  <tr><td colSpan="6">Loading blogs...</td></tr>
                ) : blogs.length ? (
                  blogs.map((blog) => (
                    <tr key={blog._id}>
                      <td>
                        <strong>{blog.title}</strong>
                        <span>{blog.readTime}</span>
                      </td>
                      <td>{blog.category}</td>
                      <td>{blog.careLevel}</td>
                      <td><span className={`status-pill ${blog.status}`}>{blog.status}</span></td>
                      <td>{blog.featured ? "Yes" : "No"}</td>
                      <td className="table-actions">
                        <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>Edit</Link>
                        {blog.status === "published" && (
                          <Link href={`/blogs/${blog.slug}`} target="_blank">View</Link>
                        )}
                        <button onClick={() => deleteBlog(blog._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No Care Journal posts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
