import { useState } from 'react';
import config from '../drop.config';

const short = (a: string) => (a.length > 14 ? `${a.slice(0, 6)}...${a.slice(-4)}` : a);

const STATUS = {
  none: { label: 'Not audited', cls: 'none', text: 'This contract has not been audited. Review the source code yourself on the block explorer.' },
  'in-progress': { label: 'Audit in progress', cls: 'wip', text: '' },
  complete: { label: 'Audit complete', cls: 'done', text: '' },
} as const;

const DISCLOSURES = [
  { h: 'Royalties', t: 'Royalty funds are used for development and community rewards.' },
  { h: 'Team allocation', t: 'Team allocation is locked for 6 months post-mint.' },
  { h: 'Reserve tokens', t: 'Reserve tokens may be used for future partnerships or burn events.' },
];

export default function Transparency() {
  const { audit, chain } = config;
  const [copied, setCopied] = useState('');
  const st = STATUS[audit.status as keyof typeof STATUS] ?? STATUS.none;

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const body =
    audit.status === 'in-progress' ? `Audit in progress by ${audit.auditor || 'TBA'}.`
    : audit.status === 'complete' ? `Audited by ${audit.auditor}.`
    : st.text;

  return (
    <section className="section tr" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Transparency.</h2>
      <p className="section-sub">Full disclosure. No surprises.</p>

      <div className={`box-lg tr-audit ${st.cls}`}>
        <span className="tag tr-label">Audit status</span>
        <h3>{st.label}</h3>
        <p>{body}</p>
        {audit.status === 'complete' && audit.reportUrl && (
          <a href={audit.reportUrl} target="_blank" rel="noopener noreferrer" className="btn sm">View Report</a>
        )}
      </div>

      <h3 className="tr-h">Team &amp; Treasury Wallets</h3>
      {audit.teamWallets.length === 0 ? (
        <div className="box"><p style={{ margin: 0, opacity: 0.7 }}>No wallets disclosed yet.</p></div>
      ) : (
        <div className="tr-wallets">
          {audit.teamWallets.map((w: any, i: number) => (
            <div className="box tr-wallet" key={i}>
              <div className="tr-w-main">
                <strong>{w.label}</strong>
                <span className="tr-purpose">{w.purpose}</span>
              </div>
              <code className="tr-addr" title={w.address}>
                <span className="full">{w.address}</span>
                <span className="short">{short(w.address)}</span>
              </code>
              <div className="tr-w-btns">
                <button className="copy-btn" onClick={() => copy(`w${i}`, w.address)} aria-live="polite">
                  {copied === `w${i}` ? 'Copied!' : 'Copy'}
                </button>
                {chain.blockExplorerUrl && (
                  <a className="btn sm" href={`${chain.blockExplorerUrl}/address/${w.address}`} target="_blank" rel="noopener noreferrer">Explorer ↗</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="tr-h">Disclosures</h3>
      <div className="tr-disc">
        {DISCLOSURES.map((d, i) => (
          <div className="box" key={i}>
            <span className="tr-n">{String(i + 1).padStart(2, '0')}</span>
            <h4>{d.h}</h4>
            <p>{d.t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}