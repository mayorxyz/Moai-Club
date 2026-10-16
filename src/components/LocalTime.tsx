// Edit here: LocalTime component
export function LocalTime({ iso }: { iso: string }) {
  const date = new Date(iso);
  return <span title={date.toUTCString()} style={{ cursor: 'help' }}>{date.toLocaleString()}</span>;
}
