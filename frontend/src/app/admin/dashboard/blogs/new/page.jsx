"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import BlogForm from "@/components/BlogForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

export default function NewBlogPage() {
  const router = useRouter();
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleCreate = async (formData) => {
    setStatus({ loading: true, error: "" });
    try {
      await apiRequest("/blogs", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      router.push("/admin/dashboard/blogs");
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  return (
    <ProtectedRoute>
      <main className="admin-layout">
        <AdminSidebar />
        <section className="admin-content">
          <div className="admin-page-head">
            <div>
              <div className="section-label">New Care Journal Post</div>
              <h1>Create Patient-Friendly Content</h1>
              <p>Add a health article with care level, tags, read time, and patient takeaway.</p>
            </div>
          </div>

          {status.error && <p className="form-error">{status.error}</p>}
          <BlogForm submitLabel="Create Blog" onSubmit={handleCreate} loading={status.loading} />
        </section>
      </main>
    </ProtectedRoute>
  );
}
