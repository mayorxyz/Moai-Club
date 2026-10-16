import { Link } from 'react-router-dom';
import config from '../drop.config';
import { RiskDisclaimer } from '../components/RiskDisclaimer';

export default function Staking() {
  if (!config.staking.enabled) {
    return (
      <section className="section" style={{ marginTop: '20px', textAlign: 'center' }}>
        <div className="box" style={{ padding: '40px 16px' }}>
          <h2>Staking is not available.</h2>
          <p style={{ opacity: 0.8, marginTop: '10px' }}>This feature is not currently enabled.</p>
          <Link to="/" className="btn" style={{ marginTop: '14px' }}>Go Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Staking.</h2>
      <p className="section-sub">Stake your Moai Club to earn rewards.</p>

      <div className="box" style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>{config.staking.rules || 'Staking rules will be displayed here.'}</p>
      </div>

      <div className="grid-2">
        <div className="box" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '6px' }}>Staked</h3>
          <p style={{ fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>0</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '6px' }}>Pending Rewards</h3>
          <p style={{ fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', fontFamily: 'var(--font-head)', fontWeight: 800, margin: 0 }}>0 {config.staking.rewardToken || 'TBA'}</p>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn primary">Stake</button>
        <button className="btn">Unstake</button>
        <button className="btn">Claim Rewards</button>
      </div>

      <RiskDisclaimer />
    </section>
  );
}
