import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import config from '../drop.config';
import { MarkdownView } from '../components/MarkdownView';

const COLORS = ['var(--teal)', 'var(--lime)', 'var(--pink)', 'var(--purple)', 'var(--orange)'];
const words = (md: string) => md.replace(/[#>*_`~\-\[\]()]+/g, ' ').split(/\s+/).filter(Boolean).length;

export default function UpdateDetail() {
  const { id } = useParams<{ id: string }>();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Same order as the Updates list: newest first
  const sorted = useMemo(
    () => [...config.updates].sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()),
    []
  );
  const index = sorted.findIndex(u => u.id === id);
  const update = index >= 0 ? sorted[index] : undefined;

  useEffect(() => {
    if (update) document.title = `${update.title} · ${config.collection.name}`;
    window.scrollTo(0, 0);
  }, [update]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  if (!update) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box ud-missing">
          <h2>Update not found.</h2>
          <div className="hero-btns">
            <Link to="/updates" className="btn primary">Back to Updates</Link>
            <Link to="/" className="btn">Home</Link>
          </div>
        </div>
      </section>
    );
  }

  const newer = index > 0 ? sorted[index - 1] : null;
  const older = index < sorted.length - 1 ? sorted[index + 1] : null;
  const related = sorted
    .filter(u => u.id !== update.id && u.tags.some(t => update.tags.includes(t)))
    .slice(0, 2);

  const mins = Math.max(1, Math.round(words(update.bodyMarkdown) / 200));
  const isNew = Date.now() - new Date(update.utcDate).getTime() < 7 * 86400000;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(update.title)}&url=${encodeURIComponent(url)}`;

  return (
    <section className="section ud" style={{ marginTop: '20px' }}>
      <div className="ud-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>

      <Link to="/updates" className="btn sm ud-back">← All Updates</Link>

      <article className="box-lg ud-article">
        <div className="ud-tags">
          {update.tags.map((tag, i) => (
            <span key={tag} className="tag" style={{ ['--bg-c' as any]: COLORS[i % COLORS.length] }}>{tag}</span>
          ))}
          {isNew && <span className="tag" style={{ ['--bg-c' as any]: 'var(--pink)' }}>New</span>}
        </div>
        <h1>{update.title}</h1>
        <p className="ud-meta">
          <time dateTime={update.utcDate} title={new Date(update.utcDate).toUTCString()}>
            {new Date(update.utcDate).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>·</span>
          <span>{mins} min read</span>
        </p>

        <div className="ud-body"><MarkdownView content={update.bodyMarkdown} /></div>

        <div className="ud-share">
          <span>Share</span>
          <button className="btn sm" onClick={copy} aria-live="polite">{copied ? 'Copied!' : 'Copy link'}</button>
          <a className="btn sm" href={shareX} target="_blank" rel="noopener noreferrer">Post on X ↗</a>
        </div>
      </article>

      {(newer || older) && (
        <nav className="ud-nav" aria-label="More updates">
          {newer ? (
            <Link to={`/updates/${newer.id}`} className="box ud-nav-card">
              <small>← Newer</small>
              <b>{newer.title}</b>
            </Link>
          ) : <span />}
          {older ? (
            <Link to={`/updates/${older.id}`} className="box ud-nav-card right">
              <small>Older →</small>
              <b>{older.title}</b>
            </Link>
          ) : <span />}
        </nav>
      )}

      {related.length > 0 && (
        <div className="ud-related">
          <h3>Related updates</h3>
          <div className="ud-rel-grid">
            {related.map(u => (
              <Link key={u.id} to={`/updates/${u.id}`} className="box ud-nav-card">
                <small>{new Date(u.utcDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</small>
                <b>{u.title}</b>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="ud-foot"><Link to="/updates" className="btn sm">All Updates</Link></div>
    </section>
  );
}