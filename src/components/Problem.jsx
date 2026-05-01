import { problems } from "@/data/content";

export default function Problem() {
  return (
    <section className="problem" id="about">
      <div className="section-header">
        <div className="section-label">The Challenge</div>
        <h2 className="section-title">
          Healthcare Often Feels Rushed.
          <br />
          Families Deserve Better.
        </h2>
        <p className="section-sub">
          For many families, visiting a clinic can feel confusing, hurried, or
          impersonal. Parents want clarity, working professionals want
          convenience, and elderly patients want patience and reassurance.
        </p>
      </div>

      <div className="problem-grid">
        {problems.map((item) => (
          <div key={item.title} className="problem-card">
            <div className="problem-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
