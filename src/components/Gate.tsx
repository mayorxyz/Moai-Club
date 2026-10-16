import type { ReactNode } from 'react';

export function Gate({ connected, children, fallback }: { connected: boolean; children: ReactNode; fallback?: ReactNode }) {
  if (!connected) {
    return fallback || (
      <div className="box" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3 style={{ marginBottom: '12px' }}>Wallet Required</h3>
        <p style={{ opacity: 0.8 }}>Connect your wallet to access this page.</p>
      </div>
    );
  }
  return <>{children}</>;
}
