import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = { index: string; label: string; title: ReactNode; aside?: string; id: string };

export default function SectionHead({ index, label, title, aside, id }: Props) {
  return (
    <header className="sec-head">
      <div className="sec-head__meta">
        <span>
          <b>{index}</b> / {label}
        </span>
        {aside && <span className="sec-head__aside">{aside}</span>}
      </div>
      <Reveal>
        <h2 id={id} className="sec-head__title">
          {title}
        </h2>
      </Reveal>
    </header>
  );
}
