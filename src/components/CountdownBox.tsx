// Edit here: CountdownBox component
import { useState, useEffect } from 'react';

export function CountdownBox({ targetTime, label }: { targetTime: string; label?: string }) {
  const [remaining, setRemaining] = useState('');
  useEffect(() => {
    const target = new Date(targetTime).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setRemaining('00:00:00'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(d > 0 ? `${d}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetTime]);
  return (
    <div className="box" style={{ textAlign: 'center', padding: '16px' }}>
      {label && <p style={{ fontSize: '13px', opacity: 0.7, margin: '0 0 6px', fontFamily: 'var(--font-head)', fontWeight: 700 }}>{label}</p>}
      <p style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', margin: 0 }} aria-live="polite">{remaining}</p>
    </div>
  );
}
