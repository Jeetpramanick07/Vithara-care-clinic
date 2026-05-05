const testimonials = [
  {
    name: "Priya R.",
    role: "Parent",
    initials: "PR",
    text: "I visited Vithara for my daughter's fever. The doctor was gentle, explained everything clearly, and made us feel calm throughout the entire visit.",
  },
  {
    name: "Arjun M.",
    role: "Patient",
    initials: "AM",
    text: "As a working professional, I appreciated how simple the appointment process was. The consultation felt personal and not rushed at all.",
  },
  {
    name: "Meena S.",
    role: "Family Caregiver",
    initials: "MS",
    text: "My parents prefer Vithara because the staff speaks kindly and the doctor takes time to explain every next step in their care journey.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-header centered">
        <div className="section-label">Families Share Their Experience</div>
        <h2 className="section-title">Stories of Care That Was Remembered</h2>
      </div>

      <div className="testimonials-grid mobile-carousel">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="quote-mark">"</div>

            <p className="testimonial-text">{item.text}</p>

            <div className="testimonial-author">
              <div className="author-avatar">{item.initials}</div>
              <div>
                <div className="author-name">{item.name}</div>
                <div className="author-role">{item.role}</div>
                <div className="stars">★★★★★</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}