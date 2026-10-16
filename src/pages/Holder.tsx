import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { RiskDisclaimer } from '../components/RiskDisclaimer';

export default function Holder() {
  const { walletConnected, walletMinted, mintedTokens, setWalletModalOpen } = useStore();
  const [revealedPerk, setRevealedPerk] = useState<string | null>(null);

  if (!walletConnected) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box" style={{ textAlign: 'center', padding: '40px 16px' }}>
          <h3 style={{ marginBottom: '10px' }}>Holder Portal</h3>
          <p style={{ opacity: 0.8, margin: '0 auto 16px', textAlign: 'center' }}>Connect your wallet to access exclusive perks.</p>
          <button className="btn primary" onClick={() => setWalletModalOpen(true)}>Connect Wallet</button>
        </div>
      </section>
    );
  }

  if (walletMinted === 0 && mintedTokens.length === 0) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box" style={{ textAlign: 'center', padding: '40px 16px' }}>
          <h3 style={{ marginBottom: '10px' }}>No Moai found.</h3>
          <p style={{ opacity: 0.8, margin: '0 auto 16px', textAlign: 'center' }}>You need at least one Moai Club to access holder perks.</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/mint" className="btn primary">Mint Now</Link>
            <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn">Buy on Marketplace</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Holder Portal.</h2>
      <p className="section-sub">Exclusive perks for Moai Club holders.</p>

      {mintedTokens.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {mintedTokens.map(t => (
            <div key={t.id} style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: 'var(--bw) solid var(--ink)' }}>
              <PlaceholderArt tokenId={t.id} />
            </div>
          ))}
        </div>
      )}

      <div className="grid-3">
        {config.holder.perks.map(perk => {
          const unlocked = walletMinted >= perk.requiredBalance;
          return (
            <div className="box" key={perk.id} style={{ opacity: unlocked ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '6px' }}>
                <h3 style={{ margin: 0 }}>{perk.title}</h3>
                <span className={`badge ${unlocked ? 'teal' : 'gray'}`}>{unlocked ? 'Unlocked' : 'Locked'}</span>
              </div>
              <p style={{ fontSize: '13px', margin: '0 0 6px' }}>{perk.description}</p>
              <p style={{ fontSize: '12px', opacity: 0.7, margin: '0 0 10px' }}>Requires: {perk.requiredBalance} NFT{perk.requiredBalance > 1 ? 's' : ''}</p>
              {unlocked && (
                <div>
                  {perk.type === 'link' && (
                    <a href={perk.payload} target="_blank" rel="noopener noreferrer" className="btn sm">Open</a>
                  )}
                  {perk.type === 'download' && (
                    <a href={perk.payload} download className="btn sm">Download</a>
                  )}
                  {perk.type === 'text' && (
                    <button className="btn sm" onClick={() => setRevealedPerk(revealedPerk === perk.id ? null : perk.id)}>
                      {revealedPerk === perk.id ? 'Hide' : 'Reveal'}
                    </button>
                  )}
                  {perk.type === 'redeem' && (
                    <button className="btn sm">Redeem</button>
                  )}
                  {perk.type === 'text' && revealedPerk === perk.id && (
                    <p style={{ fontSize: '13px', marginTop: '8px', background: 'var(--lime)', padding: '8px', borderRadius: '8px', border: '2px solid var(--ink)' }}>
                      {perk.payload}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <RiskDisclaimer />
    </section>
  );
}
