// Edit here: PhaseStatusBadge component
import { getCurrentPhase, getNextPhase } from '../store';
import { useCountdown } from '../hooks/useCountdown';

export function PhaseStatusBadge() {
  const current = getCurrentPhase();
  const next = getNextPhase();
  const endRem = useCountdown(current?.endTime || '');
  const startRem = useCountdown(next?.startTime || '');
  if (current) return <span className="phase-chip"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', border: '2px solid var(--ink)', display: 'inline-block' }} aria-hidden="true"></span> {current.name} ends {endRem}</span>;
  if (next) return <span className="phase-chip"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', border: '2px solid var(--ink)', display: 'inline-block' }} aria-hidden="true"></span> {next.name} in {startRem}</span>;
  return <span className="phase-chip">Mint Complete</span>;
}
