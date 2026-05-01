const whyItems = [
  {
    title: "Certified Medical Professionals",
    text: "Feel confident knowing your family is cared for by qualified and trusted doctors.",
  },
  {
    title: "Hygienic Modern Facility",
    text: "A clean, calm, and comfortable clinic environment for every patient visit.",
  },
  {
    title: "Patient-First Care",
    text: "Consultations are designed around listening, clarity, and personal attention.",
  },
  {
    title: "Easy Appointment Scheduling",
    text: "Book visits conveniently without confusion, long waiting stress, or delays.",
  },
  {
    title: "Friendly Support Staff",
    text: "A warm support team helps families feel guided from booking to follow-up.",
  },
  {
    title: "Transparent Consultation Process",
    text: "Patients understand the next steps, prescriptions, and follow-up guidance clearly.",
  },
];

export default function WhyChoose() {
  return (
    <section className="why">
      <div className="section-header">
        <div className="section-label">Why Vithara</div>
        <h2 className="section-title">
          Why Families Feel Comfortable Choosing Vithara
        </h2>
      </div>

      <div className="why-layout">
        <div className="why-points">
          {whyItems.map((item) => (
            <div className="why-point" key={item.title}>
              <div className="why-check">✓</div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>

        <div className="why-callout">
          <p>
            “Every part of the clinic experience is designed to reduce stress
            and increase trust — from the moment you book to the moment you
            leave.”
          </p>
        </div>
      </div>

      <div className="why-carousel mobile-carousel">
        {whyItems.map((item, index) => (
          <article className="why-carousel-card" key={item.title}>
            <div className="why-carousel-number">{index + 1}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}