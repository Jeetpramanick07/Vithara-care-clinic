"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { apiRequest } from "@/lib/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await apiRequest("/blogs?limit=50");
        setBlogs(data.blogs || []);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };
    loadBlogs();
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(blogs.map((blog) => blog.category).filter(Boolean))];
  }, [blogs]);

  const featured = blogs.find((blog) => blog.featured) || blogs[0];
  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="blogs-page">
        <section className="blogs-hero">
          <div className="section-label">Vithara Care Journal</div>
          <h1>Simple Health Guidance for Every Generation</h1>
          <p>
            Patient-friendly articles with care tips, read time, and practical takeaways for families.
          </p>
        </section>

        {status.error && <p className="form-error">{status.error}</p>}
        {status.loading && <div className="admin-loader">Loading Care Journal...</div>}

        {!status.loading && featured && (
          <section className="featured-blog-section">
            <div className="section-header">
              <div className="section-label">Featured Care Article</div>
              <h2 className="section-title">Start with this patient-friendly guide</h2>
            </div>
            <div className="featured-blog-wrap">
              <BlogCard blog={featured} />
            </div>
          </section>
        )}

        <section className="all-blogs-section">
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {!filteredBlogs.length && !status.loading && (
            <p className="empty-state">No published Care Journal posts found.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
