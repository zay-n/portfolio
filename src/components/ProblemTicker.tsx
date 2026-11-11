import { useEffect, useState } from 'react';
import { solved } from '../data/profile';
import { prefersReducedMotion } from '../hooks/motion';
import { ArrowUpRight } from './Icons';

const pad = (n: number) => String(n).padStart(2, '0');

/** Cycles through real problems and what was built for each. Pauses on hover and focus. */
export default function ProblemTicker() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  useEffect(() => setAnimate(!prefersReducedMotion()), []);

  const item = solved[index];
  const next = () => setIndex((i) => (i + 1) % solved.length);

  return (
    <a className="solve" href="#work">
      <span className="solve__head">
        <span>Problem → what I built</span>
        <span>
          {pad(index + 1)} / {pad(solved.length)}
        </span>
      </span>
      <span className="solve__body" key={index}>
        <span className="solve__problem">{item.problem}</span>
        <span className="solve__built">
          <ArrowUpRight width={15} height={15} /> {item.built}
        </span>
      </span>
      {/* The progress bar is the timer: when its animation ends, the next item shows. */}
      {animate && <span className="solve__bar" key={`bar-${index}`} onAnimationEnd={next} />}
    </a>
  );
}
