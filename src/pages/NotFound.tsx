import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../drop.config';

const LINKS = [
  { to: '/collection', label: 'Collection', bg: 'var(--lime)' },
  { to: '/mint', label: 'Mint', bg: 'var(--teal)' },
  { to: '/faq', label: 'FAQ', bg: 'var(--pink)' },
  { to: '/community', label: 'Community', bg: 'var(--purple)' },
];

export default function NotFound() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.title;
    document.title = `404 · Page not found · ${config.collection.name}`;
    return () => { document.title = prev; };
  }, []);

  const back = () => (key !== 'default' ? navigate(-1) : navigate('/'));

  return (
    <section className="not-found nf">
      <div className="nf-art" aria-hidden="true">
        <div className="nf-tile"><i>?</i></div>
        <span className="tag nf-t1">Lost</span>
        <span className="tag nf-t2">Oops</span>
      </div>

      <h1>404.</h1>
      <h2>This page doesn't exist.</h2>
      <p>The page you're looking for has been moved or never existed.</p>
      <code className="nf-path" title={pathname}>{pathname}</code>

      <div className="nf-btns">
        <Link to="/" className="btn primary">Go Home</Link>
        <button className="btn" onClick={back}>← Go Back</button>
      </div>

      <div className="nf-links">
        {LINKS.map(l => (
          <Link key={l.to} to={l.to} className="box" style={{ background: l.bg }}>{l.label} →</Link>
        ))}
      </div>
    </section>
  );
}