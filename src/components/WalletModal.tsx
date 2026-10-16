// Edit here: WalletModal component
import { useEffect, useState } from 'react';
import config from '../drop.config';
import { useStore } from '../store';
import { IconTile } from './IconTile';

type Eip1193Provider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
  providers?: Eip1193Provider[];
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isRainbow?: boolean;
};

type WalletOption = { name: string; provider: Eip1193Provider | null; icon: 'wallet' | 'mint' | 'shield' | 'link'; color: 'orange' | 'pink' | 'teal' | 'purple' };

declare global {
  interface Window { ethereum?: Eip1193Provider }
}

function walletOption(provider: Eip1193Provider, announcedName?: string): WalletOption {
  const name = announcedName || (provider.isCoinbaseWallet ? 'Coinbase Wallet' : provider.isRainbow ? 'Rainbow' : provider.isMetaMask ? 'MetaMask' : 'Browser Wallet');
  if (/coinbase/i.test(name)) return { name, provider, icon: 'shield', color: 'teal' };
  if (/rainbow/i.test(name)) return { name, provider, icon: 'mint', color: 'pink' };
  if (/metamask/i.test(name)) return { name, provider, icon: 'wallet', color: 'orange' };
  return { name, provider, icon: 'link', color: 'purple' };
}

function formatEther(value: unknown) {
  if (typeof value !== 'string' || !/^0x[\da-f]+$/i.test(value)) return '0';
  const wei = BigInt(value);
  const whole = wei / 10n ** 18n;
  const fraction = (wei % 10n ** 18n).toString().padStart(18, '0').slice(0, 6).replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole.toString();
}

export function WalletModal() {
  const walletModalOpen = useStore(s => s.walletModalOpen);
  const setWalletModalOpen = useStore(s => s.setWalletModalOpen);
  const connectWallet = useStore(s => s.connectWallet);
  const disconnectWallet = useStore(s => s.disconnectWallet);
  const [wallets, setWallets] = useState<WalletOption[]>([]);
  const [activeProvider, setActiveProvider] = useState<Eip1193Provider | null>(null);
  const [error, setError] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!walletModalOpen) return;
    setError('');
    if (config.mock) {
      setWallets([
        { name: 'MetaMask', provider: null, icon: 'wallet', color: 'orange' },
        { name: 'Rainbow', provider: null, icon: 'mint', color: 'pink' },
        { name: 'Coinbase Wallet', provider: null, icon: 'shield', color: 'teal' },
        { name: 'WalletConnect', provider: null, icon: 'link', color: 'purple' },
      ]);
      return;
    }
    const addWallet = (option: WalletOption) => setWallets(current =>
      current.some(wallet => wallet.provider === option.provider)
        ? current
        : [...current, option]
    );
    setWallets([]);
    const injected = window.ethereum;
    for (const provider of (injected?.providers?.length ? injected.providers : injected ? [injected] : [])) {
      addWallet(walletOption(provider));
    }
    const onAnnounce = (event: Event) => {
      const detail = (event as CustomEvent<{ provider: Eip1193Provider; info?: { name?: string } }>).detail;
      if (detail?.provider) addWallet(walletOption(detail.provider, detail.info?.name));
    };
    window.addEventListener('eip6963:announceProvider', onAnnounce);
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    return () => window.removeEventListener('eip6963:announceProvider', onAnnounce);
  }, [walletModalOpen]);

  useEffect(() => {
    if (!activeProvider) return;
    const onAccountsChanged = (accounts: unknown) => {
      const address = Array.isArray(accounts) && typeof accounts[0] === 'string' ? accounts[0] : null;
      if (address) {
        void Promise.all([
          activeProvider.request({ method: 'eth_chainId' }),
          activeProvider.request({ method: 'eth_getBalance', params: [address, 'latest'] }),
        ]).then(([chain, balance]) => connectWallet(address, Number(chain), formatEther(balance))).catch(() => disconnectWallet());
      } else {
        disconnectWallet();
        setActiveProvider(null);
      }
    };
    const onChainChanged = (chain: unknown) => {
      const chainId = typeof chain === 'string' ? Number(chain) : Number(chain);
      useStore.setState(state => ({ ...state, chainId, mintStatus: chainId === config.chain.chainId ? 'ready' : 'wrong-network' }));
      const address = useStore.getState().walletAddress;
      if (address) void activeProvider.request({ method: 'eth_getBalance', params: [address, 'latest'] })
        .then(balance => useStore.setState({ balance: formatEther(balance) }));
    };
    const onDisconnect = () => { disconnectWallet(); setActiveProvider(null); };
    activeProvider.on?.('accountsChanged', onAccountsChanged);
    activeProvider.on?.('chainChanged', onChainChanged);
    activeProvider.on?.('disconnect', onDisconnect);
    return () => {
      activeProvider.removeListener?.('accountsChanged', onAccountsChanged);
      activeProvider.removeListener?.('chainChanged', onChainChanged);
      activeProvider.removeListener?.('disconnect', onDisconnect);
    };
  }, [activeProvider, connectWallet, disconnectWallet]);

  const handleConnect = async (provider: Eip1193Provider | null) => {
    setConnecting(true);
    setError('');
    try {
      if (config.mock) {
        const mockAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        connectWallet(mockAddress, config.chain.chainId, '2.45');
        setWalletModalOpen(false);
        return;
      }
      if (!provider) throw new Error('Wallet provider is unavailable.');
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const address = Array.isArray(accounts) ? accounts[0] : null;
      if (typeof address !== 'string') throw new Error('The wallet did not return an account.');
      const [chain, balance] = await Promise.all([
        provider.request({ method: 'eth_chainId' }),
        provider.request({ method: 'eth_getBalance', params: [address, 'latest'] }),
      ]);
      connectWallet(address, Number(chain), formatEther(balance));
      setActiveProvider(provider);
      setWalletModalOpen(false);
    } catch (cause) {
      const code = (cause as { code?: number })?.code;
      setError(code === 4001 ? 'Connection was cancelled in your wallet.' : cause instanceof Error ? cause.message : 'Could not connect to that wallet.');
    } finally {
      setConnecting(false);
    }
  };

  if (!walletModalOpen) return null;
  return (
    <div className="modal-overlay" onClick={() => setWalletModalOpen(false)} role="dialog" aria-modal="true" aria-label="Connect wallet">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" aria-hidden="true"></div>
        <h3>Connect Wallet</h3>
        {wallets.map(wallet => (
          <button className="wallet-option" key={wallet.name} onClick={() => void handleConnect(wallet.provider)} disabled={connecting}>
            <IconTile name={wallet.icon} color={wallet.color} size={36} /> {connecting ? 'Connecting…' : wallet.name}
          </button>
        ))}
        {!wallets.length && <p role="status">No browser wallet detected. Install MetaMask, Coinbase Wallet, or Rainbow, then refresh this page.</p>}
        {error && <p role="alert" style={{ color: '#b42318', marginTop: 10 }}>{error}</p>}
        <p className="security-notice">We never ask for your seed phrase or private keys.</p>
      </div>
    </div>
  );
}
