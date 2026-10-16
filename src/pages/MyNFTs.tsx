import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { NFTCard } from '../components/NFTCard';
import { nfts } from '../data/nfts';

type Sort = 'new' | 'old' | 'id';

export default function MyNFTs() {
  const { walletConnected, walletAddress, mintedTokens, setWalletModalOpen } = useStore();
  const [sort, setSort] = useState<Sort>('new');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const nftMap = useMemo(() => new Map(nfts.map(nft => [nft.id, nft])), []);

  const list = useMemo(() => {
    let items = [...mintedTokens];
    const q = search.trim().replace(/^#/, '');
    if (q) items = items.filter(t => String(t.id).includes(q));
    if (sort === 'new') items.reverse();
    if (sort === 'id') items.sort((a, b) => a.id - b.id);
    return items;
  }, [mintedTokens, sort, search]);

  const missing = mintedTokens.filter(t => !nftMap.has(t.id)).length;
  const sharePct = (mintedTokens.length / config.collection.totalSupply) * 100;

  const copy = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* blocked */ }
  };

  if (!walletConnected) {
    return (
      <section className="section mine" style={{ marginTop: '20px' }}>
        <h2 className="section-title">My NFTs.</h2>
        <div className="box mine-empty">
          <h3>Connect your wallet.</h3>
          <p>Connect to see the Moai you own.</p>
          <button className="btn primary" onClick={() => setWalletModalOpen(true)}>Connect Wallet</button>
        </div>
      </section>
    );
  }

  if (mintedTokens.length === 0) {
    return (
      <section className="section mine" style={{ marginTop: '20px' }}>
        <h2 className="section-title">My NFTs.</h2>
        <div className="box mine-empty">
          <h3>No NFTs yet.</h3>
          <p>Mint your first Moai or browse the collection.</p>
          <div className="hero-btns">
            <Link to="/mint" className="btn primary">Mint Now</Link>
            <Link to="/collection" className="btn">View Collection</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section mine" style={{ marginTop: '20px' }}>
      <div className="mine-head">
        <div>
          <h2 className="section-title">My NFTs.</h2>
          <p className="section-sub">You hold {mintedTokens.length} Moai.</p>
        </div>
        {walletAddress && (
          <button className="tag mine-wallet" onClick={copy} title="Copy address">
            {copied ? 'Copied!' : `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}`}
          </button>
        )}
      </div>

      <div className="mine-stats">
        <div className="box"><b>{mintedTokens.length}</b><span>Held</span></div>
        <div className="box"><b>{sharePct < 0.01 ? '<0.01' : sharePct.toFixed(2)}%</b><span>Of supply</span></div>
        <div className="box"><b>{mintedTokens.length - missing}</b><span>With art</span></div>
      </div>

      {missing > 0 && (
        <div className="box mine-note">
          <p>{missing} token{missing === 1 ? '' : 's'} not in the art manifest yet. Artwork is still syncing.</p>
        </div>
      )}

      <div className="box filter-bar mine-filter">
        <input
          type="text"
          inputMode="search"
          placeholder="Search by token ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search by token ID"
          autoComplete="off"
          spellCheck={false}
        />
        <select value={sort} onChange={e => setSort(e.target.value as Sort)} aria-label="Sort order">
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
          <option value="id">ID: Low to High</option>
        </select>
      </div>

      {list.length === 0 ? (
        <div className="box mine-empty">
          <p>No token matches “{search.trim()}”.</p>
          <button className="btn sm primary" onClick={() => setSearch('')}>Clear search</button>
        </div>
      ) : (
        <div className="grid-4">
          {list.map(t => (
            <NFTCard key={t.id} tokenId={t.id} nft={nftMap.get(t.id)} showMintButton={false} />
          ))}
        </div>
      )}

      <div className="mine-actions">
        {config.reveal.mode === 'delayed' && <Link to="/reveal" className="btn">Reveal tokens</Link>}
        {config.links.marketplace && (
          <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn">Marketplace ↗</a>
        )}
      </div>
    </section>
  );
}