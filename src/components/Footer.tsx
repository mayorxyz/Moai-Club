import { Link } from 'react-router-dom';
import config from '../drop.config';
import { XGlyph, DiscordGlyph } from '../components/SocialGlyphs';

const YEAR = new Date().getFullYear();

type Item = { label: string; to?: string; href?: string };

const x = config.links.twitter || config.community?.xUrl;
const discord = config.links.discord || config.community?.discordUrl;

const COLUMNS: { title: string; items: Item[] }[] = [
  {
    title: 'Collection',
    items: [
      { label: 'Mint', to: '/mint' },
      { label: 'Collection', to: '/collection' },
      { label: 'Rarity', to: '/rarity' },
      { label: 'Activity', to: '/activity' },
      { label: 'Leaderboard', to: '/leaderboard' },
      { label: 'Reveal', to: '/reveal' },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Twitter / X', href: x },
      { label: 'Discord', href: discord },
      { label: 'Community', to: '/community' },
      { label: 'Team', to: '/team' },
      { label: 'Artist', to: '/artist' },
      { label: 'Updates', to: '/updates' },
    ],
  },
  {
    title: 'Trust',
    items: [
      { label: 'Provenance', to: '/provenance' },
      { label: 'Security', to: '/security' },
      { label: 'Transparency', to: '/transparency' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Help Center', to: '/help' },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Holder Portal', to: '/holder' },
      { label: 'Press Kit', to: '/press' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Allowlist', to: '/allowlist' },
      { label: 'My NFTs', to: '/my-nfts' },
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
];

const top = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div>
          <strong>{config.collection.name}</strong>
          <p>5,000 unique Moai. One blockchain. Your legacy.</p>
        </div>
        <div className="footer-social">
          {x && (
            <a href={x} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><XGlyph size={20} /></a>
          )}
          {discord && (
            <a href={discord} target="_blank" rel="noopener noreferrer" aria-label="Discord"><DiscordGlyph size={20} /></a>
          )}
        </div>
      </div>

      <div className="footer-grid">
        {COLUMNS.map(col => (
          <nav key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            {col.items
              .filter(i => i.to || i.href)
              .map(i =>
                i.to ? (
                  <Link key={i.label} to={i.to}>{i.label}</Link>
                ) : (
                  <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer">{i.label} ↗</a>
                )
              )}
          </nav>
        ))}
      </div>

      <div className="footer-risk">
        NFTs are digital collectibles. Their value can go to zero. This is not financial advice. Do your own research.
        Never invest more than you can afford to lose.
      </div>

      <div className="footer-bottom">
        <p>© {YEAR} {config.collection.name}. All rights reserved.</p>
        <button className="footer-top" onClick={top}>Back to top ↑</button>
      </div>
    </footer>
  );
}