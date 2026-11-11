import { useState } from 'react';
import { featuredProjects, moreProjects, type FeaturedProject } from '../data/profile';
import { AbehaVisual, RailbroVisual, StockitVisual } from './ProjectVisuals';
import { ArrowUpRight, Plus } from './Icons';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import '../styles/projects.css';

const visuals = { abeha: AbehaVisual, railbro: RailbroVisual, stockit: StockitVisual };

function Links({ repo, live }: { repo?: string; live?: string }) {
  if (!repo && !live) return null;
  return (
    <p className="case__links">
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer">
          Source <ArrowUpRight width={14} height={14} />
        </a>
      )}
      {live && (
        <a href={live} target="_blank" rel="noreferrer">
          Live demo <ArrowUpRight width={14} height={14} />
        </a>
      )}
    </p>
  );
}

function CaseStudy({ project }: { project: FeaturedProject }) {
  const Visual = visuals[project.id];
  return (
    <article className={`case case--${project.id}`} aria-labelledby={`case-${project.id}`}>
      <Reveal as="header" className="case__head">
        <span className="case__index">{project.index}</span>
        <div>
          <h3 id={`case-${project.id}`} className="case__name">
            {project.name}
          </h3>
          <p className="case__title">{project.title}</p>
        </div>
        <dl className="case__meta">
          <div>
            <dt>Type</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{project.period}</dd>
          </div>
        </dl>
      </Reveal>

      <div className="case__body">
        <Reveal className="case__visual">
          <Visual />
        </Reveal>

        <div className="case__text">
          <Reveal>
            {project.badge && <p className="case__badge">{project.badge}</p>}
            <p className="case__summary">{project.summary}</p>
          </Reveal>
          <div className="case__cols">
            <Reveal>
              <h4 className="label">Problem</h4>
              <p>{project.problem}</p>
            </Reveal>
            <Reveal delay={80}>
              <h4 className="label">Solution</h4>
              <p>{project.solution}</p>
            </Reveal>
            <Reveal delay={160}>
              <h4 className="label">My contribution</h4>
              <p>{project.contribution}</p>
            </Reveal>
          </div>
          <Reveal className="case__foot">
            <div>
              <h4 className="label">Key features</h4>
              <ul className="case__features">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="label">Built with</h4>
              <ul className="tags">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Links repo={project.repo} live={project.live} />
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/** Moves a soft light across whichever project visual is under the cursor. */
function spotlight(e: React.PointerEvent) {
  const visual = (e.target as Element).closest<HTMLElement>('.visual');
  if (!visual) return;
  const rect = visual.getBoundingClientRect();
  visual.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  visual.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function Projects() {
  const [open, setOpen] = useState<string | null>(moreProjects[0].name);

  return (
    <section className="projects section" id="work" aria-labelledby="work-title" onPointerMove={spotlight}>
      <div className="container">
        <SectionHead
          id="work-title"
          index="03"
          label="Selected work"
          aside="Three case studies, six more builds"
          title="Projects that began with a real problem."
        />

        {featuredProjects.map((project) => (
          <CaseStudy key={project.id} project={project} />
        ))}

        <div className="index">
          <Reveal>
            <h3 className="index__title">More builds</h3>
          </Reveal>
          <ul className="index__list">
            {moreProjects.map((p, i) => {
              const isOpen = open === p.name;
              const panel = `index-panel-${i}`;
              return (
                <Reveal as="li" key={p.name} delay={i * 40} className={`index__item ${isOpen ? 'is-open' : ''}`}>
                  <button type="button" aria-expanded={isOpen} aria-controls={panel} onClick={() => setOpen(isOpen ? null : p.name)}>
                    <span className="index__num">{String(i + 4).padStart(2, '0')}</span>
                    <span className="index__name">{p.name}</span>
                    <span className="index__desc">{p.descriptor}</span>
                    <span className="index__year">{p.year}</span>
                    <Plus className="index__icon" width={18} height={18} />
                  </button>
                  <div className="index__panel" id={panel} inert={!isOpen}>
                    <div>
                      <div className="index__content">
                        <p>{p.summary}</p>
                        <div>
                          {p.award && <p className="case__badge">{p.award}</p>}
                          <ul className="tags">
                            {p.stack.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                          <Links repo={p.repo} live={p.live} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
