// Edit here: PhaseCard component
import config from '../drop.config';
import { LocalTime } from './LocalTime';
import type { Phase } from '../data/mint';

export function PhaseCard({ phase }: { phase: Phase }) {
  const now = Date.now();
  const start = new Date(phase.startTime).getTime();
  const end = new Date(phase.endTime).getTime();
  let status: 'upcoming' | 'live' | 'ended' = 'upcoming';
  let statusClass = 'gray';
  if (now >= start && now <= end) { status = 'live'; statusClass = 'teal'; }
  else if (now > end) { status = 'ended'; statusClass = 'gray'; }
  return (
    <div className="box">
      <span className={`badge ${statusClass}`} style={{ marginBottom: '10px' }}>{status}</span>
      <h3 style={{ margin: '8px 0 6px' }}>{phase.name}</h3>
      <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>Start:</strong> <LocalTime iso={phase.startTime} /></p>
      <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>End:</strong> <LocalTime iso={phase.endTime} /></p>
      <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>Price:</strong> {phase.priceEth} {config.chain.currencySymbol}</p>
      <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>Limit:</strong> {phase.maxPerWallet} per wallet</p>
      {phase.allowlistOnly && <p style={{ fontSize: '12px', margin: '4px 0', opacity: 0.7 }}>Allowlist only</p>}
    </div>
  );
}
