import { create } from 'zustand';
import config from './drop.config';

export type MintStatus = 'no-wallet' | 'wrong-network' | 'upcoming' | 'not-eligible' | 'ready' | 'insufficient-funds' | 'limit-reached' | 'pending-signature' | 'pending-tx' | 'success' | 'failed' | 'sold-out' | 'paused';

interface AppState {
  walletConnected: boolean;
  walletAddress: string | null;
  chainId: number | null;
  balance: string;
  mintStatus: MintStatus;
  mintQuantity: number;
  txHash: string | null;
  mintedTokens: { id: number; name: string }[];
  /** Tokens minted in the most recent transaction (subset of mintedTokens). */
  lastMintedTokens: { id: number; name: string }[];
  errorMessage: string | null;
  totalMinted: number;
  walletMinted: number;
  mobileMenuOpen: boolean;
  walletModalOpen: boolean;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  setMintStatus: (s: MintStatus) => void;
  setMintQuantity: (q: number) => void;
  setMobileMenuOpen: (o: boolean) => void;
  setWalletModalOpen: (o: boolean) => void;
  simulateMint: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  walletConnected: false,
  walletAddress: null,
  chainId: null,
  balance: '0',
  mintStatus: 'no-wallet',
  mintQuantity: 1,
  txHash: null,
  mintedTokens: [],
  lastMintedTokens: [],
  errorMessage: null,
  totalMinted: config.mock ? 1847 : 0,
  walletMinted: 0,
  mobileMenuOpen: false,
  walletModalOpen: false,
  connectWallet: (address) => {
    set({ walletConnected: true, walletAddress: address, chainId: config.chain.chainId, balance: '2.45', mintStatus: 'ready' });
  },
  disconnectWallet: () => {
    set({ walletConnected: false, walletAddress: null, chainId: null, balance: '0', mintStatus: 'no-wallet', walletMinted: 0, txHash: null, mintedTokens: [], lastMintedTokens: [], errorMessage: null });
  },
  setMintStatus: (s) => set({ mintStatus: s }),
  setMintQuantity: (q) => set({ mintQuantity: q }),
  setMobileMenuOpen: (o) => set({ mobileMenuOpen: o }),
  setWalletModalOpen: (o) => set({ walletModalOpen: o }),
  simulateMint: () => {
    const state = get();
    if (!config.mock) return;
    set({ mintStatus: 'pending-signature' });
    setTimeout(() => {
      set({ mintStatus: 'pending-tx', txHash: '0x' + Math.random().toString(16).slice(2) + '...' });
      setTimeout(() => {
        const qty = state.mintQuantity;
        // Hand out REAL token IDs from the collection (not already owned),
        // so minted NFTs have artwork on the My NFTs page.
        const ownedIds = new Set(state.mintedTokens.map(t => t.id));
        const available = config.nfts.filter(nft => !ownedIds.has(nft.id));
        // Shuffle and pick `qty` tokens
        for (let i = available.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [available[i], available[j]] = [available[j], available[i]];
        }
        const newTokens: { id: number; name: string }[] = available
          .slice(0, qty)
          .map(nft => ({ id: nft.id, name: nft.name }));
        set({
          mintStatus: 'success',
          mintedTokens: [...state.mintedTokens, ...newTokens],
          lastMintedTokens: newTokens,
          totalMinted: state.totalMinted + qty,
          walletMinted: state.walletMinted + qty,
        });
      }, 2000);
    }, 1500);
  },
}));

export function getCurrentPhase() {
  const now = Date.now();
  return config.phases.find(p => {
    const start = new Date(p.startTime).getTime();
    const end = new Date(p.endTime).getTime();
    return now >= start && now <= end;
  }) || null;
}

export function getNextPhase() {
  const now = Date.now();
  return config.phases.find(p => new Date(p.startTime).getTime() > now) || null;
}
