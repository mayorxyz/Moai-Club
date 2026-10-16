import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import config from '../drop.config';
import { useStore, getCurrentPhase } from '../store';
import { ProgressBar } from '../components/ProgressBar';
import { PlaceholderArt } from '../components/PlaceholderArt';
import { ProgressiveImage } from '../components/ProgressiveImage';
import { useCountdown } from '../hooks/useCountdown';
import { Icon } from '../components/Icon';

// Full NFT records (with image/thumb) for the tokens just minted,
// so the success card shows the real artwork — not a placeholder.
const nftById = new Map(config.nfts.map(nft => [nft.id, nft]));

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
  const walletConnected = useStore(s => s.walletConnected);
  const walletAddress = useStore(s => s.walletAddress);
  const mintStatus = useStore(s => s.mintStatus);
  const mintQuantity = useStore(s => s.mintQuantity);
  const txHash = useStore(s => s.txHash);
  const totalMinted = useStore(s => s.totalMinted);
  const walletMinted = useStore(s => s.walletMinted);
  const errorMessage = useStore(s => s.errorMessage);
  const walletModalOpen = useStore(s => s.walletModalOpen);
  const lastMintedTokens = useStore(s => s.lastMintedTokens);
  const setMintStatus = useStore(s => s.setMintStatus);
  const setMintQuantity = useStore(s => s.setMintQuantity);
  const setWalletModalOpen = useStore(s => s.setWalletModalOpen);
  const simulateMint = useStore(s => s.simulateMint);
  const currentPhase = getCurrentPhase();
  const endRem = useCountdown(currentPhase?.endTime || '');
  const startRem = useCountdown(currentPhase?.startTime || '');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Keep the mint status in sync with the connection — but never touch the
    // wallet modal: forcing status here while the modal is open would fight it.
    if (walletConnected && mintStatus === 'no-wallet') setMintStatus('ready');
    else if (!walletConnected && mintStatus !== 'no-wallet' && !walletModalOpen) setMintStatus('no-wallet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, mintStatus, walletModalOpen]);

  const recent = useMemo(
    () => [184, 183, 182, 181, 180].map(id => ({ id, addr: `0x${hex(6)}…${hex(4)}` })),
    []
  );

  const requestedId = parseInt(searchParams.get('token') || '', 10);
  const previewNft = config.nfts.find(nft => nft.id === requestedId) || config.nfts.find(nft => nft.image);

  // A new selection (different ?token=) starts a fresh mint:
  // clear any stale success/failed state so the button works again.
  useEffect(() => {
    if (mintStatus === 'success' || mintStatus === 'failed') setMintStatus('ready');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedId]);

  const handleBack = () => (location.key !== 'default' ? navigate(-1) : navigate('/collection'));

  const maxQty = currentPhase
    ? Math.max(1, Math.min(currentPhase.maxPerTx, currentPhase.maxPerWallet - walletMinted, config.collection.totalSupply - totalMinted))
    : 1;

  const sym = config.chain.currencySymbol;
  const pricePerNft = currentPhase ? currentPhase.priceEth : '0';
  const totalPrice = currentPhase ? (parseFloat(currentPhase.priceEth) * mintQuantity).toFixed(3) : '0';
  const setQty = (n: number) => setMintQuantity(Math.max(1, Math.min(maxQty, n)));

  const openWalletModal = () => setWalletModalOpen(true);

  const handleMint = () => {
    if (!walletConnected) { openWalletModal(); return; }
    if (mintStatus === 'ready') {
      // Mint the previewed/selected token first, then fill the rest randomly.
      const preferred = Number.isFinite(requestedId) ? [requestedId] : [];
      simulateMint(preferred);
    }
  };

  const label = (() => {
    if (!walletConnected) return 'Connect Wallet';
    switch (mintStatus) {
      case 'wrong-network': return `Switch to ${config.chain.name}`;
      case 'upcoming': return `Starts in ${startRem}`;
      case 'not-eligible': return 'Not on the allowlist';
      case 'insufficient-funds': return `Not enough ${sym}`;
      case 'limit-reached': return 'Wallet limit reached';
      case 'pending-signature': return 'Confirm in your wallet...';
      case 'pending-tx': return 'Minting...';
      case 'sold-out': return 'Sold Out';
      case 'paused': return 'Mint Paused';
      default: return `Mint ${mintQuantity} for ${totalPrice} ${sym}`;
    }
  })();

  const disabled = walletConnected && mintStatus !== 'ready';
  const why = walletConnected ? WHY[mintStatus] : '';
  const upcoming = mintStatus === 'upcoming';

  const ActionButton = ({ className = '' }: { className?: string }) =>
    !walletConnected ? (
      <button type="button" className={`btn primary full ${className}`} onClick={openWalletModal}>
        <Icon name="wallet" size={16} /> Connect Wallet
      </button>
    ) : (
      <button type="button" className={`btn primary full ${disabled ? 'disabled' : ''} ${className}`} onClick={handleMint} disabled={disabled} aria-live="polite">
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
            <span>Total ({mintQuantity})</span>
            <span className="val">{totalPrice} {sym}</span>
          </div>

          <div>
            <label htmlFor="qty" className="mint-label">Quantity (max {maxQty})</label>
            <div className="mint-qty">
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty(mintQuantity - 1)} disabled={mintQuantity <= 1} aria-label="Decrease quantity">−</button>
                <div className="qty-val" id="qty" aria-live="polite">{mintQuantity}</div>
                <button type="button" onClick={() => setQty(mintQuantity + 1)} disabled={mintQuantity >= maxQty} aria-label="Increase quantity">+</button>
              </div>
              {maxQty > 1 && (
                <button type="button" className="btn sm" onClick={() => setQty(maxQty)} disabled={mintQuantity >= maxQty}>Max</button>
              )}
            </div>
          </div>

          <div className="wallet-status">
            <div className={`wallet-dot ${walletConnected ? (mintStatus === 'wrong-network' ? 'red' : 'green') : 'yellow'}`} />
            <span className="mint-wallet-txt">
              {!walletConnected
                ? 'Wallet not connected'
                : mintStatus === 'wrong-network'
                  ? `Wrong network. Switch to ${config.chain.name}.`
                  : `Connected: ${walletAddress?.slice(0, 6)}…${walletAddress?.slice(-4)}`}
            </span>
          </div>

          <div className="mint-cta-inline"><ActionButton className="mint-big" /></div>
          {why && <p className="mint-why" role="status">{why}</p>}

          <ProgressBar minted={totalMinted} total={config.collection.totalSupply} />

          <p className="mint-fine">
            Gas fees apply. Transactions are final. Contract: {config.contract.address || 'Not deployed (demo mode)'}
          </p>

          {mintStatus === 'success' && (
            <div className="result-card">
              <h3 className="mint-res-h"><Icon name="success" size={20} /> Mint Successful!</h3>
              <p>Your Moai are in your wallet.</p>
              <div className="mint-won">
                {lastMintedTokens.map(t => {
                  const full = nftById.get(t.id);
                  return (
                    <div key={t.id}>
                      <span className="mint-won-art">
                        {full?.image ? (
                          <ProgressiveImage src={full.image} thumb={full.thumb} alt={full.name} />
                        ) : (
                          <PlaceholderArt tokenId={t.id} />
                        )}
                      </span>
                      <small>{t.name}</small>
                    </div>
                  );
                })}
              </div>
              <div className="mint-res-btns">
                <Link to="/my-nfts" className="btn sm primary">View My NFTs</Link>
                {/* Mint another: reset to ready so the form works again */}
                <button type="button" className="btn sm" onClick={() => setMintStatus('ready')}>Mint Another</button>
                {config.links.marketplace && (
                  <a href={config.links.marketplace} target="_blank" rel="noopener noreferrer" className="btn sm">Marketplace</a>
                )}
                {txHash && (
                  <a href={`${config.chain.blockExplorerUrl}/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="btn sm">Transaction ↗</a>
                )}
              </div>
            </div>
          )}

          {mintStatus === 'failed' && (
            <div className="result-card error">
              <h3 className="mint-res-h"><Icon name="error" size={20} /> Transaction Failed</h3>
              <p>{errorMessage || 'Something went wrong. Please try again.'}</p>
              <button type="button" className="btn sm" onClick={() => setMintStatus('ready')}>Try Again</button>
            </div>
          )}

          {mintStatus === 'pending-tx' && txHash && (
            <div className="mint-tx">
              Transaction: <a href={`${config.chain.blockExplorerUrl}/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash.slice(0, 16)}…</a>
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
          <small>{mintQuantity} × {pricePerNft} {sym}</small>
          <b>{totalPrice} {sym}</b>
        </div>
        <ActionButton className="mint-bar-btn" />
      </div>
    </section>
  );
}