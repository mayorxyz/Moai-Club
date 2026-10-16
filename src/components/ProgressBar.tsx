// Edit here: ProgressBar component
export function ProgressBar({ minted, total }: { minted: number; total: number }) {
  const pct = Math.min(100, (minted / total) * 100);
  return (
    <div>
      <div className="progress-bar"><div className="fill" style={{ width: `${pct}%` }}></div></div>
      <div className="progress-label">{minted.toLocaleString()} / {total.toLocaleString()} minted</div>
    </div>
  );
}
