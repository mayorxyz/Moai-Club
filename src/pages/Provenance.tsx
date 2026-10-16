import config from '../drop.config';
import { CopyField } from '../components/CopyField';
import { SupplyBar } from '../components/SupplyBar';

export default function Provenance() {
  const { provenance, chain, contract } = config;
  const addr = provenance.contractAddress || contract.address || '';
  const explorerAddr = addr ? `${chain.blockExplorerUrl}/address/${addr}` : '';
  const explorerTx = provenance.deployTx ? `${chain.blockExplorerUrl}/tx/${provenance.deployTx}` : '';
  const deployed = Boolean(addr);

  const steps = [
    { t: 'Open the block explorer', href: chain.blockExplorerUrl },
    { t: 'Compare the contract address' },
    { t: 'Check source is verified' },
  ];

  return (
    <section className="section prov" style={{ marginTop: '20px' }}>
      <h1 className="prov-h1">
        Everything on chain.<br />
        <span className="hl">Nothing hidden.</span>
      </h1>
      <p className="section-sub">Full transparency. Verify everything yourself.</p>

      <div className="prov-facts">
        <div className="box"><b>{chain.name}</b><span>Chain</span></div>
        <div className="box"><b>{contract.standard}</b><span>Standard</span></div>
        <div className="box"><b>{provenance.royaltyPercent}%</b><span>Royalty</span></div>
        <div className="box"><b>{config.collection.totalSupply.toLocaleString()}</b><span>Supply</span></div>
      </div>

      <div className="grid-2 prov-row">
        <div className="box">
          <div className="prov-head">
            <h3>Contract</h3>
            <span className={`tag prov-chip ${deployed ? 'ok' : 'wait'}`}>{deployed ? 'Deployed' : 'Demo mode'}</span>
          </div>
          <CopyField label="Address" value={addr || 'Not deployed'} explorerUrl={explorerAddr} />
          <CopyField label="Deploy Tx" value={provenance.deployTx || 'TBA'} explorerUrl={explorerTx} />
          <div className="prov-btns">
            {explorerAddr && <a className="btn sm primary" href={explorerAddr} target="_blank" rel="noopener noreferrer">View contract</a>}
            {explorerTx && <a className="btn sm" href={explorerTx} target="_blank" rel="noopener noreferrer">View deploy tx</a>}
          </div>
          <p className="prov-meta">
            Source verified <span className={`tag prov-chip ${deployed ? 'wait' : ''}`}>{deployed ? 'Pending' : 'N/A'}</span>
          </p>
        </div>

        <div className="box">
          <div className="prov-head"><h3>Royalty</h3></div>
          <div className="prov-roy">{provenance.royaltyPercent}%</div>
          <CopyField label="Receiver" value={provenance.royaltyReceiver || 'TBA'} />
        </div>
      </div>

      <div className="box prov-row">
        <div className="prov-head">
          <h3>Metadata</h3>
          <span className="tag prov-chip wait">Not frozen yet</span>
        </div>
        <CopyField label="Base URI" value={provenance.metadataUri || config.reveal.baseURI} />
        <p className="prov-meta"><strong>Storage:</strong> {provenance.storageProvider}</p>
      </div>

      <div className="box prov-row">
        <h3 className="prov-h3">Supply Breakdown</h3>
        <SupplyBar breakdown={provenance.supplyBreakdown} total={config.collection.totalSupply} />
      </div>

      <h3 className="prov-h3">Mint Rules</h3>
      <div className="prov-rules prov-row">
        {provenance.mintRules.map((rule: string, i: number) => (
          <div className="box" key={i}>
            <span className="prov-check" aria-hidden="true">✓</span>
            <p>{rule}</p>
          </div>
        ))}
      </div>

      <h3 className="prov-h3">How to Verify</h3>
      <ol className="prov-steps">
        {steps.map((s, i) => (
          <li className="box" key={i}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <p>{s.t}</p>
            {s.href && <a href={s.href} target="_blank" rel="noopener noreferrer">Open ↗</a>}
          </li>
        ))}
      </ol>
    </section>
  );
}