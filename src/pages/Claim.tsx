import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { Icon } from '../components/Icon';
import { RiskDisclaimer } from '../components/RiskDisclaimer';

const ADDR = /^0x[a-fA-F0-9]{40}$/;
const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

// Replace with a real API call. Demo mode is deterministic per address.
const lookup = async (addr: string): Promise<{ eligible: boolean; amount?: string }> => {
  await new Promise(r => setTimeout(r, 600));
  const eligible = parseInt(addr.slice(-1), 16) % 2 === 0;
  return { eligible, amount: eligible ? '100 TOKENS' : undefined };
};

// Replace with the contract call. Returns a tx hash.
const claim = async (_addr: string): Promise<string> => {
  await new Promise(r => setTimeout(r, 1200));
  return `0x${'0'.repeat(64)}`;
};

const snapLabel = (iso: string) => {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86400000);
  if (days === 0) return 'Today';
  return days > 0 ? `In ${days} day${days === 1 ? '' : 's'}` : `Taken ${-days} day${days === -1 ? '' : 's'} ago`;
};

type Result = { eligible: boolean; amount?: string; addr: string };
type ClaimState = 'idle' | 'pending' | 'done' | 'failed';

export default function Claim() {
  const { walletConnected, walletAddress } = useStore();
  const [address, setAddress] = useState(walletAddress || '');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [claimState, setClaimState] = useState<ClaimState>('idle');
  const [txHash, setTxHash] = useState('');

  if (!config.claims.enabled) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box cl-off">
          <h2>Claims are not available.</h2>
          <p>This feature is not currently enabled.</p>
          <Link to="/" className="btn">Go Home</Link>
        </div>
      </section>
    );
  }

  const update = (v: string) => {
    setAddress(v);
    setResult(null);
    setError('');
    setClaimState('idle');
  };

  const paste = async () => {
    try { update((await navigator.clipboard.readText()).trim()); } catch { /* blocked */ }
  };

  const handleCheck = async () => {
    const addr = address.trim();
    setError('');
    setResult(null);
    setClaimState('idle');
    if (!addr) return setError('Please enter a wallet address.');
    if (!ADDR.test(addr)) return setError('Invalid Ethereum address format.');
    setLoading(true);
    try {
      setResult({ ...(await lookup(addr)), addr });
    } catch {
      setError('Check failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!result) return;
    setClaimState('pending');
    try {
      setTxHash(await claim(result.addr));
      setClaimState('done');
    } catch {
      setClaimState('failed');
    }
  };

  const snap = config.claims.snapshotDate;
  const isMine = Boolean(walletConnected && walletAddress && result && walletAddress.toLowerCase() === result.addr.toLowerCase());
  const explorer = config.chain?.blockExplorerUrl;

  return (
    <section className="section cl" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Claim.</h2>
      <p className="section-sub">{config.claims.rewardText || 'Check your eligibility for the airdrop.'}</p>

      <div className="cl-wrap">
        {config.mock && (
          <div className="box cl-demo"><Icon name="warning" size={18} /><p>Demo mode — results are simulated.</p></div>
        )}

        <div className="box cl-snap">
          <span>Snapshot</span>
          <b>{snap ? new Date(snap).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) : 'TBA'}</b>
          {snap && <em className="tag">{snapLabel(snap)}</em>}
        </div>

        <form className="box" onSubmit={e => { e.preventDefault(); handleCheck(); }}>
          <label htmlFor="cl-address">Wallet Address</label>
          <input
            id="cl-address"
            type="text"
            value={address}
            onChange={e => update(e.target.value)}
            placeholder="0x..."
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'cl-err' : undefined}
            className={error ? 'bad' : ''}
          />
          {error && <p id="cl-err" className="cl-err">{error}</p>}

          <div className="cl-quick">
            {walletConnected && walletAddress && address !== walletAddress && (
              <button type="button" className="btn sm" onClick={() => update(walletAddress)}>Use connected wallet</button>
            )}
            <button type="button" className="btn sm" onClick={paste}>Paste</button>
          </div>

          <button type="submit" className="btn primary full" disabled={loading}>
            {loading ? 'Checking…' : 'Check Eligibility'}
          </button>
        </form>

        <div aria-live="polite">
          {result && (
            <div className={`box cl-result ${result.eligible ? 'yes' : 'no'}`}>
              <Icon name={result.eligible ? 'success' : 'error'} size={28} />
              <h3>{result.eligible ? 'Eligible!' : 'Not eligible.'}</h3>
              <code>{short(result.addr)}</code>

              {result.eligible ? (
                <>
                  <p>You can claim</p>
                  <b className="cl-amt">{result.amount}</b>

                  {claimState === 'done' ? (
                    <p className="cl-ok">
                      Claimed.{' '}
                      {explorer && <a href={`${explorer}/tx/${txHash}`} target="_blank" rel="noopener noreferrer">View transaction ↗</a>}
                    </p>
                  ) : !walletConnected ? (
                    <p className="cl-warn">Connect your wallet to claim.</p>
                  ) : !isMine ? (
                    <p className="cl-warn">Connect the wallet {short(result.addr)} to claim.</p>
                  ) : (
                    <button className="btn primary" onClick={handleClaim} disabled={claimState === 'pending'}>
                      {claimState === 'pending' ? 'Claiming…' : 'Claim Now'}
                    </button>
                  )}
                  {claimState === 'failed' && <p className="cl-warn">Claim failed. Please try again.</p>}
                </>
              ) : (
                <p>This wallet was not included in the snapshot.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <RiskDisclaimer />
    </section>
  );
}