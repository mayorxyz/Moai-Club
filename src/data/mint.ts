// Edit here: Mint phases, reveal, claims, staking, and holder perks configuration

export interface Phase {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  price: string;
  priceEth: string;
  maxPerWallet: number;
  maxPerTx: number;
  allowlistOnly: boolean;
  merkleRoot?: string;
}

export const phases: Phase[] = [
  {
    id: 'allowlist',
    name: 'Allowlist Mint',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    price: '70000000000000000',
    priceEth: '0.07',
    maxPerWallet: 3,
    maxPerTx: 2,
    allowlistOnly: true,
  },
  {
    id: 'public',
    name: 'Public Mint',
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    price: '80000000000000000',
    priceEth: '0.08',
    maxPerWallet: 5,
    maxPerTx: 3,
    allowlistOnly: false,
  },
];

export const reveal = {
  mode: 'delayed' as const,
  revealTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  baseURI: 'ipfs://QmPlaceholder/',
};

export const claims = { enabled: false, merkleRoot: '', snapshotDate: '', rewardText: '' };

export const staking = { enabled: false, contract: '', rewardToken: '', rules: '' };

export const holder = {
  perks: [
    { id: 'discord-role', title: 'Discord Role', description: 'Get the Moai role in our Discord server.', requiredBalance: 1, type: 'link' as const, payload: 'https://discord.gg/moaiclub' },
    { id: 'wallpaper-pack', title: 'Wallpaper Pack', description: 'Download high-res wallpapers featuring Moai Club.', requiredBalance: 1, type: 'download' as const, payload: '/downloads/wallpapers.zip' },
    { id: 'secret-message', title: 'Secret Message', description: 'Unlock a hidden message from the artist.', requiredBalance: 2, type: 'text' as const, payload: 'The frontier awaits those who dare to explore.' },
  ],
};
