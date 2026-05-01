export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-eyebrow fade-up">
          Compassionate Care for Every Generation
        </div>

        <h1 className="fade-up delay-1">
          A Family Clinic That Feels Like Someone{" "}
          <em>Truly Knows You</em>
        </h1>

        <p className="hero-sub fade-up delay-2">
          From your child&apos;s first fever to your parents&apos; routine
          checkup, Vithara Care Clinic provides compassionate consultations,
          preventive care, and everyday wellness support in a calm and trusted
          environment.
        </p>

        <div className="hero-btns fade-up delay-3">
          <a href="#appointment" className="btn-primary">
            Book a Family Visit
          </a>

          <a href="#cta" className="btn-secondary">
            Contact Clinic
          </a>
        </div>

        <div className="trust-badges fade-up delay-4">
          <span className="badge">🩺 Family-Focused Doctors</span>
          <span className="badge">👶 Gentle Pediatric Care</span>
          <span className="badge">🌿 Preventive Health Support</span>
          <span className="badge">✨ Calm Clinic Experience</span>
        </div>
      </div>

      <div className="hero-visual fade-up delay-2">
        <div className="hero-img-frame">
          <div className="hero-img-placeholder">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="40"
                cy="28"
                r="14"
                fill="rgba(78,122,84,0.3)"
              />
              <path
                d="M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24"
                stroke="rgba(78,122,84,0.5)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="60"
                cy="20"
                r="8"
                fill="rgba(196,113,74,0.2)"
              />
            </svg>

            <p>Family care illustration</p>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-title">Today&apos;s Care Support</div>

          <div className="hero-card-item">
            <span className="dot"></span> Family Consultation
          </div>

          <div className="hero-card-item">
            <span className="dot"></span> Preventive Checkup
          </div>

          <div className="hero-card-item">
            <span className="dot"></span> Pediatric Visit
          </div>

          <div className="hero-card-footer">✓ Slots available today</div>
        </div>

        <div className="stat-float">
          <div className="num">500+</div>
          <div className="label">Families Cared For</div>
        </div>
      </div>
    </section>
  );
}