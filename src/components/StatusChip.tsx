// Edit here: StatusChip component
export function StatusChip({ status, color }: { status: string; color: 'lime' | 'orange' | 'pink' | 'white' }) {
  const colorMap = { lime: 'var(--lime)', orange: 'var(--orange)', pink: 'var(--pink)', white: 'var(--white)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px',
      background: colorMap[color], border: '2px solid var(--ink)', borderRadius: '999px',
      fontSize: '12px', fontWeight: 700,
    }}>
      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: colorMap[color], border: '2px solid var(--ink)' }} aria-hidden="true"></span>
      {status}
    </span>
  );
}
