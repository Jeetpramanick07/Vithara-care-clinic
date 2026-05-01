import { whyPoints } from "@/data/content";

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="section-header">
        <div className="section-label">Why Vithara</div>
        <h2 className="section-title">
          Why Families Feel Comfortable Choosing Vithara
        </h2>
      </div>

      <div className="why-layout">
        <div className="why-points">
          {whyPoints.map((pt) => (
            <div key={pt} className="why-point">
              <div className="why-check">✓</div>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        <div className="why-callout">
          <p>
            &ldquo;Every part of the clinic experience is designed to reduce stress
            and increase trust — from the moment you book to the moment you
            leave.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
