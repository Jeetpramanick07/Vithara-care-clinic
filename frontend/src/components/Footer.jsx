export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Vithara Care Clinic</h3>

          <p>
            Compassionate Care for Every Generation.
            <br />
            A neighborhood clinic built on trust,
            <br />
            warmth, and the belief that great
            <br />
            healthcare should feel personal.
          </p>

          <div className="footer-contact">
            <a href="mailto:vidharthacareclinic@gmail.com">
              ✉️ vidharthacareclinic@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="#services">General Consultation</a>
            </li>
            <li>
              <a href="#services">Pediatric Care</a>
            </li>
            <li>
              <a href="#services">Preventive Checkups</a>
            </li>
            <li>
              <a href="#services">Family Healthcare</a>
            </li>
            <li>
              <a href="#services">Wellness Programs</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Clinic</h4>
          <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#why">Why Choose Vithara</a>
            </li>
            <li>
              <a href="#how">How It Works</a>
            </li>
            <li>
              <a href="#testimonials">Patient Stories</a>
            </li>
            <li>
              <a href="#appointment">Book a Visit</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#appointment">Book Appointment</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#appointment">Patient Support</a>
            </li>
            <li>
              <a href="#footer">Privacy Policy</a>
            </li>
            <li>
              <a href="/admin/login" className="staff-access-link">
                Staff Access
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom" id="footer">
        <p>© 2026 Vithara Care Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}