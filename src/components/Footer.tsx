import { profile } from '../data/profile';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__word" aria-hidden="true">
        Zayan Sameer
      </p>
      <div className="footer__bar container">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
