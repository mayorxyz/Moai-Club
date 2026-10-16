// Edit here: Site, chain, contract, links, admin, mock, prelaunch, and navigation configuration

export const collection = {
  name: 'Moai Club',
  symbol: 'MC',
  description: 'A generative collection of 200+ unique moai stone heads exploring the digital frontier.',
  totalSupply: 203,
  royaltyPercent: 5,
};

export const chain = {
  name: 'Ethereum',
  chainId: 1,
  rpcUrl: 'https://eth.llamarpc.com',
  blockExplorerUrl: 'https://etherscan.io',
  currencySymbol: 'ETH',
};

export const contract = {
  address: '',
  standard: 'ERC-721' as const,
};

export const links = {
  twitter: 'https://x.com/mayor_1_7',
  discord: 'https://x.com/mayor_1_7',
  marketplace: 'https://opensea.io',
};

export const admin = { ownerAddress: '' };

export const mock = true;

export const prelaunch = {
  enabled: false,
  launchTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  waitlistEndpoint: '/api/waitlist',
  collectEmail: true,
  collectWallet: false,
};

export type NavItem = {
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
  flag?: 'staking' | 'claims' | 'owner';
};

export type NavGroup = {
  label: string;
  to?: string;        // clicking the label goes here; the caret toggles the dropdown
  primary?: boolean;  // orange style
  items: NavItem[];
};

// Desktop header groups (hover, click or keyboard opens the dropdown)
export const navGroups: NavGroup[] = [
  {
    label: 'Mint',
    to: '/mint',
    primary: true,
    items: [
      { label: 'Mint now', to: '/mint' },
      { label: 'My NFTs', to: '/my-nfts' },
      { label: 'Allowlist checker', to: '/allowlist' },
      { label: 'Reveal', to: '/reveal' },
    ],
  },
  {
    label: 'Collection',
    to: '/collection',
    items: [
      { label: 'Browse collection', to: '/collection' },
      { label: 'Rarity', to: '/rarity' },
      { label: 'Activity', to: '/activity' },
      { label: 'Leaderboard', to: '/leaderboard' },
    ],
  },
  {
    label: 'Project',
    items: [
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Team', to: '/team' },
      { label: 'Artist', to: '/artist' },
      { label: 'Updates', to: '/updates' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    label: 'Community',
    to: '/community',
    items: [
      { label: 'Community', to: '/community' },
      { label: 'X', href: links.twitter, external: true },
      { label: 'Discord', href: links.discord, external: true },
    ],
  },
  {
    label: 'Trust',
    items: [
      { label: 'Provenance', to: '/provenance' },
      { label: 'Security', to: '/security' },
      { label: 'Transparency', to: '/transparency' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Help Center', to: '/help' },
    ],
  },
];

// Desktop account dropdown (shown only when a wallet is connected)
export const accountItems: NavItem[] = [
  { label: 'My NFTs', to: '/my-nfts' },
  { label: 'Holder Portal', to: '/holder' },
  { label: 'Staking', to: '/staking', flag: 'staking' },
  { label: 'Claim', to: '/claim', flag: 'claims' },
  { label: 'Admin', to: '/admin', flag: 'owner' }, // only for the configured owner wallet
];

// Mobile sheet accordions (Mint button sits above these)
export const mobileGroups: { label: string; to?: string; items: NavItem[] }[] = [
  {
    label: 'Collection',
    to: '/collection',
    items: [
      { label: 'Browse collection', to: '/collection' },
      { label: 'Rarity', to: '/rarity' },
      { label: 'Activity', to: '/activity' },
      { label: 'Leaderboard', to: '/leaderboard' },
      { label: 'Reveal', to: '/reveal' },
    ],
  },
  {
    label: 'Project',
    to: '/roadmap',
    items: [
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Team', to: '/team' },
      { label: 'Artist', to: '/artist' },
      { label: 'Updates', to: '/updates' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    label: 'Trust',
    to: '/provenance',
    items: [
      { label: 'Provenance', to: '/provenance' },
      { label: 'Security', to: '/security' },
      { label: 'Transparency', to: '/transparency' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Help Center', to: '/help' },
    ],
  },
  {
    label: 'Holders',
    to: '/my-nfts',
    items: [
      { label: 'My NFTs', to: '/my-nfts' },
      { label: 'Holder Portal', to: '/holder' },
      { label: 'Allowlist checker', to: '/allowlist' },
      { label: 'Staking', to: '/staking', flag: 'staking' },
      { label: 'Claim', to: '/claim', flag: 'claims' },
      { label: 'Admin', to: '/admin', flag: 'owner' },
    ],
  },
];

export const mobileSocials: NavItem[] = [
  { label: 'X', href: links.twitter, external: true },
  { label: 'Discord', href: links.discord, external: true },
  { label: 'Community', to: '/community' },
];
