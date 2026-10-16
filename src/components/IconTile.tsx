// Edit here: IconTile component
import { Icon, IconName } from './Icon';

export function IconTile({ name, color = 'white', tilt = 0, size = 44 }: { name: IconName; color?: 'lime' | 'teal' | 'pink' | 'orange' | 'purple' | 'white'; tilt?: number; size?: number }) {
  const colorMap = { lime: 'var(--lime)', teal: 'var(--teal)', pink: 'var(--pink)', orange: 'var(--orange)', purple: 'var(--purple)', white: 'var(--white)' };
  const iconColor = (color === 'orange' || color === 'purple') ? '#fff' : 'var(--ink)';
  return (
    <div style={{ width: `${size}px`, height: `${size}px`, background: colorMap[color], border: '3px solid var(--ink)', borderRadius: '10px', boxShadow: '3px 3px 0 var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transform: tilt ? `rotate(${tilt}deg)` : undefined, color: iconColor }} aria-hidden="true">
      <Icon name={name} size={Math.round(size * 0.55)} />
    </div>
  );
}
