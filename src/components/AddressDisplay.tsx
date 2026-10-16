import { useState } from 'react';

export function AddressDisplay({ address, explorerUrl }: { address: string; explorerUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <code style={{ fontFamily: 'monospace', fontSize: '13px' }}>{short}</code>
      <button className="copy-btn" style={{ padding: '2px 6px', fontSize: '11px', minHeight: '28px' }} onClick={handleCopy} aria-label="Copy address">
        {copied ? '✓' : '⧉'}
      </button>
      {explorerUrl && (
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>↗</a>
      )}
    </span>
  );
}
