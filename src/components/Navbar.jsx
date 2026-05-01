export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="nav-logo">
        <img
          src="/vithara-logo.png"
          alt="Vithara Care Clinic logo"
          className="nav-logo-img"
        />

        <span className="nav-logo-text">
          Vithara <span>Care</span>
        </span>
      </a>

      <ul className="nav-links">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#how">How It Works</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
      </ul>

      <a href="#appointment" className="nav-cta">
        Book a Visit
      </a>
    </nav>
  );
}