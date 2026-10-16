import { fullUrl } from './nftArt';

export const team = [
  { name: 'PixelMage', role: 'Founder & Art Director', anonymous: true, handle: '@pixelmage' },
  { name: 'ChainDev', role: 'Smart Contract Engineer', anonymous: true, handle: '@chaindev' },
  { name: 'VoxelQueen', role: 'Community Lead', anonymous: true, handle: '@voxelqueen' },
  { name: 'MintBot', role: 'Infrastructure', anonymous: true, handle: '@mintbot' },
];

export const roadmap = [
  { title: 'Collection Launch', description: 'Mint opens. 200+ Moai Club enter the world.', status: 'in-progress' as const },
  { title: 'Reveal', description: 'Art reveal within 7 days of sell-out or mint close.', status: 'planned' as const },
  { title: 'Holder Lounge', description: 'Private Discord channel and early access to future drops.', status: 'planned' as const },
  { title: 'Physical Prints', description: 'Limited edition archival prints for holders of rare traits.', status: 'planned' as const },
];

export const faq = [
  { question: 'What is Moai Club?', answer: 'A generative collection of 200+ unique moai stone heads. Each NFT is a digital collectible stored on the Ethereum blockchain.', topic: 'Minting' },
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
    id: 'allowlist-live',
    title: 'Allowlist Mint Is Live',
    utcDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    tags: ['Announcement', 'Mint'],
    bodyMarkdown: 'The **Allowlist Mint is officially live** at 0.07 ETH.\n\nIf your wallet made the list, head to the Mint page, connect, and claim up to 3 Moai before the window closes.\n\nPublic mint follows at 0.08 ETH. Once allowlist ends, unminted supply rolls into public — no extensions.',
  },
  {
    id: 'mint-guide',
    title: 'How to Mint: Step-by-Step Guide',
    utcDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Mint', 'Guide'],
    bodyMarkdown: 'New to minting? Here is the full walkthrough.\n\n**1. Connect your wallet.** Hit Connect on the Mint page and approve the connection on Ethereum mainnet.\n\n**2. Choose your quantity.** Allowlist wallets can mint up to 3, public up to 5.\n\n**3. Confirm the transaction.** Approve in your wallet and wait. Your NFTs appear under My NFTs.\n\n*Tip: keep extra ETH for gas. Failed transactions still cost gas.*',
  },
  {
    id: 'launch-announcement',
    title: 'Mint Date Announced',
    utcDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Announcement', 'Mint'],
    bodyMarkdown: 'We are excited to announce that the Moai Club mint will begin soon. Allowlist mint opens first at **0.07 ETH**, followed by public mint at **0.08 ETH**.\n\nMark your calendar, join the community, and get your wallet ready.',
  },
  {
    id: 'allowlist-how-it-works',
    title: 'Allowlist: How Spots Work',
    utcDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Mint', 'Guide'],
    bodyMarkdown: 'Everything you need to know about the allowlist.\n\n**Who gets a spot?** Early community members, event participants, and referral contest winners.\n\n**How do I check?** Paste your address into the Allowlist Checker page.\n\n*Spots are tied to your wallet and cannot be transferred. Anyone offering to sell you a spot is a scam.*',
  },
  {
    id: 'art-preview',
    title: 'Art Preview',
    utcDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Art', 'Preview'],
    bodyMarkdown: 'Here is a preview of the Moai Club art style. Each Moai is unique, generated from **120+ traits** across Background, Body, Head, Eyes, and more.\n\nFrom cosmic explorers to suited traders, no two Moai share the same combination.',
  },
  {
    id: 'trait-spotlight',
    title: 'Trait Spotlight: Backgrounds & Bodies',
    utcDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Art', 'Rarity'],
    bodyMarkdown: 'Two of the biggest rarity drivers, explained.\n\n**Backgrounds** range from common Sunset pieces to ultra-scarce Void and Neon variants.\n\n**Bodies** include Explorer, Pilot, Scholar, Builder, and the rare Dreamer class.\n\n*Full trait counts live on the Rarity page.*',
  },
  {
    id: 'reveal-explainer',
    title: 'Delayed Reveal: What to Expect',
    utcDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Reveal', 'Guide'],
    bodyMarkdown: 'Moai Club uses a **delayed reveal**.\n\nFreshly minted tokens show a mystery placeholder first. Within 7 days of mint close or sell-out, metadata flips to final artwork — no action needed.\n\nTrack the countdown on the Reveal page. Rarity scores unlock automatically after reveal.',
  },
  {
    id: 'security-psa',
    title: 'Security PSA: Avoiding Scams',
    utcDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Security', 'Announcement'],
    bodyMarkdown: 'Please read this before you mint.\n\n**We never DM first.** Ignore DMs claiming to be from the team.\n\n**We never ask for your seed phrase.** No legitimate mint ever needs it.\n\n**Always check the URL** before connecting, and verify the contract on Etherscan.\n\n*Full checklist on the Security page.*',
  },
  {
    id: 'community-call-recap',
    title: 'Community Call Recap + Events',
    utcDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Community', 'Event'],
    bodyMarkdown: 'Thanks to everyone who joined the first community call.\n\nWe covered mint phases, reveal timing, and holder perks — plus a live art showcase.\n\n**Up next:** the Art Reveal Party plus weekly Friday calls. Links on the Community page.',
  },
  {
    id: 'holder-perks-guide',
    title: 'Holder Perks: What Your Moai Unlocks',
    utcDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Holders', 'Guide'],
    bodyMarkdown: 'Your Moai is more than art — it is a key.\n\n**1+ Moai:** holder channels, wallpaper pack, early announcements.\n\n**2+ Moai:** a secret message from the artist in the Holder Portal.\n\n**3+ Moai:** Legend status — exclusive merch and print eligibility.',
  },
  {
    id: 'roadmap-update',
    title: 'Roadmap Update: What Comes After Mint',
    utcDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Roadmap', 'Announcement'],
    bodyMarkdown: 'Mint is just the beginning.\n\n**Reveal** lands within 7 days of sell-out. **Holder Lounge** opens right after with private channels and early access to future drops.\n\nFurther out: archival **physical prints** for rare-trait holders.\n\n*Track live status on the Roadmap page.*',
  },
  {
    id: 'welcome-to-moai-club',
    title: 'Welcome to Moai Club',
    utcDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Announcement', 'Community'],
    bodyMarkdown: 'Welcome to **Moai Club** — 200+ unique Moai on Ethereum.\n\nStart with the Collection page, read the FAQ, and join the community to grab an allowlist spot.\n\n*All official news lands here first.*',
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
    { title: 'Final Collection', image: '', text: 'Selected the final 200+ unique combinations.' },
  ],
  series: [
    { title: 'Moai Club', description: 'The debut collection. 200+ unique Moai.' },
    { title: 'Cosmic Drifters', description: 'Planned follow-up collection. Space-themed.' },
  ],
};

export const community = {
  discordUrl: 'https://x.com/mayor_1_7',
  xUrl: 'https://x.com/mayor_1_7',
  roles: [
    { name: 'Moai', howToEarn: 'Hold any Moai Club NFT', perks: 'Access to holder channels and early announcements' },
    { name: 'Explorer', howToEarn: 'Participate in 5 community events', perks: 'Priority allowlist for future drops' },
    { name: 'Legend', howToEarn: 'Hold 3+ Moai Club', perks: 'Exclusive merch and physical print eligibility' },
  ],
  events: [
    { title: 'Community Call', utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), link: 'https://x.com/mayor_1_7' },
    { title: 'Art Reveal Party', utcDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), link: 'https://x.com/mayor_1_7' },
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
    short: 'Moai Club is a generative collection of 200+ unique pixel art NFTs on Ethereum.',
    medium: 'Moai Club is a generative collection of 200+ unique moai stone heads exploring the digital frontier. Each piece is procedurally generated from 120+ traits across 8 categories.',
    long: 'Moai Club is a generative collection of 200+ unique moai stone heads exploring the digital frontier. Each piece is procedurally generated from 120+ traits across 8 categories, creating a diverse cast of characters. The project launches on Ethereum with a commitment to transparency.',
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
    { label: 'Public', count: 150 },
    { label: 'Allowlist', count: 30 },
    { label: 'Team', count: 13 },
    { label: 'Reserve', count: 10 },
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
    { label: 'X', url: 'https://x.com/mayor_1_7' },
    { label: 'Discord', url: 'https://x.com/mayor_1_7' },
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
