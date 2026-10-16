import { useState, useMemo } from 'react';
import config from '../drop.config';
import { useStore } from '../store';
import { Tabs } from '../components/Tabs';

const COLORS = ['var(--lime)', 'var(--teal)', 'var(--pink)', 'var(--purple)', 'var(--orange)'];

const isMe = (short: string, wallet?: string | null) => {
  if (!wallet) return false;
  const [pre, suf] = short.toLowerCase().split('...');
  const w = wallet.toLowerCase();
  return w.startsWith(pre) && w.endsWith(suf);
};

export default function Leaderboard() {
  const { walletAddress } = useStore();
  const [tab, setTab] = useState<'holders' | 'first100'>('holders');
  const [shown, setShown] = useState(20);
  const [copied, setCopied] = useState('');

  const holders = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      rank: i + 1,
      address: `0x${(1000 + i).toString(16)}...${Math.random().toString(16).slice(2, 6)}`,
      count: Math.max(1, 50 - i * 2 + Math.floor(Math.random() * 5)),
    }));
  }, []);

  const first100 = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      address: `0x${(2000 + i).toString(16)}...${Math.random().toString(16).slice(2, 6)}`,
      tokenId: i + 1,
    }));
  }, []);

  const totalSupply = config.collection.totalSupply;
  const share = (n: number) => (n / totalSupply) * 100;
  const maxCount = Math.max(1, ...holders.map(h => h.count));
  const top10 = holders.slice(0, 10).reduce((s, h) => s + h.count, 0);
  const me = holders.find(h => isMe(h.address, walletAddress));

  const copy = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = addr;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(addr);
    setTimeout(() => setCopied(''), 1500);
  };

  const podium = [holders[1], holders[0], holders[2]];
  const rest = holders.slice(3);

  return (
    <section className="section lb" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Leaderboard.</h2>

      <div className="lb-stats">
        <div className="box"><b>{holders.length}</b><span>Top holders</span></div>
        <div className="box"><b>{share(holders[0].count).toFixed(2)}%</b><span>Top holder</span></div>
        <div className="box"><b>{share(top10).toFixed(1)}%</b><span>Top 10 share</span></div>
      </div>

      <div className="box lb-me">
        {walletAddress ? (
          me ? <p>You are rank <b>#{me.rank}</b> with <b>{me.count}</b> tokens.</p>
             : <p>Your wallet is not in the top {holders.length} yet.</p>
        ) : (
          <p>Connect your wallet to see your position.</p>
        )}
      </div>

      <Tabs
        tabs={['Top Holders', 'First 100 Minters']}
        activeTab={tab === 'holders' ? 'Top Holders' : 'First 100 Minters'}
        onTabChange={t => setTab(t === 'Top Holders' ? 'holders' : 'first100')}
      />

      {tab === 'holders' && (
        <>
          <div className="lb-podium">
            {podium.map(h => (
              <div key={h.rank} className={`box lb-pod p${h.rank}`}>
                <span className="lb-medal">{h.rank}</span>
                <button className="lb-addr" onClick={() => copy(h.address)} title="Copy address">
                  {copied === h.address ? 'Copied!' : h.address}
                </button>
                <b>{h.count}</b>
                <small>{share(h.count).toFixed(2)}%</small>
                {isMe(h.address, walletAddress) && <span className="badge lime">You</span>}
              </div>
            ))}
          </div>

          <div className="box lb-list">
            {rest.map(h => (
              <div key={h.rank} className={`lb-row${isMe(h.address, walletAddress) ? ' me' : ''}`}>
                <span className="lb-rank">#{h.rank}</span>
                <button className="lb-addr" onClick={() => copy(h.address)} title="Copy address">
                  {copied === h.address ? 'Copied!' : h.address}
                </button>
                {isMe(h.address, walletAddress) && <span className="badge lime lb-you">You</span>}
                <span className="lb-count">{h.count}</span>
                <span className="lb-share">
                  <i style={{ width: `${(h.count / maxCount) * 100}%` }} />
                  <em>{share(h.count).toFixed(2)}%</em>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'first100' && (
        <>
          <div className="lb-first">
            {first100.slice(0, shown).map((m, i) => (
              <div className="box" key={m.tokenId}>
                <div className="lb-n" style={{ background: COLORS[Math.floor(i / 10) % COLORS.length] }}>{i + 1}</div>
                <button className="lb-addr" onClick={() => copy(m.address)} title="Copy address">
                  {copied === m.address ? 'Copied!' : m.address}
                </button>
                <span className="lb-tid">#{String(m.tokenId).padStart(4, '0')}</span>
                {isMe(m.address, walletAddress) && <span className="badge lime">You</span>}
              </div>
            ))}
          </div>
          {shown < first100.length && (
            <div className="lb-more">
              <button className="btn sm" onClick={() => setShown(s => Math.min(s + 20, first100.length))}>
                Show more ({first100.length - shown} left)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}