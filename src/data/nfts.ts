import { NFT_ART } from './nftArt';

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

export interface TraitCategory {
  category: string;
  values: { name: string; count: number }[];
}

export interface HolderPerk {
  id: string;
  title: string;
  description: string;
  requiredBalance: number;
  type: 'download' | 'link' | 'redeem' | 'text';
  payload: string;
}

export interface Update {
  id: string;
  title: string;
  utcDate: string;
  tags: string[];
  bodyMarkdown: string;
}

export interface DropConfig {
  collection: {
    name: string;
    symbol: string;
    description: string;
    totalSupply: number;
    royaltyPercent: number;
  };
  chain: {
    name: string;
    chainId: number;
    rpcUrl: string;
    blockExplorerUrl: string;
    currencySymbol: string;
  };
  contract: {
    address: string;
    standard: 'ERC-721' | 'ERC-1155';
  };
  phases: Phase[];
  reveal: {
    mode: 'instant' | 'delayed';
    revealTime: string;
    baseURI: string;
  };
  links: {
    twitter: string;
    discord: string;
    marketplace: string;
  };
  team: { name: string; role: string; handle?: string; anonymous?: boolean }[];
  roadmap: { title: string; description: string; status: 'done' | 'in-progress' | 'planned' }[];
  faq: { question: string; answer: string; topic: string }[];
  featuredNFTs: number[];
  nfts: {
    id: number;
    name: string;
    image: string;
    thumb?: string;
    description?: string;
    traits?: { type: string; value: string }[];
    rarity?: string;
    mintable?: boolean;
  }[];
  mock: boolean;
  provenance: {
    contractAddress: string;
    deployTx: string;
    royaltyReceiver: string;
    royaltyPercent: number;
    metadataUri: string;
    storageProvider: string;
    supplyBreakdown: { label: string; count: number }[];
    mintRules: string[];
  };
  security: {
    officialLinks: { label: string; url: string }[];
    scamWarnings: string[];
    verifyChecklist: string[];
  };
  audit: {
    status: 'none' | 'in-progress' | 'complete';
    auditor: string;
    reportUrl: string;
    teamWallets: { label: string; address: string; purpose: string }[];
  };
  traitCategories: TraitCategory[];
  community: {
    discordUrl: string;
    xUrl: string;
    roles: { name: string; howToEarn: string; perks: string }[];
    events: { title: string; utcDate: string; link?: string }[];
    referral: { enabled: boolean; rewardText: string };
  };
  media: {
    logoFiles: { name: string; url: string }[];
    artSamples: { name: string; url: string }[];
    boilerplate: { short: string; medium: string; long: string };
    contactEmail: string;
  };
  holder: {
    perks: HolderPerk[];
  };
  staking: {
    enabled: boolean;
    contract: string;
    rewardToken: string;
    rules: string;
  };
  claims: {
    enabled: boolean;
    merkleRoot: string;
    snapshotDate: string;
    rewardText: string;
  };
  prelaunch: {
    enabled: boolean;
    launchTime: string;
    waitlistEndpoint: string;
    collectEmail: boolean;
    collectWallet: boolean;
  };
  artist: {
    name: string;
    bio: string;
    statement: string;
    process: { title: string; image: string; text: string }[];
    series: { title: string; description: string }[];
  };
  updates: Update[];
  help: { category: string; question: string; answerMarkdown: string }[];
  admin: {
    ownerAddress: string;
  };
}

export const traitCategories: TraitCategory[] = [
  {
    category: 'Background',
    values: [
      { name: 'Cosmic', count: 1200 },
      { name: 'Sunset', count: 1000 },
      { name: 'Forest', count: 900 },
      { name: 'Ocean', count: 800 },
      { name: 'Void', count: 600 },
      { name: 'Neon', count: 500 },
    ],
  },
  {
    category: 'Body',
    values: [
      { name: 'Explorer', count: 1500 },
      { name: 'Pilot', count: 1200 },
      { name: 'Scholar', count: 1000 },
      { name: 'Builder', count: 800 },
      { name: 'Dreamer', count: 500 },
    ],
  },
];

export const featuredNFTs = [1, 2, 3];

// Artwork is served from the jsDelivr CDN (see CDN_BASE / NFT_COUNT in
// src/config/nftArt.ts). Every collection entry maps 1:1 to a CDN image;
// there are no local image files. To attach metadata (description / traits /
// rarity) to a token, add it to the metadata map below using the token ID as key.

export interface NFT {
  id: number;
  name: string;
  image: string;
  /** Small thumbnail used for lazy loading in grids. */
  thumb?: string;
  description?: string;
  traits?: { type: string; value: string }[];
  rarity?: string;
  mintable?: boolean;
}

// Optional hand-written metadata, keyed by token ID.
// Example:
//   204: {
//     description: 'A rare explorer with cosmic powers.',
//     traits: [{ type: 'Background', value: 'Cosmic' }],
//     rarity: 'Legendary',
//     mintable: true,
//   },
const metadata: Record<number, Partial<Omit<NFT, 'id'>>> = {};

export const nfts: NFT[] = NFT_ART.map(art => ({
  id: art.id,
  name: art.name,
  image: art.full,
  thumb: art.thumb,
  ...metadata[art.id],
  mintable: metadata[art.id]?.mintable ?? true,
}));
