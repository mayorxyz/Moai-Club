import { useState, useMemo, useEffect } from 'react';
import config from '../drop.config';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { Icon } from '../components/Icon';

type Ev = { id: number; type: 'Mint' | 'Transfer'; tokenId: number; from: string; to: string; ts: number; txHash: string; fresh?: boolean };

const hex = () => Math.random().toString(16).slice(2, 6);
const addr = () => `0x${hex()}…${hex()}`;
const ZERO = '0x0000…0000';

const makeEvent = (id: number, tokenId: number, ts: number, type: Ev['type']): Ev => ({
  id, type, tokenId, ts,
  from: type === 'Mint' ? ZERO : addr(),
  to: addr(),
  txHash: `0x${Math.random().toString(16).slice(2).padEnd(64, '0').slice(0, 64)}`,
});

const ago = (ts: number, now: number) => {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
};

type Filter = 'all' | 'mints' | 'transfers';

export default function Activity() {
  const [filter, setFilter] = useState<Filter>('all');
  const [now, setNow] = useState(Date.now());
  const [events, setEvents] = useState<Ev[]>(() => {
    const t = Date.now();
    return Array.from({ length: 20 }, (_, i) => makeEvent(i, 5000 - i, t - i * 300000, i % 2 === 0 ? 'Mint' : 'Transfer'));
  });

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!config.mock) return;
    const feed = setInterval(() => {
      setEvents(prev => {
        const id = prev[0] ? prev[0].id + 1 : 0;
        const type: Ev['type'] = Math.random() > 0.5 ? 'Mint' : 'Transfer';
        const next = makeEvent(id, Math.max(1, (prev[0]?.tokenId ?? 5000) - 1), Date.now(), type);
        return [{ ...next, fresh: true }, ...prev.map(e => ({ ...e, fresh: false }))].slice(0, 30);
      });
    }, 6000);
    return () => clearInterval(feed);
  }, []);

  const counts = useMemo(() => ({
    all: events.length,
    mints: events.filter(e => e.type === 'Mint').length,
    transfers: events.filter(e => e.type === 'Transfer').length,
  }), [events]);

  const filtered = filter === 'all' ? events : events.filter(e => e.type.toLowerCase() === filter.slice(0, -1));
  const explorer = (config as any).chain?.blockExplorerUrl as string | undefined;

  return (
    <section className="section act" style={{ marginTop: '20px' }}>
      <div className="act-head">
        <div>
          <h2 className="section-title">Live Activity.</h2>
          <p className="act-sub">Real-time mints and transfers.</p>
        </div>
        <span className="phase-chip" aria-live="polite">
          <span className="act-dot" aria-hidden="true" />
          Live
        </span>
      </div>

      {config.mock && (
        <div className="box act-demo">
          <Icon name="warning" size={18} />
          <p>Demo mode — showing simulated events.</p>
        </div>
      )}

      <div className="act-stats">
        <div className="box"><b>{counts.all}</b><span>Events</span></div>
        <div className="box"><b>{counts.mints}</b><span>Mints</span></div>
        <div className="box"><b>{counts.transfers}</b><span>Transfers</span></div>
      </div>

      <div className="act-filters" role="tablist">
        {(['all', 'mints', 'transfers'] as const).map(f => (
          <button key={f} role="tab" aria-selected={filter === f} className={`btn sm ${filter === f ? 'primary' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} <span className="act-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="box act-list">
        {filtered.length === 0 ? (
          <p className="act-empty">No events yet.</p>
        ) : (
          filtered.map(e => (
            <div key={e.id} className={`act-row${e.fresh ? ' fresh' : ''}`}>
              <span className={`badge act-badge ${e.type === 'Mint' ? 'lime' : 'teal'}`}>{e.type}</span>
              <div className="act-token">
                <div className="act-art"><PlaceholderArt tokenId={e.tokenId} /></div>
                <span>#{String(e.tokenId).padStart(4, '0')}</span>
              </div>
              <div className="act-addr" title={`${e.from} → ${e.to}`}>
                <span className="act-from">{e.from}</span>
                <span className="act-arrow">→</span>
                <span className="act-to">{e.to}</span>
              </div>
              <span className="act-time">{ago(e.ts, now)}</span>
              {!config.mock && explorer ? (
                <a className="act-tx" href={`${explorer}/tx/${e.txHash}`} target="_blank" rel="noopener noreferrer" aria-label="View transaction">↗</a>
              ) : (
                <span className="act-tx off" aria-hidden="true" />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}