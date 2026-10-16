import { Icon } from './Icon';

export function SupplyBar({ breakdown, total }: { breakdown: { label: string; count: number }[]; total: number }) {
  const colors = ['var(--teal)', 'var(--purple)', 'var(--orange)', 'var(--pink)', 'var(--lime)'];
  const sum = breakdown.reduce((s, b) => s + b.count, 0);
  const matches = sum === total;
  
  return (
    <div>
      <div style={{ display: 'flex', height: '32px', border: 'var(--bw) solid var(--ink)', borderRadius: '10px', overflow: 'hidden' }}>
        {breakdown.map((b, i) => (
          <div key={i} style={{
            width: `${(b.count / total) * 100}%`,
            background: colors[i % colors.length],
            borderRight: i < breakdown.length - 1 ? '2px solid var(--ink)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'var(--font-head)',
          }}>
            {b.count > total * 0.08 ? b.label : ''}
          </div>
        ))}
      </div>
      {!matches && (
        <span className="badge orange" style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Icon name="warning" size={14} /> Breakdown does not equal total supply
        </span>
      )}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px', fontSize: '13px' }}>
        {breakdown.map((b, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '12px', height: '12px', background: colors[i % colors.length], border: '2px solid var(--ink)', borderRadius: '3px', display: 'inline-block' }}></span>
            {b.label}: {b.count}
          </span>
        ))}
      </div>
    </div>
  );
}
