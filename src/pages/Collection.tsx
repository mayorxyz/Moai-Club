import { useState, useMemo, useEffect, useRef } from 'react';
import config from '../drop.config';
import { NFTCard } from '../components/NFTCard';
import type { NFT } from '../data/nfts';

type Sort = 'asc' | 'desc' | 'random';

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pageList = (page: number, total: number) => {
  const set = new Set([0, total - 1, page - 1, page, page + 1]);
  const nums = [...set].filter(n => n >= 0 && n < total).sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
};

export default function Collection() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<Sort>('asc');
  const [page, setPage] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const perPage = 24;

  const allNfts = useMemo(() => [...config.nfts], []);
  const shuffled = useMemo(() => shuffle(allNfts), [allNfts]);

  // Dev-only duplicate-ID guard
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hostname !== 'localhost') return;
    const ids = new Set<number>();
    config.nfts.forEach(nft => {
      if (ids.has(nft.id)) console.warn(`[NFT Config] Duplicate ID found: ${nft.id}`);
      ids.add(nft.id);
      if (!nft.image) console.warn(`[NFT Config] Missing image path for NFT #${nft.id}`);
    });
  }, []);

  const q = search.trim().toLowerCase().replace(/^#/, '');
  const isId = /^\d+$/.test(q);

  const filtered = useMemo(() => {
    let items: NFT[] = sort === 'random' ? [...shuffled] : [...allNfts];
    if (q) {
      items = isId
        ? items.filter(nft => nft.id === parseInt(q, 10))
        : items.filter(nft => nft.name.toLowerCase().includes(q));
    }
    if (sort === 'desc') items.reverse();
    return items;
  }, [allNfts, shuffled, q, isId, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages - 1);
  const paginated = filtered.slice(safePage * perPage, (safePage + 1) * perPage);
  const from = filtered.length ? safePage * perPage + 1 : 0;
  const to = safePage * perPage + paginated.length;

  const goPage = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const clear = () => { setSearch(''); setPage(0); };

  return (
    <section className="section col" style={{ marginTop: '20px' }}>
      <div className="col-head">
        <div>
          <h2 className="section-title">Collection.</h2>
          <p className="col-count">{allNfts.length.toLocaleString()} NFTs</p>
        </div>
        {config.links.marketplace && (
          <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn sm">Marketplace ↗</a>
        )}
      </div>

      <div className="box filter-bar col-filter">
        <input
          type="text"
          inputMode="search"
          placeholder="Search by token ID or name..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          aria-label="Search by token ID or name"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <select value={sort} onChange={e => { setSort(e.target.value as Sort); setPage(0); }} aria-label="Sort order">
          <option value="asc">ID: Low to High</option>
          <option value="desc">ID: High to Low</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div className="col-meta" ref={gridRef} aria-live="polite">
        <span>
          {filtered.length === 0
            ? 'No results'
            : `Showing ${from.toLocaleString()}–${to.toLocaleString()} of ${filtered.length.toLocaleString()}`}
        </span>
        {q && <button className="col-clear" onClick={clear}>Clear “{search.trim()}” ✕</button>}
      </div>

      {paginated.length === 0 ? (
        <div className="box col-empty">
          <p>No tokens found{q ? ` for “${search.trim()}”` : ''}.</p>
          {q && <button className="btn sm primary" onClick={clear}>Clear search</button>}
        </div>
      ) : (
        <div className="grid-4">
          {paginated.map(nft => <NFTCard key={nft.id} tokenId={nft.id} nft={nft} />)}
        </div>
      )}

      {totalPages > 1 && (
        <nav className="col-pager" aria-label="Pagination">
          <button className="btn sm" disabled={safePage === 0} onClick={() => goPage(safePage - 1)}>Prev</button>
          <div className="col-pages">
            {pageList(safePage, totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`e${i}`} className="col-gap">…</span>
              ) : (
                <button
                  key={p}
                  className={`col-pg${p === safePage ? ' on' : ''}`}
                  aria-current={p === safePage ? 'page' : undefined}
                  onClick={() => goPage(p)}
                >
                  {p + 1}
                </button>
              )
            )}
          </div>
          <button className="btn sm" disabled={safePage >= totalPages - 1} onClick={() => goPage(safePage + 1)}>Next</button>
        </nav>
      )}
    </section>
  );
}