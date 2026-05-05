"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/api";

function getSmartCta(category) {
  const map = {
    "Pediatric Care": {
      text: "Concerned about your child’s health? Book a Pediatric Visit.",
      service: "Pediatric Care",
    },
    "Preventive Care": {
      text: "Want to stay ahead of health concerns? Book a Preventive Checkup.",
      service: "Preventive Health Checkup",
    },
    "Elderly Care": {
      text: "Need regular support for your parents? Book a Family Visit.",
      service: "Family Consultation",
    },
    Wellness: {
      text: "Need personal wellness guidance? Book a Family Consultation.",
      service: "Routine Wellness Support",
    },
    "Family Health": {
      text: "Need care for your family? Book a Family Visit.",
      service: "Family Consultation",
    },
  };

  return map[category] || map["Family Health"];
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await apiRequest(`/blogs/${slug}`);
        setBlog(data.blog);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };
    if (slug) loadBlog();
  }, [slug]);

  const cta = useMemo(() => (blog ? getSmartCta(blog.category) : null), [blog]);

  return (
    <>
      <Navbar />
      <main className="blog-detail-page">
        {status.loading && <div className="admin-loader">Loading article...</div>}
        {status.error && <p className="form-error">{status.error}</p>}

        {blog && (
          <article className="blog-detail-card">
            <Link href="/blogs" className="back-link">← Back to Care Journal</Link>

            <div className="blog-meta-row detail-meta">
              <span className="blog-category">{blog.category}</span>
              <span className="care-level recommended">{blog.careLevel}</span>
              <span>{blog.readTime}</span>
            </div>

            <h1>{blog.title}</h1>
            <p className="blog-detail-excerpt">{blog.excerpt}</p>

            {blog.coverImage && <img src={blog.coverImage} alt={blog.title} className="blog-detail-cover" />}

            {blog.careTip && (
              <div className="patient-takeaway">
                <strong>Patient Takeaway</strong>
                <p>{blog.careTip}</p>
              </div>
            )}

            <div className="blog-detail-content">
              {blog.content.split("\n").map((para, index) => (
                para.trim() ? <p key={index}>{para}</p> : null
              ))}
            </div>

            <div className="blog-tags detail-tags">
              {(blog.tags || []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {cta && (
              <div className="blog-smart-cta">
                <h2>{cta.text}</h2>
                <Link href="/#appointment" className="btn-primary">Book Appointment</Link>
              </div>
            )}
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}
