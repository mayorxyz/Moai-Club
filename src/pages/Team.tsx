import { Link } from 'react-router-dom';
import config from '../drop.config';
import { IconTile } from '../components/IconTile';

const roleImages: Record<string, string | undefined> = {
  'Founder & Art Director': '/Founder & Art Director.jpg',
  'Smart Contract Engineer': '/Smart Contract Engineer.jpg',
  'Community Lead': '/Community Lead.jpg',
  'Infrastructure': '/Infrastructure.jpg',
};

const COLORS = ['var(--lime)', 'var(--teal)', 'var(--pink)', 'var(--purple)'];
const ICONS: Array<{ name: 'mint' | 'admin' | 'community' | 'activity'; color: 'lime' | 'teal' | 'pink' | 'purple' }> = [
  { name: 'mint', color: 'lime' },
  { name: 'admin', color: 'teal' },
  { name: 'community', color: 'pink' },
  { name: 'activity', color: 'purple' },
];

export default function Team() {
  return (
    <section className="section team" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Team.</h2>
      <p className="section-sub">The people behind Moai Club. We operate under handles.</p>

      <div className="grid-4 team-grid">
        {config.team.map((member: any, i: number) => {
          const img = roleImages[member.role];
          const color = COLORS[i % COLORS.length];
          return (
            <article className="box team-card" key={i} style={{ ['--c' as any]: color }}>
              <div className="team-photo">
                {img ? (
                  <img src={encodeURI(img)} alt={`${member.role} portrait`} loading="lazy" />
                ) : (
                  <IconTile name={ICONS[i % ICONS.length].name} color={ICONS[i % ICONS.length].color} />
                )}
              </div>
              <h3>{member.anonymous ? member.handle : member.name}</h3>
              <span className="tag team-role" style={{ ['--bg-c' as any]: color }}>{member.role}</span>
              {member.anonymous && <span className="team-anon">Anonymous</span>}
              {member.bio && <p className="team-bio">{member.bio}</p>}
              {member.links?.length > 0 && (
                <div className="team-links">
                  {member.links.map((l: { label: string; href: string }) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="box-lg team-join">
        <h3>Want to build with us?</h3>
        <p>We are always looking for artists, builders and community leads.</p>
        <div className="hero-btns">
          <Link to="/community" className="btn primary">Join the Community</Link>
        </div>
      </div>
    </section>
  );
}