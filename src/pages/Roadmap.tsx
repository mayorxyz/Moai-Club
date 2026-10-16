import { Link } from 'react-router-dom';
import config from '../drop.config';

const LABEL: Record<string, string> = { done: 'Done', 'in-progress': 'In Progress', planned: 'Planned' };

export default function Roadmap() {
  const items: any[] = config.roadmap;
  const count = (s: string) => items.filter(x => x.status === s).length;
  const done = count('done');
  const active = count('in-progress');
  const pct = items.length ? Math.round(((done + active * 0.5) / items.length) * 100) : 0;

  return (
    <section className="section roadmap" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Roadmap.</h2>
      <p className="section-sub">Our plans for the collection. These are intentions, not promises.</p>

      <div className="box rm-summary">
        <div className="rm-stats">
          <span><b>{done}</b> Done</span>
          <span><b>{active}</b> In progress</span>
          <span><b>{count('planned')}</b> Planned</span>
        </div>
        <div className="rm-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="rm-timeline">
        {items.map((item, i) => (
          <div className={`rm-item ${item.status}`} key={i}>
            <span className="rm-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="box rm-card">
              <div className="rm-top">
                <span className={`status-badge ${item.status}`}>{LABEL[item.status] ?? 'Planned'}</span>
                {(item.date || item.quarter) && <span className="tag rm-date">{item.date || item.quarter}</span>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="box-lg rm-cta">
        <h3>Follow the build.</h3>
        <p>Updates land in the community first.</p>
        <div className="hero-btns">
          <Link to="/community" className="btn primary">Join the Community</Link>
        </div>
      </div>
    </section>
  );
}
