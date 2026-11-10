import { useRef, type CSSProperties } from 'react';
import { about } from '../data/profile';
import { useScrollProgress } from '../hooks/useScrollProgress';
import Reveal from './Reveal';
import '../styles/about.css';

export default function About() {
  const statement = useRef<HTMLParagraphElement>(null);
  useScrollProgress(statement, 0.85, 0.5);
  const words = about.statement.split(' ');

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="sec-head__meta">
          <span>
            <b>01</b> / About
          </span>
          <span className="sec-head__aside">Who I am, briefly</span>
        </div>

        {/* Words light up as the paragraph scrolls through the viewport. */}
        <h2 id="about-title" className="about__statement" ref={statement} style={{ '--n': words.length } as CSSProperties}>
          {words.map((word, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {word}{' '}
            </span>
          ))}
        </h2>

        <div className="about__grid">
          <div className="about__copy">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 70}>
                {p}
              </Reveal>
            ))}
          </div>

          <aside className="about__side">
            <Reveal>
              <h3 className="label">How I work</h3>
              <ol className="about__principles">
                {about.principles.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="label">Education</h3>
              <ul className="about__edu">
                {about.education.map((e) => (
                  <li key={e.school}>
                    <strong>{e.school}</strong>
                    <span>{e.detail}</span>
                    <time>{e.period}</time>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}
