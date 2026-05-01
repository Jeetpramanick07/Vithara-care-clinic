import { benefits } from "@/data/content";

export default function Benefits() {
  return (
    <section className="benefits">
      <div className="section-header centered">
        <div className="section-label">Why It Matters</div>
        <h2 className="section-title">Small Details That Make Care Feel Better</h2>
        <p className="section-sub">
          Every feature at Vithara is designed with an emotional benefit —
          because healthcare is as much about feeling safe as it is about
          feeling better.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((b) => (
          <div key={b.title} className="benefit-card">
            <div className="benefit-feature">{b.feature}</div>
            <div className="benefit-title">{b.title}</div>
            <div className="benefit-desc">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
