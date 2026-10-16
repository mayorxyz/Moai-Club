import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore, getCurrentPhase } from '../store';
import { ProgressBar } from '../components/ProgressBar';
import { PhaseCard } from '../components/PhaseCard';
import { PlaceholderArt } from '../components/PlaceholderArt';

export default function Home() {
  const { totalMinted } = useStore();
  const currentPhase = getCurrentPhase();
  // Preview real NFTs spread across the collection (all have artwork).
  const previewTokens = config.nfts.filter((_, i) => i % 34 === 0).slice(0, 6).map(nft => nft.id);

  return (
    <>
      <section className="hero">
        <div className="box-lg">
          <div className="hero-grid">
            <div>
              <span className="badge">
                {currentPhase ? (currentPhase.allowlistOnly ? 'Allowlist Live' : 'Public Mint Live') : 'Mint Coming Soon'}
              </span>
              <h1 style={{ marginTop: '14px' }}>
                Collect the<br />
                Moai of<br />
                <span className="hl">the digital frontier.</span>
              </h1>
              <p className="hero-lead">{config.collection.description}</p>
              <p className="hero-bold">5,000 unique Moai. One blockchain. Your legacy.</p>
              <div className="hero-btns">
                <Link to="/mint" className="btn primary">Mint Now</Link>
                <Link to="/collection" className="btn">View Collection</Link>
              </div>
              <div style={{ marginTop: '16px', maxWidth: '360px' }}>
                <ProgressBar minted={totalMinted} total={config.collection.totalSupply} />
              </div>
              <p className="hero-note">Gas fees apply. Transactions are final.</p>
            </div>
            <div className="stage" aria-hidden="true">
              <div className="float nft-float-card c1">
                <div className="nft-float-art"><PlaceholderArt tokenId={42} /></div>
                <div className="nft-name">Moai #0042</div>
                <div className="nft-id">#0042</div>
              </div>
              <div className="float nft-float-card c2">
                <div className="nft-float-art"><PlaceholderArt tokenId={137} /></div>
                <div className="nft-name">Moai #0137</div>
                <div className="nft-id">#0137</div>
              </div>
              <span className="float tag t1">Rare</span>
              <span className="float tag t2">Minted</span>
              <span className="float tag t3">1 / 5000</span>
              <span className="float tag t4">Allowlist live</span>
              <span className="float tag t5">Reveal soon</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid-3">
          <div className="box" style={{ textAlign: 'center' }}>
            <h3>Supply</h3>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: '6px 0 0' }}>{config.collection.totalSupply.toLocaleString()}</p>
          </div>
          <div className="box" style={{ textAlign: 'center' }}>
            <h3>Price</h3>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: '6px 0 0' }}>{config.phases[0]?.priceEth} {config.chain.currencySymbol}</p>
          </div>
          <div className="box" style={{ textAlign: 'center' }}>
            <h3>Chain</h3>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: '6px 0 0' }}>{config.chain.name}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How to mint.</h2>
        <div className="grid-3">
          <div className="box step-card">
            <span className="num">01</span>
            <div><h3>Connect wallet.</h3><p>Use MetaMask, Rainbow, or any WalletConnect-compatible wallet.</p></div>
          </div>
          <div className="box step-card">
            <span className="num">02</span>
            <div><h3>Choose quantity.</h3><p>Select how many Moai you want. Respect the per-wallet limit.</p></div>
          </div>
          <div className="box step-card">
            <span className="num">03</span>
            <div><h3>Confirm and receive.</h3><p>Approve the transaction. Your NFTs arrive in your wallet.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Preview the collection.</h2>
        <div className="grid-4">
          {previewTokens.map(id => (
            <div key={id} className="nft-card">
              <div className="nft-card-art"><PlaceholderArt tokenId={id} /></div>
              <div className="nft-card-info">
                <div className="name">{config.collection.name} #{String(id).padStart(4, '0')}</div>
                <div className="id">#{String(id).padStart(4, '0')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Mint phases.</h2>
        <div className="grid-3">
          {config.phases.map(phase => <PhaseCard key={phase.id} phase={phase} />)}
        </div>
      </section>

      <section className="section">
        <div className="accent-band">
          <h2>Transparency first.</h2>
          <p>Every Moai Club is stored on-chain. Metadata lives on IPFS. The contract is verifiable.</p>
          <p style={{ fontSize: '13px' }}><strong>Royalty:</strong> {config.collection.royaltyPercent}% | <strong>Standard:</strong> {config.contract.standard}</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Roadmap.</h2>
        <div className="grid-4">
          {config.roadmap.slice(0, 4).map((item, i) => (
            <div className="box" key={i}>
              <span className="num" style={{ marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')}</span>
              <h3 style={{ margin: '8px 0 4px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', margin: 0, opacity: 0.85 }}>{item.description}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '14px' }}>
          <Link to="/roadmap" className="btn">Full Roadmap</Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Questions.</h2>
        {config.faq.slice(0, 5).map((item, i) => (
          <details className="faq-item" key={i}>
            <summary>{item.question}</summary>
            <div className="faq-body">{item.answer}</div>
          </details>
        ))}
        <div style={{ marginTop: '14px' }}>
          <Link to="/faq" className="btn">All FAQs</Link>
        </div>
      </section>

     <section className="section">
  <div className="closing-cta" style={{ textAlign: 'center' }}>
    <h2>Ready to mint?</h2>
    <p className="sub" style={{ textAlign: 'center' }}>Join thousands of collectors. Mint your Moai Club today.</p>
    <div className="btns" style={{ justifyContent: 'center' }}>
      <Link to="/mint" className="btn primary">Mint Now</Link>
      <a href={config.links.discord} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#fff' }}>Join Community</a>
    </div>
  </div>
</section>
    </>
  );
}