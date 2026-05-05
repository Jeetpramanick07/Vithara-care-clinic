"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import BlogForm from "@/components/BlogForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiRequest } from "@/lib/api";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState({ loading: true, saving: false, error: "" });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await apiRequest(`/blogs/admin/${id}`);
        setBlog(data.blog);
        setStatus({ loading: false, saving: false, error: "" });
      } catch (error) {
        setStatus({ loading: false, saving: false, error: error.message });
      }
    };
    loadBlog();
  }, [id]);

  const handleUpdate = async (formData) => {
    setStatus((prev) => ({ ...prev, saving: true, error: "" }));
    try {
      await apiRequest(`/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      router.push("/admin/dashboard/blogs");
    } catch (error) {
      setStatus((prev) => ({ ...prev, saving: false, error: error.message }));
    }
  };

  return (
    <ProtectedRoute>
      <main className="admin-layout">
        <AdminSidebar />
        <section className="admin-content">
          <div className="admin-page-head">
            <div>
              <div className="section-label">Edit Care Journal Post</div>
              <h1>Update Article</h1>
              <p>Modify content, status, care level, and featured settings.</p>
            </div>
          </div>

          {status.error && <p className="form-error">{status.error}</p>}
          {status.loading ? (
            <div className="admin-loader">Loading blog...</div>
          ) : blog ? (
            <BlogForm
              initialData={blog}
              submitLabel="Update Blog"
              onSubmit={handleUpdate}
              loading={status.saving}
            />
          ) : null}
        </section>
      </main>
    </ProtectedRoute>
  );
}
