import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { CountdownBox } from '../components/CountdownBox';

export default function Reveal() {
  const { walletConnected, walletMinted, mintedTokens } = useStore();
  const [revealed, setRevealed] = useState<number[]>([]);
  const timers = useRef<number[]>([]);
  const isRevealed = config.reveal.mode === 'instant' || new Date(config.reveal.revealTime).getTime() < Date.now();

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  if (!walletConnected) {
    return (
      <section className="section rev" style={{ marginTop: '20px' }}>
        <div className="box rev-empty">
          <h3>Connect your wallet.</h3>
          <p>View your revealed tokens here. Use the connect button in the header.</p>
        </div>
      </section>
    );
  }

  if (walletMinted === 0 && mintedTokens.length === 0) {
    return (
      <section className="section rev" style={{ marginTop: '20px' }}>
        <div className="box rev-empty">
          <h3>No tokens to reveal.</h3>
          <p>Mint some Moai first.</p>
          <Link to="/mint" className="btn primary">Mint Now</Link>
        </div>
      </section>
    );
  }

  // Demo fallback: remove once mintedTokens is always populated.
  const tokens = mintedTokens.length > 0 ? mintedTokens.map(t => t.id) : [1, 2, 3];
  const done = tokens.filter(id => revealed.includes(id)).length;
  const all = done === tokens.length;

  const flip = (id: number) => setRevealed(r => (r.includes(id) ? r : [...r, id]));

  const revealAll = () => {
    tokens.filter(id => !revealed.includes(id)).forEach((id, i) => {
      timers.current.push(window.setTimeout(() => flip(id), i * 180));
    });
  };

  return (
    <section className="section rev" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Reveal.</h2>

      {!isRevealed ? (
        <>
          <div className="box rev-lock">
            <h3>Not yet revealed.</h3>
            <CountdownBox targetTime={config.reveal.revealTime} label="Reveal in" />
            <p>Your tokens will be revealed when the countdown reaches zero.</p>
          </div>
          <div className="rev-grid rev-preview" aria-hidden="true">
            {tokens.map(id => (
              <div className="rev-card"><div className="rev-face rev-back"><i /></div></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="section-sub">Tap a card to reveal it.</p>

          <div className="box rev-progress">
            <span>{done} of {tokens.length} revealed</span>
            <div className="rev-bar" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={tokens.length}>
              <i style={{ width: `${(done / tokens.length) * 100}%` }} />
            </div>
            <button className="btn sm" onClick={revealAll} disabled={all}>Reveal All</button>
          </div>

          <div className="rev-grid">
            {tokens.map(id => {
              const open = revealed.includes(id);
              return (
                <button
                  key={id}
                  className={`rev-card${open ? ' open' : ''}`}
                  onClick={() => flip(id)}
                  aria-pressed={open}
                  aria-label={open ? `Token ${id}, revealed` : `Reveal token ${id}`}
                >
                  <span className="rev-inner">
                    <span className="rev-face rev-back">
                      <i />
                      <small>Tap to reveal</small>
                    </span>
                    <span className="rev-face rev-front">
                      <span className="rev-art"><PlaceholderArt tokenId={id} /></span>
                      <b>#{String(id).padStart(4, '0')}</b>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {all && (
            <div className="box-lg rev-done">
              <h3>All revealed.</h3>
              <div className="hero-btns">
                <Link to="/collection" className="btn primary">View Collection</Link>
                <Link to="/rarity" className="btn">Check Rarity</Link>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}