import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { Icon } from '../components/Icon';

export default function Admin() {
  const { walletConnected, walletAddress } = useStore();
  const isOwner = config.admin.ownerAddress && walletAddress?.toLowerCase() === config.admin.ownerAddress.toLowerCase();
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [confirmWord, setConfirmWord] = useState('');

  const isDemo = !config.admin.ownerAddress || config.mock;

  if (!walletConnected) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box" style={{ textAlign: 'center', padding: '40px 16px' }}>
          <h2 style={{ marginBottom: '10px' }}>Admin Access Required.</h2>
          <p style={{ opacity: 0.8 }}>Connect your wallet to access the admin dashboard.</p>
        </div>
      </section>
    );
  }

  if (!isOwner && !isDemo) {
    return (
      <section className="section" style={{ marginTop: '20px' }}>
        <div className="box" style={{ textAlign: 'center', padding: '40px 16px' }}>
          <h2 style={{ marginBottom: '10px' }}>Access Denied.</h2>
          <p style={{ opacity: 0.8, marginBottom: '14px' }}>Your wallet is not authorized to access this page.</p>
          <Link to="/" className="btn">Go Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      {isDemo && (
        <div className="demo-banner" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
          <Icon name="warning" size={16} /> Admin demo mode — no on-chain changes will be made.
        </div>
      )}

      <h2 className="section-title">Admin Dashboard.</h2>
      <p className="section-sub">Manage your collection. All actions require wallet confirmation.</p>

      <div className="box" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '14px' }}>Live Stats</h3>
        <div className="grid-4">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', opacity: 0.7, margin: '0 0 4px', fontFamily: 'var(--font-head)' }}>Minted</p>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>1,847</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', opacity: 0.7, margin: '0 0 4px', fontFamily: 'var(--font-head)' }}>Remaining</p>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>3,153</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', opacity: 0.7, margin: '0 0 4px', fontFamily: 'var(--font-head)' }}>Revenue</p>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>129.29 ETH</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '12px', opacity: 0.7, margin: '0 0 4px', fontFamily: 'var(--font-head)' }}>Unique Minters</p>
            <p style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>1,204</p>
          </div>
        </div>
        <button className="btn sm" style={{ marginTop: '10px' }}>Export Stats (CSV)</button>
      </div>

      <div className="box" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '14px' }}>Phase Controls</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {config.phases.map(phase => (
            <div key={phase.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--white)', border: '2px solid var(--ink)', borderRadius: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong>{phase.name}</strong>
                <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '8px' }}>{phase.priceEth} ETH</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn sm" onClick={() => setConfirmAction(`activate-${phase.id}`)}>Activate</button>
                <button className="btn sm" onClick={() => setConfirmAction(`edit-${phase.id}`)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '14px' }}>Contract Actions</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn sm" onClick={() => setConfirmAction('pause')}>Pause Mint</button>
          <button className="btn sm" onClick={() => setConfirmAction('unpause')}>Unpause Mint</button>
          <button className="btn sm" onClick={() => setConfirmAction('setBaseURI')}>Set Base URI</button>
          <button className="btn sm" onClick={() => setConfirmAction('setReveal')}>Set Reveal</button>
          <button className="btn sm" onClick={() => setConfirmAction('setMerkle')}>Set Merkle Root</button>
          <button className="btn sm" onClick={() => setConfirmAction('withdraw')}>Withdraw Funds</button>
        </div>
      </div>

      <div className="box" style={{ marginBottom: '20px', background: 'var(--pink)' }}>
        <h3 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><Icon name="warning" size={18} /> Irreversible Actions</h3>
        <p style={{ fontSize: '13px', margin: '0 0 10px' }}>These actions cannot be undone. Proceed with extreme caution.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn sm" onClick={() => setConfirmAction('freeze')}>Freeze Metadata</button>
          <button className="btn sm" onClick={() => setConfirmAction('renounce')}>Renounce Ownership</button>
        </div>
      </div>

      <div className="box">
        <h3 style={{ marginBottom: '10px' }}>Allowlist Management</h3>
        <p style={{ fontSize: '13px', margin: '0 0 10px' }}>Upload a CSV file with wallet addresses to generate a Merkle tree.</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button className="btn sm">Upload CSV</button>
          <button className="btn sm">Download Proofs JSON</button>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.7, margin: '8px 0 0' }}>Current Merkle root: {config.phases[0]?.merkleRoot || 'Not set'}</p>
      </div>

      {confirmAction && (
        <div className="modal-overlay" onClick={() => { setConfirmAction(null); setConfirmWord(''); }} role="dialog" aria-modal="true">
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" aria-hidden="true"></div>
            <h3 style={{ marginBottom: '10px' }}>Confirm Action</h3>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>
              You are about to execute: <strong>{confirmAction}</strong>
            </p>
            <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '10px' }}>
              Chain: {config.chain.name} | Contract: {config.contract.address || 'Demo mode'}
            </p>
            {(confirmAction === 'freeze' || confirmAction === 'renounce') && (
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Type "{confirmAction === 'freeze' ? 'FREEZE' : 'RENOUNCE'}" to confirm:
                </label>
                <input
                  type="text"
                  value={confirmWord}
                  onChange={e => setConfirmWord(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: 'var(--bw) solid var(--ink)', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '16px' }}
                />
              </div>
            )}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn primary" onClick={() => { setConfirmAction(null); setConfirmWord(''); }}>Confirm</button>
              <button className="btn" onClick={() => { setConfirmAction(null); setConfirmWord(''); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
