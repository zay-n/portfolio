import { beyond } from '../data/profile';
import Reveal from './Reveal';
import '../styles/beyond.css';

export default function Beyond() {
  return (
    <section className="beyond section" aria-labelledby="beyond-title">
      <div className="container beyond__inner">
        <div>
          <div className="sec-head__meta">
            <span>
              <b>06</b> / Beyond the code
            </span>
          </div>
          <Reveal>
            <h2 id="beyond-title" className="beyond__title">
              What keeps me curious when nobody is grading it.
            </h2>
          </Reveal>
        </div>
        <ul className="beyond__list">
          {beyond.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 70}>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
