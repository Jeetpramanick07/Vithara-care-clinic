import { steps } from "@/data/content";

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how">
      <div className="section-header centered">
        <div className="section-label">The Process</div>
        <h2 className="section-title">
          A Simple Visit, Designed Around Your Comfort
        </h2>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div key={step.num} className="step">
            <div className="step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
