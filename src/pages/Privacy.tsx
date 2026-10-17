import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { Icon } from '../components/Icon';

const DRAFT = true; // set to false once reviewed by counsel
const UPDATED = 'October 16, 2026';

type Section = { id: string; title: string; body: string; todo?: boolean };

const SECTIONS: Section[] = [
  { id: 'wallet-addresses', title: 'Wallet Addresses', body: 'We read your public wallet address when you connect. We do not store wallet addresses on our servers.' },
  { id: 'no-personal-data', title: 'No Personal Data Collection', body: 'We do not collect names, emails, or other personally identifiable information.' },
  { id: 'public-blockchain', title: 'Public Blockchain Data', body: 'Transactions on the blockchain are public and permanent. We cannot edit or delete them.', todo: true },
  { id: 'third-parties', title: 'Third-Party Services', body: 'Wallet providers, RPC nodes, hosting and any analytics may log technical data such as IP addresses. List each provider here.', todo: true },
  { id: 'local-storage', title: 'Cookies and Local Storage', body: 'What the site stores in your browser, if anything, to be added.', todo: true },
  { id: 'your-rights', title: 'Your Rights', body: 'Access, deletion and complaint rights by jurisdiction to be added.', todo: true },
  { id: 'children', title: 'Children', body: 'Age restrictions to be added.', todo: true },
  { id: 'changes', title: 'Changes to This Policy', body: 'How updates are announced to be added.', todo: true },
  { id: 'contact', title: 'Contact', body: `Privacy questions: ${config.media.contactEmail}.` },
];

const KEY_POINTS = [
  'We read your public wallet address when you connect.',
  'We do not store wallet addresses on our servers.',
  'We do not collect names, emails or other personal data.',
];

export default function Privacy() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <section className="section legal" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Privacy Policy.</h2>
      <p className="legal-meta">
        <span>Last updated {UPDATED}</span>
        <button className="legal-print" onClick={() => window.print()}>Print</button>
      </p>


      <div className="box legal-key">
        <b>Key points</b>
        <ul>{KEY_POINTS.map(k => <li key={k}>{k}</li>)}</ul>
      </div>

      <div className="legal-layout">
        <aside className="legal-toc" aria-label="On this page">
          <button className="btn sm legal-toc-btn" onClick={() => setTocOpen(o => !o)} aria-expanded={tocOpen}>
            On this page {tocOpen ? '−' : '+'}
          </button>
          <div className={`box legal-toc-list${tocOpen ? ' open' : ''}`}>
            <ol>
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} onClick={() => setTocOpen(false)}>
                    <span>{String(i + 1).padStart(2, '0')}</span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="legal-content">
          <p>This Privacy Policy describes how we handle information when you use the Moai Club website.</p>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-sec">
              <h3>
                <span>{i + 1}.</span> {s.title}
                {DRAFT && s.todo && <em className="tag">Needs review</em>}
              </h3>
              <p>{s.body}</p>
            </section>
          ))}
          <p className="legal-end">See also our <Link to="/terms">Terms of Service</Link>.</p>
        </div>
      </div>
    </section>
  );
}