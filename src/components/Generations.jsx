import { generations } from "@/data/content";

export default function Generations() {
  return (
    <section className="generations" id="generations">
      <div className="section-header centered">
        <div className="section-label">For Every Stage of Life</div>
        <h2 className="section-title">Care for Every Generation of Your Family</h2>
        <p className="section-sub">
          Whether it&apos;s your child&apos;s checkup or your parents&apos; wellness visit,
          Vithara is a clinic built for all of you.
        </p>
      </div>

      <div className="gen-grid">
        {generations.map((gen) => (
          <div key={gen.title} className="gen-card">
            <div className="gen-emoji">{gen.emoji}</div>
            <h3>{gen.title}</h3>
            <p>{gen.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
