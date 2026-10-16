// Edit here: page shell. The header and footer live in their own files next to this one:
// Header.tsx (site header, dropdowns, mobile menu) | Footer.tsx (site footer) | styles live in src/index.css
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { WalletModal } from './WalletModal';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const firstRender = useRef(true);

  // Start each new page at the top (skipped on initial load so a browser-refresh
  // scroll restore still works; setTimeout runs after the mobile-menu scroll-unlock
  // so navigation from the open menu also lands at the top).
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const t = window.setTimeout(() => window.scrollTo(0, 0), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="page">
      <Header />
      <WalletModal />
      <main>{children}</main>
      <Footer />
    </div>
  );
}