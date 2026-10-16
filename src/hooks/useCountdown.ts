// Edit here: useCountdown hook
import { useState, useEffect } from 'react';

export function useCountdown(targetTime: string) {
  const [remaining, setRemaining] = useState('');
  useEffect(() => {
    const target = new Date(targetTime).getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setRemaining('00:00:00'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetTime]);
  return remaining;
}
