import { Link } from "react-router-dom";

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A5.5 5.5 0 1 1 6.5 14A5.5 5.5 0 0 1 12 8.5zm0 2A3.5 3.5 0 1 0 15.5 14A3.5 3.5 0 0 0 12 10.5zM18 6.8a1.2 1.2 0 1 1-1.2-1.2A1.2 1.2 0 0 1 18 6.8z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.6-1.5h1.7V5c-.3 0-1.3-.1-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V11H7v3h3.1v8h3.4z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.7L5.4 22H2l7.3-8.4L1 2h6.9l4.7 6.1L18.9 2zm-1.2 18h1.7L7.2 3.9H5.4L17.7 20z"
      />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 1 7 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 0 1 7-7zm0 9.5A2.5 2.5 0 1 0 9.5 9A2.5 2.5 0 0 0 12 11.5z"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.6 3 3.6 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3c1.2.4 2.4.6 3.7.6c.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C11 22 2 13 2 2c0-.6.4-1 1-1h4.3c.6 0 1 .4 1 1c0 1.3.2 2.5.6 3.7c.1.4 0 .8-.3 1.1L6.6 10.8z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5-8-5V6l8 5l8-5v2z"
      />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="container">
        <div className="footerTop">
          {/* Left: About text + socials (logo removed) */}
          <div>
            <p className="footerDesc footerDesc--noLogo">
              Your ultimate companion for exploring the breathtaking landscapes,
              rich history, and vibrant culture of Pakistan.
            </p>

            <div className="footerSocial" aria-label="Social links">
              <a
                className="socialBtn"
                href="https://www.instagram.com/guidetopakistanofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>

              <a
                className="socialBtn"
                href="https://www.facebook.com/GuidetoPakistan/reels/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <IconFacebook />
              </a>

              <a
                className="socialBtn"
                href="https://x.com/guidetopak_gtp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <IconX />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="footerTitle">Explore</div>
            <div className="footerLinks">
              <Link className="footerLink" to="/destinations">Destinations</Link>
              <Link className="footerLink" to="/tours">Tours</Link>
              <Link className="footerLink" to="/experiences">Experiences</Link>
              <Link className="footerLink" to="/plan-your-trip">Plan Your Trip</Link>
              <Link className="footerLink" to="/shop">Pakistan Shop</Link>
              <Link className="footerLink" to="/history">History</Link>
              <Link className="footerLink" to="/tiss">TISS</Link>
            </div>
          </div>

          {/* Company (Partnerships removed) */}
          <div>
            <div className="footerTitle">Company</div>
            <div className="footerLinks">
              <Link className="footerLink" to="/about">About Us</Link>
              <Link className="footerLink" to="/stories">Stories & Media</Link>
              <Link className="footerLink" to="/help">Help</Link>
              <Link className="footerLink" to="/legal">Legal</Link>
              <Link className="footerLink" to="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footerTitle">Contact Us</div>

            <div className="contactList">
              <div className="contactItem">
                <span className="iconDot"><IconLocation /></span>
                <span>
                  Office C03, Plaza 64, 7 Bahria Expy, Phase Rawalpindi, 46000
                </span>
              </div>

              <div className="contactItem">
                <span className="iconDot"><IconPhone /></span>
                <a className="contactLink" href="tel:+923261487487">
                  +92 326 1487 487
                </a>
              </div>

              <div className="contactItem">
                <span className="iconDot"><IconMail /></span>
                <a className="contactLink" href="mailto:hello@guidetopakistan.com">
                  hello@guidetopakistan.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="footerDivider" />

        <div className="footerBottom">
          <p className="copyright">
            © {year} Guide to Pakistan. All rights reserved.
          </p>

          <div className="bottomLinks" aria-label="Footer legal links">
            <Link className="bottomLink" to="/privacy-policy">Privacy Policy</Link>
            <Link className="bottomLink" to="/terms-and-conditions">Terms & Conditions</Link>
            <Link className="bottomLink" to="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}