import config from '../drop.config';
import { XGlyph, DiscordGlyph } from '../components/SocialGlyphs';

const COLORS = ['var(--lime)', 'var(--teal)', 'var(--pink)', 'var(--purple)', 'var(--orange)'];

const rel = (d: Date) => {
  const days = Math.round((d.getTime() - Date.now()) / 86400000);
  if (d.getTime() < Date.now() && days <= 0 && Math.abs(days) < 1) return 'Ended';
  if (days < 0) return 'Ended';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
};

export default function Community() {
  const { community } = config;

  const socials = [
    { key: 'discord', title: 'Discord', sub: 'Join the conversation', cta: 'Join', url: community.discordUrl, bg: 'var(--purple)', icon: <DiscordGlyph size={24} /> },
    { key: 'x', title: 'Twitter / X', sub: 'Follow for updates', cta: 'Follow', url: community.xUrl, bg: 'var(--lime)', icon: <XGlyph size={24} /> },
  ].filter(s => s.url);

  const events = [...community.events]
    .map((e: any) => ({ ...e, date: new Date(e.utcDate) }))
    .sort((a, b) => {
      const ap = a.date.getTime() < Date.now() ? 1 : 0;
      const bp = b.date.getTime() < Date.now() ? 1 : 0;
      return ap - bp || a.date.getTime() - b.date.getTime();
    });

  return (
    <section className="section com" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Community.</h2>
      <p className="section-sub">Join the Moai. Connect with fellow collectors.</p>

      <div className="grid-2 com-social">
        {socials.map(s => (
          <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" className="box com-soc">
            <div className="com-soc-ico" style={{ background: s.bg }} aria-hidden="true">{s.icon}</div>
            <div className="com-soc-txt">
              <h3>{s.title}</h3>
              <p>{s.sub}</p>
            </div>
            <span className="com-soc-cta">{s.cta} ↗</span>
          </a>
        ))}
      </div>

      <h3 className="com-h">Roles &amp; Perks</h3>
      <div className="grid-3 com-roles">
        {community.roles.map((role: any, i: number) => (
          <div className="box com-role" key={i}>
            <div className="com-role-head" style={{ background: COLORS[i % COLORS.length] }}>
              <h3>{role.name}</h3>
            </div>
            <dl>
              <dt>How to earn</dt>
              <dd>{role.howToEarn}</dd>
              <dt>Perks</dt>
              <dd>{role.perks}</dd>
            </dl>
          </div>
        ))}
      </div>

      <h3 className="com-h">Upcoming Events</h3>
      {events.length === 0 ? (
        <div className="box com-empty">
          <p>No upcoming events. Stay tuned!</p>
          {community.discordUrl && (
            <a href={community.discordUrl} target="_blank" rel="noopener noreferrer" className="btn sm primary">Get notified on Discord</a>
          )}
        </div>
      ) : (
        <div className="com-events">
          {events.map((e: any, i: number) => {
            const past = e.date.getTime() < Date.now();
            return (
              <div className={`box com-event${past ? ' past' : ''}`} key={i}>
                <div className="com-date" aria-hidden="true">
                  <span>{e.date.toLocaleString([], { month: 'short' })}</span>
                  <b>{e.date.getDate()}</b>
                </div>
                <div className="com-event-main">
                  <h3>{e.title}</h3>
                  <p title={e.date.toUTCString()}>
                    {e.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} your time
                    <span className="com-utc"> · {e.date.toUTCString().slice(17, 22)} UTC</span>
                  </p>
                </div>
                <div className="com-event-side">
                  <span className="tag com-rel">{rel(e.date)}</span>
                  {e.link && !past && (
                    <a href={e.link} target="_blank" rel="noopener noreferrer" className="btn sm">Join</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {community.discordUrl && (
        <div className="box-lg com-cta">
          <h3>Become part of the Moai.</h3>
          <p>Collectors, builders and artists hang out here first.</p>
          <div className="hero-btns">
            <a href={community.discordUrl} target="_blank" rel="noopener noreferrer" className="btn primary">Join Discord</a>
          </div>
        </div>
      )}
    </section>
  );
}