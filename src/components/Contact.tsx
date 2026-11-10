import { useState } from 'react';
import { profile, resumeHref } from '../data/profile';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import { ArrowUpRight, Check, Copy, Download } from './Icons';
import '../styles/contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (insecure context or denied) — fall back to the mail client.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <div className="sec-head__meta">
          <span>
            <b>07</b> / Contact
          </span>
          <span className="sec-head__aside">{profile.availability}</span>
        </div>

        <Reveal>
          <h2 id="contact-title" className="contact__title">
            Have an interesting problem to solve? <em>Let’s build something that holds up.</em>
          </h2>
        </Reveal>

        <Reveal className="contact__mail">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <button type="button" onClick={copy} aria-label="Copy email address">
            {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </Reveal>

        <Reveal className="contact__row">
          <ul className="contact__links">
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight width={16} height={16} />
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight width={16} height={16} />
              </a>
            </li>
          </ul>
          <div className="contact__cta">
            <Magnetic>
              <a className="btn btn--primary" href={`mailto:${profile.email}?subject=Hello%20Zayan`}>
                Start a conversation <ArrowUpRight width={16} height={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn" href={resumeHref} download>
                Download resume <Download width={16} height={16} />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
