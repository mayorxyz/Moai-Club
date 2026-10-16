import { collection, chain, contract, links, admin, mock, prelaunch } from './data/site';
import { phases, reveal, claims, staking, holder } from './data/mint';
import { nfts, featuredNFTs, traitCategories } from './data/nfts';
import type { DropConfig } from './data/nfts';
import { team, roadmap, faq, provenance, security, audit, community, media, artist, updates, help } from './data/content';

export type { Phase, TraitCategory, HolderPerk, Update, DropConfig, NFT } from './data/nfts';

const config: DropConfig = {
  collection,
  chain,
  contract,
  phases,
  reveal,
  links,
  team,
  roadmap,
  faq,
  featuredNFTs,
  nfts,
  provenance,
  security,
  audit,
  traitCategories,
  community,
  media,
  holder,
  staking,
  claims,
  prelaunch,
  artist,
  updates,
  help,
  admin,
  mock,
};

export default config;

export {
  collection,
  chain,
  contract,
  phases,
  reveal,
  links,
  team,
  roadmap,
  faq,
  nfts,
  featuredNFTs,
  provenance,
  security,
  audit,
  traitCategories,
  community,
  media,
  holder,
  staking,
  claims,
  prelaunch,
  artist,
  updates,
  help,
  admin,
  mock,
};
