// Edit here: Soon page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../drop.config';
import { CountdownBox } from '../components/CountdownBox';

export default function Soon() {
  const { prelaunch } = config;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prelaunch.collectEmail && !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <div className="box-lg" style={{ textAlign: 'center' }}>
        <span className="badge">Coming Soon</span>
        <h1 style={{ marginTop: '14px', marginBottom: '10px' }}>
          Something is<br />
          <span className="hl">brewing.</span>
        </h1>
        <p style={{ fontSize: '15px', maxWidth: '500px', margin: '0 auto 20px', opacity: 0.85 }}>
          {config.collection.description}
        </p>

        <CountdownBox targetTime={prelaunch.launchTime} label="Launch in" />

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto 0' }}>
          {prelaunch.collectEmail && (
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email for waitlist"
              style={{ width: '100%', padding: '12px', border: 'var(--bw) solid var(--ink)', borderRadius: '10px', fontFamily: 'var(--font-body)', fontSize: '16px', background: 'var(--white)', marginBottom: '10px' }}
            />
          )}
          {error && <p style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' }}>{error}</p>}
          <button type="submit" className="btn primary full" disabled={submitted}>
            {submitted ? "You're on the list!" : 'Join Waitlist'}
          </button>
          <p style={{ fontSize: '12px', opacity: 0.7, margin: '8px 0 0' }}>
            By joining, you agree to our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </form>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <a href={config.links.twitter} target="_blank" rel="noopener noreferrer" className="btn sm">Twitter</a>
          <a href={config.links.discord} target="_blank" rel="noopener noreferrer" className="btn sm">Discord</a>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '24px auto 0' }}>
        {config.faq.slice(0, 3).map((item, i) => (
          <details className="faq-item" key={i}>
            <summary>{item.question}</summary>
            <div className="faq-body">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
