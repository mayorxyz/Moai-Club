// Edit here: PlaceholderArt component
import { nfts } from '../data/nfts';
import { ProgressiveImage } from './ProgressiveImage';

const artColors = ['#5ee8d5', '#ff7ad9', '#c6f51a', '#7b4dff', '#ff5a00'];

const nftById = new Map<number, typeof nfts[0]>(nfts.map(nft => [nft.id, nft]));

export function PlaceholderArt({ tokenId }: { tokenId?: number }) {
  const nft = tokenId ? nftById.get(tokenId) : undefined;
  if (nft?.image) {
    // Real artwork available: show the tiny thumbnail, lazy-load the original.
    return (
      <ProgressiveImage
        src={nft.image}
        thumb={nft.thumb}
        alt={nft.name}
      />
    );
  }

  const idx = (tokenId || 0) % artColors.length;
  const bg = artColors[idx];
  const secondary = artColors[(idx + 2) % artColors.length];
  const rotation = ((tokenId || 0) * 7) % 360;
  return (
    <div className="placeholder-art" style={{ background: bg, width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', width: '60%', height: '60%', background: secondary, border: '3px solid var(--ink)', borderRadius: '12px', transform: `rotate(${rotation}deg)`, opacity: 0.7, top: '20%', left: '20%' }} aria-hidden="true"></div>
      <div style={{ position: 'absolute', width: '30%', height: '30%', background: 'var(--ink)', borderRadius: '50%', opacity: 0.2, top: '35%', left: '35%' }} aria-hidden="true"></div>
    </div>
  );
}
