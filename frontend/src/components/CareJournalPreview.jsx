"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { apiRequest } from "@/lib/api";

export default function CareJournalPreview() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiRequest("/blogs?limit=3");
        setBlogs(data.blogs || []);
      } catch (error) {
        setBlogs([]);
      }
    };

    loadBlogs();
  }, []);

  if (!blogs.length) return null;

  return (
    <section className="care-journal-preview" id="journal">
      <div className="section-header centered">
        <div className="section-label">Vithara Care Journal</div>
        <h2 className="section-title">Patient-Friendly Health Articles</h2>
        <p className="section-sub">
          Simple care guidance written for families, children, adults, and elderly patients.
        </p>
      </div>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>

      <div className="centered journal-link-wrap">
        <Link href="/blogs" className="btn-secondary">View Care Journal</Link>
      </div>
    </section>
  );
}
