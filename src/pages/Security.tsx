import { useState } from 'react';
import config from '../drop.config';
import { CopyField } from '../components/CopyField';
import { IconTile } from '../components/IconTile';

const ICONS: Array<{ name: 'error' | 'lock' | 'shield' | 'warning'; color: 'pink' | 'teal' | 'lime' | 'orange' }> = [
  { name: 'error', color: 'pink' },
  { name: 'lock', color: 'teal' },
  { name: 'shield', color: 'lime' },
  { name: 'warning', color: 'orange' },
];

export default function Security() {
  const { security } = config;
  const [checked, setChecked] = useState<boolean[]>(() => security.verifyChecklist.map(() => false));
  const total = security.verifyChecklist.length;
  const done = checked.filter(Boolean).length;

  const toggle = (i: number) => setChecked(c => c.map((v, n) => (n === i ? !v : v)));

  const subject = encodeURIComponent('Scam report');

  return (
    <section className="section sec" style={{ marginTop: '20px' }}>
      <div className="accent-band sec-band">
        <span className="tag sec-chip">Verified links only</span>
        <h2>Only trust these links.</h2>
        <p>These are the only official links. Bookmark them. Ignore everything else.</p>
        <div className="sec-links">
          {security.officialLinks.map((link, i) => (
            <CopyField key={i} label={link.label} value={link.url} />
          ))}
        </div>
      </div>

      <h2 className="section-title">Scam warnings.</h2>
      <div className="grid-4 sec-warn">
        {security.scamWarnings.map((warning, i) => {
          const icon = ICONS[i % ICONS.length];
          return (
            <div className="box" key={i}>
              <span className="sec-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="sec-icon"><IconTile name={icon.name} color={icon.color} size={40} /></div>
              <p>{warning}</p>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">Verify checklist.</h2>
      <div className="box sec-check">
        <div className="sec-progress">
          <span>{done} of {total} verified</span>
          <div className="sec-bar" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total}>
            <i style={{ width: total ? `${(done / total) * 100}%` : 0 }} />
          </div>
        </div>
        <ul>
          {security.verifyChecklist.map((item, i) => (
            <li key={i}>
              <label className={checked[i] ? 'on' : ''}>
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
        {total > 0 && done === total && <p className="sec-ok">All checks done. You are safe to proceed.</p>}
      </div>

      <div className="box-lg sec-report">
        <h3>Report a scam</h3>
        <p>If you encounter a scam using our name, report it.</p>
        <div className="hero-btns">
          <a className="btn primary" href={`mailto:${config.media.contactEmail}?subject=${subject}`}>
            {config.media.contactEmail}
          </a>
        </div>
      </div>

      <div className="box sec-tip">
        <strong>Tip:</strong> revoke unknown token approvals regularly using your wallet's built-in tools or a
        revoke checker.
      </div>
    </section>
  );
}