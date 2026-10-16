import { fullUrl } from './nftArt';

export const team = [
  { name: 'PixelMage', role: 'Founder & Art Director', anonymous: true, handle: '@pixelmage' },
  { name: 'ChainDev', role: 'Smart Contract Engineer', anonymous: true, handle: '@chaindev' },
  { name: 'VoxelQueen', role: 'Community Lead', anonymous: true, handle: '@voxelqueen' },
  { name: 'MintBot', role: 'Infrastructure', anonymous: true, handle: '@mintbot' },
];

export const roadmap = [
  { title: 'Collection Launch', description: 'Mint opens. 5,000 Moai Club enter the world.', status: 'in-progress' as const },
  { title: 'Reveal', description: 'Art reveal within 7 days of sell-out or mint close.', status: 'planned' as const },
  { title: 'Holder Lounge', description: 'Private Discord channel and early access to future drops.', status: 'planned' as const },
  { title: 'Physical Prints', description: 'Limited edition archival prints for holders of rare traits.', status: 'planned' as const },
];

export const faq = [
  { question: 'What is Moai Club?', answer: 'A generative collection of 5,000 unique moai stone heads. Each NFT is a digital collectible stored on the Ethereum blockchain.', topic: 'Minting' },
  { question: 'How do I mint?', answer: 'Connect your wallet on the Mint page, choose your quantity, and confirm the transaction. Gas fees apply.', topic: 'Minting' },
  { question: 'What does it cost?', answer: 'Allowlist price is 0.07 ETH. Public mint price is 0.08 ETH. Plus gas fees.', topic: 'Minting' },
  { question: 'Which wallets are supported?', answer: 'Any Ethereum wallet that supports WalletConnect or browser injection.', topic: 'Wallets' },
  { question: 'When is the reveal?', answer: 'Art will be revealed within 7 days of mint close or sell-out.', topic: 'Reveal' },
];

export const help = [
  { category: 'Getting Started', question: 'How do I set up a wallet?', answerMarkdown: 'Download MetaMask or another Ethereum wallet. Create a new wallet and securely store your seed phrase.' },
  { category: 'Minting', question: 'How do I mint step by step?', answerMarkdown: '1. Connect your wallet.\n2. Choose your quantity.\n3. Click Mint and confirm.\n4. Wait for confirmation.' },
  { category: 'Troubleshooting', question: 'My mint failed. What do I do?', answerMarkdown: 'Common reasons: insufficient funds, wrong network, sold out, or wallet limit reached.' },
  { category: 'General', question: 'What is gas?', answerMarkdown: 'Gas is the fee you pay to Ethereum validators to process your transaction.' },
];

export const updates = [
  {
    id: 'launch-announcement',
    title: 'Mint Date Announced',
    utcDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Announcement', 'Mint'],
    bodyMarkdown: 'We are excited to announce that the Moai Club mint will begin soon. Allowlist mint opens first, followed by public mint.',
  },
  {
    id: 'art-preview',
    title: 'Art Preview',
    utcDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Art', 'Preview'],
    bodyMarkdown: 'Here is a preview of the Moai Club art style. Each Moai is unique, generated from 120+ traits.',
  },
];

export const artist = {
  name: 'PixelMage',
  bio: 'Digital artist exploring the intersection of pixel art and generative algorithms.',
  statement: 'Each Moai Club is a unique expression of mathematical beauty.',
  process: [
    { title: 'Concept', image: '', text: 'Started with hand-drawn pixel art concepts.' },
    { title: 'Algorithm', image: '', text: 'Built a generative algorithm that combines traits.' },
    { title: 'Iteration', image: '', text: 'Refined through hundreds of test generations.' },
    { title: 'Final Collection', image: '', text: 'Selected the final 5,000 unique combinations.' },
  ],
  series: [
    { title: 'Moai Club', description: 'The debut collection. 5,000 unique Moai.' },
    { title: 'Cosmic Drifters', description: 'Planned follow-up collection. Space-themed.' },
  ],
};

export const community = {
  discordUrl: 'https://discord.gg/moaiclub',
  xUrl: 'https://twitter.com/moaiclub',
  roles: [
    { name: 'Moai', howToEarn: 'Hold any Moai Club NFT', perks: 'Access to holder channels and early announcements' },
    { name: 'Explorer', howToEarn: 'Participate in 5 community events', perks: 'Priority allowlist for future drops' },
    { name: 'Legend', howToEarn: 'Hold 3+ Moai Club', perks: 'Exclusive merch and physical print eligibility' },
  ],
  events: [
    { title: 'Community Call', utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), link: 'https://discord.gg/moaiclub' },
    { title: 'Art Reveal Party', utcDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), link: 'https://discord.gg/moaiclub' },
  ],
  referral: { enabled: false, rewardText: '' },
};

export const media = {
  logoFiles: [{ name: 'Logo SVG', url: '/favicon.svg' }],
  artSamples: [
    { name: 'Sample Art #001 (JPG)', url: fullUrl(1) },
    { name: 'Sample Art #002 (JPG)', url: fullUrl(2) },
    { name: 'Sample Art #003 (JPG)', url: fullUrl(3) },
  ],
  boilerplate: {
    short: 'Moai Club is a generative collection of 5,000 unique pixel art NFTs on Ethereum.',
    medium: 'Moai Club is a generative collection of 5,000 unique moai stone heads exploring the digital frontier. Each piece is procedurally generated from 120+ traits across 8 categories.',
    long: 'Moai Club is a generative collection of 5,000 unique moai stone heads exploring the digital frontier. Each piece is procedurally generated from 120+ traits across 8 categories, creating a diverse cast of characters. The project launches on Ethereum with a commitment to transparency.',
  },
  contactEmail: 'team@moaiclub.xyz',
};

export const provenance = {
  contractAddress: '',
  deployTx: '',
  royaltyReceiver: '',
  royaltyPercent: 5,
  metadataUri: 'ipfs://QmPlaceholder/',
  storageProvider: 'IPFS (Pinata)',
  supplyBreakdown: [
    { label: 'Public', count: 4000 },
    { label: 'Allowlist', count: 500 },
    { label: 'Team', count: 250 },
    { label: 'Reserve', count: 250 },
  ],
  mintRules: [
    'One transaction per wallet per phase.',
    'Gas fees are not included in the mint price.',
    'Minted tokens are non-refundable.',
    'Allowlist spots are non-transferable.',
  ],
};

export const security = {
  officialLinks: [
    { label: 'Twitter / X', url: 'https://twitter.com/moaiclub' },
    { label: 'Discord', url: 'https://discord.gg/moaiclub' },
    { label: 'Website', url: 'https://moaiclub.xyz' },
  ],
  scamWarnings: [
    'We never DM first. Ignore any DMs claiming to be from the team.',
    'We never ask for your seed phrase or private keys.',
    'Always check the URL before connecting your wallet.',
    'Revoke unknown token approvals regularly.',
  ],
  verifyChecklist: [
    'Verify the contract address on Etherscan.',
    'Check that the source code is verified.',
    'Confirm the deployer address matches announcements.',
    'Review the royalty settings in the contract.',
  ],
};

export const audit = {
  status: 'none' as const,
  auditor: '',
  reportUrl: '',
  teamWallets: [
    { label: 'Treasury', address: '0x0000...0000', purpose: 'Community rewards and development' },
    { label: 'Team', address: '0x0000...0001', purpose: 'Team allocation (locked 6 months)' },
  ],
};
