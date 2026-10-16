import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { Icon } from '../components/Icon';

const DRAFT = true; // set to false once the text is reviewed by counsel
const UPDATED = 'October 16, 2026';

type Section = { id: string; title: string; body: string; todo?: boolean };

const SECTIONS: Section[] = [
  { id: 'digital-collectibles', title: 'Digital Collectibles', body: 'Moai Club NFTs are digital collectibles on the Ethereum blockchain. They do not represent ownership of any physical item or financial instrument.' },
  { id: 'no-financial-advice', title: 'No Financial Advice', body: 'Nothing on this site constitutes financial advice. NFTs are speculative digital assets.' },
  { id: 'blockchain-transactions', title: 'Blockchain Transactions', body: 'All transactions are final. We cannot reverse, refund, or cancel blockchain transactions.' },
  { id: 'eligibility', title: 'Eligibility', body: 'Age and jurisdiction requirements to be added.', todo: true },
  { id: 'intellectual-property', title: 'Intellectual Property and License', body: 'Artwork ownership and the license granted to holders to be added.', todo: true },
  { id: 'risks', title: 'Risks', body: 'Smart contract, market, wallet and network risks to be added.', todo: true },
  { id: 'third-parties', title: 'Third-Party Services', body: 'Marketplaces, wallets and external links to be added.', todo: true },
  { id: 'liability', title: 'Limitation of Liability', body: 'To be added.', todo: true },
  { id: 'changes', title: 'Changes to These Terms', body: 'How updates are announced to be added.', todo: true },
  { id: 'governing-law', title: 'Governing Law', body: 'To be added.', todo: true },
  { id: 'contact', title: 'Contact', body: `Questions about these terms: ${config.media.contactEmail}.` },
];

const KEY_POINTS = [
  'NFTs are digital collectibles, not financial instruments.',
  'Nothing here is financial advice.',
  'Blockchain transactions are final and cannot be reversed.',
];

export default function Terms() {
  const [tocOpen, setTocOpen] = useState(false);

  const toc = (
    <ol>
      {SECTIONS.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} onClick={() => setTocOpen(false)}>
            <span>{String(i + 1).padStart(2, '0')}</span>{s.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <section className="section legal" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Terms of Service.</h2>
      <p className="legal-meta">
        <span>Last updated {UPDATED}</span>
        <button className="legal-print" onClick={() => window.print()}>Print</button>
      </p>

      {DRAFT && (
        <div className="legal-placeholder">
          <Icon name="warning" size={16} /> Replace with reviewed legal text before launch.
        </div>
      )}

      <div className="box legal-key">
        <b>Key points</b>
        <ul>{KEY_POINTS.map(k => <li key={k}>{k}</li>)}</ul>
      </div>

      <div className="legal-layout">
        <aside className="legal-toc" aria-label="On this page">
          <button className="btn sm legal-toc-btn" onClick={() => setTocOpen(o => !o)} aria-expanded={tocOpen}>
            On this page {tocOpen ? '−' : '+'}
          </button>
          <div className={`box legal-toc-list${tocOpen ? ' open' : ''}`}>{toc}</div>
        </aside>

        <div className="legal-content">
          <p>These Terms of Service govern your use of the Moai Club NFT collection and associated website.</p>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-sec">
              <h3>
                <span>{i + 1}.</span> {s.title}
                {DRAFT && s.todo && <em className="tag">Needs review</em>}
              </h3>
              <p>{s.body}</p>
            </section>
          ))}
          <p className="legal-end">See also our <Link to="/privacy">Privacy Policy</Link>.</p>
        </div>
      </div>
    </section>
  );
}