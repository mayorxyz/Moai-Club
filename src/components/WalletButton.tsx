// Edit here: WalletButton component
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { Icon } from './Icon';

export function WalletButton() {
  const { walletConnected, walletAddress, setWalletModalOpen, disconnectWallet } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const shortAddr = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '';
  if (!walletConnected) {
    return <button className="btn primary sm" onClick={() => setWalletModalOpen(true)} aria-label="Connect wallet"><Icon name="wallet" size={16} /> Connect</button>;
  }
  return (
    <div className="dropdown">
      <button className="btn sm" onClick={() => setDropdownOpen(!dropdownOpen)} aria-label={`Wallet ${shortAddr}`}>{shortAddr}</button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <Link to="/my-nfts" onClick={() => setDropdownOpen(false)}>My NFTs</Link>
          <button onClick={() => { disconnectWallet(); setDropdownOpen(false); }}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
