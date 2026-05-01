import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header centered">
        <div className="section-label">Families Share Their Experience</div>
        <h2 className="section-title">Stories of Care That Was Remembered</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            <div className="quote-mark">&ldquo;</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div
                className="author-avatar"
                style={{ background: t.color }}
              >
                {t.initials}
              </div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
                <div className="stars">★★★★★</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
