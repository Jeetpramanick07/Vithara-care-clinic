import Link from "next/link";

const levelClass = {
  Routine: "routine",
  Recommended: "recommended",
  Important: "important",
};

export default function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      {blog.coverImage ? (
        <img className="blog-cover" src={blog.coverImage} alt={blog.title} />
      ) : (
        <div className="blog-cover placeholder">Vithara Care Journal</div>
      )}

      <div className="blog-card-body">
        <div className="blog-meta-row">
          <span className="blog-category">{blog.category}</span>
          <span className={`care-level ${levelClass[blog.careLevel] || "routine"}`}>
            {blog.careLevel}
          </span>
        </div>

        <h3>{blog.title}</h3>
        <p>{blog.excerpt || "A patient-friendly article from Vithara Care Clinic."}</p>

        {blog.careTip && (
          <div className="care-tip-preview">
            <strong>Patient Takeaway:</strong> {blog.careTip}
          </div>
        )}

        <div className="blog-tags">
          {(blog.tags || []).slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="blog-card-footer">
          <span>{blog.readTime || "3 min read"}</span>
          <Link href={`/blogs/${blog.slug}`}>Read article</Link>
        </div>
      </div>
    </article>
  );
}
