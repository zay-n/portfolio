import { experience } from '../data/profile';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import '../styles/experience.css';

export default function Experience() {
  return (
    <section className="experience section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="04"
          label="Experience & leadership"
          aside="Building people, not only products"
          title="Starting things, and getting a room full of people to build with me."
        />
        <ol className="timeline">
          {experience.map((item) => (
            <Reveal as="li" key={item.org} className="timeline__item">
              <div className="timeline__when">
                <span className="timeline__node" aria-hidden="true" />
                {item.period ?? 'Initiative'}
              </div>
              <div className="timeline__who">
                <h3>{item.org}</h3>
                <p>{item.role}</p>
                {item.context && <p className="timeline__context">{item.context}</p>}
              </div>
              <ul className="timeline__points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
