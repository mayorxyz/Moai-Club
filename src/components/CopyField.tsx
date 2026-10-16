// Edit here: CopyField component
import { useState } from 'react';

export function CopyField({ label, value, explorerUrl }: { label: string; value: string; explorerUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const shortVal = value.length > 20 ? `${value.slice(0, 10)}...${value.slice(-6)}` : value;
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="contract-row">
      <span style={{ fontWeight: 700, minWidth: '80px' }}>{label}:</span>
      <code>{shortVal}</code>
      <button className="copy-btn" onClick={handleCopy} aria-label={`Copy ${label}`}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {explorerUrl && (
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="btn sm" style={{ padding: '4px 10px', fontSize: '12px' }}>Explorer</a>
      )}
    </div>
  );
}
