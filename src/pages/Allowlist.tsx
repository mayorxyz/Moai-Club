import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { Icon } from '../components/Icon';

const ADDR = /^0x[a-fA-F0-9]{40}$/;
const short = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

// Replace with a real API call. Demo mode is deterministic per address.
const lookup = async (addr: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 600));
  return parseInt(addr.slice(-1), 16) % 2 === 0;
};

const STEPS = ['Enter or paste your wallet', 'Run the check', 'Mint if you are listed'];

export default function Allowlist() {
  const { walletConnected, walletAddress } = useStore();
  const [address, setAddress] = useState(walletConnected ? walletAddress || '' : '');
  const [result, setResult] = useState<null | { eligible: boolean; addr: string }>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (v: string) => {
    setAddress(v);
    setResult(null);
    setError('');
  };

  const paste = async () => {
    try { update((await navigator.clipboard.readText()).trim()); } catch { /* blocked */ }
  };

  const handleCheck = async () => {
    const addr = address.trim();
    setError('');
    setResult(null);
    if (!addr) return setError('Please enter a wallet address.');
    if (!ADDR.test(addr)) return setError('Invalid Ethereum address format.');
    setLoading(true);
    try {
      setResult({ eligible: await lookup(addr), addr });
    } catch {
      setError('Check failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section al" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Allowlist Checker.</h2>
      <p className="section-sub">Check if your wallet is on the allowlist.</p>

      <ol className="al-steps">
        {STEPS.map((s, i) => (
          <li key={i}><span className="num">{String(i + 1).padStart(2, '0')}</span><p>{s}</p></li>
        ))}
      </ol>

      <div className="al-check">
    
        <form className="box" onSubmit={e => { e.preventDefault(); handleCheck(); }}>
          <label htmlFor="al-address">Wallet Address</label>
          <input
            id="al-address"
            type="text"
            value={address}
            onChange={e => update(e.target.value)}
            placeholder="0x..."
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'al-err' : undefined}
            className={error ? 'bad' : ''}
          />
          {error && <p id="al-err" className="al-err">{error}</p>}

          <div className="al-quick">
            {walletConnected && walletAddress && address !== walletAddress && (
              <button type="button" className="btn sm" onClick={() => update(walletAddress)}>Use connected wallet</button>
            )}
            <button type="button" className="btn sm" onClick={paste}>Paste</button>
          </div>

          <button type="submit" className="btn primary full" disabled={loading}>
            {loading ? 'Checking…' : 'Check Allowlist'}
          </button>
        </form>

        <div aria-live="polite">
          {result && (
            <div className={`box al-result ${result.eligible ? 'eligible' : 'not-eligible'}`}>
              <Icon name={result.eligible ? 'success' : 'error'} size={28} />
              <h3>{result.eligible ? "You're on the allowlist!" : 'Not on the allowlist.'}</h3>
              <code>{short(result.addr)}</code>
              <p>
                {result.eligible
                  ? 'This wallet can mint during the allowlist phase.'
                  : 'This wallet is not on the current allowlist.'}
              </p>
              <div className="hero-btns">
                {result.eligible
                  ? <Link to="/mint" className="btn primary">Mint Now</Link>
                  : <Link to="/community" className="btn primary">Join the Community</Link>}
              </div>
            </div>
          )}
        </div>

        <p className="al-note">We do not store or log the addresses you check.</p>
      </div>
    </section>
  );
}