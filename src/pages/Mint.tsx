import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import config from '../drop.config';
import { useStore, getCurrentPhase } from '../store';
import { ProgressBar } from '../components/ProgressBar';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { ProgressiveImage } from '../components/ProgressiveImage';
import { useCountdown } from '../hooks/useCountdown';
import { Icon } from '../components/Icon';

const hex = (n: number) => Math.random().toString(16).slice(2, 2 + n);

const WHY: Record<string, string> = {
  'wrong-network': `Switch your wallet to ${config.chain.name} to continue.`,
  upcoming: 'The mint has not started yet.',
  'not-eligible': 'This wallet is not on the allowlist for the current phase.',
  'insufficient-funds': `Add ${config.chain.currencySymbol} to your wallet to cover price and gas.`,
  'limit-reached': 'You have reached the per-wallet limit for this phase.',
  'sold-out': 'All tokens have been minted.',
  paused: 'Minting is paused. Check the community for updates.',
};

export default function Mint() {
  const store = useStore();
  const currentPhase = getCurrentPhase();
  const endRem = useCountdown(currentPhase?.endTime || '');
  const startRem = useCountdown(currentPhase?.startTime || '');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (store.walletConnected && store.mintStatus === 'no-wallet') store.setMintStatus('ready');
    else if (!store.walletConnected && store.mintStatus !== 'no-wallet') store.setMintStatus('no-wallet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.walletConnected, store.mintStatus]);

  const recent = useMemo(
    () => [4821, 4820, 4819, 4818, 4817].map(id => ({ id, addr: `0x${hex(6)}…${hex(4)}` })),
    []
  );

  const requestedId = parseInt(searchParams.get('token') || '', 10);
  const previewNft = config.nfts.find(nft => nft.id === requestedId) || config.nfts.find(nft => nft.image);

  const handleBack = () => (location.key !== 'default' ? navigate(-1) : navigate('/collection'));

  const maxQty = currentPhase
    ? Math.max(1, Math.min(currentPhase.maxPerTx, currentPhase.maxPerWallet - store.walletMinted, config.collection.totalSupply - store.totalMinted))
    : 1;

  const sym = config.chain.currencySymbol;
  const pricePerNft = currentPhase ? currentPhase.priceEth : '0';
  const totalPrice = currentPhase ? (parseFloat(currentPhase.priceEth) * store.mintQuantity).toFixed(3) : '0';
  const setQty = (n: number) => store.setMintQuantity(Math.max(1, Math.min(maxQty, n)));

  const handleMint = () => {
    if (!store.walletConnected) { store.setWalletModalOpen(true); return; }
    if (store.mintStatus === 'ready') store.simulateMint();
  };

  const label = (() => {
    if (!store.walletConnected) return 'Connect Wallet';
    switch (store.mintStatus) {
      case 'wrong-network': return `Switch to ${config.chain.name}`;
      case 'upcoming': return `Starts in ${startRem}`;
      case 'not-eligible': return 'Not on the allowlist';
      case 'insufficient-funds': return `Not enough ${sym}`;
      case 'limit-reached': return 'Wallet limit reached';
      case 'pending-signature': return 'Confirm in your wallet...';
      case 'pending-tx': return 'Minting...';
      case 'sold-out': return 'Sold Out';
      case 'paused': return 'Mint Paused';
      default: return `Mint ${store.mintQuantity} for ${totalPrice} ${sym}`;
    }
  })();

  const disabled = store.walletConnected && store.mintStatus !== 'ready';
  const why = store.walletConnected ? WHY[store.mintStatus] : '';
  const upcoming = store.mintStatus === 'upcoming';

  const ActionButton = ({ className = '' }: { className?: string }) =>
    !store.walletConnected ? (
      <button className={`btn primary full ${className}`} onClick={() => store.setWalletModalOpen(true)}>
        <Icon name="wallet" size={16} /> Connect Wallet
      </button>
    ) : (
      <button className={`btn primary full ${disabled ? 'disabled' : ''} ${className}`} onClick={handleMint} disabled={disabled} aria-live="polite">
        {label}
      </button>
    );

  return (
    <section className="section mint" style={{ marginTop: '20px' }}>
      <button className="btn sm" style={{ marginBottom: '16px' }} onClick={handleBack}>← Back</button>
      <h2 className="section-title">Mint.</h2>
      <p className="section-sub">Mint your Moai. Gas fees apply. Transactions are final.</p>

      <div className="mint-layout">
        <div className="mint-preview">
          <div className="mint-preview-art">
            {previewNft ? (
              <ProgressiveImage src={previewNft.image} thumb={previewNft.thumb} alt={previewNft.name} />
            ) : config.reveal.mode === 'delayed' ? (
              <div className="mint-mystery">
                <i />
                <p>Mystery Moai</p>
                <small>Art revealed after mint</small>
              </div>
            ) : <PlaceholderArt tokenId={store.totalMinted + 1} />}
          </div>
          <div className="mint-preview-info">
            <h3>{previewNft?.name || config.collection.name}</h3>
            <p className="mint-desc">
              {previewNft && `Token #${String(previewNft.id).padStart(4, '0')} · `}
              {config.collection.description.slice(0, 90)}…
            </p>
          </div>
        </div>

        <div className="box mint-panel">
          {currentPhase && (
            <div className="mint-phase">
              <span className={`badge ${currentPhase.allowlistOnly ? 'purple' : 'teal'}`}>{currentPhase.name}</span>
              <span className="mint-time">{upcoming ? `Starts in ${startRem}` : `Ends in ${endRem}`}</span>
            </div>
          )}

          <div className="price-row"><span>Price per NFT</span><span className="val">{pricePerNft} {sym}</span></div>
          <div className="price-row mint-total">
            <span>Total ({store.mintQuantity})</span>
            <span className="val">{totalPrice} {sym}</span>
          </div>

          <div>
            <label htmlFor="qty" className="mint-label">Quantity (max {maxQty})</label>
            <div className="mint-qty">
              <div className="qty-stepper">
                <button onClick={() => setQty(store.mintQuantity - 1)} disabled={store.mintQuantity <= 1} aria-label="Decrease quantity">−</button>
                <div className="qty-val" id="qty" aria-live="polite">{store.mintQuantity}</div>
                <button onClick={() => setQty(store.mintQuantity + 1)} disabled={store.mintQuantity >= maxQty} aria-label="Increase quantity">+</button>
              </div>
              {maxQty > 1 && (
                <button className="btn sm" onClick={() => setQty(maxQty)} disabled={store.mintQuantity >= maxQty}>Max</button>
              )}
            </div>
          </div>

          <div className="wallet-status">
            <div className={`wallet-dot ${store.walletConnected ? (store.mintStatus === 'wrong-network' ? 'red' : 'green') : 'yellow'}`} />
            <span className="mint-wallet-txt">
              {!store.walletConnected
                ? 'Wallet not connected'
                : store.mintStatus === 'wrong-network'
                  ? `Wrong network. Switch to ${config.chain.name}.`
                  : `Connected: ${store.walletAddress?.slice(0, 6)}…${store.walletAddress?.slice(-4)}`}
            </span>
          </div>

          <div className="mint-cta-inline"><ActionButton className="mint-big" /></div>
          {why && <p className="mint-why" role="status">{why}</p>}

          <ProgressBar minted={store.totalMinted} total={config.collection.totalSupply} />

          <p className="mint-fine">
            Gas fees apply. Transactions are final. Contract: {config.contract.address || 'Not deployed (demo mode)'}
          </p>

          {store.mintStatus === 'success' && (
            <div className="result-card">
              <h3 className="mint-res-h"><Icon name="success" size={20} /> Mint Successful!</h3>
              <p>Your Moai are in your wallet.</p>
              <div className="mint-won">
                {store.lastMintedTokens.map(t => (
                  <div key={t.id}>
                    <span className="mint-won-art"><PlaceholderArt tokenId={t.id} /></span>
                    <small>{t.name}</small>
                  </div>
                ))}
              </div>
              <div className="mint-res-btns">
                <Link to="/my-nfts" className="btn sm primary">View My NFTs</Link>
                {config.links.marketplace && (
                  <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn sm">Marketplace</a>
                )}
                {store.txHash && (
                  <a href={`${config.chain.blockExplorerUrl}/tx/${store.txHash}`} target="_blank" rel="noopener noreferrer" className="btn sm">Transaction ↗</a>
                )}
              </div>
            </div>
          )}

          {store.mintStatus === 'failed' && (
            <div className="result-card error">
              <h3 className="mint-res-h"><Icon name="error" size={20} /> Transaction Failed</h3>
              <p>{store.errorMessage || 'Something went wrong. Please try again.'}</p>
              <button className="btn sm" onClick={() => store.setMintStatus('ready')}>Try Again</button>
            </div>
          )}

          {store.mintStatus === 'pending-tx' && store.txHash && (
            <div className="mint-tx">
              Transaction: <a href={`${config.chain.blockExplorerUrl}/tx/${store.txHash}`} target="_blank" rel="noopener noreferrer">{store.txHash.slice(0, 16)}…</a>
            </div>
          )}

          <div className="recent-mints">
            <p className="mint-label">Recent Mints{config.mock ? ' (demo)' : ''}</p>
            {recent.map(r => (
              <div className="recent-mint-item" key={r.id}>
                <span style={{ overflowWrap: 'anywhere' }}>{r.addr}</span>
                <b>#{String(r.id).padStart(4, '0')}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phones: sticky action bar */}
      <div className="mint-bar">
        <div className="mint-bar-sum">
          <small>{store.mintQuantity} × {pricePerNft} {sym}</small>
          <b>{totalPrice} {sym}</b>
        </div>
        <ActionButton className="mint-bar-btn" />
      </div>
    </section>
  );
}