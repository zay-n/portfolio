import { useMemo, useState } from 'react';
import { featuredProjects, moreProjects, skillGroups, skillNotes } from '../data/profile';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import '../styles/skills.css';

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  // Which projects use each skill — derived from project data, never hand-typed twice.
  const usage = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const project of [...featuredProjects, ...moreProjects]) {
      for (const skill of project.skills) map.set(skill, [...(map.get(skill) ?? []), project.name]);
    }
    return map;
  }, []);

  const projects = active ? (usage.get(active) ?? []) : [];
  const note = active ? skillNotes[active] : undefined;
  const group = active ? skillGroups.find((g) => g.items.includes(active))?.category : undefined;

  return (
    <section className="skills section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          index="02"
          label="Skills"
          aside="Tools with a track record"
          title="The stack I reach for, and where I’ve put it to work."
        />

        <div className="skills__layout">
          <div className="skills__inspector" aria-live="polite">
            <p className="label">Inspector</p>
            {active ? (
              <div className="skills__detail" key={active}>
                <p className="skills__name">{active}</p>
                <p className="skills__group">{group}</p>
                {projects.length > 0 && (
                  <>
                    <p className="label">Used in</p>
                    <ul>
                      {projects.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </>
                )}
                {note && <p className="skills__note">{note}</p>}
                {projects.length === 0 && !note && <p className="skills__note">Part of my working toolkit.</p>}
              </div>
            ) : (
              <p className="skills__hint">Select any skill to see the projects and results behind it.</p>
            )}
          </div>

          <dl className="skills__table">
            {skillGroups.map((g, gi) => (
              <Reveal key={g.category} delay={gi * 50} className="skills__row">
                <dt>
                  <span>{String(gi + 1).padStart(2, '0')}</span>
                  {g.category}
                </dt>
                <dd>
                  {g.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="skill"
                      aria-pressed={active === item}
                      data-linked={usage.has(item) || item in skillNotes || undefined}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                      onClick={() => setActive(item)}
                    >
                      {item}
                    </button>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
