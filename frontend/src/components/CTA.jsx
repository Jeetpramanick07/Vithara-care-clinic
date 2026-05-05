export default function CTA() {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-box">
        <div className="section-label" style={{ marginBottom: "0.5rem" }}>
          Begin Your Family&apos;s Care Journey
        </div>

        <h2 className="section-title" style={{ fontSize: "2.4rem" }}>
          Ready to Feel Truly Cared For?
        </h2>

        <p>
          Book a visit and experience healthcare that remembers, understands,
          and supports your entire family — across every generation.
        </p>

        <div>
          <a href="#appointment" className="btn-primary">
            Book a Family Visit
          </a>

          <a
            href="mailto:hello@vitharacare.com?subject=Appointment%20Enquiry%20-%20Vithara%20Care%20Clinic"
            className="btn-secondary"
            style={{
              color: "white",
              borderColor: "rgba(255,255,255,0.25)",
            }}
          >
            Contact Clinic
          </a>
        </div>
      </div>
    </section>
  );
}