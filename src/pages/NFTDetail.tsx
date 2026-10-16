// Edit here: NFTDetail page
import { useParams, Link } from 'react-router-dom';
import config from '../drop.config';
import { ProgressiveImage } from '../components/ProgressiveImage';

export default function NFTDetail() {
  const { tokenId } = useParams<{ tokenId: string }>();
  const id = parseInt(tokenId || '0');

  // Only real NFTs (with artwork) exist in the collection.
  const nft = config.nfts.find(n => n.id === id);
  const mintable = nft?.mintable !== false;

  if (!nft) {
    return (
      <section className="section" style={{ marginTop: '20px', textAlign: 'center' }}>
        <div className="box" style={{ padding: '40px 16px' }}>
          <h2>Not minted yet.</h2>
          <p style={{ opacity: 0.8, margin: '10px 0 16px' }}>Token #{tokenId} does not exist.</p>
          <Link to="/mint" className="btn primary">Mint Now</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <Link to="/collection" className="btn sm" style={{ marginBottom: '16px' }}>Back to Collection</Link>
      <div className="detail-layout">
        <div className="detail-image">
          <div className="art">
            {/* Full-quality art only loads here (after the user clicks the
                NFT); the blurred thumbnail paints instantly meanwhile. */}
            <ProgressiveImage
              src={nft.image}
              thumb={nft.thumb}
              alt={nft.name}
              blurPlaceholder
            />
          </div>
          <div className="info">
            <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>{nft.name}</h2>
            {nft.rarity && (
              <div style={{
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: 700,
                padding: '4px 12px',
                background: 'var(--lime)',
                border: '2px solid var(--ink)',
                borderRadius: '8px',
                display: 'inline-block'
              }}>
                {nft.rarity}
              </div>
            )}
          </div>
        </div>
        <div>
          {nft.description && (
            <div className="box" style={{ marginBottom: '14px' }}>
              <h3 style={{ marginBottom: '10px' }}>Description</h3>
              <p style={{ fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{nft.description}</p>
            </div>
          )}

          {nft.traits && nft.traits.length > 0 && (
            <div className="box" style={{ marginBottom: '14px' }}>
              <h3 style={{ marginBottom: '10px' }}>Traits</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {nft.traits.map((trait, i) => (
                  <div key={i} style={{
                    padding: '6px 12px',
                    background: 'var(--paper)',
                    border: '2px solid var(--ink)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}>
                    <span style={{ opacity: 0.7, fontSize: '11px' }}>{trait.type}</span>
                    <div style={{ fontWeight: 700 }}>{trait.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="box" style={{ marginBottom: '14px' }}>
            <h3 style={{ marginBottom: '10px' }}>Details</h3>
            <div style={{ display: 'grid', gap: '6px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.7 }}>Token ID</span><span style={{ fontWeight: 700 }}>#{String(id).padStart(4, '0')}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ opacity: 0.7 }}>Chain</span><span style={{ fontWeight: 700 }}>{config.chain.name}</span></div>
            </div>
          </div>
          <div className="box">
            <h3 style={{ marginBottom: '10px' }}>Links</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {mintable && <Link to={`/mint?token=${id}`} className="btn primary sm">Mint</Link>}
              <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn sm">Marketplace</a>
              <a href={`${config.chain.blockExplorerUrl}`} target="_blank" rel="noopener noreferrer" className="btn sm">Explorer</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
