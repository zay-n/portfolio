import '../styles/visuals.css';

/** ABEHA — the emergency access flow, drawn as a system diagram. */
export function AbehaVisual() {
  const steps = [
    { tag: 'Trigger', title: 'Emergency request', body: 'Inter-hospital transfer, records unavailable' },
    { tag: 'AI', title: 'Identity resolution', body: 'AI-assisted patient matching' },
    { tag: 'Blockchain', title: 'Consent & audit', body: 'Consent checked, access logged' },
    { tag: 'IPFS', title: 'Encrypted records', body: 'Medical records retrieved' },
    { tag: 'Outcome', title: 'Treating team', body: 'Access for the people who need it' },
  ];
  return (
    <figure className="visual visual--abeha">
      <figcaption>
        <span>System diagram</span>
        <span>ABDM-aligned architecture</span>
      </figcaption>
      <ol className="flow">
        {steps.map((step, i) => (
          <li key={step.title} className="flow__step" style={{ transitionDelay: `${i * 110}ms` }}>
            <span className="flow__tag">{step.tag}</span>
            <strong>{step.title}</strong>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>
      <div className="flow__ledger" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.22}s` }} />
        ))}
        <span>audit trail</span>
      </div>
    </figure>
  );
}

/** RailBro — an illustrative sketch of the app's main screen. */
export function RailbroVisual() {
  return (
    <figure className="visual visual--railbro">
      <figcaption>
        <span>Interface sketch</span>
        <span>Illustrative</span>
      </figcaption>
      <div className="phone">
        <div className="phone__screen">
          <p className="phone__label">Crossing ahead</p>
          <div className="phone__status">
            <span className="phone__signal" aria-hidden="true" />
            <div>
              <strong>Likely closed</strong>
              <span>Predicted status</span>
            </div>
          </div>
          <svg className="phone__track" viewBox="0 0 220 70" aria-hidden="true">
            <path d="M0 35h220" />
            <path d="M0 47h220" />
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M${10 + i * 18} 30v22`} />
            ))}
            <path className="phone__road" d="M110 0v70" />
            <path className="phone__alt" d="M110 70C110 52 60 58 50 41S70 12 110 0" />
          </svg>
          <ul className="phone__list">
            <li>
              <span>Alternate route</span>
              <b>Suggested</b>
            </li>
            <li>
              <span>Commuter alert</span>
              <b>On</b>
            </li>
          </ul>
          <div className="phone__actions">
            <span>Book auto / taxi</span>
            <span>Order food</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

/** StockIT — an illustrative dashboard sketch: roles, stock movement and an ARIMA forecast. */
export function StockitVisual() {
  const roles = ['Super Admin', 'Company Admin', 'Staff', 'Viewer'];
  const bars = [62, 38, 74, 51, 86, 44];
  return (
    <figure className="visual visual--stockit">
      <figcaption>
        <span>Dashboard sketch</span>
        <span>Illustrative</span>
      </figcaption>
      <div className="dash">
        <ul className="dash__roles">
          {roles.map((role, i) => (
            <li key={role} className={i === 1 ? 'is-active' : ''}>
              {role}
            </li>
          ))}
        </ul>
        <div className="dash__chart">
          <div className="dash__legend">
            <span>Stock level</span>
            <span className="is-forecast">ARIMA forecast</span>
          </div>
          <svg viewBox="0 0 520 190" preserveAspectRatio="none" aria-hidden="true">
            {[38, 86, 134].map((y) => (
              <path key={y} className="dash__gridline" d={`M0 ${y}h520`} />
            ))}
            <path className="dash__band" d="M340 92C390 70 450 50 520 26V112C450 110 390 112 340 92Z" />
            <clipPath id="dash-wipe">
              <rect className="dash__wipe" width="346" height="190" />
            </clipPath>
            <path className="dash__line" clipPath="url(#dash-wipe)" d="M0 150C40 140 60 104 100 112S160 150 200 124 250 70 290 84 320 100 340 92" />
            <path className="dash__forecast" d="M340 92C390 88 450 82 520 66" />
            <circle className="dash__now" cx="340" cy="92" r="4" />
          </svg>
        </div>
        <div className="dash__moves">
          {bars.map((value, i) => (
            <span key={i} className={i % 2 ? 'is-out' : ''} style={{ '--v': `${value}%`, transitionDelay: `${i * 70}ms` } as React.CSSProperties} />
          ))}
          <p>
            <span>Stock in</span>
            <span className="is-out">Stock out</span>
          </p>
        </div>
      </div>
    </figure>
  );
}
