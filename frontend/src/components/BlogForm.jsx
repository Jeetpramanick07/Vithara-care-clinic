"use client";

import { useMemo, useState } from "react";

const categories = [
  "Family Health",
  "Pediatric Care",
  "Preventive Care",
  "Elderly Care",
  "Wellness",
  "Follow-up Care",
];

const careLevels = ["Routine", "Recommended", "Important"];

export default function BlogForm({ initialData, submitLabel = "Save Blog", onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "Family Health",
    tags: Array.isArray(initialData?.tags) ? initialData.tags.join(", ") : initialData?.tags || "",
    careTip: initialData?.careTip || "",
    careLevel: initialData?.careLevel || "Routine",
    coverImage: initialData?.coverImage || "",
    status: initialData?.status || "draft",
    featured: Boolean(initialData?.featured),
  });

  const readTimePreview = useMemo(() => {
    const words = formData.content.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  }, [formData.content]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group form-full">
          <label>Blog Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Why preventive checkups matter"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Care Level</label>
          <select name="careLevel" value={formData.careLevel} onChange={handleChange}>
            {careLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="form-group form-full">
          <label>Short Excerpt</label>
          <textarea
            name="excerpt"
            rows="3"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="A short summary shown on blog cards"
          />
        </div>

        <div className="form-group form-full">
          <label>Full Content *</label>
          <textarea
            name="content"
            rows="12"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write the full patient-friendly article here..."
            required
          />
          <small>Preview: {readTimePreview}</small>
        </div>

        <div className="form-group form-full">
          <label>Patient Takeaway / Care Tip</label>
          <textarea
            name="careTip"
            rows="3"
            value={formData.careTip}
            onChange={handleChange}
            placeholder="A simple patient-friendly takeaway"
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="checkup, family, wellness"
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Mark as featured article
        </label>
      </div>

      <button className="btn-primary admin-submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
