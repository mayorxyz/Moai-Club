import type { ReactNode } from 'react';

export function DataTable({ headers, rows }: { headers: string[]; rows: (string | ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '500px' }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderBottom: 'var(--bw) solid var(--ink)',
                fontFamily: 'var(--font-head)',
                fontWeight: 700,
                fontSize: '13px',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '2px solid rgba(17,17,17,0.1)' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 12px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
