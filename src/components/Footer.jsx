export default function Footer() {
  return (
    <footer className="footer">
      <a href="#" className="footer-logo">
        Vithara <span>Care</span> Clinic
      </a>
      <span>© {new Date().getFullYear()} Vithara Care Clinic. All rights reserved.</span>
      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}
