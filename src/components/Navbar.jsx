export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="nav-logo">
        Vithara <span>Care</span>
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