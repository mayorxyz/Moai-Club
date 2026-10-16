import { useState } from 'react';
import config from '../drop.config';

const ext = (url: string) => (url.split('?')[0].split('.').pop() || 'FILE').toUpperCase().slice(0, 4);
const isImg = (url: string) => /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(url);

export default function Press() {
  const { media } = config;
  const [copied, setCopied] = useState('');

  const handleCopy = async (key: string, text: string) => {
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

  const logos = media.logoFiles.map((f: any) => ({ ...f, kind: 'Logo' }));
  const arts = media.artSamples.map((f: any) => ({ ...f, kind: 'Art' }));
  const files = [...logos, ...arts];

  return (
    <section className="section press" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Press &amp; Media Kit.</h2>
      <p className="section-sub">Resources for journalists and content creators.</p>

      <div className="press-facts">
        <div className="box"><b>{config.collection.totalSupply.toLocaleString()}</b><span>Total supply</span></div>
        <div className="box"><b>{(config.collection as any).name ?? 'Moai Club'}</b><span>Collection</span></div>
        <div className="box"><b>{files.length}</b><span>Files in kit</span></div>
      </div>

      <h3 className="press-h">Downloads</h3>
      {files.length === 0 ? (
        <div className="box"><p style={{ opacity: 0.7, margin: 0 }}>No files available yet.</p></div>
      ) : (
        <div className="press-files">
          {files.map((f, i) => (
            <a key={i} href={f.url} download className="box press-file">
              <div className="press-thumb">
                {isImg(f.url) ? <img src={f.url} alt="" loading="lazy" /> : <span>{ext(f.url)}</span>}
              </div>
              <div className="press-file-meta">
                <strong>{f.name}</strong>
                <span className="tag" style={{ ['--bg-c' as any]: f.kind === 'Logo' ? 'var(--lime)' : 'var(--pink)' }}>
                  {f.kind} · {ext(f.url)}
                </span>
              </div>
              <span className="press-dl" aria-hidden="true">↓</span>
            </a>
          ))}
        </div>
      )}

      <h3 className="press-h">Boilerplate Text</h3>
      <div className="press-bp">
        {(['short', 'medium', 'long'] as const).map(key => (
          <div className="box" key={key}>
            <div className="press-bp-head">
              <span className="press-bp-title">{key}</span>
              <span className="press-bp-count">{media.boilerplate[key].length} chars</span>
              <button className="copy-btn" onClick={() => handleCopy(key, media.boilerplate[key])} aria-live="polite">
                {copied === key ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p>{media.boilerplate[key]}</p>
          </div>
        ))}
      </div>

      <div className="grid-2 press-dd">
        <div className="box dd do">
          <h3>✓ Do</h3>
          <ul>
            <li>Use the official logo files</li>
            <li>Refer to the collection as "Moai Club"</li>
            <li>Link to the official website</li>
          </ul>
        </div>
        <div className="box dd dont">
          <h3>✕ Don't</h3>
          <ul>
            <li>Alter the logo colors or proportions</li>
            <li>Use the art for commercial purposes without permission</li>
            <li>Make financial claims or promises</li>
          </ul>
        </div>
      </div>

      <div className="box-lg press-contact">
        <h3>Press contact</h3>
        <div className="hero-btns">
          <a href={`mailto:${media.contactEmail}`} className="btn primary">{media.contactEmail}</a>
          <button className="btn" onClick={() => handleCopy('email', media.contactEmail)}>
            {copied === 'email' ? 'Copied!' : 'Copy email'}
          </button>
        </div>
      </div>
    </section>
  );
}
