import { solutionPoints } from "@/data/content";

export default function Solution() {
  return (
    <section className="solution" id="services">
      <div className="solution-layout">
        {/* Left — Visual box with points */}
        <div className="solution-visual">
          <div className="section-label">Our Approach</div>
          <h2 className="section-title">
            Meet Vithara — Your Family&apos;s Everyday Care Partner
          </h2>

          <div className="solution-points">
            {solutionPoints.map((pt) => (
              <div key={pt.title} className="solution-point">
                <div className="solution-point-icon">{pt.icon}</div>
                <div className="solution-point-text">
                  <strong>{pt.title}</strong>
                  {pt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — description + CTA */}
        <div className="solution-right">
          <p>
            Vithara Care Clinic is designed for families who want healthcare
            that feels personal, organized, and reassuring. Every interaction is
            built around listening first and treating with care.
          </p>
          <a href="#cta" className="btn-primary">
            Book Your First Visit
          </a>
        </div>
      </div>
    </section>
  );
}
