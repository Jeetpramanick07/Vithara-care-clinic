const promiseCards = [
  { icon: "👂", label: "Listen First" },
  { icon: "💡", label: "Explain Clearly" },
  { icon: "🤝", label: "Care Continuously" },
];

export default function Promise() {
  return (
    <section className="promise">
      <div className="section-header centered">
        <div className="section-label">Our Commitment</div>
        <h2 className="section-title">Our Care Promise</h2>
      </div>

      <p className="promise-text">
        &ldquo;We listen with patience, explain with clarity, and care with warmth
        — so every patient feels respected, reassured, and supported.&rdquo;
      </p>

      <div className="promise-cards">
        {promiseCards.map((card) => (
          <div key={card.label} className="promise-card">
            <div className="promise-card-icon">{card.icon}</div>
            {card.label}
          </div>
        ))}
      </div>
    </section>
  );
}
