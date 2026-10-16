import { Link, useParams } from 'react-router-dom';
import config from '../drop.config';
import { PlaceholderArt } from '../components/PlaceholderArt';

export default function ShareCard() {
  const { tokenId } = useParams<{ tokenId: string }>();
  const id = parseInt(tokenId || '0');

  if (!id) {
    return (
      <section className="section" style={{ marginTop: '20px', textAlign: 'center' }}>
        <div className="box" style={{ padding: '30px' }}>
          <h2>Invalid token.</h2>
          <Link to="/collection" className="btn" style={{ marginTop: '14px' }}>Browse Collection</Link>
        </div>
      </section>
    );
  }

  const shareText = `I just minted ${config.collection.name} #${String(id).padStart(4, '0')}. Check it out.`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <section className="section" style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2 className="section-title">Share your Moai.</h2>

      <div className="box-lg" style={{ maxWidth: '500px', margin: '0 auto', transform: 'rotate(-2deg)' }}>
        <div style={{ aspectRatio: '1', marginBottom: '14px', borderRadius: '12px', overflow: 'hidden', border: 'var(--bw) solid var(--ink)' }}>
          <PlaceholderArt tokenId={id} />
        </div>
        <h3 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', marginBottom: '4px' }}>{config.collection.name}</h3>
        <p style={{ fontSize: '15px', fontFamily: 'var(--font-head)', fontWeight: 800 }}>#{String(id).padStart(4, '0')}</p>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
          <span className="tag" style={{ background: 'var(--lime)' }}>Minted</span>
          <span className="tag" style={{ background: 'var(--purple)', color: '#fff' }}>Moai</span>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="btn primary">Share on X</a>
        <button className="btn" onClick={() => navigator.clipboard.writeText(shareText)}>Copy Text</button>
      </div>

      <Link to="/collection" className="btn sm" style={{ marginTop: '16px', display: 'inline-block' }}>Back to Collection</Link>
    </section>
  );
}
