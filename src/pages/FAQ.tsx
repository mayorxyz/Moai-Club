// Edit here: FAQ page
import config from '../drop.config';

export default function FAQ() {
  const topics = [...new Set(config.faq.map(f => f.topic))];
  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <h2 className="section-title">FAQ.</h2>
      <p className="section-sub">Everything you need to know before minting.</p>
      {topics.map(topic => {
        const items = config.faq.filter(f => f.topic === topic);
        if (items.length === 0) return null;
        return (
          <div key={topic}>
            <p className="faq-topic">{topic}</p>
            {items.map((item, i) => (
              <details className="faq-item" key={i}>
                <summary>{item.question}</summary>
                <div className="faq-body">{item.answer}</div>
              </details>
            ))}
          </div>
        );
      })}
    </section>
  );
}
