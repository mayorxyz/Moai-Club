 # Moai Club — NFT Drop Website

A mobile-optimized NFT mint website built with React + Vite and a neo-brutalist design system. Demo mode with simulated wallet + mint flows works out of the box — no blockchain connection required.

## Quick Start

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build -> dist/
npm run typecheck # TypeScript check (tsc --noEmit)
npm run gen:art  # regenerate thumbnails + art manifest from local images
```

## Tech Stack

- **React 18 + React Router 7** (`HashRouter` in `src/App.tsx` — hash routing so static hosts / IPFS work with deep links)
- **Vite 6** + TypeScript
- **Zustand 5** for global state (`src/store.ts`)
- **Tailwind CSS 4** (`@tailwindcss/vite`) + hand-written styles in `src/theme.css` + `src/app.css`
- **lucide-react** icons
- **sharp** (dev-only, for `npm run gen:art`)
- Fonts via Google Fonts: Bricolage Grotesque (headings) + DM Sans (body)

## Project Map

| Path | What lives there / what to edit |
|---|---|
| `src/drop.config.ts` | **Single entry point for all content.** Re-exports everything from `src/data/`. Pages and components import from here. |
| `src/data/site.ts` | Collection info, chain, contract address, links, admin owner, `mock` flag, prelaunch, nav groups. **Start here for rebranding.** |
| `src/data/mint.ts` | Mint phases (price, dates, limits), reveal config, claims, staking, holder perks. |
| `src/data/nfts.ts` | `DropConfig` / `NFT` types, `traitCategories`, `featuredNFTs`, `nfts` list, optional per-token `metadata` map. |
| `src/data/nftArt.ts` | Art source of truth: `CDN_BASE`, `NFT_COUNT` (currently 203), `thumbUrl()` / `fullUrl()` builders, `NFT_ART` manifest. |
| `src/data/content.ts` | Team, roadmap, FAQ, help center, updates, artist, community, press/media boilerplate, provenance, security, audit. |
| `src/App.tsx` | All routes (31 incl. 404) with route-level `React.lazy` code splitting + `PageFallback` skeleton. |
| `src/pages/` | 31 page files: Home, Mint, Collection, NFTDetail, MyNFTs, Allowlist, Roadmap, Team, FAQ, Terms, Privacy, Provenance, Security, Transparency, Rarity, Activity, Leaderboard, Community, Press, Artist, Updates, UpdateDetail, Help, Soon, Reveal, ShareCard, Holder, Staking, Claim, Admin, NotFound. |
| `src/components/` | `Layout.tsx` (page shell, scroll-to-top), `Header.tsx` / `Footer.tsx`, `WalletModal.tsx`, plus `ui/` shared components. |
| `src/store.ts` | Zustand store: wallet state, `MintStatus` state machine (`no-wallet` → `ready` → `pending-signature` → `pending-tx` → `success` / `failed`, plus `wrong-network`, `upcoming`, `not-eligible`, `insufficient-funds`, `limit-reached`, `sold-out`, `paused`), `simulateMint()`. |
| `src/theme.css` / `src/app.css` | Design tokens + all component/page styles (loaded from `src/main.tsx`). |
| `src/main.tsx` | React entry: imports CSS, renders `App`. |
| `index.html` | Title, favicon, font links, theme-color, `#root` mount. |
| `scripts/generate-nft-art.mjs` | Local-image workflow: thumbnails + manifest generator (see NFT Images). |
| `public/` | Static assets (`favicon.svg`, etc.). |

> **Note:** older docs referenced `src/config/` (25 files), `docs/STRUCTURE.md`, and `src/index.css`. Those no longer exist — config now lives in `src/drop.config.ts` + `src/data/`, and styles are `src/theme.css` + `src/app.css`.


## Features

- 31 routes: mint flow, collection browser + NFT detail, My NFTs, allowlist checker, rarity / activity / leaderboard, roadmap, team, artist, updates, community, press kit, help center, FAQ, provenance / security / transparency, reveal, share cards, holder portal, staking + claims (gated), prelaunch / soon page, admin dashboard, legal pages, 404
- Mobile-first responsive design (320px+)
- Neo-brutalist design system with thick borders and hard shadows
- Demo mode with simulated wallet + mint transactions (on by default)
- Wallet modal (MetaMask, Rainbow, Coinbase, WalletConnect options in demo)
- Full mint state machine with all error states
- Phased mint (allowlist 0.07 ETH → public 0.08 ETH), per-wallet / per-tx limits
- Collection gallery with search and sort, lazy-loaded thumbnails
- Rarity rankings and activity feed
- Community roles, events, updates
- Trust & transparency pages (provenance, security / scam warnings, audit status)
- Admin dashboard (gated by `admin.ownerAddress`)
- Holder portal with gated perks; staking / claims pages gated by `enabled` flags

## Routes

All routes are defined in `src/App.tsx` (using `HashRouter`):

| Route | Page |
|---|---|
| `/` | Home (redirects to `/soon` while prelaunch is active) |
| `/soon` | Prelaunch / waitlist |
| `/mint` | Mint |
| `/collection` | Collection gallery |
| `/collection/:tokenId` | NFT detail |
| `/my-nfts` | My NFTs (wallet) |
| `/allowlist` | Allowlist checker |
| `/rarity`, `/activity`, `/leaderboard` | Rarity, activity feed, leaderboard |
| `/roadmap`, `/team`, `/artist`, `/updates`, `/updates/:id`, `/press`, `/community` | Project + community |
| `/provenance`, `/security`, `/transparency`, `/faq`, `/help` | Trust + support |
| `/terms`, `/privacy` | Legal |
| `/reveal` | Reveal countdown / status |
| `/share/:tokenId` | Share card |
| `/holder`, `/staking`, `/claim` | Holder perks, staking, claims |
| `/admin` | Admin dashboard (owner wallet only) |
| `*` | 404 Not Found |

## Configuration

All content lives in `src/data/` and is re-exported through `src/drop.config.ts`. To rebrand or launch a new drop, edit these files:

```typescript
// src/data/site.ts — collection, chain, contract, links
export const collection = {
  name: 'Moai Club',
  symbol: 'MC',
  description: 'A generative collection of 200+ unique moai...',
  totalSupply: 203,
  royaltyPercent: 5,
};

export const contract = { address: '', standard: 'ERC-721' as const };
export const mock = true; // false + real contract address = live mode
```

```typescript
// src/data/mint.ts — phases, prices, limits, reveal
export const phases = [
  { id: 'allowlist', name: 'Allowlist Mint', priceEth: '0.07', maxPerWallet: 3, maxPerTx: 2, allowlistOnly: true, /* ... */ },
  { id: 'public', name: 'Public Mint', priceEth: '0.08', maxPerWallet: 5, maxPerTx: 3, allowlistOnly: false, /* ... */ },
];
```

Other files: `src/data/content.ts` (team, roadmap, FAQ, help, updates, community, provenance, security), `src/data/nfts.ts` (traits, featured IDs, per-token metadata), `src/data/nftArt.ts` (art URLs — see below).

Pages consume config via a single import:

```typescript
import config from './drop.config';
```

## NFT Images

Artwork is served from the **jsDelivr CDN** — there are no local image files in the repo. The source of truth is `src/data/nftArt.ts`:

```typescript
export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/mayorxyz/NFT-images@main';
export const NFT_COUNT = 203; // total tokens on the CDN

export const thumbUrl = (id: number) => `${CDN_BASE}/thumbs/nft-${pad3(id)}.jpg`;
export const fullUrl = (id: number) => `${CDN_BASE}/images/${pad3(id)}.jpg`;
```

- Grid views load small `thumbs/nft-###.jpg` thumbnails; detail / mint preview loads full `images/###.jpg` originals.
- Token #N maps to the Nth file on the CDN — **treat the CDN folder as append-only** once live so token IDs stay stable.
- To add more art: upload to the CDN repo, bump `NFT_COUNT`, and add names to `NFT_NAMES` if desired.

### Local-image workflow (optional)

If you prefer to host images locally instead of the CDN, `scripts/generate-nft-art.mjs` builds thumbnails + a manifest from `public/nft-images/`:

```bash
npm run gen:art   # regenerate thumbnails + manifest after changing images
```

This:

1. Sorts the images in `public/nft-images/` by filename (numeric-aware) — the Nth file becomes token #N
2. Writes 400px WebP thumbnails to `public/nft-images/thumbs/`
3. Regenerates `src/data/nftArt.ts` (auto-generated in this mode — don't edit by hand)

> **Note:** the local workflow overwrites `src/data/nftArt.ts` with local `/nft-images/...` paths. Back up the CDN version first if you want to switch back.

## Adding an NFT

With the default CDN setup:

1. **Upload** the new image to the CDN repo (`images/` + `thumbs/`).
2. **Bump** `NFT_COUNT` in `src/data/nftArt.ts` and optionally add a name in `NFT_NAMES`.
3. **Optional:** add metadata (description, traits, rarity) in `src/data/nfts.ts` via the `metadata` map keyed by token ID:

```typescript
// src/data/nfts.ts
const metadata: Record<number, Partial<Omit<NFT, 'id'>>> = {
  204: {
    description: 'A rare explorer with cosmic powers.',
    traits: [
      { type: 'Background', value: 'Cosmic' },
      { type: 'Body', value: 'Explorer' },
    ],
    rarity: 'Legendary',
    mintable: true,
  },
};
```

The NFT appears in the collection with its image, traits, and rarity tag. Cards and detail pages show a Mint button unless `mintable: false`.

## Design System

- **Colors**: Cream background (#fdf3df), lime/orange/teal/purple/pink accents (tokens in `src/theme.css`)
- **Borders**: 3px solid black on all elements
- **Shadows**: Hard offset shadows (no blur)
- **Typography**: Bricolage Grotesque (headings) + DM Sans (body), loaded in `index.html`
- **Mobile-first**: Optimized for 320px and up

## Deployment

```bash
npm run typecheck  # optional but recommended
npm run build      # outputs to dist/
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, IPFS). Routing uses `HashRouter`, so no server rewrites are needed — deep links like `/#/collection/5` work on plain static hosting.

## Demo Mode

The site runs in demo mode by default (`mock = true` in `src/data/site.ts`). Wallet connection and minting are simulated in `src/store.ts` (`simulateMint()` with `pending-signature` → `pending-tx` → `success` delays) — no real blockchain transactions occur.

To go live:

1. Set `mock = false` in `src/data/site.ts`
2. Set `contract.address` to your deployed ERC-721/1155 address (and `provenance` / `audit` details in `src/data/content.ts`)
3. Set `chain` (chainId, rpcUrl, explorer) and `admin.ownerAddress`
4. Configure real `phases`, `reveal`, `claims` / `staking` (or leave `enabled: false` to hide those pages' content)
5. Wire `connectWallet` / mint calls in `src/store.ts` to your web3 provider

## Disclaimer

NFTs are digital collectibles. Value can go to zero. Not financial advice. Do your own research.
#   M o a i - C l u b  
 