// Edit here: site header, desktop dropdowns, mobile menu sheet
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import config from '../drop.config';
import { useStore } from '../store';
import { WalletButton } from './WalletButton';
import { PhaseStatusBadge } from './PhaseStatusBadge';
import { Icon } from './Icon';
import { navGroups, accountItems, mobileGroups, mobileSocials } from '../data/site';
import type { NavItem } from '../data/site';

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function Header() {
  const location = useLocation();
  const store = useStore() as any;
  const { mobileMenuOpen, setMobileMenuOpen } = store;

  const address: string | undefined = store.walletAddress ?? undefined;
  const ownerAddress: string | undefined = (config as any).admin?.ownerAddress;
  const isOwner = !!address && !!ownerAddress && address.toLowerCase() === ownerAddress.toLowerCase();

  const [open, setOpen] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const groupsRef = useRef<HTMLDivElement>(null);
  const hdrRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const visible = (items: NavItem[]) =>
    items.filter(i =>
      i.flag === 'staking' ? config.staking.enabled
        : i.flag === 'claims' ? config.claims.enabled
          : i.flag === 'owner' ? isOwner
            : true
    );

  const isActive = (to?: string) => !!to && location.pathname === to;

  // Close everything on route change
  useEffect(() => {
    setOpen(null);
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  // Lock body scroll when the mobile menu is open (position:fixed lock also works on iOS)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const scrollY = window.scrollY;
    document.body.classList.add('no-scroll');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      window.scrollTo(0, scrollY);
    };
  }, [mobileMenuOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (groupsRef.current && !groupsRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)');
    const onChange = () => { if (mq.matches) setMobileMenuOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [setMobileMenuOpen]);

  // Header height variable for the mobile sheet position
  useEffect(() => {
    const set = () => {
      const h = hdrRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty('--hdr-h', `${Math.round(h)}px`);
    };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, [mobileMenuOpen]);

  // Mobile sheet: focus trap, Escape, focus return
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const sheet = sheetRef.current;
    const burger = burgerRef.current;
    sheet?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        burger?.focus();
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const nodes = [burger, ...Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE))].filter(Boolean) as HTMLElement[];
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  // Hover behavior (only on devices that support hover)
  const canHover = () => window.matchMedia('(hover: hover)').matches;
  const hoverOpen = (k: string) => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(k), 100);
  };
  const hoverClose = () => {
    if (!canHover()) return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(null), 200);
  };

  // Keyboard on a dropdown group
  const onGroupKey = (e: KeyboardEvent<HTMLElement>, k: string) => {
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    if (e.key === 'Escape') {
      setOpen(null);
      e.currentTarget.querySelector<HTMLElement>('.hdr-caret')?.focus();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key) || !items.length) return;
    e.preventDefault();
    if (open !== k) {
      setOpen(k);
      requestAnimationFrame(() => items[0]?.focus());
      return;
    }
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next =
      e.key === 'Home' ? 0
        : e.key === 'End' ? items.length - 1
          : e.key === 'ArrowDown' ? (i + 1) % items.length
            : i <= 0 ? items.length - 1 : i - 1;
    items[next]?.focus();
  };

  const onGroupBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
  };

  const renderItem = (it: NavItem, role?: string) =>
    it.href ? (
      <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer" role={role} className="hdr-item">
        <span>{it.label}</span>
        <Icon name="external" size={14} />
      </a>
    ) : (
      <Link key={it.label} to={it.to!} role={role} className={`hdr-item ${isActive(it.to) ? 'active' : ''}`}>
        <span>{it.label}</span>
      </Link>
    );

  const accountVisible = visible(accountItems);

  return (
    <>
      <header className="hdr" ref={hdrRef}>
        <nav className="hdr-bar" aria-label="Main">
          <Link to="/" className="hdr-logo">
            <span className="hdr-logo-square" aria-hidden="true"></span>
            <span className="hdr-logo-name">{config.collection.name}</span>
          </Link>

          {/* Desktop dropdown groups */}
          <div className="hdr-groups" ref={groupsRef}>
            {navGroups.map(g => {
              const isOpen = open === g.label;
              const groupActive = isActive(g.to) || g.items.some(i => isActive(i.to));
              return (
                <div
                  key={g.label}
                  className={`hdr-group ${isOpen ? 'open' : ''}`}
                  onMouseEnter={() => hoverOpen(g.label)}
                  onMouseLeave={hoverClose}
                  onKeyDown={e => onGroupKey(e, g.label)}
                  onBlur={onGroupBlur}
                >
                  <div className={`hdr-trigger ${g.primary ? 'primary' : ''} ${groupActive ? 'active' : ''}`}>
                    {g.to ? (
                      <Link to={g.to} className="hdr-label">{g.label}</Link>
                    ) : (
                      <button type="button" className="hdr-label" onClick={() => setOpen(isOpen ? null : g.label)}>
                        {g.label}
                      </button>
                    )}
                    <button
                      type="button"
                      className="hdr-caret"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-label={`${g.label} menu`}
                      onClick={() => setOpen(isOpen ? null : g.label)}
                    >
                      <span className="hdr-caret-icon" aria-hidden="true"></span>
                    </button>
                  </div>
                  <div className="hdr-panel-wrap">
                    <div className="hdr-panel" role="menu" aria-label={g.label}>
                      {visible(g.items).map(it => renderItem(it, 'menuitem'))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hdr-right">
            <div className="hdr-phase-desktop"><PhaseStatusBadge /></div>
            <WalletButton />

            <button
              ref={burgerRef}
              type="button"
              className={`hdr-burger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={!!mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" className="hdr-burger-lines"><i></i><i></i><i></i></span>
            </button>
          </div>
        </nav>

        {/* Mobile phase strip */}
        <div className="hdr-strip"><PhaseStatusBadge /></div>
      </header>
      <div className="hdr-spacer" aria-hidden="true" />

      {mobileMenuOpen && (
        <>
          <div className="mnav-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mnav" id="mobile-menu" ref={sheetRef} role="dialog" aria-modal="true" aria-label="Menu">
            {(() => {
              const mintGroup = navGroups.find(group => group.label === 'Mint');
              const mintItems = mintGroup ? visible(mintGroup.items) : [];
              const isMintOpen = acc === 'Mint';
              return (
                <div className={`mnav-acc mnav-mint-acc${isMintOpen ? ' open' : ''}`}>
                  <div className="mnav-acc-row">
                    <Link to="/mint" className="mnav-mint-label" onClick={() => setMobileMenuOpen(false)}>Mint now</Link>
                    <button
                      type="button"
                      className="mnav-acc-btn"
                      aria-expanded={isMintOpen}
                      aria-label={`${isMintOpen ? 'Close' : 'Open'} Mint menu`}
                      onClick={e => {
                        if (isMintOpen) { setAcc(null); return; }
                        setAcc('Mint');
                        const body = e.currentTarget.closest('.mnav-acc')?.querySelector('.mnav-acc-body');
                        requestAnimationFrame(() => body?.scrollIntoView({ block: 'nearest' }));
                      }}
                    >
                      <span className="mnav-acc-sign" aria-hidden="true">{isMintOpen ? '\u2212' : '+'}</span>
                    </button>
                  </div>
                  {isMintOpen && (
                    <div className="mnav-acc-body">
                      {mintItems.map(item => renderItem(item))}
                    </div>
                  )}
                </div>
              );
            })()}

            {mobileGroups.map(g => {
              const items = visible(g.items);
              if (!items.length) return null;
              const isOpen = acc === g.label;
              const firstTo = g.to ?? items.find(i => i.to)?.to;
              return (
                <div key={g.label} className={`mnav-acc ${isOpen ? 'open' : ''}`}>
                  <div className="mnav-acc-row">
                    {firstTo ? (
                      <Link
                        to={firstTo}
                        className="mnav-acc-label"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {g.label}
                      </Link>
                    ) : (
                      <span className="mnav-acc-label">
                        {g.label}
                      </span>
                    )}

                    <button
                      type="button"
                      className="mnav-acc-btn"
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Close' : 'Open'} ${g.label} menu`}
                      onClick={e => {
                        if (isOpen) { setAcc(null); return; }
                        setAcc(g.label);
                        const body = (e.currentTarget.closest('.mnav-acc')?.querySelector('.mnav-acc-body') ?? null) as HTMLElement | null;
                        requestAnimationFrame(() => body?.scrollIntoView({ block: 'nearest' }));
                      }}
                    >
                      <span className="mnav-acc-sign" aria-hidden="true">
                        {isOpen ? '\u2212' : '+'}
                      </span>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="mnav-acc-body">
                      {items.map(it => renderItem(it))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mnav-social">
              {mobileSocials.map(it => renderItem(it))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
