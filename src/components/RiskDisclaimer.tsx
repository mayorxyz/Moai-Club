// Edit here: RiskDisclaimer component
import { Icon } from './Icon';

export function RiskDisclaimer() {
  return (
    <div className="box" style={{ background: 'var(--pink)', marginTop: '16px', fontSize: '13px' }}>
      <strong style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Icon name="warning" size={16} /> Risk Disclaimer:
      </strong>
      <span> NFTs are digital collectibles. Their value can go to zero. This is not financial advice. Do your own research. Never invest more than you can afford to lose.</span>
    </div>
  );
}
