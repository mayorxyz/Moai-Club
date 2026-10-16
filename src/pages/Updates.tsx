import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';

const COLORS = ['var(--teal)', 'var(--lime)', 'var(--pink)', 'var(--purple)', 'var(--orange)'];

const plain = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const excerpt = (md: string, max: number) => {
  const t = plain(md);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 40 ? cut.lastIndexOf(' ') : max)}…`;
};

const readMins = (md: string) => Math.max(1, Math.round(plain(md).split(' ').length / 200));
const isNew = (d: string) => Date.now() - new Date(d).getTime() < 7 * 86400000;

export default function Updates() {
  const [tagFilter, setTagFilter] = useState('');
  const [search, setSearch] = useState('');

  const sorted = useMemo(
    () => [...config.updates].sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()),
    []
  );

  const tags = useMemo(() => {
    const m = new Map<string, number>();
    sorted.forEach(u => u.tags.forEach(t => m.set(t, (m.get(t) || 0) + 1)));
    return [...m.entries()];
  }, [sorted]);

  const colorOf = (tag: string) => COLORS[tags.findIndex(([t]) => t === tag) % COLORS.length] || COLORS[0];

  const q = search.trim().toLowerCase();
  const filtered = sorted.filter(u =>
    (!tagFilter || u.tags.includes(tagFilter)) &&
    (!q || u.title.toLowerCase().includes(q) || plain(u.bodyMarkdown).toLowerCase().includes(q))
  );

  const showFeatured = !tagFilter && !q && filtered.length > 1;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  const clear = () => { setTagFilter(''); setSearch(''); };

  const Card = ({ u, big = false }: { u: (typeof sorted)[number]; big?: boolean }) => (
    <Link to={`/updates/${u.id}`} className={`box upd-card${big ? ' big' : ''}`}>
      <div className="upd-top">
        <time dateTime={u.utcDate} title={new Date(u.utcDate).toUTCString()}>
          {new Date(u.utcDate).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
        {isNew(u.utcDate) && <span className="tag upd-new">New</span>}
        <span className="upd-read">{readMins(u.bodyMarkdown)} min read</span>
      </div>
      <h3>{u.title}</h3>
      <p>{excerpt(u.bodyMarkdown, big ? 260 : 140)}</p>
      <div className="upd-tags">
        {u.tags.map(t => (
          <span key={t} className="tag" style={{ ['--bg-c' as any]: colorOf(t) }}>{t}</span>
        ))}
        <span className="upd-more">Read more →</span>
      </div>
    </Link>
  );

  return (
    <section className="section upd" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Updates.</h2>
      <p className="section-sub">News and announcements from the team.</p>

      <div className="upd-tools">
        <input
          type="text"
          inputMode="search"
          placeholder="Search updates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search updates"
          autoComplete="off"
          spellCheck={false}
        />
        <div className="upd-filters">
          <button className={`btn sm ${tagFilter === '' ? 'primary' : ''}`} aria-pressed={tagFilter === ''} onClick={() => setTagFilter('')}>
            All <span>{sorted.length}</span>
          </button>
          {tags.map(([tag, n]) => (
            <button key={tag} className={`btn sm ${tagFilter === tag ? 'primary' : ''}`} aria-pressed={tagFilter === tag} onClick={() => setTagFilter(tag)}>
              {tag} <span>{n}</span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="box upd-empty">
          <p>No updates match your filters.</p>
          <button className="btn sm primary" onClick={clear}>Clear filters</button>
        </div>
      ) : (
        <>
          {featured && <Card u={featured} big />}
          <div className="upd-grid">
            {rest.map(u => <Card key={u.id} u={u} />)}
          </div>
        </>
      )}
    </section>
  );
}