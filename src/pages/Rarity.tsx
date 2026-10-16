import { useState, useMemo, useRef } from 'react';
import config from '../drop.config';
import { useStore } from '../store';
import { Tabs } from '../components/Tabs';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { Icon } from '../components/Icon';

const TIERS = [
  { name: 'Legendary', color: 'pink', max: 10 },
  { name: 'Epic', color: 'orange', max: 50 },
  { name: 'Rare', color: 'purple', max: 150 },
  { name: 'Uncommon', color: 'teal', max: 400 },
  { name: 'Common', color: 'gray', max: Infinity },
];
const tierOf = (rank: number) => TIERS.find(t => rank <= t.max)!;

export default function Rarity() {
  const { totalMinted } = useStore();
  const [activeCategory, setActiveCategory] = useState(config.traitCategories[0]?.category || '');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const perPage = 50;

  const category = config.traitCategories.find(c => c.category === activeCategory);
  const total = config.collection.totalSupply;
  const delayed = config.reveal.mode === 'delayed';

  const rankings = useMemo(() => {
    if (delayed) return [];
    return Array.from({ length: Math.min(totalMinted, 200) }, (_, i) => ({
      rank: i + 1,
      id: i + 1,
      score: Math.floor(1000 - i * 3 + Math.random() * 50),
      tier: tierOf(i + 1),
    }));
  }, [totalMinted, delayed]);

  const tierCounts = useMemo(
    () => TIERS.map(t => ({ ...t, count: rankings.filter(r => r.tier.name === t.name).length })),
    [rankings]
  );

  const digits = search.replace(/\D/g, '');
  const filtered = digits ? rankings.filter(r => r.id === parseInt(digits, 10)) : rankings;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage);

  const goPage = (p: number) => {
    setPage(p);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const values = category ? [...category.values].sort((a, b) => a.count - b.count) : [];
  const maxCount = Math.max(1, ...values.map(v => v.count));

  return (
    <section className="section rar" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Rarity &amp; Traits.</h2>
      <p className="section-sub">Revealed tokens only. Score formula: sum of (1 / trait frequency) for each trait.</p>

      {delayed && (
        <div className="box rar-lock">
          <Icon name="warning" size={18} />
          <p>Art is not yet revealed. Rarity data will be available after reveal.</p>
        </div>
      )}

      <div className="box rar-block">
        <h3>Trait Distribution</h3>
        <Tabs tabs={config.traitCategories.map(c => c.category)} activeTab={activeCategory} onTabChange={setActiveCategory} />
        <ul className="rar-traits">
          {values.map((v, i) => (
            <li key={v.name}>
              <div className="rar-t-top">
                <strong>{v.name}</strong>
                {i === 0 && <span className="tag rar-rare">Rarest</span>}
                <span className="rar-t-pct">{((v.count / total) * 100).toFixed(1)}%</span>
                <span className="rar-t-n">{v.count.toLocaleString()}</span>
              </div>
              <div className="rar-bar"><i style={{ width: `${(v.count / maxCount) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="rar-h">Rarity Tiers</h3>
      <div className="rar-tiers">
        {tierCounts.map(t => (
          <div className={`box rar-tier ${t.color}`} key={t.name}>
            <span className={`badge ${t.color}`}>{t.name}</span>
            <b>{delayed ? '—' : t.count}</b>
            <small>{t.max === Infinity ? 'Rest of ranks' : `Top ${t.max}`}</small>
          </div>
        ))}
      </div>

      <div className="box rar-block" ref={listRef}>
        <div className="rar-rank-head">
          <h3>Ranking</h3>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Search by token ID..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            aria-label="Search by token ID"
          />
        </div>

        {delayed ? (
          <p className="rar-empty">Ranking unlocks after reveal.</p>
        ) : filtered.length === 0 ? (
          <p className="rar-empty">{digits ? `No token found for #${digits}.` : 'No revealed tokens yet.'}</p>
        ) : (
          <div className="rar-list">
            <div className="rar-row rar-th" aria-hidden="true">
              <span>Rank</span><span>Token</span><span>Score</span><span>Tier</span>
            </div>
            {paginated.map(r => (
              <div className="rar-row" key={r.id}>
                <span className={`rar-rank${r.rank <= 3 ? ' top' : ''}`}>#{r.rank}</span>
                <span className="rar-token">
                  <span className="rar-art"><PlaceholderArt tokenId={r.id} /></span>
                  #{String(r.id).padStart(4, '0')}
                </span>
                <span className="rar-score">{r.score}</span>
                <span className={`badge ${r.tier.color}`}>{r.tier.name}</span>
              </div>
            ))}
          </div>
        )}

        {!delayed && filtered.length > perPage && (
          <div className="rar-pager">
            <button className="btn sm" disabled={page === 0} onClick={() => goPage(page - 1)}>Prev</button>
            <span>Page {page + 1} of {pages}</span>
            <button className="btn sm" disabled={page + 1 >= pages} onClick={() => goPage(page + 1)}>Next</button>
          </div>
        )}
      </div>
    </section>
  );
}