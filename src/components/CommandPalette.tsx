import { useEffect, useMemo, useRef, useState } from 'react';
import { navItems, profile, resumeHref } from '../data/profile';
import { scrollToId, setScrollLocked } from '../hooks/useSmoothScroll';
import '../styles/palette.css';

type Command = { label: string; hint: string; run: () => void };

const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** Keyboard-first command menu (Ctrl/⌘ + K): jump to a section or take a quick action. */
export default function CommandPalette({ open: isOpen, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(
    () => [
      ...navItems.map((item) => ({ label: `Go to ${item.label}`, hint: 'Section', run: () => scrollToId(item.id) })),
      { label: 'Back to top', hint: 'Section', run: () => scrollToId('top') },
      {
        label: 'Download resume',
        hint: 'Action',
        run: () => {
          const a = document.createElement('a');
          a.href = resumeHref;
          a.download = profile.resumeFile;
          a.click();
        },
      },
      { label: 'Copy email address', hint: 'Action', run: () => void navigator.clipboard?.writeText(profile.email) },
      { label: 'Send an email', hint: 'Action', run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Open GitHub', hint: 'Link', run: () => open(profile.links.github) },
      { label: 'Open LinkedIn', hint: 'Link', run: () => open(profile.links.linkedin) },
    ],
    [],
  );

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  useEffect(() => {
    setScrollLocked(isOpen);
    if (isOpen) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      input.current?.focus();
    } else {
      lastFocus.current?.focus?.();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const run = (command?: Command) => {
    if (!command) return;
    setOpen(false);
    setScrollLocked(false); // unlock before scrolling so the jump is not swallowed
    command.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Tab') e.preventDefault(); // keep focus inside the dialog
  };

  return (
    <div className="palette" onClick={() => setOpen(false)}>
      <div className="palette__panel" role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <input
          ref={input}
          className="palette__input"
          type="text"
          placeholder="Where to? Type a section or action…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `palette-${active}` : undefined}
          aria-label="Search commands"
        />
        <ul className="palette__list" id="palette-list" role="listbox">
          {results.map((command, i) => (
            <li
              key={command.label}
              id={`palette-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerMove={() => setActive(i)}
              onClick={() => run(command)}
            >
              <span>{command.label}</span>
              <span className="palette__hint">{command.hint}</span>
            </li>
          ))}
          {results.length === 0 && <li className="palette__empty">Nothing matches “{query}”.</li>}
        </ul>
        <p className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </p>
      </div>
    </div>
  );
}
