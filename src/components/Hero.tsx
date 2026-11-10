import { profile, resumeHref } from '../data/profile';
import Magnetic from './Magnetic';
import NetworkCanvas from './NetworkCanvas';
import { ArrowDown, Download, GitHub, LinkedIn, Mail } from './Icons';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero__glow" aria-hidden="true" />
      <NetworkCanvas />

      <div className="hero__main container">
        <p className="hero__eyebrow rise" style={{ animationDelay: '80ms' }}>
          <span className="hero__dot" aria-hidden="true" />
          {profile.role} — {profile.focus.join(' · ')}
        </p>

        <h1 className="hero__name">
          <span className="line">
            <span style={{ animationDelay: '160ms' }}>{profile.firstLine}</span>
          </span>{' '}
          <span className="line">
            <span style={{ animationDelay: '260ms' }}>{profile.secondLine}</span>
          </span>
        </h1>

        <div className="hero__row">
          <p className="hero__headline rise" style={{ animationDelay: '520ms' }}>
            {profile.headline}
          </p>
          <div className="hero__intro rise" style={{ animationDelay: '620ms' }}>
            <p>{profile.intro}</p>
            <div className="hero__cta">
              <Magnetic>
                <a className="btn btn--primary" href="#work">
                  Explore my work <ArrowDown width={16} height={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn" href={resumeHref} download>
                  Download resume <Download width={16} height={16} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__foot container rise" style={{ animationDelay: '760ms' }}>
        <ul className="hero__social" aria-label="Social links">
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              <GitHub width={16} height={16} /> GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              <LinkedIn width={16} height={16} /> LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`}>
              <Mail width={16} height={16} /> Email
            </a>
          </li>
        </ul>
        <p className="hero__status">
          {profile.availability} · {profile.classOf}
        </p>
        <a className="hero__scroll" href="#about">
          Scroll <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
