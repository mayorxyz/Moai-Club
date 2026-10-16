// Edit here: WalletModal component
import { useState } from 'react';
import { useStore } from '../store';
import { IconTile } from './IconTile';

export function WalletModal() {
  const { walletModalOpen, setWalletModalOpen, connectWallet } = useStore();
  if (!walletModalOpen) return null;
  const handleConnect = () => {
    const mockAddr = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    connectWallet(mockAddr);
    setWalletModalOpen(false);
  };
  return (
    <div className="modal-overlay" onClick={() => setWalletModalOpen(false)} role="dialog" aria-modal="true" aria-label="Connect wallet">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" aria-hidden="true"></div>
        <h3>Connect Wallet</h3>
        <div className="wallet-option" onClick={handleConnect} role="button" tabIndex={0}><IconTile name="wallet" color="orange" size={36} /> MetaMask</div>
        <div className="wallet-option" onClick={handleConnect} role="button" tabIndex={0}><IconTile name="mint" color="pink" size={36} /> Rainbow</div>
        <div className="wallet-option" onClick={handleConnect} role="button" tabIndex={0}><IconTile name="shield" color="teal" size={36} /> Coinbase Wallet</div>
        <div className="wallet-option" onClick={handleConnect} role="button" tabIndex={0}><IconTile name="link" color="purple" size={36} /> WalletConnect</div>
        <p className="security-notice">We never ask for your seed phrase or private keys.</p>
      </div>
    </div>
  );
}
