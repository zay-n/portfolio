import { facts } from '../data/profile';
import Reveal from './Reveal';
import '../styles/facts.css';

export default function Facts() {
  return (
    <section className="facts" aria-label="At a glance">
      <ul className="facts__grid container">
        {facts.map((fact, i) => (
          <Reveal as="li" key={fact.label} delay={i * 80} className="facts__item">
            <span className="facts__value">{fact.value}</span>
            <span className="facts__label">{fact.label}</span>
            <span className="facts__detail">{fact.detail}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
