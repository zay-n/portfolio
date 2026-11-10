import { achievements, certifications, publication } from '../data/profile';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import '../styles/recognition.css';

export default function Recognition() {
  return (
    <section className="recognition section" id="recognition" aria-labelledby="recognition-title">
      <div className="container">
        <SectionHead
          id="recognition-title"
          index="05"
          label="Achievements & recognition"
          aside="Competitions, research, certifications"
          title="Tested in competition, and in print."
        />

        <Reveal className="paper">
          <p className="label">{publication.kind}</p>
          <h3>{publication.title}</h3>
          <p>{publication.summary}</p>
          <span className="paper__venue">{publication.venue}</span>
        </Reveal>

        <ol className="awards">
          {achievements.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 50} className={`awards__row ${a.rank === '1st' ? 'is-first' : ''}`}>
              <span className="awards__rank">
                {a.rank.slice(0, 1)}
                <sup>{a.rank.slice(1)}</sup>
              </span>
              <h3>{a.title}</h3>
              <span className="awards__detail">{a.detail}</span>
              <time>{a.date}</time>
            </Reveal>
          ))}
        </ol>

        <div className="certs">
          <Reveal>
            <h3 className="certs__title">Certifications</h3>
          </Reveal>
          <ul className="certs__grid">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.issuer} delay={(i % 3) * 60}>
                <span className="label">{c.issuer}</span>
                <ul>
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
