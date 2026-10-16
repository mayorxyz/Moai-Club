// Edit here: NFTCard component
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { PlaceholderArt } from './PlaceholderArt';
import type { NFT } from '../data/nfts';

interface NFTCardProps {
  tokenId: number;
  nft?: NFT;
  /** Hide the Mint button (used on My NFTs page for already-owned tokens). */
  showMintButton?: boolean;
}

export function NFTCard({ tokenId, nft, showMintButton = true }: NFTCardProps) {
  const [failed, setFailed] = useState(false);
  const name = nft?.name || `${config.collection.name} #${String(tokenId).padStart(4, '0')}`;
  const mintable = nft?.mintable !== false;
  // Grid shows ONLY the CDN thumbnail; the full-quality image is loaded by
  // ProgressiveImage on the NFT detail page after a click.
  const thumbSrc = nft?.thumb || nft?.image;

  const handleMintClick = (e: React.MouseEvent) => {
    if (mintable) {
      e.preventDefault();
      e.stopPropagation();
      window.location.hash = `#/mint?token=${tokenId}`;
    }
  };

  return (
    <Link to={`/collection/${tokenId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="nft-card">
        <div className="nft-card-art">
          {thumbSrc && !failed ? (
            <img
              src={thumbSrc}
              alt={name}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={() => setFailed(true)}
            />
          ) : (
            <PlaceholderArt tokenId={tokenId} />
          )}
        </div>
        <div className="nft-card-info">
          <div className="name">{name}</div>
          <div className="id">#{String(tokenId).padStart(4, '0')}</div>
          {nft?.rarity && (
            <div className="rarity" style={{ 
              marginTop: '6px',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              background: 'var(--lime)',
              border: '2px solid var(--ink)',
              borderRadius: '6px',
              display: 'inline-block'
            }}>
              {nft.rarity}
            </div>
          )}
          {mintable && showMintButton && (
            <button 
              onClick={handleMintClick}
              className="btn primary sm"
              style={{ 
                marginTop: '8px',
                width: '100%',
                fontSize: '12px',
                padding: '6px 12px'
              }}
            >
              Mint
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
