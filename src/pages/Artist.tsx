import { Link } from 'react-router-dom';
import config from '../drop.config';
import { thumbUrl } from '../data/nftArt';

const COLORS = ['var(--teal)', 'var(--lime)', 'var(--orange)', 'var(--pink)', 'var(--purple)'];

export default function Artist() {
  const { artist } = config;

  return (
    <section className="section artist" style={{ marginTop: '20px' }}>
      <div className="box-lg artist-hero">
        <div className="artist-photo">
          <img src="/artist.jpg" alt={`${artist.name} portrait`} />
          <span className="tag artist-tag a1" style={{ ['--bg-c' as any]: 'var(--purple)', ['--fg' as any]: '#fff' }}>Artist</span>
          <span className="tag artist-tag a2" style={{ ['--bg-c' as any]: 'var(--lime)' }}>Creator</span>
        </div>
        <div className="artist-copy">
          <span className="badge">Meet the artist</span>
          <h2>{artist.name}</h2>
          <p>{artist.bio}</p>
        </div>
      </div>

      <div className="artist-stats">
        <div className="box"><b>{config.collection.totalSupply.toLocaleString()}</b><span>Unique Moai</span></div>
        <div className="box"><b>{artist.series.length}</b><span>Series</span></div>
        <div className="box"><b>{artist.process.length}</b><span>Process steps</span></div>
      </div>

      <figure className="artist-quote">
        <span aria-hidden="true">“</span>
        <blockquote>{artist.statement}</blockquote>
      </figure>

      <h3 className="artist-h">Process</h3>
      <div className="grid-4 artist-hover">
        {artist.process.map((step, i) => (
          <div className="box" key={i}>
            <span className="num" style={{ background: COLORS[i % COLORS.length] }}>{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>

      <h3 className="artist-h">Series</h3>
      <div className="grid-2 artist-hover">
        {artist.series.map((s, i) => (
          <div className="box" key={i}>
            <div className="series-strip">
              {[0, 1, 2].map(n => {
                const id = 1 + i * 100 + n * 7;
                return (
                  <div key={n}>
                    <img
                      src={thumbUrl(id)}
                      alt={`Moai Club #${String(id).padStart(3, '0')}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                );
              })}
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>

      <div className="box-lg artist-cta">
        <h3>Own a piece of the collection.</h3>
        <div className="hero-btns">
          <Link to="/mint" className="btn primary">Mint Now</Link>
          <Link to="/collection" className="btn">View Collection</Link>
        </div>
      </div>
    </section>
  );
}