// Edit here: Help page
import { useState, useMemo } from 'react';
import config from '../drop.config';
import { MarkdownView } from '../components/MarkdownView';

export default function Help() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(config.help.map(h => h.category));
    return Array.from(cats);
  }, []);

  const filtered = config.help.filter(h => {
    const matchesSearch = search === '' || h.question.toLowerCase().includes(search.toLowerCase()) || h.answerMarkdown.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === '' || h.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section" style={{ marginTop: '20px' }}>
      <h2 className="section-title">Help Center.</h2>
      <p className="section-sub">Find answers to common questions.</p>

      <div className="box" style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search help articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search help articles"
          style={{ width: '100%', padding: '12px', border: 'var(--bw) solid var(--ink)', borderRadius: '10px', fontFamily: 'var(--font-body)', fontSize: '16px', background: 'var(--white)' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <button className={`btn sm ${category === '' ? 'primary' : ''}`} onClick={() => setCategory('')}>All</button>
        {categories.map(cat => (
          <button key={cat} className={`btn sm ${category === cat ? 'primary' : ''}`} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="box" style={{ textAlign: 'center', padding: '24px' }}>
          <p style={{ opacity: 0.7 }}>No articles match your search.</p>
        </div>
      ) : (
        filtered.map((item, i) => (
          <details className="faq-item" key={i}>
            <summary>{item.question}</summary>
            <div className="faq-body">
              <MarkdownView content={item.answerMarkdown} />
            </div>
          </details>
        ))
      )}

      <div className="box" style={{ marginTop: '24px', textAlign: 'center', background: 'var(--teal)' }}>
        <h3 style={{ marginBottom: '6px' }}>Still stuck?</h3>
        <p style={{ margin: '0 auto 10px', fontSize: '13px', textAlign: 'center' }}>Reach out to our support team.</p>
        <a href={`mailto:${config.media.contactEmail}`} className="btn sm">{config.media.contactEmail}</a>
      </div>
    </section>
  );
}
