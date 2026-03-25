import React, { useState, useRef, useEffect } from 'react';
import { B, BD, BOOKINGS, PUBLISHERS } from '@/data/constants';
import adfastLogo from '@/assets/specle-adfast-logo-white.png';
import specleLogo from '@/assets/specle-logo.png';
import colourMgmtIcon from '@/assets/colour-management-icon.jpeg';

export function Logo({ h = 46, useSpecle = false }: { h?: number; useSpecle?: boolean }) {
  return <img src={useSpecle ? specleLogo : adfastLogo} alt="ad.fast" style={{ height: h, width: 'auto' }} />;
}

interface TopbarProps {
  page: string;
  aTab: string;
  setATab: (t: string) => void;
  pTab: string;
  setPTab: (t: string) => void;
  onNav: (dest: string) => void;
  headerSearch: string;
  setHeaderSearch: (v: string) => void;
  onSearchSelect?: (pubId: string) => void;
}

function NavItem({ label, icon, active, onClick, highlight }: { label: string; icon?: React.ReactNode; active: boolean; onClick: () => void; highlight?: boolean }) {
  return <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '0 14px', height: 34, fontSize: 13,
    fontWeight: active ? 700 : 500,
    color: highlight ? '#F97316' : (active ? '#fff' : '#D1D5DB'),
    background: active ? 'rgba(255,255,255,.12)' : 'transparent',
    border: active ? '1px solid rgba(255,255,255,.25)' : '1px solid transparent',
    borderRadius: 6,
    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
    position: 'relative',
  }}>
    {icon}
    <span style={{ lineHeight: 1 }}>{label}</span>
  </button>;
}

// Build a flat list of all publications for search
function getAllPublications() {
  const results: { name: string; pubId: string; publisherName: string; country: string; type: 'publication' | 'publisher' }[] = [];
  PUBLISHERS.forEach(p => {
    results.push({ name: p.name, pubId: p.id, publisherName: '', country: 'GB', type: 'publisher' });
    p.pubs.forEach(pub => {
      results.push({ name: pub.n, pubId: p.id, publisherName: p.name, country: 'GB', type: 'publication' });
    });
  });
  return results;
}

const allPubs = getAllPublications();

// ── UserDropdown ──
function UserDropdown({ onNav }: { onNav: (dest: string) => void }) {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<'account' | 'pricing' | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setPanel(null); } }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  return <div ref={ref} style={{ position: 'relative' }}>
    <div onClick={() => { setOpen(!open); setPanel(null); }} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 12, cursor: 'pointer' }}>
      <span style={{ fontWeight: 600 }}>Admin User</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    {open && !panel && <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.15)', zIndex: 300, minWidth: 160, overflow: 'hidden' }}>
      <button onClick={() => setPanel('account')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13, fontWeight: 500, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid #F3F4F6', color: '#374151' }} onMouseEnter={e => (e.currentTarget.style.background = '#FFF7ED')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>My Account</button>
      <button onClick={() => setPanel('pricing')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13, fontWeight: 500, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', borderBottom: '1px solid #F3F4F6', color: '#374151' }} onMouseEnter={e => (e.currentTarget.style.background = '#FFF7ED')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>Pricing</button>
      <button onClick={() => { setOpen(false); onNav('landing'); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13, fontWeight: 500, border: 'none', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', color: '#374151' }} onMouseEnter={e => (e.currentTarget.style.background = '#FFF7ED')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>Logout</button>
    </div>}
    {open && panel === 'account' && <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.15)', zIndex: 300, minWidth: 320, overflow: 'hidden', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>My Account</div>
        <button onClick={() => setPanel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9CA3AF' }}>←</button>
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {[['Name', 'Alan Roche'], ['Email', 'alan.roche@qmuli.com'], ['Company', 'Qmuli Ltd'], ['Phone', '7904365886'], ['Username', 'aroche'], ['Role', 'Administrator']].map(item => <div key={item[0]}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 2 }}>{item[0]}</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{item[1]}</div>
        </div>)}
      </div>
      <button onClick={() => { setOpen(false); setPanel(null); }} style={{ marginTop: 14, width: '100%', padding: '8px 16px', background: '#C2410C', color: '#fff', border: 'none', borderRadius: 5, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit Profile</button>
    </div>}
    {open && panel === 'pricing' && <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.15)', zIndex: 300, minWidth: 340, overflow: 'hidden', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Pricing Bands</div>
        <button onClick={() => setPanel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#9CA3AF' }}>←</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { tier: 'Tier 1', range: '1 - 50 deliveries/month', price: '£15.00', highlight: false },
          { tier: 'Tier 2', range: '51 - 200 deliveries/month', price: '£12.00', highlight: true },
          { tier: 'Tier 3', range: '201 - 500 deliveries/month', price: '£9.00', highlight: false },
          { tier: 'Enterprise', range: '500+ deliveries/month', price: 'Contact us', highlight: false },
        ].map(p => <div key={p.tier} style={{ padding: '10px 14px', borderRadius: 6, border: p.highlight ? '2px solid #C2410C' : '1px solid #E5E7EB', background: p.highlight ? '#FFF7ED' : '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: p.highlight ? '#C2410C' : '#374151' }}>{p.tier}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: p.highlight ? '#C2410C' : '#374151' }}>{p.price}</span>
          </div>
          <div style={{ fontSize: 11, color: '#6B7280' }}>{p.range}</div>
          {p.highlight && <div style={{ fontSize: 10, fontWeight: 600, color: '#C2410C', marginTop: 4 }}>Your current plan</div>}
        </div>)}
      </div>
    </div>}
  </div>;
}

export function Topbar({ page, aTab, setATab, pTab, setPTab, onNav, headerSearch, setHeaderSearch, onSearchSelect }: TopbarProps) {
  const brandRow: React.CSSProperties = { display: 'flex', alignItems: 'center', height: 80, padding: '0 24px', gap: 16, background: `linear-gradient(135deg, #0a0a0a 0%, ${BD} 100%)`, flexShrink: 0 };
  const navRow: React.CSSProperties = { display: 'flex', alignItems: 'center', height: 44, padding: '0 24px', background: '#1F2937', flexShrink: 0, gap: 4 };

  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search results
  const searchResults = headerSearch.length > 0
    ? allPubs.filter(p => p.name.toLowerCase().includes(headerSearch.toLowerCase())).slice(0, 15)
    : [];

  const publications = searchResults.filter(r => r.type === 'publication');
  const publishers = searchResults.filter(r => r.type === 'publisher');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const useSpecle = page === 'landing' || aTab === 'dashboard' || aTab === 'specs' || aTab === 'sendad';

  if (page === 'agency') return <header style={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={brandRow}>
      <div onClick={() => onNav('landing')} style={{ cursor: 'pointer', marginRight: 12 }}><Logo h={50} useSpecle={useSpecle} /></div>
      <div ref={searchRef} style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', borderRadius: 8, padding: '0 14px', height: 40, border: '1px solid rgba(255,255,255,.2)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            value={headerSearch}
            onChange={e => { setHeaderSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => { if (headerSearch.length > 0) setShowDropdown(true); }}
            placeholder="Search publishers, publications..."
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: '#fff', flex: 1, fontFamily: 'inherit', fontWeight: 500 }}
          />
        </div>
        {showDropdown && searchResults.length > 0 && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,.2)', border: '1px solid #E5E7EB', zIndex: 200, maxHeight: 400, overflowY: 'auto' }}>
          {publications.length > 0 && <>
            <div style={{ padding: '8px 14px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', borderBottom: '1px solid #F3F4F6' }}>Publications</div>
            {publications.map((r, i) => <div key={`pub-${i}`} onClick={() => { setShowDropdown(false); setHeaderSearch(''); onSearchSelect?.(r.pubId); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', cursor: 'pointer', borderBottom: '1px solid #F9FAFB', fontSize: 13 }} onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{r.name}</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{r.country}</span>
            </div>)}
          </>}
          {publishers.length > 0 && <>
            <div style={{ padding: '8px 14px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9CA3AF', borderBottom: '1px solid #F3F4F6' }}>Publishers</div>
            {publishers.map((r, i) => <div key={`pub-${i}`} onClick={() => { setShowDropdown(false); setHeaderSearch(''); onSearchSelect?.(r.pubId); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', cursor: 'pointer', borderBottom: '1px solid #F9FAFB', fontSize: 13 }} onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <span style={{ fontWeight: 500, color: '#1a1a1a' }}>{r.name}</span>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{r.country}</span>
            </div>)}
          </>}
        </div>}
      </div>
    </div>
    <div style={navRow}>
      <NavItem label="Dashboard" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>} active={aTab === 'dashboard'} onClick={() => setATab('dashboard')} />
      <NavItem label="Send Ad" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>} active={aTab === 'specs' || aTab === 'sendad'} onClick={() => setATab('specs')} highlight />
      <NavItem label="Bookings" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} active={aTab === 'bookings'} onClick={() => setATab('bookings')} />
      <NavItem label="My Ad Deliveries" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>} active={aTab === 'tracking'} onClick={() => setATab('tracking')} />
      <NavItem label="Colour Management" icon={<img src={colourMgmtIcon} alt="" style={{ width: 14, height: 14, filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />} active={aTab === 'colour'} onClick={() => setATab('colour')} />
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <UserDropdown onNav={onNav} />
        <button onClick={() => onNav('admin')} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 5, fontSize: 11, color: 'rgba(255,255,255,.7)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/></svg>
          Admin
        </button>
      </div>
    </div>
  </header>;

  if (page === 'publisher') return <header style={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={brandRow}>
      <div onClick={() => onNav('landing')} style={{ cursor: 'pointer', marginRight: 12 }}><Logo h={50} /></div>
      <span style={{ fontSize: 10, background: 'rgba(255,255,255,.2)', borderRadius: 10, padding: '3px 8px', color: '#fff', fontWeight: 700 }}>PUBLISHER</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 12, fontWeight: 600 }}>Daily Mirror</div>
    </div>
    <div style={navRow}>
      <NavItem label="Ad Inbox" active={pTab === 'inbox'} onClick={() => setPTab('inbox')} />
      <NavItem label="Archive" active={pTab === 'archive'} onClick={() => setPTab('archive')} />
      <NavItem label="Our Specs" active={pTab === 'specs'} onClick={() => setPTab('specs')} />
      <div style={{ marginLeft: 'auto', color: '#D1D5DB', fontSize: 12, padding: '0 10px' }}>New: <strong style={{ color: '#4ADE80' }}>4</strong></div>
    </div>
  </header>;

  if (page === 'admin') return <header style={{ flexShrink: 0, position: 'sticky', top: 0, zIndex: 100, background: `linear-gradient(135deg, #0a0a0a 0%, ${BD} 100%)`, display: 'flex', alignItems: 'center', height: 56, padding: '0 24px', gap: 12 }}>
    <div onClick={() => onNav('agency')} style={{ cursor: 'pointer' }}><Logo /></div>
    <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', flex: 1 }}>Maintenance</span>
    <button onClick={() => onNav('agency')} style={{ padding: '5px 14px', borderRadius: 6, fontSize: 12, color: '#fff', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', fontFamily: 'inherit' }}>← Back to Portal</button>
  </header>;

  return <header style={{ ...brandRow, position: 'sticky', top: 0, zIndex: 100 }}>
    <div onClick={() => onNav('landing')} style={{ cursor: 'pointer', marginRight: 12 }}><Logo h={50} useSpecle /></div>
    <div style={{ flex: 1 }} />
    <button onClick={() => onNav('login')} style={{ padding: '6px 14px', fontSize: 12, fontWeight: 600, background: 'rgba(255,255,255,.15)', color: '#fff', border: '1px solid rgba(255,255,255,.3)', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}>Log in</button>
    <button onClick={() => onNav('login')} style={{ padding: '6px 14px', fontSize: 12, fontWeight: 600, background: '#fff', color: '#111', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 6 }}>Register free</button>
  </header>;
}
